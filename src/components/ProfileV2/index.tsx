import Feeds from '../profile/Feed/Feed'
import ProfileV3 from '../ProfileV3/index'
import useFetch from '../common/hooks/useFetch'
import {
  UserDataProps,
  fullUserData,
  StaticCard as StaticCardType,
  PendingCard
} from '../common/interface'
import { useState, useEffect, useContext } from 'react'
import CountdownTimer from '../profile/ProfileCards/countdown'
import { convertEpochToISO } from '../profile/ProfileCards'
import Modal from '../common/Modal'
import { NavbarEvents } from '../constants/Events'
import { EventContext } from '../common/contexts/EventContext'
import Settings from '../profile/Settings'
export default function ProfileV2({ user, setUser }: UserDataProps) {
  const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false)
  const { event, updateEvent } = useContext(EventContext)
  const [userFullData, setUserFullData] = useState<fullUserData | null>(null)
  const {
    status,
    data,
    error,
    fetchData: fetchFullUserData
  } = useFetch<fullUserData>()

  const [createdStaticCards, setCreatedStaticCards] =
    useState<StaticCardType[]>()

  const [pendignCards, setPendingCards] = useState<PendingCard[]>()

  const GET_STATIC_CARDS = 'cards/static/{slug}'
  const { error: _errorstatic, fetchData: fetchStaticCards } = useFetch()
  function makeUserUpdationUrl(slug_string: string): string {
    const slug = localStorage.getItem('slug') || ''
    return slug_string.replace('{slug}', slug)
  }
  useEffect(() => {
    fetchStaticCards(makeUserUpdationUrl(GET_STATIC_CARDS), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      onSuccessfulFetch: (data) => {
        console.log('static cards', data)
        setCreatedStaticCards(data as StaticCardType[])
      }
    })
  }, [])

  const GET_USER_DATA = 'user/{slug}/published-cards/info'
  function makeSlugApiUrl(): string {
    return GET_USER_DATA.replace('{slug}', localStorage.getItem('slug') || '')
  }

  const GET_CARD_DETAIL = 'cards/pending/{slug}'
  const { fetchData: fetchPendingCardData } = useFetch<PendingCard[]>()

  function getPendingCardDetails() {
    const slug = localStorage.getItem('slug') || ''
    return GET_CARD_DETAIL.replace('{slug}', slug)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPendingCardData(getPendingCardDetails(), {
          onSuccessfulFetch(data) {
            if (data) {
              console.log('pending Cards', data)

              setPendingCards(data)
            }
          }
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    try {
      fetchFullUserData(makeSlugApiUrl(), {
        onSuccessfulFetch(data) {
          if (data) {
            console.log(data)
            setUserFullData(data)
            setUser(data.user)
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  return (
    <div className="flex flex-col">
      {!pendignCards?.length && (
        <div className="h-full w-full flex flex-row bg-purple-700 self-stretch items-center justify-between">
          <div className="h-full w-full flex flex-row items-center justify-center self-stretch">
            <span className="text-white text-l font-semibold">
              {' '}
              New cards arriving in{' '}
            </span>
            <span className="text-white font-semibold ">
              <CountdownTimer
                endDate={convertEpochToISO(user.last_cards_marked + 86400)}
                isProfilePage={true}
              />
            </span>
          </div>
        </div>
      )}
      <div className="flex mt-4 w-full items-center mx-auto justify-center">
        <div className="flex w-full justify-center">
          <div className="w-[75%] grid grid-cols-8 gap-1">
            {userFullData?.user && createdStaticCards && (
              <ProfileV3 data={createdStaticCards} user={userFullData.user} />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center mx-auto justify-center">
        <div className="flex w-full justify-center">
          <div className="w-[75%] grid">
            <div className="px-2 mb-4 flex flex-col items-center self-stretch ">
              <div className="flex flex-row flex-wrap gap-2 self-stretch items-center justify-start rounded-lg border border-gray-200 p-2">
                <ul>
                  <li>You have not published a new card</li>
                  <li>Go here and publish now </li>
                </ul>
              </div>
            </div>
            {userFullData?.user && (
              <Feeds
                data={userFullData?.published_cards}
                user={userFullData?.user}
              />
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={event === NavbarEvents.SETTINGS}
        onClose={() => updateEvent(null)}
      >
        <div className="container">
          <Settings user={user} />
        </div>
      </Modal>
    </div>
  )
}
