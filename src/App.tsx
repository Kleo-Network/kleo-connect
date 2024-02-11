import { ReactElement, useEffect, useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Profile from './components/profile/Profile'
import Navbar from './components/navbar/Navbar'
import History from './components/history/History'
import PrivacyPolicy from './components/home/sections/PrivacyPolicy'
import SignUp from './components/signup'
import Feed from './components/home/sections/feed'
import { EventProvider } from './components/common/contexts/EventContext'
import { useAccountInfo } from '@particle-network/connectkit'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './components/common/contexts/UserContext'

function App(): ReactElement {
  const [user, setUser] = useState({
    name: '',
    avatar: 'https://avatars.githubusercontent.com/u/47280571?v=4',
    address: '',
    kleo: 100,
    userId: '',
    loggedIn: false,
    jwtToken: ''
  })
  const { account, particleProvider } = useAccountInfo()
  const navigate = useNavigate()
  useEffect(() => {
    if (account) {
      setUser((prevUser) => ({
        ...prevUser,
        userId: account
      }))
    }
    console.log('account from app.tsx', account)
  }, [account])

  return (
    <UserContext.Provider value={{ user }}>
      <div className="h-full w-full">
        <div className="flex flex-col font-inter self-stretch h-full">
          <header className="flex flex-row self-stretch items-center">
            <Navbar avatar={{ src: user.avatar, alt: 'Profile' }} />
          </header>
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
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  )
}

export default App
