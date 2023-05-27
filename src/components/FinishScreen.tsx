import React, { useEffect } from "react";
import { ScoreType } from "../App";
import axios from "axios";

type PropTypes = {
  score: ScoreType;
  setScore: React.Dispatch<React.SetStateAction<ScoreType>>;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setHighscores: React.Dispatch<React.SetStateAction<ScoreType[]>>;
};

const FinishScreen:React.FC<PropTypes> = ({score,setScore,setIsFinished,setIsReady,setHighscores}) => {

    const handleTryAgain = () => {
        setIsFinished(false);
        setIsReady(false);
        setScore({
            playerName: "",
            score: 0,
            correctWords: 0,
            wrongWords: 0,
          })
    }


    useEffect(() => {
        const updateHighscores = async () => {
            const res = await axios.get("https://fast-keyboard-backend.onrender.com/score/highscores");
            setHighscores(res.data);
        }

        const postNewScore = async () => {
            await axios.post("https://fast-keyboard-backend.onrender.com/score/new-score", score);
            updateHighscores();
        };
        postNewScore();
    },[]);

  return (
    <div className="col-span-4 flex  items-center justify-center">
        <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 text-3xl items-center ">
        <div className="flex gap-3">
          <div>
            Name: <span className="text-white">{score.playerName}</span>
          </div>
          <div>
            Score: <span className="text-white">{score.score}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="text-green-500">
            Correct: <span className="text-white">{score.correctWords}</span>
          </div>
          <div className="text-red-500">
            Wrong: <span className="text-white">{score.wrongWords}</span>
          </div>
        </div>
      </div>
      <button className="w-full px-2 py-1 text-lg border-[2px] border-primary rounded-lg" onClick={handleTryAgain}>Try Again</button>
      </div>
    </div>
  );
};

export default FinishScreen;
