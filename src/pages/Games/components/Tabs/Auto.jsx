import React, { useEffect, useState } from "react";
import Info from "../../../../assets/images/Info";
import INR from "../../../../assets/images/INR.webp";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CustomRange from "../../../../components/CustomRange/CustomRange";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomMinRange from "../../../../components/CustomRange/CustomMinRange";
import { ImMagicWand } from "react-icons/im";
import CutomText from "../../../../components/CutomText/CutomText";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import {
  autoPlayAction,
  countMovesAction,
  startGameAction,
  totalScoreAction,
} from "../../../../Slice/counterSlice";
import { IoMdInfinite } from "react-icons/io";
import AmountInputField from "../../../../components/AmountInputField/AmountInputField";
import OnWin from "../../../../components/OnWin/OnWin";
import Help from "../../../../assets/images/Help";

const amtArr = ["10", "100", "1.0k", "10.0k"];

const Auto = () => {
  const dispatch = useDispatch();
  const { totalMoves, totalScore, start, countMines } = useSelector(
    (state) => state?.counter
  );

  const [amt, setAmt] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [betsNo, setBetsNo] = useState(null);

  useEffect(() => {
    setGameStart(start);
  }, [start]);

  const hadleStartGame = () => {
    dispatch(startGameAction(true));
    dispatch(countMovesAction(""));
    dispatch(totalScoreAction(0));
  };

  const handleAutoPlay = () => {
    dispatch(autoPlayAction(1));
  };

  const handleInputChnage = (e) => {
    const { value } = e.target;
    let checkNumber = isNaN(value);
    let num = Number(value);

    if (!checkNumber) {
      if (value === "") {
        setAmt("");
      } else if (num < 1) {
        setAmt(num);
      } else {
        setAmt(1);
      }
    }
  };

  const handleDivideAmt = () => {
    let newAmt = (amt / 2).toFixed(2);
    setAmt(newAmt);
  };

  const handleDoubleAmt = () => {
    let amount = Number(amt);
    if (amount < 1) {
      let newAmt = (amount * 2).toFixed(2);
      setAmt(newAmt < 1 ? Number(newAmt) : 1);
    } else {
      setAmt(1);
    }
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const handleResetBets = () => {
    setToggle((prev) => !prev);
  };

  const handleSetBetTen = () => {
    setBetsNo(10);
  };

  const handleSetBetHund = () => {
    setBetsNo(100);
  };

  return (
    <div>
      <div className="px-[12px] pt-[20px] pb-[0px] h-[473px] overflow-scroll hide-scrollbar">
        <div className="flex items-center gap-2 mb-[4px]">
          <CutomText title={"Amount"} />
          <Info className="text-[#24ee89]" />
        </div>

        {/* Manual Amount Input */}
        <AmountInputField
          id="mannual"
          img={INR}
          amt={amt}
          setAmt={setAmt}
          start={false}
          onChange={handleInputChnage}
          onClickOne={handleDivideAmt}
          onClickTwo={handleDoubleAmt}
          onClickThree={handleToggle}
        />

        {toggle ? (
          <div className="mt-[3px]">
            <CustomMinRange setAmt={setAmt} amt={amt} disabled={start} />
          </div>
        ) : (
          <div className="flex justify-between items-center mb-[10px]">
            {amtArr.map((item, index) => (
              <span
                key={index}
                className="w-[77px] rounded-md text-lightGray text-[14px] text-center mt-1 p-[5px] block bg-[#3a4142] font-semibold cursor-not-allowed"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <CustomRange title={"Mines"} countMines={countMines} />

        {/* Number of Bets Input */}
        <AmountInputField
          id="auto"
          img={<IoMdInfinite className="text-white m-auto" />}
          title={"Number of Bets"}
          amt={betsNo}
          setAmt={setBetsNo}
          start={false}
          onClickOne={handleResetBets}
          onClickTwo={handleSetBetTen}
          onClickThree={handleSetBetHund}
          onChange={(e) => setBetsNo(e.target.value)}
        />

        {/* On Win/Loss */}
        <OnWin title="On Win" />
        <OnWin title="On Loss" />

        <div className="mt-[10px]">
          <div className="mb-[10px]">
            <CustomInput name={"Stop on win"} title={"Stop on win"} />
          </div>
          <CustomInput name={"Stop on loss"} title={"Stop on loss"} />
        </div>

        <div className="flex mt-3">
          <div className="w-[24px]">
            <Help fill="#b3bec1" />
          </div>
          <p className="text-[#b3bec1] ml-2 text-[14px] mb-3">
            Use of script is optional and players must take full responsibility
            for any attendant risks. We will not be held liable in this regard.
          </p>
        </div>

        {gameStart && (
          <div className="mt-[10px]">
            <CustomInput
              name={"gems"}
              title={"Gems"}
              value={start ? totalMoves : null}
            />
            <CustomInput
              name={"totalProfit"}
              title={"Total profit (1.09x)"}
              value={totalScore > 100 ? totalScore : ""}
            />
          </div>
        )}
      </div>

      <div className="px-[12px]">
        <button
          className="w-full gradient-button"
          onClick={hadleStartGame}
          disabled={true}
        >
          Start Auto Bet
        </button>

        <div className="text-gray-300 text-sm px-3 py-1 rounded-md flex items-center gap-2 bg-[#24ee891a] mt-[5px]  justify-center">
          <AiOutlineInfoCircle className="w-5 h-5 text-gray-300" />
          <span>Betting with $0 will enter demo mode.</span>
        </div>
      </div>
    </div>
  );
};

export default Auto;
