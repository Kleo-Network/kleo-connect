import React, { useState } from 'react'
import useFetch from '../../../common/hooks/useFetch'
interface TextComponentProps {
  about: string
  setAbout: (value: string) => void
}
const TextComponent: React.FC<TextComponentProps> = ({ about, setAbout }) => {
  return (
    <div className="flex">
      <div className="w-1/2 pt-2 pl-1 pr-3">
        <div className="flex flex-col items-start justify-center">
          <div className="flex mb-20 flex-col items-start justify-center">
            <span className="text-gray-900 text-base font-sm">Text Card</span>
            <span className="text-gray-400 text-sm font-regular">
              This lives right next to your profile picture, tell your story,
              maybe where you work, what you are passionate about...
              <u className="text-gray-800 bold">just talk to us!</u>
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-7">
        <textarea
          id="textArea"
          className="w-full border border-gray-300 p-2"
          rows={4}
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        ></textarea>
        {/* <button
            className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={handleButtonClick}
            disabled={textData.length === 0}
          >
            {textData.length === 0 ? 'Loading...' : 'Add Data'}
          </button> */}
      </div>
    </div>
  )
}

export default TextComponent
