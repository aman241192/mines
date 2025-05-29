import React, { useState } from "react";
import CutomText from "../CutomText/CutomText";
import CustomInput from "../CustomInput/CustomInput";

const OnWin = ({ title }) => {
  const [mode, setMode] = useState("increase");
  const [value, setValue] = useState(20);

  return (
    <div className="mb-4">
      <CutomText title={title} />

      <div className="flex items-center gap-2">
        <div className="flex bg-[#1f1f1f] rounded-md overflow-hidden p-[5px]">
          <button
            onClick={() => setMode("reset")}
            className={`px-3 py-[5px] text-sm font-semibold  rounded-sm ${
              mode === "reset" ? "bg-[#3a4142] text-white" : "text-gray-400"
            }`}
          >
            Reset
          </button>
          <button
            onClick={() => setMode("increase")}
            className={`px-3 py-[5px] rounded-sm text-sm font-semibold ${
              mode === "increase" ? "bg-[#3a4142] text-white" : "text-gray-400"
            }`}
          >
            Increase by
          </button>
        </div>

        <div className="flex justify-between items-center w-[160px] relative bg-[#292D2E] rounded-lg overflow-hidden">
          <input
            type="number"
            className={`w-full px-2 p-[10px]  h-[40px]  bg-transparent border text-white text-[14px] border-none font-semibold focus:outline-none ${
              mode === "increase"
                ? "border-green-400"
                : "border-[#1f1f1f] text-gray-400"
            }`}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />

          <span className="text-white text-sm font-medium absolute right-2">
            %
          </span>
        </div>
      </div>
    </div>
  );
};

export default OnWin;
