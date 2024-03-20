import React, { useState } from 'react'
import axios from 'axios'

interface TwitterUserData {
  bio: string
  pinnedTweet: string
  isVerified: boolean
  followersCount: number
}

const TwitterSignIn: React.FC = () => {
  const [userData, setUserData] = useState<TwitterUserData | null>(null)

  const handleSignIn = () => {
    const clientId = 'YOUR_TWITTER_CLIENT_ID'
    const redirectUri = 'YOUR_REDIRECT_URI'
    const scope = 'users.read tweet.read'

    const authUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`

    window.location.href = authUrl
  }

  const fetchUserData = async (code: string) => {
    try {
      const response = await axios.post(
        'https://api.twitter.com/2/oauth2/token',
        {
          code: code,
          grant_type: 'authorization_code',
          client_id: 'YOUR_TWITTER_CLIENT_ID',
          redirect_uri: 'YOUR_REDIRECT_URI',
          code_verifier: 'YOUR_CODE_VERIFIER'
        }
      )

      const accessToken = response.data.access_token

      if (accessToken) {
        const userResponse = await axios.get(
          'https://api.twitter.com/2/users/me',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
            params: {
              'user.fields':
                'description,pinned_tweet_id,verified,public_metrics',
              'tweet.fields': 'text',
              expansions: 'pinned_tweet_id'
            }
          }
        )

        const userData: TwitterUserData = {
          bio: userResponse.data.data.description,
          pinnedTweet: userResponse.data.includes?.tweets?.[0]?.text || '',
          isVerified: userResponse.data.data.verified,
          followersCount: userResponse.data.data.public_metrics.followers_count
        }

        setUserData(userData)
      } else {
        console.error('Failed to obtain access token')
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  }

  // Check if the current URL contains the authorization code
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  if (code) {
    fetchUserData(code)
  }

  return (
    <div>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Sign in with Twitter
      </button>
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
  )
}

export default TwitterSignIn
