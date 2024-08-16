import { ReactComponent as Bin } from '../../../assets/images/bin.svg'
import purpleCardBg from '../../../assets/images/purpleCardBg.png';
import TextCardBody from './FeedCardBody/TextCardBody'
import DataCardBody from './FeedCardBody/DataCardBody'
import { UserData } from '../../constants/SignupData'
import { CardTypeToRender, PublishedCard } from '../../common/interface'
import useFetch, { FetchStatus } from '../../common/hooks/useFetch'
import { useEffect, useState } from 'react'
import Modal from '../../common/Modal'
import Alert from '../../common/Alerts'
import { ReactComponent as AlertIcon } from '../../../assets/images/alert.svg'
import { ReactComponent as Frame } from '../../../assets/images/backFrameDataCard.svg'
import { ReactComponent as Hamburger } from '../../../assets/images/hamburgerDot.svg'
import { ReactComponent as Pin } from '../../../assets/images/pin.svg'
import VisitChartCard from './FeedCardBody/VisitChartCard'
import { getDateAndMonth, getDaysAgo, parseUrl, replaceSlugInURL } from '../../utils/utils'
import { YTCardBody } from './FeedCardBody/YTCardBody'
import ImageCard from './FeedCardBody/ImageCard'

interface Card {
  handleCardDelete: (id: string) => void
  card: PublishedCard
  user: UserData
  cardTypeToRender: CardTypeToRender
};

const DELETE_PUBLISHED_CARD = 'cards/published/{slug}';

