import React, { useEffect, useState, useContext } from 'react'
import { ReactComponent as Logo } from '../../assets/images/kleoLogo.svg'
import { ReactComponent as Privacy } from '../../assets/images/privacy.svg'
import { ReactComponent as Settings } from '../../assets/images/settings.svg'
import { ReactComponent as Hamburger } from '../../assets/images/hamburger.svg'
import { useLocation } from 'react-router-dom'
import { Collapse, Dropdown, initTE } from 'tw-elements'
import { EventContext } from '../common/contexts/EventContext'
import { NavbarEvents } from '../constants/Events'

interface NavbarProps {
  avatar: {
    src: string
    alt: string
  }
}

enum Tab {
  PUBLISH_CARDS = 'publish cards',
  QUESTS = 'quests',
  PRIVACY = 'privacy'
}

const Navbar = ({ avatar }: NavbarProps) => {
  const [selectedTab, setSelectedTab] = React.useState('null')
  const { pathname } = useLocation()
  const { updateEvent } = useContext(EventContext)

  useEffect(() => {
    initTE({ Collapse, Dropdown })
  }, [])

  useEffect(() => {
    if (pathname === '/cards') {
      setSelectedTab(Tab.PUBLISH_CARDS)
    } else if (pathname === '/quests') {
      setSelectedTab(Tab.QUESTS)
    } else if (pathname === '/privacy') {
      setSelectedTab(Tab.PRIVACY)
    } else if (pathname === '/profile') {
      setSelectedTab('null')
    }
  }, [pathname])

  const handleSettingsClick = () => {
    updateEvent(NavbarEvents.SETTINGS)
  }

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between py-2  border-b border-gray-200 bg-white text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 lg:py-3"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-12">
        <a
          className="my-2 gap-2 flex items-center justify-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
          href="/"
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
            {Object.values(Tab).map((tab, i) => {
              return (
                tab !== Tab.PRIVACY && (
                  <li
                    key={i}
                    className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                    data-te-nav-item-ref
                  >
                    <a
                      className={`px-3 py-2 text-gray-700 rounded-md font-medium text-base hover:bg-purple-50 ${
                        selectedTab === tab
                          ? 'text-purple-700 bg-purple-100'
                          : ''
                      }`}
                      href={`/${
                        tab === Tab.PUBLISH_CARDS ? 'cards' : 'badges'
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
          <div className="flex items-center justify-center flex-grow">
            <a href="/profile" className="flex items-center">
              <img
                src={avatar.src}
                alt={avatar.alt}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-gray-700 font-medium">@kleo.network</span>
            </a>
          </div>

          {/* <!-- Right elements --> */}

          <div className="flex items-center">
            <button className="p-2 mr-1 rounded-md bg-primary text-white">
              mint
            </button>
            <button
              data-te-ripple-init
              onClick={handleSettingsClick}
              className="p-2 mr-1 stroke-gray-500 hover:stroke-purple-700 hover:bg-purple-100 rounded-md"
            >
              <Settings className="w-5 h-5 stroke-current" />
            </button>
            <a
              href="/privacy"
              data-te-ripple-init
              className="p-2 mr-1 stroke-gray-500 hover:stroke-purple-700 hover:bg-purple-100 rounded-md"
            >
              <Privacy className="w-5 h-5 stroke-current" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
