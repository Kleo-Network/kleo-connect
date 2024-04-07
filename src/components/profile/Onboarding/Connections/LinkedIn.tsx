import React, { useState } from 'react'
import { useLinkedIn, LinkedIn } from 'react-linkedin-login-oauth2'
import linkedin from 'react-linkedin-login-oauth2/assets/linkedin.png'
import config from '../../../common/config'
import useFetch from '../../../common/hooks/useFetch'

interface LinkedInTokenResponse {
  access_token: string
  // Add other token properties if needed
}

const LinkedInSignIn: React.FC = () => {
  const CREATE_LINKEDIN_CARD = 'static-card/linkedIn/{slug}'
  const { fetchData: CreateLinkedInCard } = useFetch<any>()
  const [isCardCreated, setIsCardCreated] = useState(false)
  const slug = localStorage.getItem('slug') || ''

  const handleLogin = () => {
    // Step 1: Get the authorization code
    const clientId = config.linkedin.applicationId
    const redirectUri = 'http://localhost:5173/signup/4'

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=foobar&scope=r_dma_portability_3rd_party`

    // Redirect the user to the Calendly authorization page
    window.location.href = authUrl
  }

  const handleCallback = async (code: string) => {
    try {
      console.log('LinkedIn', code)
      CreateLinkedInCard(makeLinkedInCardUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: code
        }),
        onSuccessfulFetch: () => {
          setIsCardCreated(true)
        }
      })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  function makeLinkedInCardUrl(): string {
    return CREATE_LINKEDIN_CARD.replace('{slug}', slug)
  }

  // Check if there is a code parameter in the URL
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')

  // If the code is present, handle the callback
  // if (code && !isCardCreated) {
  //   handleCallback(code)
  // }

  return (
    // <button
    //   onClick={linkedInLogin}
    //   className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    // >
    //   Sign in with LinkedIn
    // </button>
    <div>
      {isCardCreated ? (
        <div>
          <h2>Welcome, {slug}!</h2>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with LinkedIn</button>
      )}
    </div>
  )
}

export default LinkedInSignIn
