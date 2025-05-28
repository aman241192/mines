import React, { useState } from "react";
import Info from "../../../../assets/images/Info";
import INR from "../../../../assets/images/INR.webp";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CustomRange from "../../../../components/CustomRange/CustomRange";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CustomMinRange from "../../../../components/CustomRange/CustomMinRange";
import { ImMagicWand } from "react-icons/im";
import CutomText from "../../../../components/CutomText/CutomText";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import { useSelector } from "react-redux";

const Manual = () => {
  const amtArr = ["10", "100", "1.0k", "10.0k"];

  const { totalMoves, totalProfit } = useSelector((state) => state?.counter);

  const [amt, setAmt] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  const handleInputChnage = (e) => {
    const { value } = e.target;
    let checkNumber = isNaN(value);
    let num = Number(value);

    if (!checkNumber) {
      if (value == "") {
        setAmt("");
      } else if (num < 1) {
        setAmt(num);
      }
    } else {
      setAmt(1);
    }
  };

  const handleDivideAmt = () => {
    let newAmt = (amt / 2).toFixed(2);
    debugger;
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

  return (
    <div>
      <div className="px-[12px] pt-[20px] pb-[12px]">
        <div className="flex items-center gap-2 mb-[4px]">
          <CutomText title={"Amount"} />
          <Info className="text-[#24ee89]" />
        </div>

        {/* Input Fields */}
        <div className="bg-darkGray w-full flex items-center justify-between p-1 pl-3 rounded-md">
          <div className="flex items-center justify-between">
            <div className="w-[20px]">
              <img src={INR} alt="" />
            </div>
            <div className="ml-[10px]">
              <input
                className="bg-transparent w-full focus:outline-none text-white font-semibold"
                value={amt}
                type="number"
                onChange={(e) => handleInputChnage(e)}
                onBlur={() => {
                  amt == "" && setAmt(0);
                }}
              />
            </div>
          </div>

          <div className="flex justify-center gap-[4px]">
            <button
              className="bg-primary w-[48px] px-2 rounded text-white text-[14px] font-semibold"
              onClick={handleDivideAmt}
            >
              1/2
            </button>
            <div className="flex-1 flex justify-center">
              <button
                className="bg-primary w-[48px] px-2 rounded text-white text-[14px] font-semibold"
                onClick={handleDoubleAmt}
              >
                2x
              </button>
            </div>
            <div
              className="bg-primary w-[48px] px-2  rounded flex items-center flex-col text-white cursor-pointer"
              onClick={() => setToggle((prev) => !prev)}
            >
              <IoIosArrowUp className="font-semibold" />
              <IoIosArrowDown className="font-semibold" />
            </div>
          </div>
        </div>

        {toggle ? (
          <div className="mt-[3px]">
            <CustomMinRange />
          </div>
        ) : (
          <div className="flex justify-between items-center mb-[10px]">
            {amtArr?.map((item, index) => (
              <span
                key={index}
                className="w-[77px] rounded-md text-lightGray text-[14px] text-center mt-1 p-[5px] block bg-[#3a4142] font-semibold cursor-not-allowed"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <CustomRange title={"Mines"} />

        {!gameStart ? (
          <button
            className="w-full gradient-button"
            onClick={() => setGameStart(true)}
          >
            Bet
          </button>
        ) : (
          <div>
            <button className="w-full pickaTitle bg-gray3 text-white flex justify-center items-center gap-2">
              <ImMagicWand />
              Pick a Title Randomly
            </button>
            <button className="w-full pickaTitle cashOutBtn bg-gray3 text-white flex justify-center items-center gap-2 mt-3">
              Cash out
              <div className="w-[20px]">
                <img src={INR} alt="" />
              </div>
              Rs 0.00
            </button>
          </div>
        )}

        <div className="bg-[#3a4142] text-gray-300 text-sm px-3 py-2 rounded-md flex items-center gap-2 bg-[#24ee891a] mt-[5px]  justify-center">
          <AiOutlineInfoCircle className="w-5 h-5 text-gray-300" />
          <span>Betting with $0 will enter demo mode.</span>
        </div>

        <CustomInput name={"gems"} title={"Gems"} value={totalMoves} />
        <CustomInput
          name={"totalProfit"}
          title={"Total profit (1.09x)"}
          value={totalProfit}
        />
      </div>
    </div>
  );
};

export default Manual;
