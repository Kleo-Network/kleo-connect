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
import Modal from '../common/Modal'
import { NavbarEvents } from '../constants/Events'
import { EventContext } from '../common/contexts/EventContext'
import Settings from '../profile/Settings'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as CloseIcon } from '../../assets/images/cross.svg'
import { ReactComponent as Cat } from '../../assets/images/astronautCat.svg'
import { ReactComponent as Plus } from '../../assets/images/plus.svg'
import { convertEpochToISO } from '../common/utils'

export default function ProfileV2({ user, setUser }: UserDataProps) {
  const { event, updateEvent } = useContext(EventContext)
  const [userFullData, setUserFullData] = useState<fullUserData | null>(null)
  const { fetchData: fetchFullUserData } = useFetch<fullUserData>()
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [showBanner, setShowBanner] = useState<boolean>(true)
  const { slug } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const slug_from_local_storage = localStorage.getItem('slug')
    if (slug_from_local_storage == slug) {
      setIsPublic(false)
    } else {
      setIsPublic(true)
    }
  }, [])

  const [createdStaticCards, setCreatedStaticCards] =
    useState<StaticCardType[]>()

  const [pendignCards, setPendingCards] = useState<PendingCard[]>()

  const GET_STATIC_CARDS = 'cards/static/{slug}'
  const { error: _errorstatic, fetchData: fetchStaticCards } = useFetch()
  function makeUserUpdationUrl(slug_string: string): string {
    const slug_to_fetch_data = slug || localStorage.getItem('slug') || ''
    return slug_string.replace('{slug}', slug_to_fetch_data)
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
    return GET_USER_DATA.replace(
      '{slug}',
      slug || localStorage.getItem('slug') || ''
    )
  }

  const GET_CARD_DETAIL = 'cards/pending/{slug}'
  const { fetchData: fetchPendingCardData } = useFetch<PendingCard[]>()

  function getPendingCardDetails() {
    const slug_to_fetch_data = slug || localStorage.getItem('slug') || ''
    return GET_CARD_DETAIL.replace('{slug}', slug_to_fetch_data)
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
            if (!isPublic) {
              setUser(data.user)
            }
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  const handleBannerClick = () => {
    setShowBanner(false)
  }

  const handlePublishCardCreation = () => {
    navigate('/cards')
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {!pendignCards?.length && !isPublic && showBanner && (
        <div className="max-h-[50px] w-full flex flex-row bg-purple-700 self-stretch items-center justify-between">
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
          <button
            className="text-white hover:text-primary hover:bg-white focus:outline-none rounded-md mr-5 p-1"
            onClick={handleBannerClick}
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        </div>
      )}
      <div className="flex w-full mt-[50px] items-center mx-auto justify-center">
        <div className="flex w-full justify-center">
          <div className="flex md:flex-row flex-col w-[75%] gap-6 h-80">
            {userFullData?.user && userFullData?.static_cards && (
              <ProfileV3
                data={userFullData.static_cards}
                user={userFullData.user}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center mx-auto justify-center mt-5 bg-gray-50">
        <div className="flex w-full justify-center bg-gray-50">
          <div className="w-[75%] grid">
            {userFullData?.published_cards &&
            userFullData?.published_cards?.length > 0 ? (
              <Feeds
                data={userFullData?.published_cards}
                user={userFullData?.user}
              />
            ) : (
              userFullData?.user && (
                <div className="relative h-full bg-gray-50 self-stretch">
                  <div className="px-2 mb-4 flex flex-col items-center self-stretch">
                    {/* Filter options */}
                    <span className="flex w-full justify-start font-inter text-[32px] font-semibold text-gray-700">
                      My Cards
                    </span>
                    <div
                      className={
                        'flex flex-col w-[352px] rounded-xl relative items-center justify-center my-20'
                      }
                    >
                      {isPublic ? (
                        <>
                          <Cat className="h-[250px] w-[250px] mb-4" />
                          <div className="font-inter font-semibold text-gray-800 text-[24px] mb-2">
                            Wow so empty!
                          </div>
                          <div className="flex font-inter font-semibold text-gray-500 text-[14px] justify-center text-center">
                            Looks like {slug} has not published any cards yet,
                            Check back soon!
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="font-inter font-semibold text-gray-800 text-[24px] mb-2">
                            Wow so empty!
                          </div>
                          <div className="flex font-inter font-semibold text-gray-500 text-[14px] justify-center text-center mb-4">
                            Publish your activities on the internet and show
                            them your true personality!
                          </div>
                          <div className="flex flex-row self-stretch items-end justify-center w-full px-3">
                            <button
                              className="flex flex-row bg-primary text-white px-2 py-[10px] rounded-lg shadow items-center justify-center"
                              onClick={handlePublishCardCreation}
                            >
                              <div className="flex items-center h-full mr-2">
                                <Plus className="stroke-white w-5 h-5" />
                              </div>
                              <div className="w-full text-white font-inter text-base">
                                Publish Now
                              </div>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
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
