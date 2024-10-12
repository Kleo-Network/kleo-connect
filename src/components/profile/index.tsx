import React, { useEffect, useRef, useState } from 'react'
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
  // Define the ref with the type of an HTMLDivElement
  const milestonesRef = useRef<HTMLDivElement | null>(null);
  const [milestonesHeight, setMilestonesHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (milestonesRef.current) {
        setMilestonesHeight(milestonesRef.current.clientHeight);
      }
    };

    updateHeight();
    // Add event listener for resizing in case window size changes
    window.addEventListener('resize', updateHeight);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div className="bg-slate-100 min-h-screen">
      <Navbar />
      {/* Main Content */}
      <div className="container mx-auto p-6 gap-5 grid grid-cols-1 xl:grid-cols-1 mt-[80px] pt-10">

        {/* Layout for >xl */}
        <div className="hidden xl:grid gap-5">
          {/* First Row: PointsAndDataCard (wide) | DataQuality (medium) | Milestones (narrow) */}
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

          {/* Second Row: Snapshot & Referrals (stacked) | Leaderboard (full height) */}
          <div className="grid grid-cols-[0.673fr_0.327fr] gap-5">
            <div className="flex flex-col gap-5">
              <div className="flex-grow">
                <Snapshot />
              </div>
              <div className="flex-grow">
                <Referrals />
              </div>
            </div>
            <div className="flex-grow">
              <Leaderboard />
            </div>
          </div>

          {/* Third Row: Privacy | LeaderBoardBanner */}
          <div className="grid grid-cols-[0.327fr_0.673fr] gap-5">
            <div>
              <Privacy />
            </div>
            <div>
              <LeaderBoardBanner />
            </div>
          </div>
        </div>

        {/* Layout for <xl */}
        <div className="xl:hidden grid gap-5">
          {/* First Row: PointsAndDataCard and DataQuality */}
          <div className="grid grid-cols-[0.412fr_0.588fr] gap-5">
            <div>
              <PointsAndDataCard />
            </div>
            <div>
              <DataQuality />
            </div>
          </div>

          {/* Second Row: Milestones and Leaderboard */}
          <div className="grid grid-cols-2 gap-5">
            {/* Milestones Column */}
            <div ref={milestonesRef} className="self-start">
              <Milestones />
            </div>

            {/* Leaderboard Column with Scroll */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: milestonesHeight }}
            >
              <Leaderboard />
            </div>
          </div>

          {/* Third Row: Snapshot */}
          <div className="grid grid-cols-1">
            <Snapshot />
          </div>

          {/* Fourth Row: Referrals */}
          <div className="grid grid-cols-1">
            <Referrals />
          </div>

          {/* Fifth Row: Privacy and LeaderBoardBanner */}
          <div className="grid grid-cols-[0.412fr_0.588fr] gap-5">
            <div>
              <Privacy />
            </div>
            <div>
              <LeaderBoardBanner />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;

