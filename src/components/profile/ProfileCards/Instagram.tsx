import React, { useState } from 'react'
import { InstagramCard } from '../../common/interface'
import { ReactComponent as Arrow } from '../../../assets/images/arrow.svg'

interface InstagramPostCardProps {
  instaData: InstagramCard
}

const InstagramPostCard: React.FC<InstagramPostCardProps> = ({ instaData }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const nextSlide = () => {
    setActiveIndex((prevIndex: number) =>
      prevIndex === instaData.urls.length - 1 ? 0 : prevIndex + 1
    )
  }
  const prevSlide = () => {
    setActiveIndex((prevIndex: number) =>
      prevIndex === 0 ? instaData.urls.length - 1 : prevIndex - 1
    )
  }
  return (
    <div className="relative max-w-full h-[250px] overflow-hidden rounded-lg">
      <img
        src={instaData.urls[activeIndex]}
        alt={`Slide ${activeIndex}`}
        className="w-full h-full block transition-transform duration-300 ease-in-out"
      />
      <button
        onClick={prevSlide}
        className="absolute rounded-full ml-1 left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-lg border-none px-2 py-2 cursor-pointer z-10 transition duration-300 hover:bg-opacity-75 "
      >
        <Arrow className="w-5 h-5 -rotate-90" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute rounded-full mr-1 right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white text-lg border-none px-2 py-2 cursor-pointer z-10 transition duration-300 hover:bg-opacity-75 "
      >
        <Arrow className="w-5 h-5 rotate-90" />
      </button>
    </div>
  )
}

export default InstagramPostCard
