import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useSelector } from "react-redux";
import CutomText from "../CutomText/CutomText";

const AmountInputField = ({
  img,
  amt,
  setAmt,
  onClickOne,
  onClickTwo,
  onClickThree,
  onChange,
  title,
  id,
}) => {
  const { start } = useSelector((state) => state?.counter);

  return (
    <div>
      <CutomText title={title} />
      <div
        className={`${
          !start ? "bg-[#292D2E]" : "bg-[#2e3334] pointer-events-none"
        } w-full flex items-center justify-between p-1 pl-3 my-2 rounded-md`}
      >
        <div className="flex items-center justify-between">
          <div className="w-[20px]">
            {typeof img !== "string" ? img : <img src={img} alt="" />}
          </div>
          <div className="ml-[10px]">
            <input
              disabled={start}
              className="bg-transparent w-full focus:outline-none text-white font-semibold"
              value={amt}
              type="number"
              onChange={onChange}
              onBlur={() => {
                amt === "" && setAmt(0);
              }}
            />
          </div>
        </div>

        <div className="flex justify-center gap-[4px]">
          <button
            className="bg-primary w-[48px] h-[32px] px-2 rounded text-white text-[14px] font-semibold"
            onClick={onClickOne}
          >
            {id === "mannual" ? "1/2" : img}
          </button>
          <button
            className="bg-primary w-[48px] h-[32px] px-2 rounded text-white text-[14px] font-semibold"
            onClick={onClickTwo}
          >
            {id === "mannual" ? "2x" : "10"}
          </button>
          <button
            className="bg-primary w-[48px] h-[32px] px-2 rounded text-white text-[14px] font-semibold"
            onClick={onClickThree}
          >
            {id === "mannual" ? (
              <>
                <IoIosArrowUp className="font-semibold" />
                <IoIosArrowDown className="font-semibold" />
              </>
            ) : (
              "100"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AmountInputField;
