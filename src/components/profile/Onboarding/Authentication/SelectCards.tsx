import React, { useState } from 'react'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'

interface ImageButton {
  icon: string
  alt: string
}

const imageButtons: ImageButton[] = [
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/747/747310.png',
    alt: 'Calendar'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2991/2991108.png',
    alt: 'Text'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/2838/2838912.png',
    alt: 'Location'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174855.png',
    alt: 'Instagram'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/733/733579.png',
    alt: 'Twitter'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/25/25231.png',
    alt: 'GitHub'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/174/174857.png',
    alt: 'LinkedIn'
  }
]

const App: React.FC = () => {
  const [selectedButtons, setSelectedButtons] = useState<number[]>([])

  const handleButtonClick = (index: number) => {
    const isSelected = selectedButtons.includes(index)
    if (isSelected) {
      setSelectedButtons(selectedButtons.filter((i) => i !== index))
    } else if (selectedButtons.length < 5) {
      setSelectedButtons([...selectedButtons, index])
    }
  }

  return (
    <div>
      <div className="flex flex-wrap">
        {imageButtons.map((button, index) => (
          <div key={index} className="relative m-2">
            <button
              className={`p-2 rounded-md ${
                selectedButtons.includes(index) ? 'bg-blue-500' : 'bg-gray-200'
              }`}
              onClick={() => handleButtonClick(index)}
            >
              <img src={button.icon} alt={button.alt} className="w-16 h-16" />
            </button>
            {selectedButtons.includes(index) && (
              <div className="absolute bottom-0 left-auto right-0 top-auto z-10 rounded-full bg-green-600 p-1 border-4 border-white">
                <Tick className="w-3 h-3 fill-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-4">{selectedButtons.length} / 7 selected</p>
    </div>
  )
}

export default App
