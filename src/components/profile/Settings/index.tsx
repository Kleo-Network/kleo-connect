import { useMemo, useState } from 'react'
import { UserData } from '../../constants/SignupData'
import Mint from './iExec'
import { ReactComponent as Cat } from '../../../assets/images/astronautCat.svg'
import { ConnectWallet } from '@thirdweb-dev/react'
import { createThirdwebClient, getContract, resolveMethod } from 'thirdweb'
import { defineChain } from 'thirdweb/chains'
import { ThirdwebProvider } from 'thirdweb/react'
import { ReactComponent as Explorer } from '../../../assets/images/claim.svg'
import { ReactComponent as Tick } from '../../../assets/images/tick.svg'
interface User {
  user: UserData
}

enum TABS {
  MINT = 'Own your data, earn points'
}

const MediaLeft = () => (
  <div>
    <Explorer />
  </div>
)

const ConnectRight = () => (
  <div className="bg-white p-10 w-full h-full rounded-2xl font-inter tracking-[-0.02em] text-left">
    <h1 className="text-4xl leading-10 pb-3">
      Mint Publish and connect your{' '}
      <span className="text-primary">your data!</span>
    </h1>
    <p className="font-inter text-left text-md leading-md text-gray-500 pb-5">
      You can use this NFT to sign data and be elgibile for more rewards.
    </p>
    <div className="relative">
      <div className="absolute top-4 h-full w-0.5 bg-gray-200"></div>

      <ol className="relative text-gray-500">
        <li className="mb-10 ml-12">
          <span className="absolute flex items-center justify-center w-7 h-7 rounded-full -left-3 ring-4 ring-white bg-purple-500">
            <span className="text-white">1</span>
          </span>
          <div className="ml-4 text-left">
            <h3 className="font-medium leading-tight text-gray-900">
              Connect your wallet
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor
            </p>

            <ConnectWallet />
          </div>
        </li>
        <li className="mb-10 ml-12">
          <span className="absolute -left-0 inline-flex items-center justify-center">
            <span className="absolute flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-purple-100 bg-purple-100">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500">
                <span className="text-white">2</span>
              </span>
            </span>
          </span>
          <h3 className="font-medium leading-tight">
            Select the cards you want to mint
          </h3>
          <div className="mt-2 space-y-2">
            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="vue-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="vue-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Vue JS
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="react-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="react-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    React
                  </label>
                </div>
              </li>
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="angular-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="angular-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Angular
                  </label>
                </div>
              </li>
              <li className="w-full dark:border-gray-600">
                <div className="flex items-center ps-3">
                  <input
                    id="laravel-checkbox-list"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    for="laravel-checkbox-list"
                    className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Laravel
                  </label>
                </div>
              </li>
            </ul>
          </div>
        </li>
        <li className="ml-12">
          <div className="absolute h-1/2 border-l-2 border-dashed border-gray-200"></div>
          <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white bg-purple-100 text-purple-500">
            3
          </span>
          <h3 className="font-medium leading-tight">
            Mint and earn from your data
          </h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod
          </p>
        </li>
      </ol>
    </div>

    <button className="px-4 py-2 mt-8 font-semibold text-white bg-purple-500 rounded-md hover:bg-purple-600">
      Start Minting
    </button>
  </div>
)

const Settings = ({ user }: User) => {
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.MINT)

  const clientId =
    process.env.VITE_KLEO_THIRDWEB_CLIENT_KEY ||
    '9af290ad929c4b6241475020bc16ab09'
  const contractAddress = process.env.VITE_CONTRACT_ADDR || ''
  const client = createThirdwebClient({
    clientId
  })

  const contract = getContract({
    client,
    chain: defineChain(10),
    address: contractAddress
  })

  const renderTabContent = () => {
    switch (selectedTab) {
      case TABS.MINT:
        return <Mint />
      default:
        return null
    }
  }

  return (
    <div className="bg-gray-50">
      <div className="w-full flex p-10 container mx-auto">
        <div className="w-1/2">
          <MediaLeft />
        </div>
        <div className="w-1/2 pl-5">
          <ConnectRight />
        </div>
      </div>
    </div>
  )
}

export default Settings
