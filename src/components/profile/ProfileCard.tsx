import React from 'react'
import { ReactComponent as CopyIcon } from '../../assets/images/copy.svg'
import { ReactComponent as TickIcon } from '../../assets/images/check.svg'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

interface User {
  user: UserProps
}

interface UserProps {
  name: string
  avatar: string
  userId: string
  kleo: number
}

export default function ProfileCard({ user }: User) {
  const [copied, setCopied] = React.useState(false)

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.userId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex max-w-[350px] flex-col self-stretch items-center rounded-lg border border-gray-200 order-first md:order-none">
      <div className="flex flex-col justify-center items-center px-24 pt-6 pb-4">
        {/* <Jazzicon diameter={80} seed={jsNumberForAddress(user.userId)} /> */}

        <img
          src={user.avatar}
          className="w-24 h-24 rounded-full border-4 border-white"
        />
        <div className="text-center">
          <h3 className="text-2xl font-medium text-gray-900">{user.name}</h3>
          <span className="flex flex-row items-center mt-4 text-base font-regular text-gray-500">
            {shortenAddress(user.userId)}
            <button
              className="ml-2 text-gray-400 w-4 h-4"
              onClick={copyToClipboard}
            >
              {copied ? <TickIcon className=" fill-green-500" /> : <CopyIcon />}
            </button>
          </span>
        </div>
      </div>
      <div className="max-w-sm text-center p-2 text-gray-800">
        building @kleo_network, member of superteam DAO and passionate developer
      </div>
      <div className="border-b border-gray-200 w-full" />

      <div className="py-4 text-center flex flex-col gap-2 m-4">
        <div className="grid items-center justify-center grid-cols-3 gap-2">
          <span className="text-violet-800 items-center justify-center text-md font-semibold rounded-full dark:text-violet-800">
            #technology
          </span>
          <span className="text-violet-800 text-center text-md font-semibold rounded-full dark:text-violet-800">
            #devloper
          </span>
          <span className="text-violet-800 text-center text-md font-semibold rounded-full dark:text-violet-800">
            #innovation
          </span>
          <span className="text-violet-800 text-center text-md font-semibold rounded-full dark:text-violet-800">
            #startup
          </span>
          <span className="text-violet-800 items-center justify-center text-md font-semibold rounded-full dark:text-violet-800">
            #technology
          </span>
          <span className="text-violet-800 text-center text-md font-semibold rounded-full dark:text-violet-800">
            #devloper
          </span>
          <span className="text-violet-800 text-center text-md font-semibold rounded-full dark:text-violet-800">
            #innovation
          </span>
        </div>
      </div>
    </div>
  )
}
