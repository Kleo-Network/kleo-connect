import useFetch from '../common/hooks/useFetch'
import {
  UserDataProps,
  fullUserData,
  PendingCard,
  PublishedCard
} from '../common/interface'
import { useState, useEffect, useContext } from 'react'
import Modal from '../common/Modal'
import { NavbarEvents } from '../constants/Events'
import { EventContext } from '../common/contexts/EventContext'
import Settings from '../profile/Settings'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as Cat } from '../../assets/images/astronautCat.svg'
import { ReactComponent as Plus } from '../../assets/images/plus.svg'
import Dashboard from '../../assets/images/dashboard.png'
import CountdownTimer from './../utils/countdown' // Assume this is in the same directory

export default function ProfileV2({ user, setUser }: UserDataProps) {
  const { event, updateEvent } = useContext(EventContext)
  const [userFullData, setUserFullData] = useState<fullUserData | null>(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const endDate = new Date(
    1726690149000 + 10 * 24 * 60 * 60 * 1000
  ).toISOString()

  useEffect(() => {
    const storedSlug = localStorage.getItem('slug')
  }, [])

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Dashboard Image Section */}
      <div className="relative flex-grow flex items-start overflow-hidden">
        <img src={Dashboard} className="filter blur-[2px]" alt="Dashboard" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white p-10 rounded-md shadow-md">
            <h2 className="text-xl  mb-5 text-gray-800">
              You have registered for the $VANA pre-mine! <br />Thanks for installing the Kleo Extension
              <br />
              <br />
              <span className="font-bold">Dashboard Launching in...</span>
            </h2>
            <CountdownTimer endDate={endDate} isProfilePage={true} />
          </div>
        </div>
      </div>

      {/* Welcome Message */}

      {/* Settings Modal */}
      <Modal
        isOpen={event === NavbarEvents.SETTINGS}
        onClose={() => updateEvent(null)}
      >
        <div className="container">
          <Settings user={user} />
        </div>
      </Modal>
    </div>
  )
}
