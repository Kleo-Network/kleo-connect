import React, { useState } from 'react'
import useFetch from '../../../common/hooks/useFetch'

const TextComponent = () => {
  const [textData, setTextData] = useState('')
  const [isTextCardCreated, setIsTextCardCreated] = useState(false)
  const { error, fetchData: createTextCard } = useFetch() // Assuming you have a custom hook for fetching data

  const CREATE_TEXT_CARD = 'cards/static/{slug}'
  const slug = sessionStorage.getItem('slug') || ''

  function makeTextCardUrl(): string {
    return CREATE_TEXT_CARD.replace('{slug}', slug)
  }

  const handleButtonClick = () => {
    // Assuming you have an API endpoint for adding data
    // Make sure textData is not empty before making the API call
    if (textData.trim() !== '') {
      createTextCard(makeTextCardUrl(), {
        method: 'POST',
        body: JSON.stringify({
          card: {
            type: 'TextCard',
            metadata: {
              text: textData
            }
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        onSuccessfulFetch: () => {
          setIsTextCardCreated(true)
        }
      })
    } else {
      // Handle case where textarea is empty
      alert('Please enter some text')
    }
  }

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
          value={textData}
          onChange={(e) => setTextData(e.target.value)}
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
