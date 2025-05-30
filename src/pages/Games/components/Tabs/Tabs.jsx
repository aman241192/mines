import React, { useEffect, useState } from "react";
import Manual from "./Manual";
import Auto from "./Auto";
import "./tabs.css";
import { useDispatch, useSelector } from "react-redux";
import {
  isSetGameAction,
  startGameAction,
} from "../../../../Slice/counterSlice";

const Tabs = () => {
  const tabsData = [
    { title: "Manual", component: Manual },
    { title: "Auto", component: Auto },
  ];

  const dispatch = useDispatch();
  const { start } = useSelector((state) => state.counter);

  const [activeTab, setActiveTab] = useState(0);
  const [toggle, settoggle] = useState(false);

  const handleChangeTabs = (index) => {
    dispatch(isSetGameAction(index));
    setActiveTab(index);
  };

  const ActiveTabComponent = tabsData[activeTab].component;
  return (
    <div className="bg-gray2">
      <div className="max-w-full m-auto w-full custom992:max-w-[360px] ">
        <div className="flex">
          {tabsData?.map((item, index) => (
            <button
              disabled={start}
              key={index}
              className={`${
                !start && activeTab == index
                  ? "tabsBtn text-white"
                  : "tabsBtnbor text-lightGray"
              }   
            
              ${start ? "pointer-events-none" : "pointer-events-auto"}
             text-center font  font-semibold text-[14px] px-[12px] py-[13px] w-full custom992:w-[180px]`}
              onClick={() => {
                handleChangeTabs(index);
              }}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div>
          <ActiveTabComponent />
        </div>
      </div>
    </div>
  );
};

export default Tabs;
