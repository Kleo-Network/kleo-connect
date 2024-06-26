import React, { useEffect, useState } from 'react'
import config from '../../../common/config'
import useFetch from '../../../common/hooks/useFetch'
import {
  TwitterCard,
  StaticCard as StaticCardType
} from '../../../common/interface'

interface TwitterProps {
  cards?: StaticCardType[] // Replace 'any' with the actual type of createdStaticCards
  setIsXConnected: React.Dispatch<React.SetStateAction<boolean>>
}

const TwitterSignIn: React.FC<TwitterProps> = ({ cards, setIsXConnected }) => {
  const [isTwitterConnected, setIsTwitterConnected] = useState(false)
  const { fetchData: createTwitterCard } = useFetch<any>()
  const CREATE_TWITTER_CARD = 'static-card/x/{slug}'
  const slug = localStorage.getItem('slug') || ''
  const [username, setUsername] = useState('')

  useEffect(() => {
    const getCardinCards = (cardType: string) => {
      if (cards?.find((card) => card.cardType == cardType)) {
        const card = cards?.find((card) => card.cardType == cardType)
        if (card) setUsername((card.metadata as TwitterCard).username)
        return true
      }
      return false
    }
    getCardinCards('XCard')
  }, [])

  const handleSignIn = () => {
    const clientId = config.twitter.clientId
    const redirectUri = config.connection.redirectionUrl
    const scope = 'tweet.read%20users.read%20follows.read%20follows.write'

    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=state&code_challenge=challenge&code_challenge_method=plain`

    window.location.href = authUrl
  }

  function makeTwitterCardUrl(): string {
    return CREATE_TWITTER_CARD.replace('{slug}', slug)
  }

  useEffect(() => {
    const handleTwitterCardCreation = async (code: string) => {
      createTwitterCard(makeTwitterCardUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code: code }),
        onSuccessfulFetch: () => {
          setIsTwitterConnected(true)
          setUsername(slug)
          setIsXConnected(true)
        }
      })
    }

    // Check if the current URL contains the authorization code
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    // Execute handleTwitterCardCreation only if code exists and it's not already handled
    if (code && username === '') {
      handleTwitterCardCreation(code)
    }
  }, [])

  return (
    <div className="flex">
      <div className="w-1/2 pt-2 pl-1 pr-3">
        <div className="flex flex-col items-start justify-center">
          <div className="flex mb-20 flex-col items-start justify-center">
            <span className="text-gray-900 text-base font-sm">
              Twitter Card
            </span>
            <span className="text-gray-400 text-sm font-regular">
              We use your{' '}
              <u className="text-gray-800 bold">
                {' '}
                bio, pinned tweet, follower count, following count{' '}
              </u>{' '}
              to make an awesome twitter profile for you!
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-7">
        {isTwitterConnected || username ? (
          <div>
            <h2 className="text-green-800">Connected @{username} Twitter.</h2>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Twitter
          </button>
        )}
      </div>
    </div>
  )
}

export default TwitterSignIn
