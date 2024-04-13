import React from 'react'
import { ReactComponent as Twitter } from '../../../assets/images/twitter.svg'
import { TwitterCard as UserCard } from '../../common/interface'

interface Tweet {
  content: string
  date: string
}

interface TwitterCardProps {
  user: UserCard
  pinnedTweet?: Tweet
}

const TwitterCard: React.FC<TwitterCardProps> = ({ user, pinnedTweet }) => {
  return (
    <div className="flex-1 h-full bg-gray-100 p-6 rounded-lg shadow-md relative">
      <div className="absolute top-0 right-0 p-4">
        <Twitter className="text-gray-800 w-8 h-8" />
      </div>
      <div className="flex items-center space-x-4">
        <div>
          <div className="font-bold text-md mb-2">{user.bio}</div>
          <p className="text-gray-700 text-sm">
            {user.pinned_tweet.slice(0, 177)} {'...'}
          </p>
        </div>
      </div>
      <div className="py-3">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          <span className="text-xs">{user.followers_count} followers</span>
        </span>
      </div>
      {pinnedTweet && (
        <div className="border-t border-gray-300 p-3">
          <p className="text-gray-500 text-xs mt-2">{pinnedTweet.date}</p>
        </div>
      )}
    </div>
  )
}

export default TwitterCard
