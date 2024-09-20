import React, { useState } from 'react'
import PointsAndDataCard from './components/PointsAndData'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import DataQuality from './components/DataQuality'
import Milestones from './components/Milestones'
import Snapshot from './components/Snapshot'
import Referrals from './components/Referrals'
import Leaderboard from './components/Leaderboard'
import Privacy from './components/Privacy'
import LeaderBoardBanner from './components/LeaderBoardBanner'
import Navbar from './components/Navbar'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

function Profile() {
  return (
    <div className="bg-slate-100">
      <Navbar />
      {/* <!-- Main Content --> */}
      <div className="container w-full mx-auto p-6 pb-0 lg:pb-6 gap-5 grid lg:grid-cols-[30%_30%_40%] grid-cols-[42%_58%] mt-[80px] pt-10 h-[500px]">
        {/*Left Column: Points and Data */}
        <div>
          <PointsAndDataCard />
        </div>

        {/* Middle Column: Data Quality */}
        <div className='mr-5 lg:mr-0'>
          <DataQuality />
        </div>

        {/* Right Column: Milestones */}
        <div className='lg:flex hidden lg:mr-10'>
          <Milestones />
        </div>
      </div>
      <div className='lg:hidden flex container mx-auto p-6 gap-5 h-[486px]'>
        <div className='w-1/2'>
          <Milestones />
        </div>
        <div className='w-1/2 '>
          <Leaderboard />
        </div>
      </div>
      <div className="h-fit  container mx-auto px-6 lg:pt-6 grid lg:grid-cols-3 gap-5">
        {/* <!-- Left Column: Points and Data --> */}
        {/* {PointsAndData()} */}

        {/* <!-- Middle Column: Data Quality and DataQuality --> */}
        {/* {DataQuality()} */}

        {/* <!-- Milestones --> */}
        {/* {Milestones()} */}

        <div className="flex h-full flex-col gap-5 xl:gap-0 justify-between lg:col-span-2 col-span-3">
          {/* Snapshot Section */}
          <div className='lg:h-[45%] 2xl:h-[48%]'>
            <Snapshot />
          </div>

          {/* My Referrals Section */}
          <div className='lg:h-[45%] 2xl:h-[48%]'>
            <Referrals />
          </div>
        </div>

        <div className="lg:flex hidden">
          {/* <!-- Leaderboard Section with Enhanced Design --> */}
          <Leaderboard />
        </div>

        {/* <!-- Footer Section --> */}
      </div>
      <div className='container mx-auto p-6 grid lg:grid-cols-[25%_75%] grid-cols-[35%_65%] gap-5'>
        <div>
          <Privacy/>
        </div>
        <div className='mr-5'>
          <LeaderBoardBanner/>
        </div>
      </div>

    </div>
  )
}
export default Profile
