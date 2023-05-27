import React, { useState } from 'react';
import { boolean } from 'yup';
import { ScoreType } from '../App';

type PropTypes = {
    score: ScoreType,
    setScore: React.Dispatch<React.SetStateAction<ScoreType>>,
    setIsReady: React.Dispatch<React.SetStateAction<boolean>>
}

const StartScreen:React.FC<PropTypes> = ({score,setScore,setIsReady}) => {

    const [error,setError] = useState<boolean>(false);

    const handleStart = () => {
        if(score.playerName === ""){
            setError(true);
        }else{
            setIsReady(true);
        }
    }


  return (
    <div className='min-h-screen col-span-4 flex items-center justify-center flex-col gap-8'>
            <h1 className='text-3xl font-bold'>Welcome to Fast Keyboard App</h1>
            <strong className='text-white italic'>Enter a name first to get started...</strong>
            <input onChange={(e) => {setScore(prev => ({...prev,playerName:e.target.value})); if(error) setError(false)}} value={score.playerName} type="text" placeholder={`${error === true ? "Please enter a name" : "Player..."}`} className={`text-somon text-2xl font-bold px-2 py-1 rounded-lg bg-dark border-[2px]  placeholder:italic placeholder:font-normal outline-none w-72 ${error === true ? "border-red-600" : "border-gray-700"} `}/>
            <button onClick={handleStart} className='text-xl px-2 py-1 rounded-lg border-[2px] border-primary text-primary w-72'>START</button>
    </div>
  )
}

export default StartScreen