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

// Fetching User Full Data. [Static Cards, Published Cards, User]

export default function ProfileV2({ user, setUser }: UserDataProps) {
  const { event, updateEvent } = useContext(EventContext)
  const [userFullData, setUserFullData] = useState<fullUserData | null>(null)
  const { slug } = useParams()
  const navigate = useNavigate()

  // Check if the current slug matches the one in localStorage, and set the isPublic flag accordingly.
  useEffect(() => {
    const storedSlug = localStorage.getItem('slug')
  }, [])

  // Fetch Pending Cards.

  // Click Handlers.

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Banner Section */}

      {/* Profile Section */}
      <div className="flex flex-col w-full mt-[50px] items-center mx-auto">
        <div className="w-[75%] gap-6 h-80 flex flex-col justify-center">
          <h1>Welcome user {user.address}</h1>
          <h2>New dashboard comming in while</h2>
        </div>
      </div>

      {/* Published Cards Section */}
      <div className="flex w-full items-center mx-auto justify-center mt-5 bg-gray-50">
        <div className="w-[75%] grid"></div>
      </div>

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
