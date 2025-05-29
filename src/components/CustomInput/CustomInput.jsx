import React from "react";
import CutomText from "../CutomText/CutomText";

const CustomInput = ({ img, title, value, name }) => {
  return (
    <div>
      <CutomText title={title} />
      <input
        name={name}
        className="rounded-md p-1 w-full mt-[5px] bg-[#2D3132] text-lightGray"
        type="text"
        value={value}
      />
    </div>
  );
};

export default CustomInput;
