import React, { useState } from 'react'
import Privacy from './Privacy'
import { UserData } from '../../constants/SignupData'
import Mint from './mint'

interface User {
  user: UserData
}

enum TABS {
  //   PROFILE = 'Pofile',
  //   WALLET = 'Wallet Connects',
  //   GITCOIN = 'Gitcoin Passports',
  // PRIVACY = 'Privacy'
  MINT = 'Mint your cards'
  //   TERMS = 'Terms & Conditions'
}

const Settings = ({ user }: User) => {
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.MINT)

  const renderTabContent = () => {
    switch (selectedTab) {
      case TABS.MINT:
        return <Mint />
      //   case TABS.TERMS:
      //     return <div>TERMS</div>
      default:
        return null
    }
  }
  return (
    <div className="flex flex-col items-start self-stretch">
      <div className="px-6 py-5 border-b border-gray-200 justify-between items-center flex self-stretch">
        <div className="text-gray-900 text-lg font-medium">Settings</div>
      </div>
      <div className="justify-start items-start flex">
        <div className="py-4 border-r border-gray-200 justify-start items-start gap-2.5 flex self-stretch">
          <div className="grow shrink min-w-[150px] basis-0 flex-col justify-start items-start gap-1 flex">
            {Object.values(TABS).map((tab) => (
              <button
                key={tab}
                className={`self-stretch pl-6 pr-3 py-2 justify-start items-start gap-2 flex rounded-md hover:bg-gray-100 ${
                  tab === selectedTab && 'bg-gray-200'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                <span className="text-gray-500 text-sm font-medium text-left">
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 flex-col justify-start items-start flex">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default Settings
