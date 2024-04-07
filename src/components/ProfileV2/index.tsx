import Feeds from '../profile/Feed/Feed'
import ProfileV3 from '../ProfileV3/index'
import useFetch from '../common/hooks/useFetch'
import {
  UserDataProps,
  fullUserData,
  StaticCard as StaticCardType
} from '../common/interface'
import { useState, useEffect } from 'react'
export default function ProfileV2({ user, setUser }: UserDataProps) {
  const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false)
  const [userFullData, setUserFullData] = useState<fullUserData | null>(null)
  const {
    status,
    data,
    error,
    fetchData: fetchFullUserData
  } = useFetch<fullUserData>()

  const [createdStaticCards, setCreatedStaticCards] =
    useState<StaticCardType[]>()

  const GET_STATIC_CARDS = 'cards/static/{slug}'
  const { error: _errorstatic, fetchData: fetchStaticCards } = useFetch()
  const GET_USER_API = 'user/get-user/{slug}'
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
      <div className="flex w-full items-center mx-auto justify-center">
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
            {userFullData?.user && (
              <Feeds
                data={userFullData?.published_cards}
                user={userFullData?.user}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
