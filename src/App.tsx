import { useEffect, useState } from "react";
import FinishScreen from "./components/FinishScreen";
import Highscores from "./components/Highscores";
import PlayScreen from "./components/PlayScreen";
import StartScreen from "./components/StartScreen";
import axios from "axios"

export type ScoreType = {
  playerName: string;
  score: number;
  correctWords: number;
  wrongWords: number;
};

function App() {
  const [score, setScore] = useState<ScoreType>({
    playerName: "",
    score: 0,
    correctWords: 0,
    wrongWords: 0,
  });

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isStarted,setIsStarted] = useState<boolean>(false);
  const [isFinished,setIsFinished] = useState<boolean>(false);
  const [highscores,setHighscores] = useState<ScoreType[]>([]);


  useEffect(() => {
    const getHighscores = async () => {
      const res = await axios.get("https://fast-keyboard-backend.onrender.com/score/highscores");
      setHighscores(res.data);
    }
    getHighscores();
  },[])

  return (
    <div className="h-screen max-h-screen bg-dark text-primary grid grid-cols-5 gap-4 p-3 overflow-hidden">
      {isFinished === false ? 
      isReady === false ? (
        <StartScreen
          setIsReady={setIsReady}
          score={score}
          setScore={setScore}
        />
      ) : (
        <PlayScreen setIsFinished={setIsFinished} isStarted={isStarted} setIsStarted={setIsStarted} score={score} setScore={setScore} />
      )
      : <FinishScreen setHighscores={setHighscores} setIsFinished={setIsFinished} setIsReady={setIsReady} score={score} setScore={setScore} />}
      <Highscores highscores={highscores} />
    </div>
  );
}

export default App;
