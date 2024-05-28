import React from 'react'
import { ReactComponent as CopyIcon } from '../../assets/images/copy.svg'
import { ReactComponent as TickIcon } from '../../assets/images/check.svg'
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
    <div className="flex flex-col h-full w-full self-stretch items-center justify-start rounded-lg">
      <div className="flex flex-col justify-center items-center px-24 pt-6 pb-1">
        <img
          src={user.pfp}
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <h3 className="text-2xl font-medium text-gray-900">{user.slug}</h3>
      </div>
      <div className="max-w-sm text-center text-gray-400 mt-auto">
        last minted on {formatDate(user.last_attested)}
      </div>
    </div>
  )
}
