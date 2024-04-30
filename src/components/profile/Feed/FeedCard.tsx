import { ReactComponent as Bin } from '../../../assets/images/bin.svg'
import TextCardBody from './FeedCardBody/TextCardBody'
import ImagecardBody from './FeedCardBody/ImageCardBody'
import DataCardBody from './FeedCardBody/DataCardBody'
import { UserData } from '../../constants/SignupData'
import { PublishedCard } from '../../common/interface'
import useFetch, { FetchStatus } from '../../common/hooks/useFetch'
import { useEffect, useState } from 'react'
import Modal from '../../common/Modal'
import Alert from '../../common/Alerts'
import { ReactComponent as AlertIcon } from '../../../assets/images/alert.svg'

interface Card {
  handleCardDelete: (id: string) => void
  card: PublishedCard
  user: UserData
}

export default function FeedCard({ card, user, handleCardDelete }: Card) {
  const {
    data: deleted,
    fetchData: deletePublishedCard,
    status: deleteStatus
  } = useFetch<any>()
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const DELETE_PUBLISHED_CARD = 'cards/published/{slug}'
  const [isModalOpen, setIsModalOpen] = useState(false)

  function getDeleteCardUrl() {
    return DELETE_PUBLISHED_CARD.replace('{slug}', user.slug)
  }

  useEffect(() => {
    const slug_from_local_storage = localStorage.getItem('slug')
    if (user.slug == slug_from_local_storage) {
      setIsPublic(false)
    } else {
      setIsPublic(true)
    }
  }, [])

  const handleDeleteCard = (id: string) => {
    deletePublishedCard(getDeleteCardUrl(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      }),
      onSuccessfulFetch: () => {
        handleCardDelete(id)
        setIsModalOpen(false)
      }
    })
  }

  const handleOnClick = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="bg-purple-50 rounded-lg shadow-lg mt-3 p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight] bg-gray-300 bg-opacity-50 backdrop-blur-md border border-white border-opacity-25">
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
      <div className="flex flex-row flex-wrap gap-2 self-stretch items-center justify-start pt-5">
        <>
          {card.urls.map((urls) => (
            <button
              className="flex items-center  gap-2 rounded-lg border border-gray-200 px-2 py-1"
              style={{
                backgroundColor: '#fff'
              }}
              onClick={() => handleOnClick(urls.url)}
            >
              <img
                className="w-4 h-4 flex-none"
                src={`https://www.google.com/s2/favicons?domain=${urls.url}`}
              />

              <h3 className="text-sm font-medium text-gray-700">
                {card.urls.length > 2 && urls.title.length > 10
                  ? urls.title.trim().slice(0, 10) + '...'
                  : urls.title.trim().slice(0, 35) + '...'}
              </h3>
            </button>
          ))}
        </>
      </div>
      {/* Footer for feed card */}
      <footer>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">Posted on {card.date}</span>
        </div>
        {!card.minted && !isPublic && (
          <div className="absolute bottom-0 right-0 mr-2 mb-1">
            <button onClick={() => setIsModalOpen(true)}>
              <Bin className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        )}
        <Modal
          isOpen={isModalOpen}
          hideCloseButton={deleteStatus === FetchStatus.LOADING}
          onClose={() => setIsModalOpen(false)}
        >
          <div className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-red-100 p-2 border-8 border-red-50">
              <Bin className="w-6 h-6 text-red-600" />
            </div>
            <span className="text-gray-900 text-lg font-medium mt-4">
              Delete published card?
            </span>
            <span className="text-gray-500 text-sm font-regular mt-1 text-center">
              Are you sure you want to delete the published card? This action
              cannot be undone.
            </span>
            {deleteStatus === FetchStatus.LOADING && (
              <div
                className="inline-block m-1 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Deleting...
                </span>
              </div>
            )}
            {deleteStatus === FetchStatus.ERROR && (
              <div className="w-full my-4">
                <Alert
                  type="danger"
                  message="Could not delete the data, please try again later."
                  icon={
                    <AlertIcon className="w-5 h-5 fill-red-200 stroke-red-600" />
                  }
                />
              </div>
            )}
            <div className="flex flex-row self-stretch justify-center items-center gap-3 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                disabled={deleteStatus === FetchStatus.LOADING}
                className="px-4 py-2 self-stretch flex-1 rounded-lg shadow border border-gray-200 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteCard(card.id)}
                disabled={deleteStatus === FetchStatus.LOADING}
                className="px-4 py-2 self-stretch flex-1 rounded-lg shadow bg-red-600 text-white"
              >
                {deleteStatus === FetchStatus.LOADING
                  ? 'Deleting...'
                  : 'Delete'}
              </button>
            </div>
          </div>
        </Modal>
      </footer>
    </div>
  )
}
