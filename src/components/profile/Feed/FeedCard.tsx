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
import ImageCard from './FeedCardBody/CardTypeComponents/ImageCard'
import { DataCard } from './FeedCardBody/CardTypeComponents/DataCard';
import { YTCard } from './FeedCardBody/CardTypeComponents/YTCard';

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
      {/* CardType = DataCard or PurpleCard */}
      {(card.cardTypeToRender === CardTypeToRender.DATA || card.cardTypeToRender === CardTypeToRender.PURPLE) && (
        <DataCard
          card={card}
          isPublic={isPublic}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          setIsModalOpen={setIsModalOpen}
          handleOnClick={handleOnClick}
          key={card.id}
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
        </DataCard>
      )}

      {/* CardType = YT-Card */}
      {card.cardTypeToRender === CardTypeToRender.YT && (
        <YTCard
          card={card}
          handleOnClick={handleOnClick}
          isPublic={isPublic}
          setIsModalOpen={setIsModalOpen}
          setShowOptions={setShowOptions}
          showOptions={showOptions}
          key={card.id}
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
        </YTCard>
      )}

      {/* CardType = ImageCard */}
      {card.cardType == 'ImageCard' && (
        <ImageCard
          card={card}
          isPublic={isPublic}
          showOptions={showOptions}
          setShowOptions={setShowOptions}
          setIsModalOpen={setIsModalOpen}
          key={card.id}
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
