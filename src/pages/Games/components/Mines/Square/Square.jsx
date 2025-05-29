// // import React, { useEffect, useState } from "react";
// // import gems from "../../../../../assets/images/gems.webp";
// // import mines from "../../../../../assets/images/mines.webp";

// // export default function Square({
// //   index,
// //   mine,
// //   revealed,
// //   gameOver,
// //   onClick,
// //   gameStarted,
// // }) {
// //   const [image, setImage] = useState(null);

// //   useEffect(() => {
// //     // Load image only if revealed or game over
// //     if (gameOver || revealed) {
// //       setImage(mine ? mines : gems);
// //     } else {
// //       setImage(null);
// //     }
// //   }, [revealed, gameOver, mine]);

// //   const shouldShowImage = revealed || gameOver;
// //   const shouldBlur = gameOver && !revealed;

// //   return (
// //     <div
// //       //   className={`w-[75px] h-[75px] rounded-md grid place-items-center cursor-pointer
// //       //         ${
// //       //           revealed
// //       //             ? mine
// //       //               ? "bg-black"
// //       //               : "bg-purple-600"
// //       //             : "bg-squareGray hover:bg-[#545f60]"
// //       //         }`}

// //   className={`w-[75px] h-[75px] rounded-md grid place-items-center cursor-pointer
// //         ${
// //           gameOver && gameStarted
// //             ? `bg-[#1E2121] opacity-[0.6]`
// //             : revealed
// //             ? mine
// //               ? "bg-black opacity-[0] border border-red-500"
// //               : "bg-purple-600"
// //             : "bg-squareGray hover:bg-[#545f60]"
// //         }`}
// //       onClick={onClick}
// //     >
// //       {shouldShowImage && image && (
// //         <img
// //           src={image}
// //           alt=""
// //           width={75}
// //           height={75}
// //           //   className={shouldBlur ? "blur-sm opacity-60" : ""}
// //           className={shouldBlur ? "opacity-60" : ""}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// import React, { useEffect, useState } from "react";
// import gems from "../../../../../assets/images/gems.webp";
// import mines from "../../../../../assets/images/mines.webp";

// export default function Square({
//   index,
//   mine,
//   revealed,
//   gameOver,
//   onClick,
//   gameStarted,
// }) {
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (gameOver || revealed) {
//       setImage(mine ? mines : gems);
//     } else {
//       setImage(null);
//     }
//   }, [revealed, gameOver, mine]);

//   const shouldShowImage = revealed || gameOver;
//   const shouldBlur = gameOver && !revealed;

//   return (
//     <div
//       className={`w-[83px] h-[83px] p-[4px] rounded-md grid place-items-center cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-95
//           ${
//             revealed
//               ? mine
//                 ? "bg-black"
//                 : "bg-purple-600"
//               : "bg-squareGray hover:bg-[#545f60]"
//           }`}
//       onClick={onClick}
//     >
//       {shouldShowImage && image && (
//         <img
//           src={image}
//           alt=""
//           width={75}
//           height={75}
//           className={shouldBlur ? "opacity-60" : ""}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import gems from "../../../../../assets/images/gems.webp";
import mines from "../../../../../assets/images/mines.webp";

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

  useEffect(() => {
    if (gameOver || revealed) setImage(mine ? mines : gems);
    else setImage(null);
  }, [revealed, gameOver, mine]);

  // 🔸 Reset "clicked" after animation duration
  useEffect(() => {
    if (clicked) {
      const timeout = setTimeout(() => setClicked(false), 200); // 200ms click effect
      return () => clearTimeout(timeout);
    }
  }, [clicked]);

  const handleClick = () => {
    setClicked(true); // Trigger animation
    onClick(); // Proceed with game logic
  };

  const shouldShowImage = revealed || gameOver;
  const shouldDim = gameOver && !revealed;

  console.log("gameOver", gameOver);

  // const base =
  //   "w-[83px] h-[83px] rounded-md grid place-items-center cursor-pointer  opacity-1 " +
  //   "transition-transform duration-200 ease-out transform ";

  const base =
    "w-[83px] h-[83px] rounded-md grid place-items-center cursor-pointer  opacity-1 custom992:w-[83px] custom992:h-[83px]  custom460:w-[70px] custom460:h-[70px] custom530:w-[83px] custom530:h-[83px]" +
    "transition-transform duration-200 ease-out transform ";

  const state = revealed
    ? mine
      ? "bg-[#1E2121]" // this is for mine who is triggered
      : "bg-purple-600" // for active gems
    : gameOver
    ? "bg-[#1E2121] opacity-60"
    : "bg-[#545F60]"; // for all unselect data

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
