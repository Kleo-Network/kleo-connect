import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import config from '../../../common/config'

interface InstagramMedia {
  id: string
  caption: string
  media_url: string
}

interface InstagramTokenResponse {
  access_token: string
  user_id: number
}

const InstagramConnect: React.FC = () => {
  const [userPhoto, setUserPhoto] = useState<string | null>(null)

  const handleConnectInstagram = () => {
    // Replace with your own app ID and redirect URI
    const appId = '1206257517422454'
    const redirectUri = config.connection.redirectionUrl

    // Construct the authorization URL
    const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${redirectUri}&scope=user_profile,user_media&response_type=code`

    // Redirect the user to the authorization URL
    window.location.href = authUrl
  }

  const handleInstagramCallback = async (code: string) => {
    try {
      // Exchange the authorization code for an access token
      const tokenResponse: AxiosResponse<InstagramTokenResponse> =
        await axios.post('https://api.instagram.com/oauth/access_token', {
          client_id: '1206257517422454',
          client_secret: '6c95cdefe002c75b95f8d3cd8b962452',
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:5173/signup/4',
          code: code
        })
      console.log(tokenResponse)

      const accessToken = tokenResponse.data.access_token
      console.log(accessToken)

      // Fetch the user's media
      const mediaResponse: AxiosResponse<{ data: InstagramMedia[] }> =
        await axios.get(
          `https://graph.instagram.com/me/media?fields=id,caption,media_url&access_token=${accessToken}`
        )

      const media = mediaResponse.data.data

      // Select a random photo from the user's media
      const randomIndex = Math.floor(Math.random() * media.length)
      const randomPhoto = media[randomIndex].media_url

      setUserPhoto(randomPhoto)
    } catch (error) {
      console.error('Error fetching Instagram photo:', error)
    }
  }

  // Check if there is an authorization code in the URL
  const urlParams = new URLSearchParams(window.location.search)
  const authorizationCode = urlParams.get('code')

  // If there is an authorization code, handle the Instagram callback
  if (authorizationCode) {
    console.log(authorizationCode)
    handleInstagramCallback(authorizationCode)
  }

  return (
    <div>
      {userPhoto ? (
        <img src={userPhoto} alt="Random Instagram Photo" />
      ) : (
        <button onClick={handleConnectInstagram}>Connect to Instagram</button>
      )}
    </div>
  )
}

export default InstagramConnect
