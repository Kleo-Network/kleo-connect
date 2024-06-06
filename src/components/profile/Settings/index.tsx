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
  <h1 className="text-4xl text-center mt-40">
    <div>
      <div className="relative">
        <div className="absolute top-4 h-full w-0.5 bg-gray-200"></div>
        <ol className="relative text-gray-500">
          <li className="mb-10 ml-12">
            <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white bg-purple-500">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
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
            <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white bg-purple-500">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>
            <h3 className="font-medium leading-tight">
              Select the cards you want to mint
            </h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-purple-500"
                />
                <label className="ml-2 text-sm">Keep me anonymous</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-purple-500"
                  checked
                />
                <label className="ml-2 text-sm">Profile Picture</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-purple-500"
                />
                <label className="ml-2 text-sm">Username</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-purple-500"
                  checked
                />
                <label className="ml-2 text-sm">Static Cards</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-purple-500"
                />
                <label className="ml-2 text-sm">Dynamic Cards</label>
              </div>
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
  </h1>
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
    <div className="flex h-screen justify-screen container mx-auto">
      <div className="w-full flex p-10">
        <div className="w-1/2">
          <MediaLeft />
        </div>
        <div className="w-1/2 pl-20">
          <ConnectRight />
        </div>
      </div>
    </div>
  )
}

export default Settings
