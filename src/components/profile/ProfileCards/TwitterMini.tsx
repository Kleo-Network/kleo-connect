import React from 'react'
import { ReactComponent as Twitter } from '../../../assets/images/X.svg'
import { ReactComponent as Pin } from '../../../assets/images/pushPin.svg'
import { TwitterCard as UserCard } from '../../common/interface'

interface Tweet {
  content: string
  date: string
}

interface TwitterCardProps {
  user: UserCard
  pinnedTweet?: Tweet
}

const MiniTwitterCard: React.FC<TwitterCardProps> = ({ user, pinnedTweet }) => {
  function formatNumberToKM(num: number) {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num.toString()
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-800 p-4 rounded-lg shadow-md relative justify-evenly">
      <div className="flex flex-col mb-1">
        <div className="flex flex-row w-full h-[16px] items-center">
          <Twitter className="flex text-gray-800 w-[16px] h-full border border-white rounded-full" />
          <div className="flex h-full items-center ml-2 text-white text-sm font-semibold">
            {user.username}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-left mt-2 mb-2">
        <div className="flex flex-row items-center mb-1">
          <Pin className="font-bold w-2 h-2" />
          <div className="ml-2 font-semibold text-xs text-white"> Pinned</div>
        </div>
        <p
          className="max-h-[140px] text-sm font-thin text-white font-inter overflow-hidden overflow-ellipsis text-left line-clamp-[2]"
          title={user.pinned_tweet}
        >
          {user.pinned_tweet}
        </p>
      </div>
      <div className="w-full flex flex-row mb-1 justify-evenly">
        <div className="text-center">
          <span className="inline-block bg-gray-600 rounded-full px-2 py-1 text-sm font-semibold text-white">
            <p className="text-xs">
              {formatNumberToKM(user.followers_count)} Followers
            </p>
          </span>
        </div>
        <div className="text-center">
          <span className="inline-block bg-gray-600 rounded-full px-2 py-1 text-sm font-semibold text-white ">
            <p className="text-xs">
              {formatNumberToKM(user.following_count)} Following
            </p>
          </span>
        </div>
      </div>
    </div>
  )
}

export default MiniTwitterCard
