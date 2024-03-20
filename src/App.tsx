import { ReactElement, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/Navbar'
import PrivacyPolicy from './components/home/sections/PrivacyPolicy'
import SignUp from './components/signup'
import { UserContext } from './components/common/contexts/UserContext'
import ProfileV2 from './components/ProfileV2'
import ProfileV3 from './components/ProfileV3'
import BadgesList from './components/BadgesList'
import ProfileCards from './components/profile/ProfileCards'
function App(): ReactElement {
  const [account, setAccount] = useState(null)
  const [user, setUser] = useState({
    name: '',
    avatar:
      'https://pbs.twimg.com/profile_images/1590877918015926272/Xl2Bd-X2_400x400.jpg',
    address: '',
    kleo: 100,
    userId: '',
    loggedIn: false,
    jwtToken: ''
  })

  return (
    <UserContext.Provider value={{ user }}>
      <div className="h-full w-full">
        <div className="flex flex-col font-inter self-stretch h-full">
          {account && (
            <header className="flex flex-row self-stretch items-center">
              <Navbar avatar={{ src: user.avatar, alt: 'Profile' }} />
            </header>
          )}

          <Routes>
            <Route
              path="/"
              element={
                account ? (
                  <Navigate to={`/profile/${user.userId}`} />
                ) : (
                  <Navigate to={`/signup/0`} />
                )
              }
            />
            <Route path="/signup/:step" element={<SignUp />} />

            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/profilev2" element={<ProfileV2 />} />
            <Route path="/badges" element={<BadgesList />} />
            <Route path="/cards" element={<ProfileCards />} />
            <Route path="/profilev3" element={<ProfileV3 />} />
            <Route path="/Badges" element={<BadgesList />} />
            <Route path="/Profilecard" element={<ProfileCards />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App
