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

const TwitterCard: React.FC<TwitterCardProps> = ({ user, pinnedTweet }) => {
  function formatNumberToKM(num: number) {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(1).replace(/\.0$/, '') + 'M'
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1).replace(/\.0$/, '') + 'K'
    }
    return num.toString()
  }

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-800 p-6 rounded-[14px] relative">
      <div className="flex flex-col mb-4">
        <div className="flex flex-row w-full h-[32px]">
          <Twitter className="text-gray-800 w-[32px] h-[32px] border border-white rounded-full stroke-current stroke-opacity-40" />
          <div className="flex items-center ml-2 text-white font-semibold">
            {user.username}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-left mt-4 mb-auto">
        <div className="flex flex-row">
          <Pin className="font-bold w-4 h-4" />
          <div className="ml-2 font-semibold text-sm text-white"> Pinned</div>
        </div>

        {/* <div className="w-full font-bold text-md mb-2">{user.bio}</div> */}
        <p
          className="max-h-[140px] text-sm font-thin text-white font-inter overflow-hidden overflow-ellipsis text-left line-clamp-[7]"
          title={user.pinned_tweet}
        >
          {user.pinned_tweet}
        </p>
      </div>
      <div className="w-full flex flex-row mb-1 justify-start">
        {user.followers_count >= 0 && (
          <div className="text-center mr-2">
            <span className="inline-block bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-white">
              <p className="text-xs">
                {formatNumberToKM(user.followers_count)} Followers
              </p>
            </span>
          </div>
        )}
        {user.following_count >= 0 && (
          <div className="text-center">
            <span className="inline-block bg-gray-600 rounded-full px-2 py-1 text-sm font-semibold text-white ">
              <p className="text-xs">
                {formatNumberToKM(user.following_count)} Following
              </p>
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TwitterCard
