// import React, { useEffect, useState } from "react";
// import gems from "../../../../../assets/images/gems.webp";
// import mines from "../../../../../assets/images/mines.webp";

// export default function Square({ index, mine, revealed, gameOver, onClick }) {
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (!gameOver && !revealed) {
//       setImage(null);
//     } else if (revealed) {
//       setImage(mine ? mines : gems);
//     }
//   }, [revealed, gameOver, mine]);

//   return (
//     <div
//       className={`w-[75px] h-[75px] rounded-md grid place-items-center cursor-pointer
//         ${
//           revealed
//             ? mine
//               ? "bg-black"
//               : "bg-purple-600"
//             : "bg-squareGray hover:bg-[#545f60]"
//         }`}
//       onClick={onClick}
//     >
//       {revealed && image && <img src={image} alt="" width={75} height={75} />}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import gems from "../../../../../assets/images/gems.webp";
// import mines from "../../../../../assets/images/mines.webp";

// export default function Square({ index, mine, revealed, gameOver, onClick }) {
//   const [image, setImage] = useState(null);

//   useEffect(() => {
//     if (!gameOver && !revealed) {
//       setImage(null);
//     } else if (revealed) {
//       setImage(mine ? mines : gems);
//     }
//   }, [revealed, gameOver, mine]);

//   return (
//     <div
//       className={`w-[75px] h-[75px] rounded-md grid place-items-center cursor-pointer
//         ${
//           revealed
//             ? mine
//               ? "bg-black"
//               : "bg-purple-600"
//             : "bg-squareGray hover:bg-[#545f60]"
//         }`}
//       onClick={onClick}
//     >
//       {revealed && image && <img src={image} alt="" width={75} height={75} />}
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import gems from "../../../../../assets/images/gems.webp";
import mines from "../../../../../assets/images/mines.webp";

export default function Square({ index, mine, revealed, gameOver, onClick }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Load image only if revealed or game over
    if (gameOver || revealed) {
      setImage(mine ? mines : gems);
    } else {
      setImage(null);
    }
  }, [revealed, gameOver, mine]);

  const shouldShowImage = revealed || gameOver;
  const shouldBlur = gameOver && !revealed;

  return (
    <div
      className={`w-[75px] h-[75px] rounded-md grid place-items-center cursor-pointer
        ${
          revealed
            ? mine
              ? "bg-black"
              : "bg-purple-600"
            : "bg-squareGray hover:bg-[#545f60]"
        }`}
      onClick={onClick}
    >
      {shouldShowImage && image && (
        <img
          src={image}
          alt=""
          width={75}
          height={75}
          className={shouldBlur ? "blur-sm opacity-60" : ""}
        />
      )}
    </div>
  );
}
