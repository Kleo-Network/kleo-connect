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
    // Assuming you have an API endpoint for adding dat
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
    <div className="container mx-auto mt-5">
      <label className="block mb-2" htmlFor="textArea">
        Add Data for Text Card:
      </label>
      <textarea
        id="textArea"
        className="w-full border border-gray-300 p-2"
        rows={4}
        value={textData}
        onChange={(e) => setTextData(e.target.value)}
      ></textarea>
      {isTextCardCreated ? (
        <div>
          <h2>Text card created for {slug}!</h2>
        </div>
      ) : (
        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleButtonClick}
          disabled={textData.length == 0}
        >
          {textData.length == 0 ? 'Loading...' : 'Add Data'}
        </button>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

export default TextComponent
