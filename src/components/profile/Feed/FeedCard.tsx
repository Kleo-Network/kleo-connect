import { ReactComponent as Bin } from '../../../assets/images/bin.svg'
import TextCardBody from './FeedCardBody/TextCardBody'
import ImagecardBody from './FeedCardBody/ImageCardBody'
import DataCardBody from './FeedCardBody/DataCardBody'
import { UserData } from '../../constants/SignupData'
import { PublishedCard } from '../../common/interface'
import useFetch from '../../common/hooks/useFetch'

const user1 =
  'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp'

interface Card {
  handleCardDelete: (id: string) => void
  card: PublishedCard
  user: UserData
}

export default function FeedCard({ card, user, handleCardDelete }: Card) {
  const { fetchData: deletePublishedCard } = useFetch<any>()
  const DELETE_PUBLISHED_CARD = 'cards/published/{slug}'
  function getDeleteCardUrl() {
    return DELETE_PUBLISHED_CARD.replace('{slug}', user.slug)
  }
  const handleDeleteCard = (id: string) => {
    deletePublishedCard(getDeleteCardUrl(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
    handleCardDelete(id)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg mt-3 p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight] bg-gray-300 bg-opacity-50 backdrop-blur-md border border-white border-opacity-25">
      {/* Header for card*/}
      <header className="flex items-center mt-3">
        <img
          src={user.pfp}
          alt={user.name}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="w-sm text-lg font-semibold text-violet-800">
            {user.slug}
          </h2>
          <p className="text-sm text-gray-500">{user.name}</p>
        </div>
      </header>
      {/* Body for feed card */}
      {card.cardType == 'DataCard' && <TextCardBody textData={card.content} />}
      {card.cardType == 'ImageCard' && (
        <ImagecardBody
          data={{ imageUrl: card.metadata.activity, description: card.content }}
        />
      )}
      {card.cardType == 'DomainVisitCard' && (
        <DataCardBody
          data={card.metadata.activity}
          description={card.content}
        />
      )}
      <div className="flex flex-row flex-wrap gap-2 self-stretch items-center justify-start max-h-40">
        <>
          <button
            className="flex items-center  gap-2 rounded-lg border border-gray-200 px-2 py-1"
            style={{
              backgroundColor: '#fff'
            }}
          >
            <img
              className="w-4 h-4 flex-none"
              src={`https://www.google.com/s2/favicons?domain=${card.urls.url}`}
            />

            <h3 className="text-sm font-medium text-gray-700">
              {card.urls.title}
            </h3>
          </button>
        </>
      </div>
      {/* Footer for feed card */}
      <footer>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">Posted on {card.date}</span>
        </div>
        {!card.minted && (
          <div className="absolute bottom-0 right-0 mr-2 mb-1">
            <button onClick={() => handleDeleteCard(card.id)}>
              <Bin className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
      </footer>
    </div>
  )
}
