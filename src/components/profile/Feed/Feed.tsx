import { useState } from 'react'
import FeedCard from './FeedCard'
import { UserData } from '../../constants/SignupData'
import { PublishedCard } from '../../common/interface'

interface Feed {
  data: PublishedCard[]
  user: UserData
}

const Feeds: React.FC<Feed> = ({ data, user }) => {
  const [cards, setCards] = useState<PublishedCard[]>(data)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const uniqueCategories = Array.from(
    new Set(cards.map((card) => card.category))
  )

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handleCardDelete = (id: string) => {
    setCards((cards) => cards.filter((card) => card.id !== id))
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
      </div>

      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 pt-5">
        {selectedCategory
          ? cards
              .filter((card) => card.category === selectedCategory)
              .map((cardData) => (
                <FeedCard
                  handleCardDelete={handleCardDelete}
                  card={cardData}
                  user={user}
                />
              ))
          : cards.map((card) => (
              <FeedCard
                handleCardDelete={handleCardDelete}
                card={card}
                user={user}
              />
            ))}
      </div>
    </div>
  )
}

export default Feeds
