import React, { useState, useEffect } from 'react'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'

interface SelectCardsProps {
  selectedButtons: string[]
  setSelectedButtons: React.Dispatch<React.SetStateAction<string[]>>
}

interface ImageButton {
  icon: string
  alt: string
  name: string
}

const imageButtons: ImageButton[] = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1172/1172079.png',
    alt: 'Allow people to book an appointment',
    name: 'Calendly'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1865/1865083.png',
    alt: 'Showcase a specific location on map',
    name: 'Pin Location'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968830.png',
    alt: 'Pinned tweet, bio, following and followers',
    name: 'Twitter Profile'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    alt: 'Your github contributions graph for last 3 months',
    name: 'Github Graph'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/1400/1400829.png',
    alt: 'Instagram image for your kleo profile',
    name: 'Instagram Profile'
  }
]

const App: React.FC<SelectCardsProps> = ({
  selectedButtons,
  setSelectedButtons
}) => {
  const handleButtonClick = (name: string) => {
    const isSelected = selectedButtons.includes(name)
    if (isSelected) {
      setSelectedButtons((prevSelectedButtons: string[]) =>
        prevSelectedButtons.filter((nm: string) => nm !== name)
      )
    } else if (selectedButtons.length < 6) {
      setSelectedButtons((prevSelectedButtons) => [
        ...prevSelectedButtons,
        name
      ])
    }
  }

  useEffect(() => {
    if (selectedButtons.length === 2) {
      setSelectedButtons(selectedButtons)
    }
  }, [selectedButtons])

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {imageButtons.map((button, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-lg shadow-md cursor-pointer ${
              selectedButtons.includes(button.name)
                ? 'bg-violet-100'
                : 'bg-white'
            }`}
            onClick={() => handleButtonClick(button.name)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src={button.icon}
                  alt={button.alt}
                  className="w-8 h-8 mr-4"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900 text-base font-sm">
                    {button.name}
                  </span>
                  <span className="text-gray-400 text-sm font-regular">
                    {button.alt}
                  </span>
                </div>
              </div>
            </div>
            {selectedButtons.includes(button.name) && (
              <div className="absolute bottom-0 left-auto right-0 top-auto z-10 rounded-full bg-green-600 p-1 border-4 border-white">
                <Tick className="w-3 h-3 fill-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4">{selectedButtons.length} / 5 selected</p>
    </div>
  )
}

export default App
