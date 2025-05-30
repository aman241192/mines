import React, { useEffect, useState } from "react";
import { Slider } from "antd";
import "./CustomRange.css";
import CutomText from "../CutomText/CutomText";
import { setMinesAction } from "../../Slice/counterSlice";
import { useDispatch, useSelector } from "react-redux";
const CustomRange = ({ title, countMines, disabled }) => {
  const dispatch = useDispatch();

  const { totalMoves, totalScore, start } = useSelector(
    (state) => state?.counter
  );

  const [value, setValue] = useState(1);

  useEffect(() => {
    setValue(countMines);
  }, [countMines]);

  const handleChange = (e) => {
    setValue(e);
    dispatch(setMinesAction(e));
  };

  return (
    <>
      <CutomText title={title} />
      <div
        className={`w-full flex justify-between items-center ${
          !start ? "bg-[#292D2E]" : "bg-[#2e3334]"
        } py-[11px] px-[5px] rounded-md mt-[8px] mb-4`}
      >
        <span className="text-sm text-white w-6 text-center">{value}</span>
        <div className="w-full max-w-[280px]">
          <Slider
            disabled={start}
            className="rangeBox"
            value={value}
            onChange={(e) => handleChange(e)}
            tooltip={{ open: false }} // Hide tooltip
            min={1}
            max={24}
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
              position: "relative",
              zIndex: "999",
            }}
          />
        </div>

        <span className="text-sm text-white w-6 text-center">24</span>
      </div>
    </>
  );
};

export default CustomRange;
