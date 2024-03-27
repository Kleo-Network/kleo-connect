import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import config from '../../../common/config'
interface CalendlyUserResponse {
  resource: {
    slug: string
    // Add other user properties if needed
  }
}

interface CalendlyTokenResponse {
  access_token: string
  // Add other token properties if needed
}

const CalendlyLogin: React.FC = () => {
  const [username, setUsername] = useState<string>('')

  const handleLogin = () => {
    alert(config.calendly.apiKey)
    alert(config.calendly.clientSecret)
    // Step 1: Get the authorization code
    const clientId = config.calendly.apiKey
    const redirectUri = 'http://localhost:5173/signup/4'
    const responseType = 'code'

    const authUrl = `https://calendly.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`

    // Redirect the user to the Calendly authorization page
    window.location.href = authUrl
  }

  const handleCallback = async (code: string) => {
    try {
      // Step 2: Exchange the authorization code for an access token
      const response: AxiosResponse<CalendlyTokenResponse> = await axios.post(
        'https://calendly.com/oauth/token',
        {
          client_id: config.calendly.apiKey,
          client_secret: config.calendly.clientSecret,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:5173/signup/4'
        }
      )

      const accessToken = response.data.access_token
      console.log('accessToken', accessToken)
      // Step 3: Get the user details using the access token
      const userResponse: AxiosResponse<CalendlyUserResponse> = await axios.get(
        'https://api.calendly.com/users/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      )
      console.log(userResponse.data)
      const username = userResponse.data.resource.slug
      setUsername(username)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // Check if there is a code parameter in the URL
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  // If the code is present, handle the callback
  if (code && username === '') {
    handleCallback(code)
  }

  return (
    <div>
      {username ? (
        <div>
          <h2>Welcome, {username}!</h2>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Calendly</button>
      )}
    </div>
  )
}

export default CalendlyLogin
