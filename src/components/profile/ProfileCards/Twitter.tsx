import React from 'react'
import { ReactComponent as Twitter } from '../../../assets/images/twitter.svg'

interface User {
  username: string
  avatar: string
  bio: string
  followersCount: number
  followingCount: number
}

interface Tweet {
  content: string
  date: string
}

interface TwitterCardProps {
  user: User
  pinnedTweet?: Tweet
}

const TwitterCard: React.FC<TwitterCardProps> = ({ user, pinnedTweet }) => {
  return (
    <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md relative">
      <div className="absolute top-0 right-0 p-4">
        <Twitter className="text-gray-800 w-8 h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <img
          className="w-12 h-12 rounded-full"
          src={user.avatar}
          alt={user.username}
        />
        <div>
          <div className="font-bold text-xl mb-2">{user.username}</div>
          <p className="text-gray-700 text-sm">{user.bio}</p>
        </div>
      </div>
      <div className="py-3">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          Followers: {user.followersCount}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          Following: {user.followingCount}
        </span>
      </div>
      {pinnedTweet && (
        <div className="border-t border-gray-300 p-3">
          <p className="text-gray-700">{pinnedTweet.content}</p>
          <p className="text-gray-500 text-xs mt-2">{pinnedTweet.date}</p>
        </div>
      )}
    </div>
  )
}

export default TwitterCard
