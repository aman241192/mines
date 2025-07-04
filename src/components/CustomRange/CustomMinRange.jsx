import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import "./CustomRange.css";
const CustomMinRange = ({ countMines, setAmt, amt }) => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    setValue(countMines);
  }, [countMines]);

  return (
    <>
      <div className="w-full flex justify-between items-center  bg-[#292D2E] px-[ 5px] rounded-md mt-[8px] pr-3 mb-4 gap-1">
        <span className="bg-primary w-[48px] px-2 py-[11px] text-white rounded-l-md">
          Min
        </span>

        <div className="w-full max-w-[280px]">
          <Slider
            className="rangeBox"
            value={amt}
            onChange={setAmt}
            tooltip={{ open: false }} // Hide tooltip
            min={0}
            max={1}
            step={0.01} // Allows decimal steps
            trackStyle={{
              background:
                "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))",
              height: 10,
              borderRadius: 999,
            }}
            railStyle={{
              backgroundColor: "#323738",
              height: 12,
              borderRadius: 999,
            }}
            handleStyle={{
              height: 22,
              width: 16,
              borderRadius: "35%",
              backgroundColor: "#ffffff",
              marginTop: -7,
              borderRadius: "30%",
              backgroundColor: "#ffffff",
              position: "relative",
              zIndex: "999",
            }}
          />
        </div>

        <span className="text-sm text-white w-6 text-center">Max</span>
      </div>
    </>
  );
};

export default CustomMinRange;
