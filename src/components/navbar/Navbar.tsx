import React, { useEffect, useState, useContext } from 'react'
import { ReactComponent as Logo } from '../../assets/images/kleoLogo.svg'
import { ReactComponent as Privacy } from '../../assets/images/privacy.svg'
import { ReactComponent as Settings } from '../../assets/images/settings.svg'
import { ReactComponent as Hamburger } from '../../assets/images/hamburger.svg'
import { ReactComponent as Logout } from '../../assets/images/logout.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { Collapse, Dropdown, initTE } from 'tw-elements'
import { EventContext } from '../common/contexts/EventContext'
import { NavbarEvents } from '../constants/Events'

interface NavbarProps {
  avatar: {
    src: string
    alt: string
  }
  slug: string
  handleLogout: () => void
}

enum Tab {
  PROFILE = 'Profile',
  PUBLISH_CARDS = 'Publish Cards',
  CLAIM_POINTS = 'Claim Points',
  // QUESTS = 'quests',
  PRIVACY = 'privacy'
}

const Navbar = ({ avatar, slug, handleLogout }: NavbarProps) => {
  const [selectedTab, setSelectedTab] = React.useState('null')
  const [showProfileOptions, setShowProfileOptions] = useState(false)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { updateEvent } = useContext(EventContext)

  useEffect(() => {
    initTE({ Collapse, Dropdown })
  }, [])

  useEffect(() => {
    if (pathname === `/profileV2/${getSlug()}`) {
      setSelectedTab(Tab.PROFILE)
    } else if (pathname === '/cards') {
      setSelectedTab(Tab.PUBLISH_CARDS)
    } else if (pathname === '/quests') {
      // setSelectedTab(Tab.QUESTS)
    } else if (pathname === '/privacy') {
      setSelectedTab(Tab.PRIVACY)
    } else if (pathname === '/setting') {
      setSelectedTab(Tab.CLAIM_POINTS)
    } else setSelectedTab('null')
  }, [pathname])

  const handleLogoutClick = () => {
    localStorage.clear()
    handleLogout()
    navigate('/')
  }

  const handleMintClick = () => {
    updateEvent(NavbarEvents.SETTINGS)
  }

  const handleSettingsClick = () => {
    sessionStorage.setItem('isStaticCardUpdating', JSON.stringify(true))
    navigate('/signup/2')
  }

  function getSlug(): string {
    const slug = localStorage.getItem('slug')
    if (slug) {
      return slug
    } else {
      return ''
    }
  }

  function getHomeLink() {
    return `/profileV2/${getSlug()}`
  }

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between py-2  border-b border-gray-200 bg-white text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 lg:py-3"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-12">
        <a
          className="my-2 gap-2 flex items-center justify-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
          href={getHomeLink()}
        >
          <Logo className="w-8 h-8" />
          <h3 className="font-bold text-xl">KLEO</h3>
        </a>
        {/* <!-- Hamburger button for mobile view --> */}
        <button
          className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
          type="button"
          data-te-collapse-init
          data-te-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="[&>svg]:w-7">
            <Hamburger className="w-6 h-6" />
          </span>
        </button>

        {/* <!-- Collapsible navigation container --> */}
        <div
          className="!visible mt-2 ml-4 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
          id="navbarSupportedContent"
          data-te-collapse-item
        >
          <ul
            className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
            data-te-navbar-nav-ref
          >
            {localStorage.getItem('token') &&
              Object.values(Tab).map((tab, i) => {
                return (
                  tab !== Tab.PRIVACY && (
                    <li
                      key={i}
                      className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                      data-te-nav-item-ref
                    >
                      <a
                        className={`px-3 py-2 rounded-md font-inter font-medium text-base ${
                          selectedTab === tab
                            ? 'text-purple-700 bg-purple-50'
                            : 'text-gray-700 bg-white'
                        }`}
                        href={`/${
                          tab === Tab.PROFILE
                            ? `profileV2/${getSlug()}`
                            : tab === Tab.PUBLISH_CARDS
                            ? 'cards'
                            : tab === Tab.CLAIM_POINTS
                            ? 'setting'
                            : 'badges'
                        }`}
                        data-te-nav-link-ref
                      >
                        {tab}
                      </a>
                    </li>
                  )
                )
              })}
          </ul>

          {/* <!-- Right elements --> */}

          <div className="flex items-center">
            <button
              data-te-ripple-init
              onClick={handleSettingsClick}
              className="p-2 mr-1 stroke-gray-500 hover:stroke-purple-700 hover:bg-purple-100 rounded-md"
              title="Add/Update static cards"
            >
              <Settings className="w-5 h-5 stroke-black " />
            </button>
            <a
              href="/privacy"
              data-te-ripple-init
              className="p-2 mr-1 stroke-gray-500 hover:stroke-purple-700 hover:bg-purple-100 rounded-md"
            >
              <Privacy className="w-5 h-5 stroke-current" />
            </a>
            <div
              className="relative flex items-center justify-center flex-grow"
              onMouseEnter={() => setShowProfileOptions(true)}
              onMouseLeave={() => setShowProfileOptions(false)}
            >
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="w-10 h-10 rounded-full ml-2"
              />
              {showProfileOptions && (
                <div className="absolute mt-8 p-2 bg-white shadow-md rounded-lg top-0 right-0 min-w-[160px]">
                  <div className="flex flex-row px-[10px] py-[2px] justify-center items-center">
                    <button
                      className="flex flex-row w-full text-left px-[10px] py-[8px] items-center"
                      onClick={() => handleLogoutClick()}
                    >
                      <Logout className="w-4 h-4 mr-3 stroke-current text-gray-700" />
                      <div className="text-sm font-inter text-gray-700">
                        Logout
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
