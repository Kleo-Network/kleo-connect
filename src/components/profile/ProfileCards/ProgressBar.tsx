import React from 'react'

type ProgressBarProps = {
  progress: number
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full px-2">
      <div className="flex justify-between mb-1 items-center gap-2">
        <div className="flex-grow bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-gray-600 h-2.5 rounded-full"
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
