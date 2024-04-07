import { ReactElement, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import PrivacyPolicy from './components/home/sections/PrivacyPolicy'
import SignUp from './components/signup'
import ProfileV2 from './components/ProfileV2'
import BadgesList from './components/BadgesList'
import ProfileCards from './components/profile/ProfileCards'
import { UserData } from './components/constants/SignupData'
import { EventProvider } from './components/common/contexts/EventContext'
import Privacy from './components/profile/Settings/Privacy'

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
    slug: '',
    stage: 1,
    verified: false,
    email: '',
    token: ''
  })

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    setIsLoggedIn(!!token) // Convert token to boolean (truthy/falsy)
  }, []) // Empty dependency array: run only on initial render

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    setIsLoggedIn(false) // Update state immediately
  }

  return (
    <EventProvider>
      <div className="h-full w-full">
        <div className="flex flex-col font-inter self-stretch h-full">
          {isLoggedIn && (
            <header className="flex flex-row self-stretch items-center">
              <Navbar
                handleLogout={handleLogout}
                avatar={{ src: user.pfp, alt: 'Profile' }}
                slug={user.slug}
              />
            </header>
          )}

          <Routes>
            <Route
              path="/"
              element={
                user.token ? (
                  <Navigate to={`/profileV2/${user.slug}`} />
                ) : (
                  <Navigate to={`/signup/0`} />
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
              path="/profilev2/:slug"
              element={<ProfileV2 user={user} setUser={setUser} />}
            />
            <Route path="/badges" element={<BadgesList />} />
            <Route
              path="/cards"
              element={<ProfileCards user={user} setUser={setUser} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </EventProvider>
  )
}

export default App
