import React from 'react'
import { ReactComponent as Like } from '../../../assets/images/heart.svg'
import { ReactComponent as Comment } from '../../../assets/images/commentOutline.svg'

interface InstagramPostCardProps {
  username: string
  userImage: string
  postImage: string
  caption: string
  likes: number
  comments: number
  postDate: string // Assuming ISO format for simplicity
}

const InstagramPostCard: React.FC<InstagramPostCardProps> = ({
  username,
  userImage,
  postImage,
  caption,
  likes,
  comments,
  postDate
}) => {
  // Format the date
  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="flex-1 flex  border rounded-lg overflow-hidden shadow-lg max-w-2xl mx-auto my-5">
      <div className="flex-none w-1/2">
        <img
          src={postImage}
          alt="Post"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex-grow p-4 space-y-2">
        <div className="flex items-center space-x-2">
          <img
            src={userImage}
            alt={username}
            className="w-8 h-8 rounded-full"
          />
          <span className="font-bold text-sm">{username}</span>
        </div>
        <p className="text-sm">{caption}</p>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Like className="w-5 h-5 fill-red-500" />
          <span>{likes} likes</span>
          <Comment className="w-5 h-5" />
          <span>{comments} comments</span>
        </div>
        <p className="text-xs text-gray-500">{formatDate(postDate)}</p>
      </div>
    </div>
  )
}

export default InstagramPostCard
