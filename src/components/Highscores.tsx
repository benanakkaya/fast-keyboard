import React from "react";
import { ScoreType } from "../App";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

type PropTypes = {
  highscores: ScoreType[];
};

const Highscores: React.FC<PropTypes> = ({ highscores }) => {
  return (
    <div className="flex flex-col gap-3 h-screen p-1">
      <div className="px-2 py-1 rounded-lg border-[1px] border-primary text-xl font-bold text-center">
        Highscores
      </div>
      {highscores.length === 0 ? <div className="flex h-full items-center justify-center"><AiOutlineLoading3Quarters className="text-4xl text-primary animate-spin duration-500" /> </div> :
      <ul className="h-full overflow-y-auto flex flex-col gap-1">
        <li className="grid grid-cols-5 gap-1 py-1 underline text-gray-500  ">
          <span className="col-span-1 flex items-center justify-center" >Rank.</span>
          <div className="col-span-3 flex items-center justify-center" >Player Name</div>
          <span className="col-span-1 flex items-center justify-center">Pt.</span>
        </li>
        {highscores.map((score, ind) => (
          <li
            key={ind}
            className="grid grid-cols-5 gap-1 py-1 "
          >
            <span className="col-span-1 flex items-center justify-center text-white">{ind + 1}.</span>
            <div className="col-span-3 flex items-center justify-center">{score.playerName}</div>
            <span className="col-span-1 flex items-center justify-center text-white">{score.score}</span>
          </li>
        ))}
      </ul>
      }
    </div>
  );
};

export default Highscores;
