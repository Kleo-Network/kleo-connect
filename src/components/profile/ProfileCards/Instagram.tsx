import React, { useState, useEffect } from 'react'
import { InstagramCard } from '../../common/interface'
import { ReactComponent as InstagramIcon } from '../../../assets/images/instagram.svg'

interface InstagramPostCardProps {
  instaData: InstagramCard
}

const InstagramPostCard: React.FC<InstagramPostCardProps> = ({ instaData }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const username =
    instaData.username.length > 13
      ? instaData.username.slice(0, 13) + '...'
      : instaData.username
  const INSTA_PROFILE_URL = 'https://www.instagram.com/{username}/'

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000) // Change slide every 3 seconds
    return () => clearInterval(interval)
  }, [activeIndex])

  const nextSlide = () => {
    setActiveIndex((prevIndex: number) =>
      prevIndex === instaData.urls.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  const handleInstagramClick = () => {
    const url = INSTA_PROFILE_URL.replace('{username}', instaData.username)
    window.open(url, '_blank')
  }

  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <img
        src={instaData.urls[activeIndex].url}
        alt={`Slide ${activeIndex}`}
        className="w-full h-full block transition-transform duration-300 ease-in-out"
      />
      <button
        className="absolute inline-block rounded-full mt-3 ml-2 pr-2 left-0 top-0 bg-white h-7"
        onClick={handleInstagramClick}
      >
        <div className="flex flex-row">
          <InstagramIcon className="mt-auto ml-1 w-5 h-5" />
          <div className=" mt-auto ml-1 text-sm" title={instaData.username}>
            {username}
          </div>
        </div>
      </button>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex">
        {instaData.urls.map((_, index) => (
          <div
            key={index}
            className={`w-14 h-1 bg-white rounded-full mx-2 cursor-pointer ${
              index === activeIndex ? 'active bg-white' : 'bg-opacity-50'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default InstagramPostCard
