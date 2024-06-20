import React from 'react'

type ProgressBarProps = {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="flex w-full rounded-full mb-[8px]">
      <div className="flex flex-row w-[658px] h-[19px] items-center">
        <div className="flex w-[90%] bg-gray-200">
          <div
            className="bg-gray-600 h-[8px] rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="bg-white py-[2px] px-[6px] font-normal text-gray-600 text-center text-[10px] ml-[12px] rounded-full">
          {progress}%
        </div>
      </div>
    </div>
  )
}

export default ProgressBar
