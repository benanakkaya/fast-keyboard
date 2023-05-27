import React from 'react'
import { PastWordType } from './PlayScreen'

type PropTypes = {
    pastWords: PastWordType[]
}

const PastWords:React.FC<PropTypes> = ({pastWords}) => {
  return (
    <div className='flex flex-col gap-3 h-screen p-1'>
        <div className='px-2 py-1 rounded-lg border-[1px] border-primary text-xl font-bold text-center'>Past Words</div>
        <ul className='h-full overflow-y-auto'>
            {pastWords.map((word,ind) => (
                <li key={ind} className={`${word.isCorrect === true ? "text-green-500" : "text-red-500"} overflow-hidden flex items-center italic justify-center text-lg `}>{word.value}</li>
            ))}
        </ul>
    </div>
  )
}

export default PastWords