import { useState, useEffect, useContext } from 'react'
import { useAuthContext } from '../../common/contexts/UserContext'
import { useTransition, animated } from 'react-spring'
import { ReactComponent as Tick } from '../../../assets/images/check.svg'
import { ReactComponent as Cross } from '../../../assets/images/cross.svg'
import CountdownTimer from './countdown'
import { PendingCard, UserData, UserDataProps } from '../../common/interface'
import useFetch from '../../common/hooks/useFetch'

export default function PinnedWebsites({ user, setUser }: UserDataProps) {
  const context = useAuthContext()

  function getSlug(): string {
    const slug = sessionStorage.getItem('slug')
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
            }
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

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

  const availableDates = getLastFourDates(cards)

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
  }

  const user1 =
    'https://cdn.midjourney.com/bb411caf-06cd-4343-93e1-dfa1e1945a30/0_3.webp'

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <div className="flex flex-col self-stretch rounded-lg border border-gray-400 w-2/3 mx-auto my-8">
        <header className="flex flex-row gap-2 justify-between items-center px-6 py-5 font-medium border-b border-gray-200">
          <div className="flex w-full justify-between items-center gap-2">
            <div>
              <h3 className="text-xl text-gray-900 flex-grow-0">
                Publish Activity for{' '}
                {activeCardList.length > 0 && formatDate(activeCard.date)}
                {activeCardList.length <= 0 && cards.length > 0 && 'Other days'}
              </h3>
            </div>
            <div className="flex items-center h-300 gap-2">
              <select
                className="text-sm w-44 px-2 py-2 text-violet-700 bg-violet-100 rounded-lg cursor-pointer"
                value={selectedDate}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                  filterCards(e.target.value)
                }}
              >
                <option value="">All Dates</option>
                {availableDates.map((date) => (
                  <option key={date} value={date}>
                    {date}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </header>
        <div className="flex flex-col md:flex-row justify-between items-center p-6 bg-gray-300">
          <div className="flex flex-col md:flex-row justify-center items-stretch p-6 gap-4 mx-auto">
            {activeCardList.length > 0 ? (
              <>
                <div className="flex-grow">
                  <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
                    <div className="flex items-center mt-3">
                      <img
                        src={user?.pfp}
                        alt={user?.name}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-violet-800">
                          {user?.name}
                        </h2>
                        <p className="text-sm text-gray-500">@{user?.slug}</p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center flex-1">
                      <blockquote className="text-gray-600 text-lg mt-4 pb-3">
                        {activeCard.content}
                      </blockquote>

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
                              src={`https://www.google.com/s2/favicons?domain=${activeCard.urls.url}`}
                            />

                            <h3 className="text-sm font-medium text-gray-700">
                              {activeCard.urls.title}
                            </h3>
                          </button>
                        </>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between border-t py-2 items-center mt-4">
                        <span className="text-sm text-gray-500">
                          {formatDate(activeCard.date)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-grow">
                  <button
                    onClick={() => removeCard(activeCard.id, true)}
                    className="flex justify-center items-center mb-2 px-3 py-2 rounded-2xl bg-green-700 text-green-800 font-medium rounded hover:bg-green-800 w-full h-1/2"
                  >
                    <Tick className="w-8 stroke-white fill-white" />
                  </button>
                  <button
                    onClick={() => removeCard(activeCard.id, false)}
                    className="flex justify-center items-center px-10 py-4 bg-red-500 text-white text-md font-medium rounded-2xl hover:bg-red-800 w-full h-1/2"
                  >
                    <Cross className="w-8 stroke-white fill-white" />
                  </button>
                </div>
              </>
            ) : (
              cards.length <= 0 && (
                <div className="flex-grow">
                  <div className="bg-white rounded-lg shadow-lg p-3 px-5 bg-violet-50 flex flex-col justify-between min-h-[desiredMinHeight]">
                    <CountdownTimer endDate="2024-02-16T00:00:00Z" />
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