export default function FeedCard({ card, user, handleCardDelete, cardTypeToRender }: Card) {

  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

  // Check if the user.slug matches the one in localStorage, and set the isPublic flag accordingly.
  useEffect(() => {
    const storedSlug = localStorage.getItem('slug');
    setIsPublic(storedSlug !== user.slug);
  }, []);

  // DELETE api Call for deleting the card.
  const { fetchData: deletePublishedCard, status: deleteStatus } = useFetch<any>()
  const handleDeleteCard = (id: string) => {
    deletePublishedCard(replaceSlugInURL(DELETE_PUBLISHED_CARD, user.slug), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id
      }),
      onSuccessfulFetch: () => {
        // Tells the parent component that card with `id` has been successfully deleted.
        handleCardDelete(id)
        setIsModalOpen(false)
        setShowOptions(false)
      }
    })
  }

  // Open The URL passed in new window.
  const handleOnClick = (url: string) => window.open(url, '_blank');

  // Disable flags for showOptions and ModelOpen when close model.
  const handleModelClose = () => {
    setIsModalOpen(false)
    setShowOptions(false)
  }

  const deleteModelBody = (
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
  );

  return (
    <>
      {/* CardType = DataCard */}
      {card.cardType == 'DataCard' && (
        <div
          className={`
            rounded-[14px] md:rounded-[24px] p-5
            flex flex-col justify-between min-h-[desiredMinHeight]
            backdrop-blur-md border border-white bg-cover
            ${card.cardTypeToRender === CardTypeToRender.YT ? 'bg-yt-card' : 'bg-white'}
          `}
          style={card.cardTypeToRender === CardTypeToRender.PURPLE ? { backgroundImage: `url(${purpleCardBg})` } : {}}
        >
          {/* Body for YT card */}
          {card.cardTypeToRender == CardTypeToRender.YT && (
            <YTCardBody card={card} />
          )}

          {/* Header for card [UrlFavicons, DaysAgoString, Options] */}
          <header className="flex items-center mt-3 h-[46px]">
            {/* Looping over all urls, taking favicon and showing in top-left part. */}
            {[...new Set(card.urls.map(url => `https://www.google.com/s2/favicons?domain=${parseUrl(url.url)}&sz=40`))].map((iconUrl, index) => (
              <div key={iconUrl} className="w-8 h-8 flex-none rounded-full flex items-center">
                <img
                  className={`
                    absolute w-10 h-10 flex-none rounded-full border-[3.5px] ml-4
                    stroke-current stroke-opacity-40
                    ${card.cardTypeToRender === CardTypeToRender.PURPLE ? 'border-purple-card fill-purple-card' : 'border-white fill-white'}
                  `}
                  style={{ left: `${index * 1.3}rem` }}
                  src={iconUrl}
                />
              </div>
            ))}

            {/* Displaying DaysAgo string on right side */}
            <div className="flex flex-row ml-auto items-center">
              <div className={`flex font-inter font-normal ${card.cardTypeToRender === CardTypeToRender.PURPLE ? 'text-white' : 'text-gray-400'}`}>
                {getDaysAgo(card.date)}
              </div>
            </div>

            {/* If not public then show options for DeleteCard and PinCard */}
            {!isPublic && (
              <div className="relative">
                <button
                  className="p-2"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <Hamburger className={`w-3 h-4 ${card.cardTypeToRender === CardTypeToRender.PURPLE ? 'stroke-white' : 'stroke-gray-400'}`} />
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

          {/* Body for Text card */}
          {card.cardType == 'DataCard' && (
            <TextCardBody
              textData={card.content}
              isTextWhite={
                card.cardTypeToRender === CardTypeToRender.YT ||
                card.cardTypeToRender === CardTypeToRender.PURPLE
              }
              truncateText={card.cardTypeToRender === CardTypeToRender.YT}
            />
          )}

          {/* URL Pills at bottom */}
          {(card.cardTypeToRender == CardTypeToRender.DATA || card.cardTypeToRender == CardTypeToRender.PURPLE) && <div className="flex flex-row w-full flex-wrap gap-2 self-stretch items-center justify-start pt-5">
            <>
              {card.urls.slice(0, 4).map((urls) => (
                <button
                  key={urls.id}
                  className={`flex items-center gap-2 rounded-3xl border px-2 py-1 ${card.cardTypeToRender == CardTypeToRender.PURPLE ? 'border-none bg-white/20' : 'border-gray-200 bg-gray-100'}`}
                  onClick={() => handleOnClick(urls.url)}
                >
                  <img
                    className="w-4 h-4 flex-none rounded-full"
                    src={`https://www.google.com/s2/favicons?domain=${urls.url}&sz=16`}
                  />

                  <h3 className={`inline-block text-sm font-medium ${card.cardTypeToRender == CardTypeToRender.PURPLE ? 'text-white' : 'text-gray-700'} overflow-hidden overflow-ellipsis line-clamp-1`}>
                    {card.urls.length > 2 && urls.title.length > 10
                      ? urls.title.trim().slice(0, 10) + '...'
                      : urls.title.trim().slice(0, 25) + '...'}
                  </h3>
                </button>
              ))}
              {card.urls.length > 4 && (
                <span className={`text-sm ${card.cardTypeToRender == CardTypeToRender.PURPLE ? 'text-white' : 'text-gray-500'}`}>+{card.urls.length - 4} more</span>
              )}
            </>
          </div>}

          {/* Delete Card Modal */}
          <Modal
            isOpen={isModalOpen}
            hideCloseButton={deleteStatus === FetchStatus.LOADING}
            onClose={handleModelClose}
            fixWidth={true}
          >
            {deleteModelBody}
          </Modal>
        </div>
      )}

      {/* CardType = ImageCard */}
      {card.cardType == 'ImageCard' && (
        <ImageCard
          card={card}
          isPublic={isPublic}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          setIsModalOpen={setIsModalOpen}
        >
          {/* Delete Card Modal */}
          <Modal
            isOpen={isModalOpen}
            hideCloseButton={deleteStatus === FetchStatus.LOADING}
            onClose={handleModelClose}
            fixWidth={true}
          >
            {deleteModelBody}
          </Modal>
        </ImageCard>
      )}

      {/* CardType = VisitChartCard TODO: Need to be updated.*/}
      {card.cardType == 'VisitChartCard' && (
        <VisitChartCard
          data={card.metadata.activity}
          date={`${getDateAndMonth(card.metadata.dateFrom)} - ${getDateAndMonth(
            card?.metadata?.dateTo
          )}`}
        />
      )}

      {/* CardType = DomainVisitCard TODO: Need to be updated. */}
      {card.cardType == 'DomainVisitCard' && (
        <div className=" rounded-[14px] md:rounded-[24px] p-3 px-5 bg-[#42307D]  flex flex-col justify-between min-h-[desiredMinHeight] border border-white border-opacity-25 overflow-hidden bg-gradient-to-r from-violet-950 to-violet-900">
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
            <div className="flex flex-row items-center justify-center mr-1 ml-auto py-[2px] text-white font-inter text-sm font-normal">
              {card.tags[2]}
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
