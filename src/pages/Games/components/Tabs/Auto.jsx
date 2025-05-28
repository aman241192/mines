import React, { useState } from "react";
import Info from "../../../../assets/images/Info";
import INR from "../../../../assets/images/INR.webp";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import CustomRange from "../../../../components/CustomRange/CustomRange";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CutomText from "../../../../components/CutomText/CutomText";

const amtArr = ["10", "100", "1.0k", "10.0k"];

const Auto = () => {
  const [toggle, setToggle] = useState(false);

  return (
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
              value={0}
            />
          </div>
        </div>

        <div className="flex justify-center gap-[4px]">
          <button className="bg-primary w-[48px] px-2 rounded text-white">
            1/2
          </button>
          <div className="flex-1 flex justify-center">
            <button className="bg-primary w-[48px] px-2 rounded text-white">
              2x
            </button>
          </div>
          <div
            className="bg-primary w-[48px] px-2  rounded flex items-center flex-col text-white cursor-pointer"
            onClick={() => setToggle((prev) => !prev)}
          >
            <IoIosArrowUp />
            <IoIosArrowDown />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-[10px]">
        {amtArr?.map((item) => (
          <span className="w-[77px] rounded-md text-lightGray text-[14px] text-center mt-1 p-[5px] block bg-[#3a4142] font-semibold cursor-not-allowed">
            {item}
          </span>
        ))}
      </div>

      <CustomRange title={"Mines"} />

      <button className="w-full gradient-button">Bet</button>

      <div className="bg-[#3a4142] text-gray-300 text-sm px-3 py-2 rounded-md flex items-center gap-2 bg-[#24ee891a] mt-[5px]  justify-center">
        <AiOutlineInfoCircle className="w-5 h-5 text-gray-300" />
        <span>Betting with $0 will enter demo mode.</span>
      </div>
    </div>
  );
};

export default Auto;
