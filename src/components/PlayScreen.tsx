import { isAllOf } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScoreType } from "../App";
import PastWords from "./PastWords";

type PropTypes = {
  score: ScoreType;
  setScore: React.Dispatch<React.SetStateAction<ScoreType>>;
  isStarted: boolean;
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsFinished: React.Dispatch<React.SetStateAction<boolean>>;
};

export type PastWordType = {
  value: string;
  isCorrect: boolean;
};

const PlayScreen: React.FC<PropTypes> = ({
  score,
  setScore,
  isStarted,
  setIsStarted,
  setIsFinished,
}) => {
  const [wordList, setWordList] = useState<string[]>([]);
  const [randomWord, setRandomWord] = useState<number>(0);
  const [pastWords, setPastWords] = useState<PastWordType[]>([]);
  const [remainingTime, setRemainingTime] = useState<number>(60);
  const [inputValue, setInputValue] = useState<string>("");
  const [timer, setTimer] = useState<any>(null);

  const getRandomWord = () => {
    const randomNumber = Math.floor(Math.random() * 1000);
    setRandomWord(randomNumber);
  };

  useEffect(() => {
    const getWords = async () => {
      const res = await axios.get("../../public/words.txt");
      const wordString: string = res.data;
      const wordArray: string[] = wordString.split(/\r?\n/);
      setWordList(wordArray);
      //Kelimeleri aldıktan sonra rastgele bir index belirliyoruz
      getRandomWord();
    };

    getWords();
  }, []);

  useEffect(() => {
    if (isStarted === true) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === 0) {
            setIsStarted(false);
            clearInterval(timer);
            setIsFinished(true);
            return 60;
          } else {
            return prev - 1;
          }
        });
      }, 1000);
      setTimer(timer);
    }
  }, [isStarted]);

  const handleChange = (value: string) => {
    if (isStarted === false) {
      setIsStarted(true);
      setRemainingTime(60);
    }
    if (value[0] === " ") {
      setInputValue("");
    } else {
      if (value.includes(" ")) {
        const word = value.split(" ");
        if (word[0] === wordList[randomWord]) {
          setPastWords((prev) => [
            { value: word[0], isCorrect: true },
            ...prev,
          ]);
          setScore((prev) => ({
            ...prev,
            score: prev.score + 10,
            correctWords: prev.correctWords + 1,
          }));
        } else {
          setPastWords((prev) => [
            { value: word[0], isCorrect: false },
            ...prev,
          ]);
          setScore((prev) => ({
            ...prev,
            score: prev.score - 10,
            wrongWords: prev.wrongWords + 1,
          }));
        }
        setInputValue("");
        getRandomWord();
      } else {
        setInputValue(value);
      }
    }
  };

  const handleReset = () => {
    setRemainingTime(60);
    setScore((prev) => ({ ...prev, score: 0, correctWords: 0, wrongWords: 0 }));
    setIsStarted(false);
    clearInterval(timer);
    setPastWords([]);
    setInputValue("");
  };

  return (
    <div className="col-span-4 grid grid-cols-4 gap-4 h-screen max-h-screen">
      <div className="col-span-3 flex items-center justify-center h-screen max-h-screen">
        <div className="flex items-center justify-center gap-8 flex-col">
          <div className="flex items-center gap-4 h-20">
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
                  Correct:{" "}
                  <span className="text-white">{score.correctWords}</span>
                </div>
                <div className="text-red-500">
                  Wrong: <span className="text-white">{score.wrongWords}</span>
                </div>
              </div>
            </div>
            <div className="w-32 h-full flex items-center justify-center border-[2px] border-primary text-white text-5xl rounded-lg">
              {remainingTime} s.
            </div>
          </div>
          {isStarted === false ? (
            <strong className="text-xl text-white italic">
              Once you start writing, your time will begin.
            </strong>
          ) : (
            <button
              onClick={handleReset}
              className="text-red-500 border-red-500 w-full border-[2px] px-2 py-1 rounded-lg"
            >
              RESET
            </button>
          )}
          <div className="bg-dark rounded-lg border-primary border-[2px] text-primary w-full h-16 text-4xl flex items-center justify-center font-bold">
            {wordList[randomWord]}
          </div>
          <input
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            tabIndex={1}
            className="px-2 py-1 w-full text-2xl rounded-lg text-dark outline-none font-bold"
            type="text"
          />
        </div>
      </div>
      <PastWords pastWords={pastWords} />
    </div>
  );
};

export default PlayScreen;
