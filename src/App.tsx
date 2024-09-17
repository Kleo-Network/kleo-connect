import { ReactElement, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import PrivacyPolicy from './components/home/sections/PrivacyPolicy'
import SignUp from './components/signup'
import BadgesList from './components/BadgesList'
import { UserData } from './components/constants/SignupData'
import { EventProvider } from './components/common/contexts/EventContext'
import Privacy from './components/profile/Settings/Privacy'
import useFetch, { FetchStatus } from './components/common/hooks/useFetch'
import Settings from './components/profile/Settings'
import Profile from './components/profile'
import config from './components/common/config'

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect
} from '@thirdweb-dev/react'
function App(): ReactElement {
  const emptyStringArray: string[] = []
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
  const { fetchData: fetchUser, data: userDataFromDB } = useFetch<UserData>()

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
    setIsLoggedIn(!!token) // Convert token to boolean (truthy/falsy)
  }, []) // Empty dependency array: run only on initial render

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.clear()
    setIsLoggedIn(false) // Update state immediately
  }

  return (
    <ThirdwebProvider
      activeChain="polygon"
      supportedWallets={[
        metamaskWallet({
          recommended: true
        }),
        coinbaseWallet(),
        walletConnect()
      ]}
      clientId={config.thirdweb.client}
    >
      <EventProvider>
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
                    <Navigate to={`/profile/{abc}`} />
                  )
                }
              />
              <Route
                path="/signup/:step"
                element={
                  <SignUp
                    user={user}
                    setUser={setUser}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                }
              />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route
                path="/profile/:address"
                element={<Profile user={user} setUser={setUser} />}
              />
              <Route path="/badges" element={<BadgesList />} />

              <Route path="/setting" element={<Settings user={user} />} />
              {isLoggedIn ? (
                <Route
                  path="*"
                  element={<Profile user={user} setUser={setUser} />}
                />
              ) : (
                <Route path="*" element={<Navigate to="/" />} />
              )}
            </Routes>
          </div>
        </div>
      </EventProvider>
    </ThirdwebProvider>
  )
}

export default App
