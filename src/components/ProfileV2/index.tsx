import { ResponsiveContainer } from 'recharts'
import { BrowsingHistoryForRadarChart } from '../mocks/BrowsingHistroyForRadarMock'
import BrowsingHistoryRadarChart from '../common/charts/RadarChart'
import ProfileCardV2 from '../profile/ProfieCardV2'
import { FeedCardMock } from '../mocks/FeedCardMock'
import FeedCard from '../profile/Feed/FeedCard'
import Accordion from '../common/Accordion'
import { useState } from 'react'
import ProfileCards from '../profile/ProfileCards'
import { ReactComponent as Cross } from '../../assets/images/cross.svg'
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg'
import Feeds from '../profile/Feed/Feed'
import ProfileStaticCards from '../ProfileV3/index'
const user = {
  name: 'Nick Stark',
  avatar:
    'https://pbs.twimg.com/profile_images/1590877918015926272/Xl2Bd-X2_400x400.jpg',
  userId: '7B3FeQJ2SZa4Tw9gJXu7zzdmivY9ot17uXSCko1zMeTu',
  kleo: 152,
  bio: "Hello! I'm proud member of @kleo_network and part of the esteemed Superteam DAO. With a relentless passion for development, I dive deep into crafting innovative solutions and pushing the boundaries of what's possible in the tech world. Whether it's building robust applications or contributing to open-source projects, I thrive on the challenges of software development ",
  hashtags: [
    'technology',
    'devloper',
    'innovation',
    'startup',
    'technology',
    'devloper',
    'innovation'
  ]
}

const ProfileCard = () => {
  return (
    <div className="flex items-center space-x-4 p-4 rounded-lg">
      <img
        src="https://via.placeholder.com/50"
        alt="Avatar"
        className="w-12 h-12 rounded-full"
      />
      <div>
        <h2 className="text-lg font-bold">Vaibhav Maheshwari</h2>
        <p className="text-gray-400 text-sm">
          Building kleo network, enjoy swimming and reading in my free time.
          Mostly active on twitter and email.
        </p>
        <p className="text-blue-500 text-sm">#developer</p>
      </div>
    </div>
  )
}

const StatusMessage = () => {
  return (
    <div className="flex bg-[#F4EBFF] flex-col space-y-2 bg-gray-200 p-6 rounded-3xl">
      <span className="self-start text-gray text-3xl">👋👋👋👋👋</span>
      <p className="text-gray text-sm font-medium tracking-tight">
        i'm currently in sf to spend some time with my family and meet new
        people!
      </p>
    </div>
  )
}

const Map = () => {
  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <img
        src="https://via.placeholder.com/300x200"
        alt="Map"
        className="w-full h-auto rounded-lg"
      />
    </div>
  )
}

const GridComponent = () => {
  return <div></div>
}

export default function ProfileV2() {
  const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false)

  return (
    <div className="flex flex-col">
      <div className="h-full w-full flex flex-row bg-violet-900 self-stretch items-center justify-between">
        <div className="h-full w-full flex flex-row items-center justify-center self-stretch">
          <span className="text-white text-l font-semibold m-2">
            {' '}
            New cards arriving in{' '}
          </span>
          <span className="text-white text-2xl font-semibold my-2">
            09:12:33
          </span>
        </div>
        <div>
          <div className="h-6 w-24 m-2 flex flex-col bg-white items-center self-stretch rounded-lg border border-gray-200 shadow-[0_5px_5px_4px_rgba(255,255,255,0.2)] ">
            <p className="text-center font-medium text-sm dark:text-violet-800">
              Notify
            </p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center mx-auto justify-center">
        <div className="flex w-full justify-center">
          <div className="w-[75%] grid grid-cols-8 gap-1">
            <ProfileStaticCards />
          </div>
        </div>
      </div>
      <div className="flex w-full items-center mx-auto justify-center">
        <div className="flex w-full justify-center">
          <div className="w-[75%] grid">
            <Feeds data={FeedCardMock} user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}
