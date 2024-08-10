import { useMemo, useState } from 'react'
import FeedCard from './FeedCard'
import { UserData } from '../../constants/SignupData'
import { PublishedCard } from '../../common/interface'

interface FeedProps {
  data: PublishedCard[]
  user: UserData
}

export function Feeds({ data, user }: FeedProps) {
  const [cards, setCards] = useState<PublishedCard[]>(data)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredCards = useMemo(() => {
    return selectedCategory
      ? data.filter((card) => card.category === selectedCategory)
      : data;
  }, [data, selectedCategory]);

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(cards.map((card) => card.category)));
  }, [cards]);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category)
  }

  const handleCardDelete = (id: string) => {
    setCards((cards) => cards.filter((card) => card.id !== id))
  }

  console.log('uniqueCategories : ', uniqueCategories);
  console.log('selected Category : ', selectedCategory);

  return (
    <div className="px-2 mb-4 flex flex-col items-center self-stretch">
      {/* Filter Section */}
      <div className="flex flex-col w-full">
        <span className="flex justify-start font-inter text-[32px] font-semibold text-gray-700">
          My Cards
        </span>
        <div className="flex flex-row flex-wrap gap-2 self-stretch items-center justify-start rounded-lg p-2">
          {/* 'All' category button */}
          <button
            className={`flex items-center gap-2 rounded-full px-2 py-1 ${selectedCategory === null
              ? 'bg-gray-700 text-white'
              : 'text-gray-700 bg-gray-100'
              }`}
            onClick={() => handleCategoryChange(null)}
          >
            <h3 className="text-sm font-medium px-4 py-1">All</h3>
          </button>
          {/* Buttons for each unique category */}
          {uniqueCategories.map((category) => (
            <button
              key={category}
              className={`flex items-center gap-2 rounded-full px-2 py-1 text-xs ${selectedCategory === category
                ? 'bg-gray-700 text-white'
                : 'text-gray-700 bg-gray-100'
                }`}
              onClick={() => handleCategoryChange(category)}
            >
              <h3 className="text-sm font-medium px-3 py-1">{category}</h3>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Display Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pt-5">
        {/* Display cards based on the selected category */}
        {filteredCards.map((cardData) => (
          <FeedCard
            key={cardData.id}
            handleCardDelete={handleCardDelete}
            card={cardData}
            user={user}
          />
        ))}
      </div>
    </div>
  );
}
