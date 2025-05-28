import React, { useState } from "react";
import Manual from "./Manual";
import Auto from "./Auto";
import "./tabs.css";

const Tabs = () => {
  const tabsData = [
    { title: "Manual", component: Manual },
    { title: "Auto", component: Auto },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleChangeTabs = (index) => {
    setActiveTab(index);
  };

  const ActiveTabComponent = tabsData[activeTab].component;
  return (
    <div className="max-w-[360px] w-full  bg-gray2">
      <div className="flex">
        {tabsData?.map((item, index) => (
          <div
            key={index}
            className={`${
              activeTab == index
                ? "tabsBtn text-white"
                : "tabsBtnbor text-lightGray"
            }    w-[180px] text-center font  font-semibold text-[14px] px-[12px] py-[13px]`}
            onClick={() => {
              handleChangeTabs(index);
            }}
          >
            {item.title}
          </div>
        ))}
      </div>

      <div>
        <ActiveTabComponent />
      </div>
    </div>
  );
};

export default Tabs;
