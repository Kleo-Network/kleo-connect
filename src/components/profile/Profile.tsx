import React, { useContext, useState, useEffect } from 'react'
import ProfileCards from './ProfileCards'
import { ReactComponent as ShareSvg } from '../../assets/images/share.svg'
// import { ReactComponent as AddSvg } from '../../assets/images/add.svg'
import ProfileCard from './ProfileCard'
import BrowsingHistory from './BrowsingHistory/BrowsingHistory'
import Modal from '../common/Modal'
import SocialShare from './Onboarding/SocialSharePopUp'
import { useAuthContext } from '../common/contexts/UserContext'
import { useParams } from 'react-router-dom'
import { EventContext } from '../common/contexts/EventContext'
import { NavbarEvents } from '../constants/Events'
import Settings from './Settings'

export default function Profile() {
  const context = useAuthContext()
  const { slug } = useParams()
  const { event, updateEvent } = useContext(EventContext)

  context!.user.slug = slug || ''

  const kleoProfileUrl = 'https://app.kleo.network/profile/'

  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  return (
    <section>
      <div className="flex flex-col items-start px-6 md:px-24 py-8">
        <header className="flex flex-row items-center justify-between self-stretch">
          <h3 className="text-3xl font-medium text-gray-900">My Profile</h3>
          <div className="flex flex-row gap-2">
            <button
              className="flex flex-row border rounded-lg px-4 py-2 shadow"
              onClick={() => setIsShareModalOpen(true)}
            >
              <ShareSvg className="w-5 h-5 mr-2" />
              <span className="text-sm">Share</span>
            </button>
            {/* <button className="flex flex-row border rounded-lg px-4 py-2 shadow bg-primary text-white">
              <AddSvg className="w-5 h-5 mr-2 stroke-white" />
              <span className="text-sm">Collect</span>
            </button> */}
          </div>
        </header>
        <div className="flex flex-col w-full items-start justify-between py-8 gap-6 md:flex-row">
          {/* <ProfileCards /> */}
          <ProfileCard user={context!.user} />
        </div>
        <BrowsingHistory />

        <Modal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        >
          <div className="container mx-auto p-8">
            <SocialShare profileUrl={kleoProfileUrl + slug} />
          </div>
        </Modal>

        <Modal
          isOpen={event === NavbarEvents.SETTINGS}
          onClose={() => updateEvent(null)}
        >
          <div className="container">
            <Settings user={context!.user} />
          </div>
        </Modal>
      </div>
    </section>
  )
}
