import { useState, useEffect, useContext } from 'react'
import { ReactComponent as Tick } from '../../../assets/images/check.svg'
import { ReactComponent as Cross } from '../../../assets/images/cross.svg'
import { ReactComponent as BackFrame } from '../../../assets/images/backFrameDataCard.svg'
import { ReactComponent as Token } from '../../../assets/images/KleoToken.svg'
import { ReactComponent as Cat } from '../../../assets/images/astronautCat.svg'
import purpleCardBg from '../../../assets/images/purpleCardBg.png';
import CountdownTimer from './countdown'
import { CardTypeToRender, PendingCard, PublishedCard, UserData, UserDataProps } from '../../common/interface'
import useFetch from '../../common/hooks/useFetch'
import DataCardBody from '../Feed/FeedCardBody/DataCardBody'
import PendingVisitChartCard from '../Feed/FeedCardBody/PendingVisitChartCard'
import ProgressBar from './ProgressBar'
import VisitChartCard from './VisitChartCard'
import { useNavigate } from 'react-router-dom'
import { convertEpochToISO } from '../../common/utils'
import { getDateAndMonth, getDaysAgo, parseUrl, replaceSlugInURL, updateCardTypeToRenderInAllCards } from '../../utils/utils'
import { ImageCardForPublishCards } from './CardTypeComponents/ImageCardForPublishCards'
import { YTCardForPublishCards } from './CardTypeComponents/YTCardForPublishCards'
import { DataCardForPublishCards } from './CardTypeComponents/DataCardForPublishCard'

const GET_USER_DETAIL = 'user/get-user/{slug}'
const CREATE_PUBLISHED_CARDS = 'cards/published/{slug}'
const GET_PENDING_CARDS = 'cards/pending/{slug}'
const PROFILE_PAGE_ROUTE = '/profileV2/{slug}';

