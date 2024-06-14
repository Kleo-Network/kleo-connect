import { useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../../common/contexts/UserContext'
import { useTransition, animated } from 'react-spring'
import { ReactComponent as Tick } from '../../../assets/images/check.svg'
import { ReactComponent as Cross } from '../../../assets/images/cross.svg'
import { ReactComponent as BackFrame } from '../../../assets/images/backFrameDataCard.svg'
import { ReactComponent as Cat } from '../../../assets/images/astronautCat.svg'
import CountdownTimer from './countdown'
import { PendingCard, UserData, UserDataProps } from '../../common/interface'
import useFetch from '../../common/hooks/useFetch'
import DataCardBody from '../Feed/FeedCardBody/DataCardBody'
import PendingVisitChartCard from '../Feed/FeedCardBody/PendingVisitChartCard'

export default function PinnedWebsites({ user, setUser }: UserDataProps) {
  const context = useAuthContext()

  function getSlug(): string {
    const slug = localStorage.getItem('slug')
    if (slug) {
      return slug
    } else {
      return ''
    }
  }

  // to fetch user data
  const GET_USER_DETAIL = 'user/get-user/{slug}'
  const { fetchData: fetchUserData } = useFetch<UserData>()

  function getUserDetails() {
    const slug = getSlug()
    return GET_USER_DETAIL.replace('{slug}', slug)
  }

  useEffect(() => {
    try {
      fetchUserData(getUserDetails(), {
        onSuccessfulFetch(data) {
          if (data) {
            setUser(data)
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  const formatDate = (epoch: number): string => {
    const date = new Date(epoch * 1000) // Convert epoch to milliseconds

    const day = String(date.getDate()).padStart(2, '0') // Ensure two digits for day
    const year = date.getFullYear()

    return `${day} ${new Date(epoch * 1000).toLocaleDateString('en-US', {
      month: 'long'
    })} ${year}`
  }

  // to fetch pending cards
  const [cards, setCards] = useState<PendingCard[]>([])
  const [activeCardList, setActiveCardList] = useState<PendingCard[]>([])
  const [activeCard, setActiveCard] = useState<PendingCard>(activeCardList[0])
  const [selectedDate, setSelectedDate] = useState<string>(
    null as unknown as string
  )
  const GET_CARD_DETAIL = 'cards/pending/{slug}'
  const { fetchData: fetchPendingCardData } = useFetch<PendingCard[]>()
  const { fetchData: managePendingCardCreation } = useFetch<any>()
  const CREATE_PUBLISHED_CARDS = 'cards/published/{slug}'

  function createPendingCard() {
    const slug = getSlug()
    return CREATE_PUBLISHED_CARDS.replace('{slug}', slug)
  }

  function getPendingCardDetails() {
    const slug = getSlug()
    return GET_CARD_DETAIL.replace('{slug}', slug)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPendingCardData(getPendingCardDetails(), {
          onSuccessfulFetch(data) {
            if (data) {
              setCards(data)
              setActiveCardList(data)
              setActiveCard(data[0])
              ;(window as any).updateCounter((data as PendingCard[]).length)
            }
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const getDateAndMonth = (date: number) => {
    const givenDate = new Date(date * 1000)
    return `${givenDate.getDate()} ${givenDate.toLocaleString('default', {
      month: 'long'
    })}`
  }

  const filterCards = (selectedDate: string) => {
    const filteredCards = cards.filter((card) => {
      if (!selectedDate) {
        return true // Show all cards if no date is selected
      }
      return formatDate(card.date) == selectedDate
    })
    setActiveCardList(filteredCards)
    setActiveCard(filteredCards[0])
  }

  const getLastFourDates = (cards: PendingCard[]) => {
    const uniqueDates = new Set(cards.map((card) => formatDate(card.date)))
    const datesArray = Array.from(uniqueDates)
    return datesArray.slice(0, 4) // Get the first 4 elements
  }

  const getDaysAgo = (date: number) => {
    const givenDate = new Date(date * 1000)
    const givenDateNum: number = new Date(date).getTime()
    const currentDate: number = new Date().getTime()
    const differenceInTime = currentDate - givenDateNum
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

  const availableDates = getLastFourDates(cards)

  const handleOnClick = (url: string) => {
    window.open(url, '_blank')
  }

  const removeCard = (id: string, hasToPublished: boolean) => {
    console.log(id)

    managePendingCardCreation(createPendingCard(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        isPublishCard: hasToPublished
      })
    })

    setCards((cards) => cards.filter((card) => card.id !== id))
    setActiveCardList((activeCardList) =>
      activeCardList.filter((card) => card.id !== id)
    )
    const active = activeCardList.filter((card) => card.id !== id)[0]
    setActiveCard(active)
    ;(window as any).updateCounter(cards.length - 1)
  }

  const user1 =
    'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp'

  return (
    <div className="flex flex-col w-full justify-center items-center bg-gray-50">
      <div className="flex flex-col self-stretch border bg-gray-100 w-2/3 mx-auto my-8 rounded-[14px]">
        {activeCardList.length > 0 && (
          <div className="flex w-full justify-between items-center gap-2 mx-[25px] my-[22px]">
            <div>
              <h3 className="text-xl text-gray-900 flex-grow-0">
                {cards.length} cards to go
              </h3>
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row justify-between items-center p-3 bg-gray-100">
          <div className="flex flex-col md:flex-row justify-center items-stretch p-2 gap-4 mx-auto">
            {activeCardList.length > 0 ? (
              <>
                <div className="flex flex-col bg-white items-start gap-4 mx-auto min-h-[360px] rounded-[14px]">
                  <div className="flex w-full h-full justify-center items-center">
                    {activeCard.cardType == 'DataCard' && (
                      <div className="bg-white rounded-lg  p-6  flex flex-col justify-between min-h-[desiredMinHeight]">
                        <header className="relative flex items-center">
                          {activeCard.urls.map((urls, index) => (
                            <div className="w-10 h-10 flex-none rounded-full border border-white border-spacing-4 fill-white">
                              <img
                                className="absolute w-10 h-10 flex-none rounded-full border-white border-2 fill-white"
                                style={{ left: `${index * 1.3}rem` }}
                                src={`https://www.google.com/s2/favicons?domain=${urls.url}&sz=40`}
                              />
                            </div>
                          ))}
                          <div className="flex flex-row ml-auto items-center">
                            {/* <Arrow className="w-6 h-4 mr-1" /> */}
                            <div className="flex font-inter text-base text-gray-400 font-normal">
                              {getDaysAgo(activeCard.date)}
                            </div>
                          </div>
                        </header>

                        <div className="flex flex-col justify-center mt-3">
                          <blockquote className="text-gray-600 text-2xl font-normal">
                            {activeCard.content}
                          </blockquote>
                        </div>

                        <div className="flex flex-row w-full flex-wrap gap-2 self-stretch items-center justify-start pt-5">
                          <>
                            {activeCard.urls.map((urls) => (
                              <button
                                className="flex items-center gap-2 rounded-3xl border border-gray-200 px-2 py-1 bg-gray-50"
                                onClick={() => handleOnClick(urls.url)}
                              >
                                <img
                                  className="w-4 h-4 flex-none rounded-full"
                                  src={`https://www.google.com/s2/favicons?domain=${urls.url}&sz=16`}
                                />

                                <h3 className="inline-block text-[14px] font-medium text-gray-700 overflow-hidden overflow-ellipsis line-clamp-1">
                                  {urls.title}
                                </h3>
                              </button>
                            ))}
                          </>
                        </div>
                      </div>
                    )}
                    {activeCard.cardType == 'DomainVisitCard' && (
                      <div className=" rounded-lg shadow-lg p-3 px-5 bg-[#42307D]  flex flex-col justify-between min-h-[200px] border border-white overflow-hidden bg-gradient-to-r from-violet-950 to-violet-900 w-[80%]">
                        {/* Header for card*/}
                        <header className="relative flex flex-row items-center mt-3 justify-between">
                          <div className="flex flex-row items-center bg-opacity-50 backdrop-blur-md bg-white py-1 px-2 rounded-3xl">
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
                          <BackFrame className="absolute right-0 top-0 w-[204px] h-[189px] translate-x-20 -translate-y-10 z-10" />
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
                    {activeCard.cardType == 'VisitChartCard' && (
                      <PendingVisitChartCard
                        data={activeCard.metadata.activity}
                        date={`${getDateAndMonth(
                          activeCard.metadata.dateFrom
                        )} - ${getDateAndMonth(activeCard?.metadata?.dateTo)}`}
                      />
                    )}
                  </div>
                  <div className="flex w-[90%] h-[1px] justify-center items-center mt-auto ml-8 mb-2 bg-gray-200" />
                  <div className="flex w-full justify-center items-center flex-row gap-2 mb-6">
                    <button
                      onClick={() => removeCard(activeCard.id, false)}
                      className="flex justify-center items-center w-[40%] px-3 py-2 rounded-lg bg-gray-100 text-[#363F72] font-semibold"
                    >
                      <Cross className="flex w-[20px] h-[20px] stroke-[#363F72] fill-[#363F72] mr-1" />
                      Delete
                    </button>
                    <button
                      onClick={() => removeCard(activeCard.id, true)}
                      className="flex justify-center items-center w-[40%] px-3 py-2 rounded-lg bg-violet-600 text-white font-semibold ml-[22px]"
                    >
                      <Tick className="flex w-[20px] h-[20px] stroke-white fill-current mr-1" />
                      Publish
                    </button>
                  </div>
                </div>
              </>
            ) : (
              cards.length <= 0 && (
                <div className="flex flex-col justify-center items-center w-[380px] h-[428px] bg-gray-100 rounded-lg px-[16px] py-[8px]">
                  <Cat className="min-w-[157px] min-h-[152px]" />
                  <div className="text-gray-700 font-semibold text-[16px] mt-[4px]">
                    Yay! you are done for the day..
                  </div>
                  <div className="text-gray-500 font-normal text-[11px] mt-[4px]">
                    Come back tomorrow for new cards
                  </div>
                  <div className="bg-gray-50 rounded-lg shadow-lg flex flex-col justify-between min-w-[desiredMinWeight] min-h-[desiredMinHeight] mt-12">
                    <CountdownTimer
                      endDate={convertEpochToISO(
                        user.last_cards_marked + 86400
                      )}
                      isProfilePage={false}
                    />
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function convertEpochToISO(epoch: number): string {
  const date = new Date(epoch * 1000) // Convert seconds to milliseconds
  const isoString = date.toISOString() // Get ISO 8601 string in UTC timezone
  return isoString
}
