import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import config from '../../../common/config'
import {
  InstagramCard,
  StaticCard as StaticCardType
} from '../../../common/interface'
import useFetch from '../../../common/hooks/useFetch'

interface InstagramProps {
  cards?: StaticCardType[] // Replace 'any' with the actual type of createdStaticCards
  setIsInstaConnected: React.Dispatch<React.SetStateAction<boolean>>
}

const InstagramConnect: React.FC<InstagramProps> = ({
  cards,
  setIsInstaConnected
}) => {
  const [username, setUsername] = useState<string>('')
  const { fetchData: UpdateUserData } = useFetch<any>()
  const CREATE_INSTAGRAM_CARD = 'static-card/instagram/{slug}'
  const [isInstagramConnected, setIsInstagramConnected] = useState(false)
  const slug = localStorage.getItem('slug') || ''

  useEffect(() => {
    const getCardinCards = (cardType: string) => {
      if (cards?.find((card) => card.cardType == cardType)) {
        const card = cards?.find((card) => card.cardType == cardType)
        if (card) setUsername((card.metadata as InstagramCard).username)
        return true
      }
      return false
    }
    getCardinCards('InstaCard')
  }, [])

  const handleConnectInstagram = () => {
    //Step 1: Get the authorization code
    const appId = config.instagram.applicationId
    const redirectUri = config.connection.redirectionUrl
    console.log('rdu', redirectUri)
    console.log('aid', appId)
    // Construct the authorization URL
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`

    // Redirect the user to the authorization URL
    window.location.href = authUrl
  }

  function makeInstaCardUrl(): string {
    return CREATE_INSTAGRAM_CARD.replace('{slug}', slug)
  }

  useEffect(() => {
    const handleInstagramCallback = async (code: string) => {
      try {
        // Exchange the authorization code for an access token
        UpdateUserData(makeInstaCardUrl(), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: code
          }),
          onSuccessfulFetch: () => {
            setIsInstaConnected(true)
            setUsername(slug)
            setIsInstagramConnected(true)
          }
        })
      } catch (error) {
        console.error('Error fetching Instagram photo:', error)
      }
    }

    // Check if there is an authorization code in the URL
    const urlParams = new URLSearchParams(window.location.search)
    const authorizationCode = urlParams.get('code')

    // If there is an authorization code, handle the Instagram callback
    if (authorizationCode && username === '') {
      console.log(authorizationCode)
      handleInstagramCallback(authorizationCode)
    }
  }, [])

  return (
    <div className="flex">
      <div className="w-1/2 pt-2 pl-1 pr-3">
        <div className="flex flex-col items-start justify-center">
          <div className="flex mb-20 flex-col items-start justify-center">
            <span className="text-gray-900 text-base font-sm">
              Instagram Card
            </span>
            <span className="text-gray-400 text-sm font-regular">
              We will put your{' '}
              <u className="text-gray-800 bold">random image</u> in a beautiful
              card!
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-7">
        {isInstagramConnected || username ? (
          <div>
            <h2 className="text-green-800">Connected @{username} instagram.</h2>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleConnectInstagram}
          >
            Login with instagram
          </button>
        )}
      </div>
    </div>
  )
}

export default InstagramConnect
