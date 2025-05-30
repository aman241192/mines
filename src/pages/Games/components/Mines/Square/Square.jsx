import React, { useEffect, useState } from "react";
import gems from "../../../../../assets/images/gems.webp";
import mines from "../../../../../assets/images/mines.webp";
import gemSound from "../../../../../assets/sounds/gemSound.mp3";
import bombSound from "../../../../../assets/sounds/bombSound.mp3";
import { useSelector } from "react-redux";

export default function Square({
  index,
  mine,
  revealed,
  gameOver,
  onClick,
  gameStarted,
  isWin,
}) {
  const [image, setImage] = useState(null);
  const [clicked, setClicked] = useState(false);

  const { isSound } = useSelector((state) => state.counter);

  useEffect(() => {
    if (gameOver || revealed) setImage(mine ? mines : gems);
    else setImage(null);
  }, [revealed, gameOver, mine]);

  useEffect(() => {
    if (clicked) {
      const timeout = setTimeout(() => setClicked(false), 200);
      return () => clearTimeout(timeout);
    }
  }, [clicked]);

  const handleClick = () => {
    if (revealed || gameOver) return;

    setClicked(true);

    if (isSound) {
      const sound = new Audio(mine ? bombSound : gemSound);
      sound.play();
    }

    onClick();
  };

  const shouldShowImage = revealed || gameOver;
  const shouldDim = gameOver && !revealed;

  const base =
    "w-[83px] h-[83px] rounded-md grid place-items-center cursor-pointer  opacity-1 custom992:w-[83px] custom992:h-[83px]  custom460:w-[70px] custom460:h-[70px] custom530:w-[83px] custom530:h-[83px]" +
    "transition-transform duration-200 ease-out transform ";

  const state = revealed
    ? mine
      ? "bg-[#1E2121]"
      : "bg-purple-600"
    : gameOver
    ? "bg-[#1E2121] opacity-60"
    : "bg-[#545F60]";

  const clickEffect = clicked && "scale-90 shadow-lg shadow-purple-500/30";

  return (
    <div className={`${base} ${state} ${clickEffect}`} onClick={handleClick}>
      {shouldShowImage && image && (
        <div className="w-[75px] h-[75px] grid items-center">
          <img
            src={image}
            alt=""
            className={`${shouldDim ? "opacity-60" : ""} 
                ${revealed ? (mine ? "scale-125" : "scale-100") : ""}
            `}
          />
        </div>
      )}
    </div>
  );
}
