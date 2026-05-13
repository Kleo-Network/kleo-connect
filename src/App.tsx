import { ReactElement, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import SignUp from './pages/signup'
import { UserData } from './common/constants/SignupData'
import Profile from './pages/profile'

import { MyData } from './pages/profile/components/MyData'
import useFetch from './common/hooks/useFetch'
function App(): ReactElement {
  const emptyStringArray: string[] = []
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<UserData>({
    about: '',
    badges: emptyStringArray,
    content_tags: emptyStringArray,
    identity_tags: emptyStringArray,
    last_attested: Math.floor(Date.now() / 1000),
    last_cards_marked: Math.floor(Date.now() / 1000),
    name: 'Kleo User',
    pfp: 'https://pbs.twimg.com/profile_images/1590877918015926272/Xl2Bd-X2_400x400.jpg',
    profile_metadata: {},
    settings: {},
    address: '',
    stage: 1,
    verified: false,
    email: '',
    token: ''
  })
  const GET_USER_API = 'user/get-user/{address}'
  const { fetchData: fetchUser } = useFetch<UserData>()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token) // Update isLoggedIn based on token presence
    setIsLoading(false) // Mark loading as complete
  }, [])

  function makeUserUpdationUrl(address_string: string): string {
    const address = localStorage.getItem('address') || ''
    return address_string.replace('{address}', address)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    fetchUser(makeUserUpdationUrl(GET_USER_API), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      onSuccessfulFetch: (data) => {
        if (data) {
          setUser(data)
        }
      }
    })
    setIsLoggedIn(!!token) // Set isLoggedIn based on token presence
    setIsLoading(false) // Indicate loading is complete
  }, []) // Empty dependency array: run only on initial render

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <div className="flex flex-col font-inter self-stretch h-full">
        {/* {isLoggedIn && (
              <header className="flex flex-row self-stretch items-center">
                <Navbar
                  handleLogout={handleLogout}
                  avatar={{ src: user.pfp, alt: 'Profile' }}
                  slug={user.address}
                />
              </header>
            )} */}

        <Routes>
          <Route
            path="/"
            element={
              user.token ? (
                <Navigate to={`/profile/${user.address}`} />
              ) : (
                /*<Navigate to={`/profile/${user.address}`} />*/
                <Navigate to={`/signup/0`} />
              )
            }
          />
          <Route path="/signup/:step" element={<SignUp />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/profile/:address" element={<Profile />} />

          {isLoggedIn && <Route path="my-data/:address" element={<MyData />} />}
          {isLoggedIn ? (
            <Route path="*" element={<Profile />} />
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </div>
    </div>
  )
}

export default App
