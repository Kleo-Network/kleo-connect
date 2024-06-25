import React from 'react'
import { ReactComponent as Mint } from '../../assets/images/Mint.svg'
import { UserData } from '../constants/SignupData'

interface User {
  user: UserData
}

function formatDate(epochTimestamp: number) {
  const date = new Date(epochTimestamp * 1000) // Convert seconds to milliseconds

  // Get individual date components
  const hours = date.getHours() % 12 || 12 // Convert 24-hour format to 12-hour format
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const seconds = date.getSeconds().toString().padStart(2, '0')
  const month = date.toLocaleString('en-US', { month: 'long' }) // Get full month name
  const day = date.getDate()
  const year = date.getFullYear()
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM'

  // Construct the formatted string
  const formattedDate = `${month} ${day}, ${year}`

  return formattedDate
}

export default function ProfileBio({ user }: User) {
  return (
    <div className="flex flex-col h-full w-full self-stretch items-start justify-start rounded-[14px] p-[20px] bg-white">
      <div className="flex flex-row h-full w-full items-start justify-start">
        <img
          src={user.pfp}
          className="w-16 h-16 rounded-full border-4 border-white"
        />
        <div className="flex flex-col ml-4">
          <h3 className="text-sm md:text-[18px] font-medium text-gray-900 mt-2">
            {user.slug}
          </h3>
          {user.profile_metadata.kleo_token && (
            <div className="flex flex-row bg-gray-100 py-[3px] pl-[3px] pr-[10px] rounded-2xl mt-2">
              <Mint className="h-4 w-4 rounded-full" />
              <div className="font-inter text-[10px] font-medium text-violet-700 text-center justify-center ml-[6px] h-full ">
                Minted {user.profile_metadata.kleo_token} times
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="max-w-sm text-center text-gray-400 mt-auto">
        last minted on {formatDate(user.last_attested)}
      </div>
    </div>
  )
}
