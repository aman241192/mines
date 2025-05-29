import React, { useState, useMemo, useEffect } from "react";
import Square from "./Square/Square";
import { useDispatch, useSelector } from "react-redux";
import {
  countMovesAction,
  startGameAction,
  totalScoreAction,
} from "../../../../Slice/counterSlice";
import CustomModal from "../../../../components/CustomModal/CustomModal";

import INR from "../../../../assets/images/INR.webp";

const BOARD_SIZE = 25;
let dataArr = ["0x", "0x"];

export default function MinesGame({ onGameOver }) {
  const dispatch = useDispatch();
  const { start, value, countMines, totalScore } = useSelector(
    (state) => state.counter
  );

  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(BOARD_SIZE);
  const [mineSeed, setMineSeed] = useState(Date.now());
  const [revealedSquares, setRevealedSquares] = useState(
    Array(BOARD_SIZE).fill(false)
  );
  const [clickedMineIdx, setClickedMineIdx] = useState(null);

  const revealBoard = gameOver || movesLeft === 0;

  useEffect(() => {
    if (isWin) {
      setTimeout(() => {
        setIsWin(false);
      }, 3000);
    }
  }, [isWin]);

  useEffect(() => {
    if (score != 0) {
      dispatch(totalScoreAction(score));
    }
  }, [score]);

  useEffect(() => {
    setScore(totalScore);
  }, [totalScore]);

  useEffect(() => {
    if (movesLeft < BOARD_SIZE) {
      dispatch(countMovesAction(movesLeft));
    }
  }, [movesLeft]);

  useEffect(() => {
    if (revealBoard && gameStarted) onGameOver?.();
  }, [revealBoard, onGameOver, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setIsWin(false);
    setScore(100);
    setMovesLeft(BOARD_SIZE);
    setMineSeed(Date.now());
    setRevealedSquares(Array(BOARD_SIZE).fill(false));
    setClickedMineIdx(null);
  };

  const autoPlayMove = () => {
    if (!gameStarted || gameOver) return;
    const hiddenIndexes = revealedSquares
      .map((rev, idx) => (!rev ? idx : null))
      .filter((i) => i !== null);

    const randomIndex =
      hiddenIndexes[Math.floor(Math.random() * hiddenIndexes.length)];

    if (randomIndex !== undefined) {
      handleSquareClick(randomIndex);
    }
  };

  useEffect(() => {
    if (start) {
      startGame();
    }
  }, [start]);

  useEffect(() => {
    if (value) {
      autoPlayMove();
    }
  }, [value]);

  useEffect(() => {
    if (gameOver && gameStarted) {
      dispatch(startGameAction(false));
    }
  }, [gameOver, gameStarted]);

  const minesPositions = useMemo(() => {
    const positions = new Set();
    while (positions.size < countMines) {
      positions.add(Math.floor(Math.random() * BOARD_SIZE) + 1);
    }
    return [...positions];
  }, [mineSeed, countMines]);

  console.log("minesPositions", minesPositions);

  const handleSquareClick = (idx) => {
    if (!gameStarted || revealedSquares[idx] || gameOver) return;

    const isMine = minesPositions.includes(idx + 1);
    setMovesLeft((prev) => prev - 1);
    setRevealedSquares((prev) => {
      const updated = [...prev];
      updated[idx] = true;

      const totalRevealed = updated.filter(Boolean).length;
      const totalNonMines = BOARD_SIZE - minesPositions.length;

      if (totalRevealed === totalNonMines) {
        setIsWin(true);
        setGameOver(true);
      }

      return updated;
    });

    if (isMine) {
      setClickedMineIdx(idx);
      setGameOver(true);
    } else {
      setScore((prev) => prev * 2);
    }
  };

  const squares = useMemo(
    () =>
      Array.from({ length: BOARD_SIZE }, (_, idx) => (
        <Square
          key={idx}
          index={idx}
          mine={minesPositions.includes(idx + 1)}
          gameOver={gameOver}
          revealed={revealedSquares[idx]}
          onClick={() => handleSquareClick(idx)}
          clickedMineIdx={clickedMineIdx}
          gameStarted={gameStarted}
        />
      )),
    [revealedSquares, minesPositions, gameOver, clickedMineIdx]
  );

  return (
    <div className="starsOut w-full">
      <div className="minesGameContainer text-center ">
        <div className="flex justify-start gap-4 mt-[10px]">
          {dataArr?.map((item, index) => (
            <span
              key={index}
              className="bg-[#4e5758] w-[80px] text-[14px] text-[#B3BEC1] p-[10px] rounded-md text-center font-semibold"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex justify-center mt-4 relative">
          <div className="transparent-bg">
            <div className="">
              <div
                className={`grid grid-cols-[repeat(5,_83px)] gap-x-[5px] gap-y-[5px] justify-center transition-opacity  custom460:grid-cols-[repeat(5,_70px)] custom530:gap-x-2 custom530:gap-y-2 custom530:grid-cols-[repeat(5,_83px)] ${
                  !gameStarted ? "opacity-50 pointer-events-none" : ""
                }`}
              >
                {squares}
              </div>
              {/* {isWin && alert("OK")} */}
              {/* {isWin && setOpen(true)} */}
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        open={isWin}
        setOpen={setIsWin}
        closable={false}
        children={
          <div>
            <h6 className="text-[20px] font-bold text-[#24EE89] text-center">
              1.14x
            </h6>

            <div className="flex justify-center gap-2 items-center text-[20px] font-bold text-white rounded-md bg-[#4A5354] text-center">
              ₹{score}
              <div className="w-[24px]">
                <img src={INR} alt="" width={"24px"} />
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
