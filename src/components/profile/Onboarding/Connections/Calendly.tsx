import React, { useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import config from '../../../common/config'
import useFetch from '../../../common/hooks/useFetch'
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
  const { fetchData: UpdateUserData } = useFetch<any>()
  const CREATE_CALENDLY_CARD = 'static-card/calendly/{slug}'
  const [isCardCreated, setIsCardCreated] = useState(false)
  const slug = sessionStorage.getItem('slug') || ''

  const handleLogin = () => {
    // Step 1: Get the authorization code
    const clientId = config.calendly.apiKey
    const redirectUri = 'http://localhost:5173/signup/4'
    const responseType = 'code'

    const authUrl = `https://calendly.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}`

    // Redirect the user to the Calendly authorization page
    window.location.href = authUrl
  }

  function makeCalendyCardUrl(): string {
    return CREATE_CALENDLY_CARD.replace('{slug}', slug)
  }

  const handleCallback = async (code: string) => {
    try {
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

      UpdateUserData(makeCalendyCardUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: accessToken
        }),
        onSuccessfulFetch: () => {
          setIsCardCreated(true)
          setUsername(slug)
        }
      })
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
    <div className="flex">
      <div className="w-1/2 pt-2 pl-1 pr-3">
        <div className="flex flex-col items-start justify-center">
          <div className="flex mb-20 flex-col items-start justify-center">
            <span className="text-gray-900 text-base font-sm">
              Calendly Card
            </span>
            <span className="text-gray-400 text-sm font-regular">
              We will put your{' '}
              <u className="text-gray-800 bold">calendly link</u> in a beautiful
              card!
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/2 mt-7">
        {isCardCreated ? (
          <div>
            <h2>Welcome, {username}!</h2>
          </div>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogin}
          >
            Login with Calendly
          </button>
        )}
      </div>
    </div>
  )
}

export default CalendlyLogin
