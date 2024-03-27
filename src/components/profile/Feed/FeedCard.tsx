import { ReactComponent as Like } from '../../../assets/images/like.svg'
import { ReactComponent as Comment } from '../../../assets/images/comment.svg'
import { ReactComponent as Digg } from '../../../assets/images/digg.svg'
import TextCardBody from './FeedCardBody/TextCardBody'
import ImagecardBody from './FeedCardBody/ImageCardBody'
import DataCardBody from './FeedCardBody/DataCardBody'
import { CardProps, UserProps } from './Feed'

const user1 =
  'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp'

interface Card {
  card: CardProps
  user: UserProps
}

export default function FeedCard({ card, user }: Card) {
  return (
    <div className="bg-white rounded-lg shadow-lg mt-3 p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight] bg-gray-300 bg-opacity-50 backdrop-blur-md border border-white border-opacity-25">
      {/* Header for card*/}
      <header className="flex items-center mt-3">
        <img
          src={card.userImageUrl}
          alt={user.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="w-sm text-lg font-semibold text-violet-800">
            {user.name}
          </h2>
          <p className="text-sm text-gray-500">{user.kleo} KLEO</p>
        </div>
      </header>
      {/* Body for feed card */}
      {!card.contentData && !card.contentImageUrl && (
        <TextCardBody textData={card.content} />
      )}
      {card.contentImageUrl && (
        <ImagecardBody
          data={{ imageUrl: card.contentImageUrl, description: card.content }}
        />
      )}
      {card.contentData && (
        <DataCardBody data={card.contentData} description={card.content} />
      )}
      {/* Footer for feed card */}
      <footer>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">Posted on {card.date}</span>
        </div>
      </footer>
    </div>
  )
}
