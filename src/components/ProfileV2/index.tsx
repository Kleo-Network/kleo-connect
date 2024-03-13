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
      <div className="mx-auto container p-5">
        <section>
          <div className="flex flex-col md:flex-row">
            {/* User activity */}
            <div className="flex basis-4/5 flex-col">
              {/* Activity charts and badges */}
              <div className="flex flex-col self-stretch items-start justify-between md:flex-row">
                <div className="flex flex-row flex-1 border-gray-200 md:max-h-[250px]">
                  <div className="w-full mb-4 flex flex-col items-center self-stretch rounded-lg border border-gray-200 shadow-[0_5px_5px_4px_rgba(0,0,0,0.2)] ">
                    <div className="h-full w-full px-5 flex items-center mt-2">
                      <ResponsiveContainer
                        className="w-8/10"
                        width="100%"
                        height="100%"
                      >
                        <BrowsingHistoryRadarChart
                          browsingData={BrowsingHistoryForRadarChart}
                          radarCharName="Visit count"
                          dataKey="category"
                          dataKeyForRadar="categoryVisits"
                        />
                      </ResponsiveContainer>
                    </div>
                    <p className="text-center mb-2 dark:text-violet-800">
                      Browsing history
                    </p>
                  </div>
                  <div className="w-full mb-4 mx-4 flex flex-col items-center self-stretch rounded-lg border border-gray-200 shadow-[0_5px_5px_4px_rgba(0,0,0,0.2)] ">
                    <div className="w-full h-full flex flex-row items-center justify-center self-stretch px-2 my-4">
                      <div className="w-full h-full flex justify-center items-center w-1/3">
                        <img
                          src="https://bonkcoin.com/static/media/bonkog_200.e87b5d92088ca7a75178.png"
                          alt="7 day strike"
                          className="w-28 h-28 rounded-full"
                        />
                      </div>
                      <div className="w-full h-full flex justify-center items-center w-1/3">
                        <img
                          src="\src\assets\images\superteam.png"
                          alt="15 day strike"
                          className="w-28 h-28 rounded-full"
                        />
                      </div>
                      {/* <div className="w-full h-full flex flex-col justify-center items-center w-1/3">
                      <img
                      src="src\assets\images\community.svg"
                      alt="7 day strike"
                      className="w-28 h-28 rounded-full"
                      />
                    </div> */}
                    </div>
                    <p className="text-center mb-2 dark:text-violet-800">
                      Badges
                    </p>
                  </div>
                </div>
              </div>
              <Feeds data={FeedCardMock} user={user} />
            </div>
            {/* user profile */}
            <div className="basis-1/5 flex order-first md:order-none mb-4">
              <ProfileCardV2 user={user} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
