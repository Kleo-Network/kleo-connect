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
import { ReactComponent as Arrow } from '../../../assets/images/postArrow.svg'
import { ReactComponent as Frame } from '../../../assets/images/backFrameDataCard.svg'
import { ReactComponent as Hamburger } from '../../../assets/images/hamburgerDot.svg'
import { ReactComponent as Pin } from '../../../assets/images/pin.svg'
import VisitChartCard from './FeedCardBody/VisitChartCard'

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
  const [showOptions, setShowOptions] = useState(false)
  const [tumble, setTumble] = useState(false)

  useEffect(() => {
    setTumble(true)
  }, [])

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
        setShowOptions(false)
      }
    })
  }

  const handleOnClick = (url: string) => {
    window.open(url, '_blank')
  }

  const handleModelClose = () => {
    setIsModalOpen(false)
    setShowOptions(false)
  }

  const getDaysAgo = (date: string) => {
    const givenDate = new Date(date)
    const currentDate = new Date()
    const differenceInTime = currentDate - givenDate
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24))

    if (differenceInDays === 0) {
      return 'Today'
    } else if (differenceInDays === 1) {
      return '1 day ago'
    } else if (differenceInDays <= 30) {
      return `${differenceInDays} days ago`
    } else {
      return `${givenDate.toLocaleString('default', {
        month: 'long'
      })} ${givenDate.getDate()}, ${givenDate.getFullYear()}`
    }
  }

  function parseUrl(url: string): string {
    // Ensure the URL starts with http:// or https://
    if (!/^https?:\/\//.test(url)) {
      url = 'http://' + url
    }

    // Parse the URL
    const parsedUrl = new URL(url)
    const hostParts = parsedUrl.hostname.split('.')
    const n = hostParts.length
    let domain = ''

    // Determine the domain and domainX
    if (n >= 2) {
      if (n === 4 || (n === 3 && hostParts[n - 2].length <= 3)) {
        domain =
          hostParts[n - 3] + '.' + hostParts[n - 2] + '.' + hostParts[n - 1]
      } else {
        domain = hostParts[n - 2] + '.' + hostParts[n - 1]
      }
    }

    return domain
  }

  const getDateAndMonth = (date: number) => {
    const givenDate = new Date(date * 1000)
    return `${givenDate.getDate()} ${givenDate.toLocaleString('default', {
      month: 'long'
    })}`
  }

  return (
    <>
      {card.cardType == 'DataCard' && (
        <div className=" rounded-lg p-5 bg-white flex flex-col justify-between min-h-[desiredMinHeight] backdrop-blur-md border border-white">
          {/* Header for card*/}
          <header className="flex items-center mt-3">
            {card.urls.map((urls, index) => (
              <div className="w-8 h-8 flex-none rounded-full border border-white border-spacing-4 fill-white">
                <img
                  className={`absolute w-8 h-8 flex-none rounded-full border-white border-2 ml-4 fill-white`}
                  style={{ left: `${index * 1.3}rem` }}
                  src={`https://www.google.com/s2/favicons?domain=${urls.url}`}
                />
              </div>
            ))}
            <div className="flex flex-row ml-auto items-center">
              {/* <Arrow className="w-6 h-4 mr-1" /> */}
              <div className="flex font-inter text-gray-400 font-normal">
                {getDaysAgo(card.date)}
              </div>
            </div>
            {!isPublic && (
              <div className="relative">
                <button
                  className="p-2"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <Hamburger className="w-3 h-4 stroke-gray-400" />
                </button>
                {showOptions && (
                  <div className="absolute mt-8 p-2 bg-white shadow-md rounded-lg top-0 right-0 min-w-[160px]">
                    <div className="flex flex-row px-[6px] py-[2px]">
                      <button className="flex flex-row w-full text-left px-[10px] py-[8px] items-center">
                        <Pin className="w-4 h-4 mr-3 stroke-current text-gray-700" />
                        <div className="text-sm font-inter text-gray-700">
                          Pin Card
                        </div>
                      </button>
                    </div>
                    {!card.minted && (
                      <div className="flex flex-row px-[6px] py-[2px]">
                        <button
                          className="flex flex-row w-full text-left px-[10px] py-[8px] items-center"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Bin className="w-4 h-4 mr-3 stroke-current text-gray-700" />
                          <div className="text-sm font-inter text-gray-700">
                            Delete Card
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </header>
          {/* Body for feed card */}
          {card.cardType == 'DataCard' && (
            <TextCardBody textData={card.content} />
          )}
          <div className="flex flex-row w-full flex-wrap gap-2 self-stretch items-center justify-start pt-5">
            <>
              {card.urls.map((urls) => (
                <button
                  className="flex items-center gap-2 rounded-3xl border border-gray-200 px-2 py-1"
                  style={{
                    backgroundColor: '#fff'
                  }}
                  onClick={() => handleOnClick(urls.url)}
                >
                  <img
                    className="w-4 h-4 flex-none rounded-full"
                    src={`https://www.google.com/s2/favicons?domain=${urls.url}`}
                  />

                  <h3 className="inline-block text-sm font-medium text-gray-700 overflow-hidden overflow-ellipsis line-clamp-1">
                    {card.urls.length > 2 && urls.title.length > 10
                      ? urls.title.trim().slice(0, 10) + '...'
                      : urls.title.trim().slice(0, 25) + '...'}
                  </h3>
                </button>
              ))}
            </>
          </div>
          {/* Footer for feed card */}
          <footer>
            <Modal
              isOpen={isModalOpen}
              hideCloseButton={deleteStatus === FetchStatus.LOADING}
              onClose={handleModelClose}
              fixWidth={true}
            >
              <div className="flex flex-col items-center justify-center p-6 max-w-[400px]">
                <div className="rounded-full bg-red-100 p-2 border-8 border-red-50">
                  <Bin className="w-6 h-6 text-red-600 stroke-current" />
                </div>
                <span className="text-gray-900 text-lg font-medium mt-4">
                  Delete published card?
                </span>
                <span className="text-gray-500 text-sm font-regular mt-1 text-center">
                  Are you sure you want to delete the published card? This
                  action cannot be undone.
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
                    onClick={handleModelClose}
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
      )}

      {card.cardType == 'VisitChartCard' && (
        <VisitChartCard
          data={card.metadata.activity}
          date={`${getDateAndMonth(card.metadata.dateFrom)} - ${getDateAndMonth(
            card?.metadata?.dateTo
          )}`}
        />
      )}

      {card.cardType == 'DomainVisitCard' && (
        <div className=" rounded-lg shadow-lg p-3 px-5 bg-[#42307D]  flex flex-col justify-between min-h-[desiredMinHeight] border border-white border-opacity-25 overflow-hidden bg-gradient-to-r from-violet-950 to-violet-900">
          {/* Header for card*/}
          <header className="relative flex flex-row items-center mt-3 justify-between">
            <div className="flex flex-row items-center bg-opacity-50 backdrop-blur-md bg-white py-1 px-2 rounded-3xl">
              {card.urls.map((urls, index) => (
                <img
                  className={` w-6 h-6 flex-none rounded-full fill-black`}
                  style={{ left: `${index * 1.3}rem` }}
                  src={`https://www.google.com/s2/favicons?domain=${urls.url}`}
                />
              ))}
              <div className="font-inter font-medium text-sm text-white ml-2">
                {parseUrl(card.urls[0].url)}
              </div>
            </div>
            {!isPublic && (
              <div className="relative z-20">
                <button
                  className="p-2"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <Hamburger className="w-3 h-4 stroke-[#FCFCFD]" />
                </button>

                {showOptions && (
                  <div className="absolute mt-8 p-2 bg-white border rounded-lg top-0 right-0 min-w-[160px]">
                    <div className="flex flex-row px-[6px] py-[2px]">
                      <button className="flex flex-row w-full text-left px-[10px] py-[8px] items-center">
                        <Pin className="w-4 h-4 mr-3 stroke-current text-gray-700" />
                        <div className="text-sm font-inter text-gray-700">
                          Pin Card
                        </div>
                      </button>
                    </div>
                    {!card.minted && (
                      <div className="flex flex-row px-[6px] py-[2px]">
                        <button
                          className="flex flex-row w-full text-left px-[10px] py-[8px] items-center"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <Bin className="w-4 h-4 mr-3 stroke-current text-gray-700" />
                          <div className="text-sm font-inter text-gray-700">
                            Delete Card
                          </div>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            <Frame className="absolute right-0 top-0 translate-x-16 -translate-y-8 z-10" />
          </header>

          {/* Body for feed card */}
          {card.cardType == 'DomainVisitCard' && (
            <DataCardBody
              data={card.metadata.activity[0]}
              description={card.content}
              direction={card.metadata.activity[1]}
            />
          )}
          {/* Footer for feed card */}
          <Modal
            isOpen={isModalOpen}
            hideCloseButton={deleteStatus === FetchStatus.LOADING}
            onClose={handleModelClose}
            fixWidth={true}
          >
            <div className="flex flex-col items-center justify-center p-6 max-w-[400px]">
              <div className="rounded-full bg-red-100 p-2 border-8 border-red-50">
                <Bin className="w-6 h-6 text-red-600 stroke-current" />
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
                  onClick={handleModelClose}
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
        </div>
      )}
    </>
  )
}
