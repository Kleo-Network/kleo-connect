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
      {/* Main Content */}
      <div className="container mx-auto p-6 gap-5 grid grid-cols-1 mt-[80px] pt-10">

        {/* First Row: Total Points (wide) | Data Quality (medium) | Milestones (narrow) */}
        <div className="grid grid-cols-[0.245fr_0.333fr_0.422fr] gap-5">
          <div>
            <PointsAndDataCard />
          </div>
          <div>
            <DataQuality />
          </div>
          <div>
            <Milestones />
          </div>
        </div>

        {/* Combined Row: Snapshot & Referrals (stacked) | Leaderboard (full height) */}
        <div className="grid grid-cols-[0.673fr_0.327fr] gap-5">
          {/* Left Column: Flex container with Snapshot (row 1) and Referrals (row 2) */}
          <div className="flex flex-col gap-5">
            <div className="flex-grow">
              <Snapshot />
            </div>
            <div className="flex-grow">
              <Referrals />
            </div>
          </div>

          {/* Right Column: Leaderboard (takes the full height of the left column) */}
          <div className="flex-grow">
            <Leaderboard />
          </div>
        </div>


        {/* Fourth Row: Your Privacy (medium) | App Showcase (medium) */}
        <div className="grid grid-cols-[0.327fr_0.673fr] gap-5">
          <div>
            <Privacy />
          </div>
          <div>
            <LeaderBoardBanner />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;

