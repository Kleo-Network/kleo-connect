import React, { useEffect, useState } from 'react'
import axios from 'axios'
import config from '../../../common/config'
import useFetch from '../../../common/hooks/useFetch'

interface TwitterUserData {
  bio: string
  pinnedTweet: string
  isVerified: boolean
  followersCount: number
}

const TwitterSignIn: React.FC = () => {
  const [userData, setUserData] = useState<TwitterUserData | null>(null)
  const [isTwitterConnected, setIsTwitterConnected] = useState(false)
  const { fetchData: createTwitterCard } = useFetch<any>()
  const CREATE_TWITTER_CARD = 'static-card/x/{slug}'
  const slug = sessionStorage.getItem('slug') || ''

  const handleSignIn = () => {
    const clientId = config.twitter.clientId
    alert(clientId)
    const redirectUri = 'http://localhost:5173/signup/4'
    const scope = 'tweet.read%20users.read%20follows.read%20follows.write'

    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=state&code_challenge=challenge&code_challenge_method=plain`

    window.location.href = authUrl
  }

  function makeGitHubCardUrl(): string {
    return CREATE_TWITTER_CARD.replace('{slug}', slug)
  }

  useEffect(() => {
    const handleTwitterCardCreation = async (code: string) => {
      createTwitterCard(makeGitHubCardUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code
        }),
        onSuccessfulFetch: () => {
          setIsTwitterConnected(true)
        }
      })
    }

    // Check if the current URL contains the authorization code
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    // Execute handleGitHubCardCreation only if code exists and it's not already handled
    if (code && !isTwitterConnected) {
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
                bio, pinned tweet, follower count, following count
              </u>{' '}
              to make an awesome twitter profile for you!
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-7">
        {isTwitterConnected ? (
          <div>
            <h2>Welcome, {slug} for Github!</h2>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign in with Twitter
          </button>
        )}
        {userData && (
          <div className="mt-4">
            <p className="text-lg font-bold">Bio:</p>
            <p>{userData.bio}</p>
            {userData.pinnedTweet && (
              <>
                <p className="text-lg font-bold mt-2">Pinned Tweet:</p>
                <p>{userData.pinnedTweet}</p>
              </>
            )}
            <p className="mt-2">
              <span className="font-bold">Verified:</span>{' '}
              {userData.isVerified ? 'Yes' : 'No'}
            </p>
            <p>
              <span className="font-bold">Followers:</span>{' '}
              {userData.followersCount}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TwitterSignIn
