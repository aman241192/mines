import React, { useRef, useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa6";
import { BsFillSendFill } from "react-icons/bs";

import ExpanWidthIcon from "../../assets/images/ExpanWidthIcon";
import SoundIcon from "../../assets/images/SoundIcon";
import MusicIcon from "../../assets/images/MusicIcon";
import MusicIconMute from "../../assets/images/MusicIconMute";

import HotKey from "../../assets/images/HotKey";
import Seed from "../../assets/images/Seed";
import LiveStatus from "../../assets/images/LiveStatus";
import Help from "../../assets/images/Help";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

import oceanWaves from "../../assets/sounds/oceanWaves.mp3";

const Footer = ({ expand, setExpand }) => {
  const audioRef = useRef(new Audio(oceanWaves));
  const [isPlaying, setIsPlaying] = useState(false);

  console.log("isPlaying", isPlaying);

  const [data, setData] = useState([
    {
      id: "1",
      key: "movieMode",
      icon: ExpanWidthIcon,
      title: "Movie Mode",
      isActive: false,
    },
    {
      id: "2",
      key: "music",
      icon: MusicIconMute,
      title: "Music",
      isActive: false,
    },
    // { id: "2", key: "music", icon: MusicIcon, title: "Music", isActive: false },

    { id: "3", key: "sound", icon: SoundIcon, title: "Sound", isActive: false },
    { id: "4", key: "hotKey", icon: HotKey, title: "Hot Key", isActive: false },
    {
      id: "5",
      key: "liveStatus",
      icon: LiveStatus,
      title: "Live Status",
      isActive: false,
    },
    { id: "6", key: "seed", icon: Seed, title: "Seed", isActive: false },
    { id: "7", key: "help", icon: Help, title: "Help", isActive: false },
  ]);

  const handleIconClick = (item, index) => {
    if (item.id == "1") {
      setExpand(!expand);
    } else if (item.id == "2") {
      const audio = audioRef.current;
      if (!isPlaying) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0; // reset to start
      }
      setIsPlaying(!isPlaying);
    }

    setData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(99); // starting count

  const handleLikeToggle = () => {
    setLiked((prev) => !prev);
    setLikesCount((prev) => prev + (liked ? -1 : 1));
  };

  return (
    <div
      className={`${expand ? "max-w-[100%]" : "max-w-[1200px]"}
        w-full bg-[#292D2E] px-[20px] py-4 flex justify-between`}
    >
      <div className="flex justify-center items-center gap-4">
        <div className="cursor-pointer flex items-center gap-2">
          <FaStar className="fill-[#b3bec1] text-[19px]" />
          <span className="text-[#b3bec1] text-[14px] h-[18px]">2781</span>
        </div>

        <div className="cursor-pointer flex items-center gap-2">
          <FaHeart className="fill-[#b3bec1] text-[19px]" />
          <span className="text-[#b3bec1] text-[14px] h-[18px]">2781</span>
        </div>

        <BsFillSendFill className="fill-[#b3bec1] text-[19px]" />
      </div>

      <div className="flex gap-5">
        {data.map((item, index) => {
          const IconComponent =
            item.key === "music"
              ? !isPlaying
                ? MusicIconMute
                : MusicIcon
              : item.icon;

          const isActive = item.isActive;
          const fillColor = isActive ? "#24EE89" : "#B3BEC1";

          return (
            <div
              key={index}
              onClick={() => handleIconClick(item, index)}
              className="relative group cursor-pointer"
            >
              {/* Tooltip */}
              <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-10">
                {item.title}
              </div>

              {/* Icon */}
              <IconComponent fill={fillColor} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
