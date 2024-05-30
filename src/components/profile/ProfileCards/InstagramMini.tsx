import React, { useState, useEffect } from 'react'
import { InstagramCard } from '../../common/interface'
import { ReactComponent as InstagramIcon } from '../../../assets/images/instagram.svg'

interface InstagramPostCardProps {
  instaData: InstagramCard
}

const MiniInstagramPostCard: React.FC<InstagramPostCardProps> = ({
  instaData
}) => {
  const username =
    instaData.username.length > 13
      ? instaData.username.slice(0, 13) + '...'
      : instaData.username
  const INSTA_PROFILE_URL = 'https://www.instagram.com/{username}/'

  const handleInstagramClick = () => {
    const url = INSTA_PROFILE_URL.replace('{username}', instaData.username)
    window.open(url, '_blank')
  }

  return (
    <div className="flex flex-col w-full h-full overflow-hidden rounded-lg bg-white">
      <div className="flex items-centerh-9 w-full">
        <button
          className="rounded-full mt-2 ml-2 pr-2 mb-1 bg-white h-7"
          onClick={handleInstagramClick}
        >
          <div className="flex flex-row">
            <InstagramIcon className="mt-auto ml-1 w-5 h-5" />
            <div className=" mt-auto ml-1 text-sm" title={instaData.username}>
              {username}
            </div>
          </div>
        </button>
      </div>
      <div className="flex flex-row w-full h-[70%]">
        <div className="flex h-full w-1/2 p-1 ml-1 h-">
          <img
            src={instaData.urls[0].url}
            alt={`Slide 1`}
            className="w-full h-full object-fill rounded-[5px]"
          />
        </div>
        <div className="flex h-full w-1/2 p-1 mr-1">
          <img
            src={instaData.urls[1].url}
            alt={`Slide 2`}
            className="w-full h-full object-fill rounded-[5px]"
          />
        </div>
      </div>
    </div>
  )
}

export default MiniInstagramPostCard
