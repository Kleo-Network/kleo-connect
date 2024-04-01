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
import ProfileBio from './ProfileBio'
import GitHubCard from '../profile/ProfileCards/Github'
import TwitterCard from '../profile/ProfileCards/Twitter'
import MonthlyCalendarCard from '../profile/ProfileCards/Calendly'
import MapCard from '../profile/ProfileCards/MapCard'
import TextCard from '../profile/ProfileCards/TextCard'
import InstagramPostCard from '../profile/ProfileCards/Instagram'
import LinkedInCard from '../profile/ProfileCards/LinkedIn'
import MintProfile from './connect'
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

const contributions = [
  { date: '2023-05-01', count: 10 },
  { date: '2023-05-02', count: 5 },
  { date: '2023-05-03', count: 8 },
  { date: '2023-05-04', count: 12 },
  { date: '2023-05-05', count: 15 },
  { date: '2023-05-06', count: 20 },
  { date: '2023-05-07', count: 25 },
  { date: '2023-05-08', count: 30 },
  { date: '2023-05-09', count: 35 },
  { date: '2023-05-10', count: 40 },
  { date: '2023-05-11', count: 45 },
  { date: '2023-05-12', count: 50 },
  { date: '2023-05-13', count: 55 },
  { date: '2023-05-14', count: 60 },
  { date: '2023-05-15', count: 65 },
  { date: '2023-05-16', count: 70 },
  { date: '2023-05-17', count: 75 },
  { date: '2023-05-18', count: 80 },
  { date: '2023-05-19', count: 85 },
  { date: '2023-05-20', count: 90 },
  { date: '2023-05-21', count: 95 },
  { date: '2023-05-22', count: 100 },
  { date: '2023-05-23', count: 105 },
  { date: '2023-05-24', count: 110 },
  { date: '2023-05-25', count: 115 },
  { date: '2023-05-26', count: 120 },
  { date: '2023-05-27', count: 125 },
  { date: '2023-05-28', count: 130 },
  { date: '2023-05-29', count: 135 },
  { date: '2023-05-30', count: 140 },
  { date: '2023-05-31', count: 145 },
  // Add more contribution data...
  { date: '2023-06-01', count: 150 },
  { date: '2023-06-02', count: 155 },
  { date: '2023-06-03', count: 160 },
  { date: '2023-06-04', count: 165 },
  { date: '2023-06-05', count: 170 },
  { date: '2023-06-06', count: 175 },
  { date: '2023-06-07', count: 180 },
  { date: '2023-06-08', count: 185 },
  { date: '2023-06-09', count: 190 },
  { date: '2023-06-10', count: 195 },
  { date: '2023-06-11', count: 200 },
  { date: '2023-06-12', count: 205 },
  { date: '2023-06-13', count: 210 },
  { date: '2023-06-14', count: 215 },
  { date: '2023-06-15', count: 220 },
  { date: '2023-06-16', count: 225 },
  { date: '2023-06-17', count: 230 },
  { date: '2023-06-18', count: 235 },
  { date: '2023-06-19', count: 240 },
  { date: '2023-06-20', count: 245 },
  { date: '2023-06-21', count: 250 },
  { date: '2023-06-22', count: 255 },
  { date: '2023-06-23', count: 260 },
  { date: '2023-06-24', count: 265 },
  { date: '2023-06-25', count: 270 },
  { date: '2023-06-26', count: 275 },
  { date: '2023-06-27', count: 280 },
  { date: '2023-06-28', count: 285 },
  { date: '2023-06-29', count: 290 },
  { date: '2023-06-30', count: 295 },
  { date: '2023-07-01', count: 300 },
  { date: '2023-07-02', count: 305 },
  { date: '2023-07-03', count: 310 },
  { date: '2023-07-04', count: 315 },
  { date: '2023-07-05', count: 320 },
  { date: '2023-07-06', count: 325 },
  { date: '2023-07-07', count: 330 },
  { date: '2023-07-08', count: 335 },
  { date: '2023-07-09', count: 340 },
  { date: '2023-07-10', count: 345 },
  { date: '2023-07-11', count: 350 },
  { date: '2023-07-12', count: 355 },
  { date: '2023-07-13', count: 360 },
  { date: '2023-07-14', count: 365 },
  { date: '2023-07-15', count: 370 },
  { date: '2023-07-16', count: 375 },
  { date: '2023-07-17', count: 380 },
  { date: '2023-07-18', count: 385 },
  { date: '2023-07-19', count: 390 },
  { date: '2023-07-20', count: 395 },
  { date: '2023-07-21', count: 400 },
  { date: '2023-07-22', count: 405 },
  { date: '2023-07-23', count: 410 },
  { date: '2023-07-24', count: 415 },
  { date: '2023-07-25', count: 420 },
  { date: '2023-07-26', count: 425 },
  { date: '2023-07-27', count: 430 },
  { date: '2023-07-28', count: 435 },
  { date: '2023-07-29', count: 440 },
  { date: '2023-07-30', count: 445 }
]

const userSample = {
  username: 'vaibhavgeek',
  avatar: 'https://via.placeholder.com/150',
  bio: 'Frontend Developer | React Enthusiast | Coffee Lover',
  followersCount: 500,
  followingCount: 150
}

const pinnedTweetSample = {
  content:
    'Really excited to start my new project using React 18! Stay tuned for more updates. #React #WebDevelopment',
  date: '2023-04-15'
}

const experiences = [
  {
    icon: 'https://theme.zdassets.com/theme_assets/1024340/78b0cd1ea78d2763fb98cb466ef065903b5efc0b.png', // LinkedIn icon
    designation: 'Software Engineer',
    placeOfWork: 'Google'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png', // Briefcase icon
    designation: 'Frontend Developer',
    placeOfWork: 'Facebook'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/733/733553.png', // GitHub icon
    designation: 'Open Source Contributor',
    placeOfWork: 'GitHub'
  },
  {
    icon: 'https://cdn-icons-png.flaticon.com/512/5968/5968672.png', // Globe icon
    designation: 'Web Developer',
    placeOfWork: 'Freelancer'
  }
]

const calendlyUrl = 'https://calendly.com/vaibhav-dkm/'

export default function ProfileV3() {
  const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false)

  return (
    <>
      <div className="col-span-2 row-span-1 rounded-[5px] p-2.5">
        <ProfileBio user={user} />
      </div>
      <div className="col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
        <TextCard
          content={
            'Hello World, right now I am just building kleo network, we are to create data owned identities, this will enable web3 applications like never before.'
          }
        />
      </div>
      <div className="col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
        <TwitterCard user={userSample} />
      </div>

      <div className="col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
        <MonthlyCalendarCard calendlyUrl={calendlyUrl} />
      </div>
      {/*

      <div className="col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
        <MapCard city={'Mumbai'} country={'India'} lat={22.3} lng={73.07} />
      </div>
      <div className="col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
        <TextCard
          content={
            'Hello World, right now I am just building kleo network, we are to create data owned identities, this will enable web3 applications like never before.'
          }
        />
      </div> */}
    </>
  )
}
