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
      <div className="container mx-auto p-6 gap-5 flex  mt-[80px] pt-10">
        {/*Left Column: Points and Data */}
        <div style={{ flex: '0 0 25%', width: '25%', marginRight: '0px' }}>
          <PointsAndDataCard />
        </div>

        {/* Middle Column: Data Quality */}
        <div style={{ flex: '0 0 33%', width: '33%' }}>
          <DataQuality />
        </div>

        {/* Right Column: Milestones */}
        <div style={{ flex: '0 0 38%', width: '38%', minHeight: '450px' }}>
          <Milestones />
        </div>
      </div>
      <div className="container mx-auto p-6 grid lg:grid-cols-3 gap-5 mt-[-10px]">
        {/* <!-- Left Column: Points and Data --> */}
        {/* {PointsAndData()} */}

        {/* <!-- Middle Column: Data Quality and DataQuality --> */}
        {/* {DataQuality()} */}

        {/* <!-- Milestones --> */}
        {/* {Milestones()} */}

        <div className="space-y-6 col-span-2">
          {/* <!-- Snapshot Section --> */}
          <Snapshot />

          {/* <!-- My Referrals Section --> */}
          <Referrals />
        </div>

        {/* <!-- Leaderboard Section with Enhanced Design --> */}
        <Leaderboard />

        {/* <!-- Footer Section --> */}
      </div>
      <div
        className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
        style={{ marginTop: -10 }}
      >
        {/* <!-- Privacy Card --> */}
        <Privacy />

        {/* <!-- Second Leaderboard --> */}
        <LeaderBoardBanner />
      </div>
    </div>
  )
}
export default Profile
