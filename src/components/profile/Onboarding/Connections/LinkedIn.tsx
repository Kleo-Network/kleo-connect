import React from 'react'
import { useLinkedIn } from 'react-linkedin-login-oauth2'

const LinkedInSignIn: React.FC = () => {
  const { linkedInLogin } = useLinkedIn({
    clientId: '865y5grz09krar',
    redirectUri: 'http://localhost:5173/signup/4',
    onSuccess: (code) => {
      console.log('LinkedIn authentication successful')
      fetchUserProfile(code)
      console.log('code', code)
    },
    onError: (error) => {
      console.error('LinkedIn authentication error:', error)
    }
  })

  const fetchUserProfile = async (code: string) => {
    try {
      const response = await fetch('https://api.linkedin.com/v2/me', {
        headers: {
          Authorization: `Bearer ${code}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        console.log('LinkedIn user profile:', data)
        // Process the user profile data as needed
      } else {
        console.error('Error fetching LinkedIn user profile')
      }
    } catch (error) {
      console.error('Error fetching LinkedIn user profile:', error)
    }
  }

  return (
    <button
      onClick={linkedInLogin}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Sign in with LinkedIn
    </button>
  )
}

export default LinkedInSignIn
