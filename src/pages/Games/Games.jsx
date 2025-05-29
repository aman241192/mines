import React, { useState } from "react";
import Tabs from "./components/Tabs/Tabs";
import MinesGame from "./components/Mines/MinesGame";
import "./games.css";
import Footer from "../../components/Footer/Footer";

const Games = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [restartTrigger, setRestartTrigger] = useState(0); // forces MinesGame re-render

  const [expand, setExpand] = useState(false);

  const handleBetClick = () => {
    setGameStarted(true);
    setRestartTrigger(Date.now());
  };

  const handleGameOver = () => {
    setGameStarted(false);
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomNumbers = [];

  while (randomNumbers.length < 3) {
    let randomNumber = getRandomInt(1, 25);
    if (!randomNumbers.includes(randomNumber)) {
      randomNumbers.push(randomNumber);
    }
  }

  let [gameOver, setGameOver] = useState(false);
  let [score, setScore] = useState(100);
  let items = [];

  for (let index = 1; index < 26; index++) {
    if (randomNumbers.includes(index)) {
      items.push(
        <MinesGame
          setScore={setScore}
          gameOver={gameOver}
          setGameOver={setGameOver}
          mine={true}
          key={index}
        />
      );
    } else {
      items.push(
        <MinesGame
          setScore={setScore}
          gameOver={gameOver}
          setGameOver={setGameOver}
          key={index}
        />
      );
    }
  }

  return (
    <div className="p-[20px] m-auto">
      <div
        className={`${
          expand ? "max-w-[100%]" : "max-w-[1200px]"
        }  w-full m-auto mt-3 rounded-lg overflow-hidden`}
      >
        {/* <div className="flex justify-baseline   "> */}
        <div className="flex flex-col-reverse custom992:flex-row justify-baseline">
          <Tabs />
          <MinesGame key={restartTrigger} onGameOver={handleGameOver} />
        </div>
        <Footer expand={expand} setExpand={setExpand} />
      </div>
    </div>
  );
};

export default Games;
