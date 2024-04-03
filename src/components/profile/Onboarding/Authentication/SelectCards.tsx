import React, { useState, useEffect } from 'react'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'

interface ImageButton {
  icon: string
  alt: string
  name: string
}

const imageButtons: ImageButton[] = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
    alt: 'Calendar',
    name: 'CalendarCard'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991108.png',
    alt: 'Text',
    name: 'TextCard'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2838/2838912.png',
    alt: 'Location',
    name: 'PlaceCard'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
    alt: 'Instagram',
    name: 'InstaCard'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
    alt: 'Twitter',
    name: 'XCard'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    alt: 'GitHub',
    name: 'GitCard'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
    alt: 'LinkedIn',
    name: 'LinkedinCard'
  }
]

interface externalToolArrayProp {
  externalToolArray: string[]
  setExternalToolArray: React.Dispatch<React.SetStateAction<string[]>>
}

const App: React.FC<externalToolArrayProp> = ({
  externalToolArray,
  setExternalToolArray
}) => {
  const handleButtonClick = (name: string) => {
    const isSelected = externalToolArray.includes(name)
    if (isSelected) {
      setExternalToolArray((prevExternalToolArray) =>
        prevExternalToolArray.filter((nm) => nm !== name)
      )
    } else if (externalToolArray.length < 2) {
      setExternalToolArray((prevExternalToolArray) => [
        ...prevExternalToolArray,
        name
      ])
    }
  }

  return (
    <div>
      <div className="flex flex-wrap">
        {imageButtons.map((button, index) => (
          <div key={index} className="relative m-2">
            <button
              className={`p-2 rounded-md ${
                externalToolArray.includes(button.name)
                  ? 'bg-blue-500'
                  : 'bg-gray-200'
              }`}
              onClick={() => handleButtonClick(button.name)}
            >
              <img src={button.icon} alt={button.alt} className="w-16 h-16" />
            </button>
            {externalToolArray.includes(button.name) && (
              <div className="absolute bottom-0 left-auto right-0 top-auto z-10 rounded-full bg-green-600 p-1 border-4 border-white">
                <Tick className="w-3 h-3 fill-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4">{externalToolArray.length} / 2 selected</p>
    </div>
  )
}

export default App