export const PublishCardsComponent = ({ user, setUser }: UserDataProps) => {
  const navigate = useNavigate()
  const [pendingCards, setPendingCards] = useState<PendingCard[]>([])
  const [activeCardsList, setActiveCardsList] = useState<PendingCard[]>([])
  const [activeCard, setActiveCard] = useState<PendingCard>(activeCardsList[0])
  const [totalCardCount, setTotalCardCount] = useState(0)

  // Fetch User Data.
  const { fetchData: fetchUserData } = useFetch<UserData>()
  useEffect(() => {
    try {
      fetchUserData(replaceSlugInURL(GET_USER_DETAIL), {
        onSuccessfulFetch(data) {
          if (data) {
            setUser(data)
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, []);

  // Fetch Pending Cards.
  const { fetchData: fetchPendingCards } = useFetch<PendingCard[]>()
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchPendingCards(replaceSlugInURL(GET_PENDING_CARDS), {
          onSuccessfulFetch(data) {
            if (data) {
              data = updateCardTypeToRenderInAllCards(data) as PendingCard[];
              setPendingCards(data)
              setActiveCardsList(data)
              setActiveCard(data[0])
              setTotalCardCount(data.length);
              (window as any).updateCounter((data as PendingCard[]).length)
            }
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, []);

  // Remove Cards.
  const { fetchData: managePendingCardCreation } = useFetch<any>()
  const removeCard = (id: string, hasToPublished: boolean) => {
    if (hasToPublished) {
      user.profile_metadata.kleo_points++
    }

    managePendingCardCreation(replaceSlugInURL(CREATE_PUBLISHED_CARDS), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        isPublishCard: hasToPublished
      })
    })

    // Remove selected Card from PendingCards and ActiveCards.
    setPendingCards((pendingCards) => pendingCards.filter((card) => card.id !== id))
    setActiveCardsList((activeCardsList) => activeCardsList.filter((card) => card.id !== id))
    // Set Active Card to first card from remaining ActiveCards.
    const activeCard = activeCardsList.filter((card) => card.id !== id)[0]
    setActiveCard(activeCard);
    (window as any).updateCounter(pendingCards.length - 1);
  }

  // Open The URL passed in new window.
  const handleOnClick = (url: string) => window.open(url, '_blank');

  return (
    <div className="w-full h-full rounded-2xl p-6">
      <>
        {activeCardsList.length > 0 ? (
          <div className="flex flex-col justify-between h-full gap-6">
            <div className="flex w-full h-[624px] bg-gray-100 rounded-2xl p-6">
              <div className="flex flex-col items-center min-w-[450px] w-full h-full">
                {/* KLEO points in top right corner */}
                <div className="flex flex-row bg-white h-[44px] p-2 rounded-md items-center ml-auto">
                  <div className="flex my-[5px] bg-violet-100 w-[30px] h-[30px] items-center justify-center rounded-md">
                    <Token className="flex w-[24px] h-[24px]" />
                  </div>
                  <div className="flex flex-row ml-2 mr-1">
                    <div className="font-medium text-[16px] text-violet-700">
                      {user.profile_metadata.kleo_points
                        ? user.profile_metadata.kleo_points
                        : 0}
                    </div>
                    <div className="flex font-light text-[12px] text-violet-500 ml-1 text-center items-center justify-center">
                      KLEO
                    </div>
                  </div>
                </div>

                {/* Actual Card with all Data */}
                <div className="px-0 w-full flex-1 flex justify-center items-center">
                  {/* CardType == DATA CARD or PURPLE CARD */}
                  {(activeCard.cardTypeToRender === CardTypeToRender.DATA || activeCard.cardTypeToRender === CardTypeToRender.PURPLE) && (
                    <DataCardForPublishCards
                      activeCard={activeCard}
                      handleOnClick={handleOnClick}
                    />
                  )}

                  {/* CardType == IMAGE CARD */}
                  {activeCard.cardType == 'ImageCard' && (
                    <ImageCardForPublishCards card={activeCard} />
                  )}

                  {/* CardType == YT CARD */}
                  {activeCard.cardTypeToRender === CardTypeToRender.YT && (
                    <YTCardForPublishCards activeCard={activeCard} />
                  )}

                  {/* TODO : Make it fit inside the card when available. */}
                  {/* CardType == DOMAIN VISIT CARD */}
                  {activeCard.cardType == 'DomainVisitCard' && (
                    <div className=" rounded-[14px] p-3 px-5 bg-[#42307D]  flex flex-col justify-between min-h-[320px] border border-white overflow-hidden bg-gradient-to-r from-violet-950 to-violet-900 mt-[20px]">
                      {/* Header for card*/}
                      <header className="relative flex flex-row items-center mt-3 justify-between">
                        <div className="flex flex-row items-center bg-opacity-50 backdrop-blur-md bg-white py-[6px] pl-[6px] pr-[16px] rounded-3xl">
                          {activeCard.urls.map((urls, index) => (
                            <img
                              className={` w-6 h-6 flex-none rounded-full fill-black`}
                              style={{ left: `${index * 1.3}rem` }}
                              src={`https://www.google.com/s2/favicons?domain=${urls.url}`}
                            />
                          ))}
                          <div className="font-inter font-medium text-sm text-white ml-2">
                            {parseUrl(activeCard.urls[0].url)}
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-center mr-1 ml-auto py-[2px] text-white font-inter text-sm font-normal">
                          {activeCard.tags[2]}
                        </div>
                        <BackFrame className="absolute right-0 top-0 w-[317px] h-[295px] translate-x-16 -translate-y-10 z-10" />
                      </header>

                      {/* Body for feed card */}
                      {activeCard.cardType == 'DomainVisitCard' && (
                        <DataCardBody
                          data={activeCard.metadata.activity[0]}
                          description={activeCard.content}
                          direction={activeCard.metadata.activity[1]}
                        />
                      )}
                    </div>
                  )}

                  {/* TODO : Make it fit inside the card when available. */}
                  {/* CardType == VISIT CHART CARD */}
                  {activeCard.cardType == 'VisitChartCard' && (
                    <VisitChartCard
                      data={activeCard.metadata.activity}
                      date={`${getDateAndMonth(
                        activeCard?.metadata?.dateFrom
                      )} - ${getDateAndMonth(activeCard?.metadata?.dateTo)}`}
                    />
                  )}
                </div>

                {/* ProgressBar */}
                <div className="w-full">
                  <ProgressBar
                    progress={Math.floor(
                      ((totalCardCount - pendingCards.length) / totalCardCount) * 100
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Delete and Publish Buttons  */}
            <div className="flex h-[92px] w-full p-4 justify-evenly gap-3">
              <button
                onClick={() => removeCard(activeCard.id, false)}
                className="flex justify-center items-center w-[310px] h-[60px] py-4 px-7 rounded-lg bg-gray-100 text-[#363F72] font-semibold text-lg transition duration-200 ease-in-out hover:bg-gray-300 hover:text-[#2C2D38]"
              >
                <Cross className="flex w-[24px] h-[24px] stroke-[#363F72] fill-[#363F72] mr-1" />
                Delete
              </button>
              <button
                onClick={() => removeCard(activeCard.id, true)}
                className="flex justify-center items-center w-[310px] h-[60px] py-4 px-7 rounded-lg bg-violet-600 text-white font-semibold text-lg transition duration-200 ease-in-out hover:bg-violet-700"
              >
                <Tick className="flex w-[24px] h-[24px] stroke-white fill-current mr-1" />
                Publish
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-between h-full">
            <div className="flex w-full h-[624px] bg-gray-100 rounded-2xl p-4 h-max-[400px]">
              <div className="flex flex-col justify-between items-center min-w-[450px] w-full h-full">
                <div className="flex flex-row bg-white h-[44px] p-2 rounded-md items-center ml-auto">
                  <div className="flex my-[5px] bg-violet-100 w-[30px] h-[30px] items-center justify-center rounded-md">
                    <Token className="flex w-[24px] h-[24px]" />
                  </div>
                  <div className="flex flex-row ml-2 mr-1">
                    <div className="font-medium text-[16px] text-violet-700">
                      {user.profile_metadata.kleo_points
                        ? user.profile_metadata.kleo_points
                        : 0}
                    </div>
                    <div className="flex font-light text-[12px] text-violet-500 ml-1 text-center items-center justify-center">
                      KLEO
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <Cat className="w-fit h-fit mt-auto" />
                  <div className="text-gray-700 font-semibold text-[14px] mt-[4px]">
                    Nothing to see here!
                  </div>
                  <div className="text-gray-500 font-normal text-[14px] mt-[4px]">
                    Stay tuned. New cards are arriving in:
                  </div>
                </div>

                <div className="flex flex-col justify-around items-center">
                  <div className="bg-gray-200 rounded-lg flex flex-col justify-between mt-4 -py-4 scale-75">
                    <CountdownTimer
                      endDate={convertEpochToISO(
                        user.last_cards_marked + 86400
                      )}
                      isProfilePage={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[92px] w-full p-4 justify-center">
              <button
                onClick={() => navigate(replaceSlugInURL(PROFILE_PAGE_ROUTE, user.slug))}
                className="flex justify-center items-center w-[318px] h-[60px] py-4 px-7 rounded-lg bg-violet-600 text-white font-semibold text-lg transition duration-200 ease-in-out hover:bg-violet-700"
              >
                <img
                  src="../../../assets/images/check.svg"
                  className="flex w-[13px] h-[9px] stroke-white fill-current mr-1"
                />
                Go Back To Profile
              </button>
            </div>
          </div>
        )}
      </>
    </div>
  )
}
