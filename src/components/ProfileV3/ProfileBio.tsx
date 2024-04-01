import React from 'react'
import { ReactComponent as CopyIcon } from '../../assets/images/copy.svg'
import { ReactComponent as TickIcon } from '../../assets/images/check.svg'

interface User {
  user: UserProps
}

interface UserProps {
  name: string
  avatar: string
  userId: string
  kleo: number
}

export default function ProfileBio({ user }: User) {
  return (
    <div className="flex flex-col self-stretch items-center justify-start">
      <div className="flex flex-col justify-center items-center px-24 pt-6 pb-1">
        <img
          src={user.avatar}
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <h3 className="text-2xl font-medium text-gray-900">{user.name}</h3>
      </div>
      <div className="max-w-sm text-center text-gray-400">
        last minted 3 days ago
      </div>
    </div>
  )
}
