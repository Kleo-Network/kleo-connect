import { useState } from 'react'
import FeedCard from './FeedCard'

interface Feed {
  data: CardProps[]
  user: UserProps
}

export interface CardProps {
  id: number
  category: string
  content: string
  contentImageUrl?: string
  contentData?: string
  date: string
  likeCount: number
  commentCount: number
  digCount: number
  userImageUrl: string
}

export interface UserProps {
  name: string
  avatar: string
  kleo: number
  userId: string
}

const Feeds: React.FC<Feed> = ({ data, user }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const uniqueCategories = Array.from(
    new Set(data.map((card) => card.category))
  )

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
  }

  return (
    <div className="px-2 mb-4 flex flex-col items-center self-stretch ">
      {/* Filter options */}
      <div className="flex flex-row flex-wrap gap-2 self-stretch items-center justify-start rounded-lg border border-gray-200 p-2">
        {/* <div className="flex space-x-2 flex-col md:flex-row items-center justify-center"> */}
        <button
          className={`flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1 ${
            selectedCategory === null
              ? 'bg-violet-800 text-white'
              : 'text-violet-800'
          }`}
          onClick={() => handleCategoryChange(null)}
        >
          <h3 className="text-sm font-medium">Show All</h3>
        </button>
        {uniqueCategories.map((category) => (
          <button
            key={category}
            className={`flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1 text-xs ${
              selectedCategory === category
                ? 'bg-violet-800 text-white'
                : 'text-violet-800'
            }`}
            onClick={() => handleCategoryChange(category)}
          >
            <h3 className="text-sm font-medium">{category}</h3>
          </button>
        ))}
        {/* </div> */}
      </div>

      {/* Filtered data cards */}
      <div className="grid grid-cols-3 gap-4">
        {selectedCategory
          ? data
              .filter((card) => card.category === selectedCategory)
              .map((cardData) => <FeedCard card={cardData} user={user} />)
          : data.map((card) => <FeedCard card={card} user={user} />)}
      </div>
    </div>
  )
}

export default Feeds
