import React, { useState, useMemo, useEffect } from "react";
import "./minesgame.css";
import Square from "./Square/Square";
import { useSelector } from "react-redux";

const BOARD_SIZE = 25;
let dataArr = ["0x", "0x"];

export default function MinesGame({ onGameOver }) {
  const { countMines } = useSelector((state) => state?.counter);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(100);
  const [movesLeft, setMovesLeft] = useState(BOARD_SIZE);
  const [mineSeed, setMineSeed] = useState(Date.now());
  const [revealedSquares, setRevealedSquares] = useState(
    Array(BOARD_SIZE).fill(false)
  );

  const revealBoard = gameOver || movesLeft === 0;

  useEffect(() => {
    if (revealBoard && gameStarted) onGameOver?.();
  }, [revealBoard, onGameOver, gameStarted]);

  const minesPositions = useMemo(() => {
    const positions = new Set();
    while (positions.size < countMines) {
      positions.add(Math.floor(Math.random() * BOARD_SIZE) + 1);
    }
    return [...positions];
  }, [mineSeed, countMines]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(100);
    setMovesLeft(BOARD_SIZE);
    setMineSeed(Date.now());
    setRevealedSquares(Array(BOARD_SIZE).fill(false));
  };

  const handleSquareClick = (idx) => {
    if (!gameStarted || revealedSquares[idx] || gameOver) return;

    const isMine = minesPositions.includes(idx + 1);
    setMovesLeft((prev) => prev - 1);
    setRevealedSquares((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });

    if (isMine) {
      setGameOver(true);
    } else {
      setScore((prev) => prev * 2);
    }
  };

  const autoPlayMove = () => {
    if (!gameStarted || gameOver) return;
    const nextIdx = revealedSquares.findIndex((rev) => !rev);
    if (nextIdx !== -1) handleSquareClick(nextIdx);
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
        />
      )),
    [revealedSquares, minesPositions, gameOver]
  );

  return (
    <div className="minesGameContainer text-center">
      {/* Score and Buttons */}

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

      <div className="flex items-center justify-center gap-4 mb-6">
        <span className="bg-[#4e5758] w-20 text-sm text-[#B3BEC1] p-2 rounded-md text-center font-semibold">
          {score}
        </span>
        <button
          onClick={startGame}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          {gameStarted ? "Restart" : "Start"}
        </button>
        <button
          onClick={autoPlayMove}
          disabled={!gameStarted || gameOver}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          Auto Play Move
        </button>
      </div>

      {/* Messages */}
      {!gameStarted && (
        <div className="text-gray-400 mt-2 text-sm">
          Click "Start" to begin the game
        </div>
      )}
      {gameOver && gameStarted && (
        <div className="text-red-500 mt-2 text-sm font-semibold">
          Game Over!
        </div>
      )}

      {/* Game Board */}
      <div className="flex justify-center mt-4">
        <div className="bg-[#292d2e] max-w-[480px] w-full p-4 rounded-xl">
          <div
            className={`grid grid-cols-[repeat(5,_75px)] gap-x-4 gap-y-2 justify-center transition-opacity ${
              !gameStarted ? "opacity-50 pointer-events-none" : ""
            }`}
          >
            {squares}
          </div>
        </div>
      </div>
    </div>
  );
}
