import React, { useState } from 'react'
import Graph from '../../assets/images/graph.png'
import twitter from '../../assets/images/X.com.png'
import eightyseven from '../../assets/images/87percent.png'
import ten from '../../assets/images/10percent.png'
import KLEO from '../../assets/images/KLEO Logo.png'
import KleoMate from '../../assets/images/KleoMate.jsx'
import Reward from '../../assets/images/reward.png'
import Grids from '../../assets/images/Frame 456 (1).png'
import Data from '../../assets/images/data.png'
import Group from '../../assets/images/group.png'
import Copy from '../../assets/images/copy.png'
import BigStar from '../../assets/images/BigStar.jsx'
import MediumStar from '../../assets/images/MediumStar.jsx'
import SmallStar from '../../assets/images/SmallStar.jsx'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

function First() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const handleClick = (index) => {
    setSelectedIndex(index)
  }

  const PointsAndData = () => {
    return (
      <div className="space-y-6">
        {/* Total Points Earned */}
        <div
          className="relative rounded-lg flex flex-col justify-between text-white"
          style={{ minHeight: '269px' }}
        >
          <img src={Grids} alt="Data Quality Graph" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
          <div className="relative flex flex-col justify-between z-0 p-6" style={{ minHeight: '269px' }}>
            <img src={Reward} alt="Reward Icon" className="w-20 h-20 mb-4" />
            <div>
              <h3 className="text-lg font-semibold">Total Points Earned</h3>
              <p className="text-4xl font-bold">
                2,400 <span className="text-lg">KLEO XP</span>
              </p>
            </div>
          </div>
        </div>

        {/* Total Data Quantity */}
        <div
          className="p-6 rounded-lg flex flex-col justify-between bg-white text-black"
          style={{ minHeight: '269px' }}
        >
          <img src={Data} alt="Data Quantity Icon" className="w-20 h-20 mb-4" />
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold">Total Data Quantity</h3>
            <p className="text-4xl font-bold">
              34 MB <span className="text-lg">till date</span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  const DataQuality = () => {
    return (
      <div className="space-y-6 ">
        {/* <!-- My Data Quality --> */}
        <div
          className="bg-white p-6 rounded-lg "
          style={{ minHeight: '562px' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl mb-2 font-semibold">My Data Quality</h3>
              <p className="w-5/6 font-inter">
                Data quality is defined by lorem ipusm dolor sit amit{' '}
              </p>
            </div>
            <div
              className="text-2xl flex items-center rounded-xl justify-center font-bold text-purple-600 w-20 h-16 bg-primary-btn-300 text-white"
              style={{
                backgroundColor: 'rgba(127, 86, 217, 1)'
              }}
            >
              87%
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div
              className="bg-gray-100 rounded-lg flex items-center justify-center"
              style={{ height: '360px', width: '100%' }}
            >
              <Radar data={data} options={options} />
            </div>
          </div>
          <p className="mt-4 rounded-lg text-sm flex items-center pl-4 text-white bg-indigo-950 h-11">
            <span className="flex items-center text-sm font-bold text-white-600 pr-1">
              <span
                style={{
                  height: '11px',
                  width: '11px',
                  backgroundColor: 'white',
                  padding: '1px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: '4px',
                  borderRadius: '50%'
                }}
              ></span>{' '}
              64%{' '}
            </span>
            of your data quality is from
            <span className="text-sm font-bold text-white-600 pl-1">
              Designing
            </span>
          </p>
        </div>
      </div>
    )
  }

  const Milestones = () => {
    return (
      <div
        className="bg-white p-6 rounded-lg  relative "
      // style={{ width: '500px', right: '70px' }}
      >
        <h3 className="text-2xl mb-2 font-semibold">Milestones</h3>
        <p className="text-sm font-inter">
          Keep up with the team to receive rewards!
        </p>
        <ul className="mt-4 space-y-4">
          <li className="flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100 ">
            <div className="flex items-center space-x-1">
              <img
                src={twitter}
                alt="Tweet your activity graph"
                className="w-12 h-12"
              />
              <span>Tweet your activity graph</span>
            </div>
            <span className="text-purple-600 font-bold bg-white w-24 h-9 rounded-full flex items-center justify-center">
              +120 XP
            </span>
          </li>
          <li className="flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100">
            <div className="flex items-center space-x-1">
              <img
                src={eightyseven}
                alt="Tweet your activity graph"
                className="w-12 h-12"
              />
              <span>Tweet your activity graph</span>
            </div>
            <span className="text-purple-600 font-bold bg-white w-24 h-9 rounded-full flex items-center justify-center">
              +120 XP
            </span>
          </li>
          <li className="flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100">
            <div className="flex items-center space-x-1">
              <img
                src={ten}
                alt="Tweet your activity graph"
                className="w-12 h-12"
              />
              <span>Tweet your activity graph</span>
            </div>
            <span className="text-purple-600 font-bold bg-white w-24 h-9 rounded-full flex items-center justify-center">
              +120 XP
            </span>
          </li>
          <li className="flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100 opacity-50">
            <div className="flex items-center space-x-1">
              <img
                src={twitter}
                alt="Tweet your activity graph"
                className="w-12 h-12"
              />
              <span>Tweet your activity graph</span>
            </div>
            <span className="text-purple-600 font-bold bg-white w-24 h-9 rounded-full flex items-center justify-center">
              +120 XP
            </span>
          </li>
        </ul>
      </div>
    )
  }

  const Snapshot = () => {
    return (
      <div className="bg-white p-6 rounded-lg mx-auto">
        <h3 className="text-2xl font-semibold mb-2">Snapshot</h3>
        <p className="text-gray-500 mb-6">
          Vote and be eligible to earn more KLEO XP!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* <!-- First Card - Kleo Mate --> */}
          <div
            className="text-white p-6 rounded-lg"
            style={{ backgroundColor: '#293056' }}
          >
            <div
              className="flex items-center justify-center h-10 w-10 rounded-lg"
              style={{ backgroundColor: '#475467' }}
            >
              <KleoMate color={'white'} />
            </div>
            <div className="flex items-center mb-2 mt-2">
              <h4 className="text-lg font-semibold">Kleo Mate</h4>
            </div>
            <p className="text-sm font-normal mb-4">
              a social networking dating website wants to request your data..
            </p>
            <button
              className="bg-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-100"
              style={{ color: '#6941C6' }}
            >
              View Proposal
            </button>
          </div>
          <div className="bg-gray-50 text-black p-6 rounded-lg">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100">
              <KleoMate color={'#363F72'} />
            </div>
            <div className="flex items-center mb-2 mt-2">
              <h4 className="text-lg font-semibold">Defi Creator</h4>
            </div>
            <p className="text-sm font-normal text-gray-600 mb-4">
              a decentralised finance is requesting your data to share top
              investment ...
            </p>
            <button
              className=" text-white py-2 px-4 rounded-lg font-semibold "
              style={{ backgroundColor: '#7F56D9' }}
            >
              View Proposal
            </button>
          </div>
          <div className="bg-gray-50 text-black p-6 rounded-lg">
            <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-gray-100">
              <KleoMate color={'#363F72'} />
            </div>
            <div className="flex items-center mb-2 mt-2">
              <h4 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                Decentralised Youtube
              </h4>
            </div>
            <p className="text-sm font-normal text-gray-600 mb-4">
              seeking user data for personalised recommendation engine...
            </p>
            <button
              className=" text-white py-2 px-4 rounded-lg font-semibold "
              style={{ backgroundColor: '#7F56D9' }}
            >
              View Proposal
            </button>
          </div>
        </div>
      </div>
    )
  }

  const Referrals = () => {
    return (
      <div className="container flex flex-col justify-between mx-auto p-6 bg-white rounded-lg mt-6 min-h-80">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl mb-2 font-semibold">My Referrals</h3>
            <p className="text-sm font-normal text-gray-700 font-inter">
              Bring people onboard on Kleo and earn points!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-2">
              <img
                src={Group}
                alt="Tweet your activity graph"
                className="w-3.5 h-3.5"
              />
              <p className="text-xs font-inter">Referrals: 3</p>
            </div>
            <div className="flex items-center space-x-1 rounded-full bg-black px-3 py-2">
              <img
                src={Copy}
                alt="Tweet your activity graph"
                className="w-3.5 h-3.5"
              />
              <p className="text-xs text-white font-inter">
                Copy Referral Link
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 max-h-44 overflow-y-auto">
          <table className="min-w-full text-left table-auto">
            <thead className="sticky top-0 bg-white z-10">
              <tr>
                <th className="px-4 py-2 font-normal text-sm text-gray-500"></th>
                <th className="px-4 py-2 font-normal text-sm text-gray-500 pl-8">
                  Address
                </th>
                <th className="px-4 py-2 font-normal text-sm text-gray-500">
                  Date Joined
                </th>
                <th className="px-4 py-2 font-normal text-sm text-gray-500">
                  XP Earned
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 rounded-lg">
              {Referral.map((referral, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? 'bg-gray-100 rounded-lg' : 'bg-white'
                    } rounded-lg`}
                >
                  <td className="px-4 py-2 flex items-center gap-4 w-16 text-center">
                    <span className="text-sm font-medium">{index + 1}</span>
                    <img
                      src={'https://picsum.photos/40'}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <span className="truncate text-base font-medium text-gray-700">
                      {referral.address}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-base font-medium text-gray-700">
                    {referral.dateJoined}
                  </td>
                  <td
                    className={`gap-1 text-lg font-semibold w-24 h-9 rounded-full flex items-center justify-center text-center`}
                    style={{
                      backgroundColor: index % 2 === 0 ? 'white' : '#F4EBFF',
                      color: '#7F56D9'
                    }}
                  >
                    {referral.xpEarned}
                    <sub className="text-purple-600 text-xs font-semibold ">
                      XP
                    </sub>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  const Leaderboard = () => {
    return (
      <div className="bg-white p-6 rounded-lg ">
        <h3 className="text-3xl mb-2 font-semibold">Leaderboard</h3>
        <p className="text-sm text-gray-500 mb-4 font-inter">
          Keep up with the team to receive rewards!
        </p>

        {/* <!-- Scrollable Leaderboard --> */}
        <ul
          className="space-y-3  overflow-y-auto"
          style={{ scrollbarWidth: 'auto', maxHeight: '600px' }}
        >
          {/* <!-- Leaderboard Entry --> */}
          {LeaderBoardData.map((data, index) => (
            <li
              className={`mr-4 flex justify-between items-center p-4 rounded-md cursor-pointer ${selectedIndex === index ? 'bg-cyan-950' : 'bg-gray-100'
                }`}
              onClick={() => handleClick(index)}
            >
              <div className="flex items-center space-x-3">
                <span
                  className={`font-normal text-xs ${selectedIndex === index ? 'text-white' : 'text-gray-700'
                    }`}
                >
                  {data.id}
                </span>
                <hr className="w-6 rotate-90 border-white p-0" />
                <img
                  src="https://picsum.photos/40"
                  alt="User image"
                  className="w-6 h-6 rounded-full"
                />
                <span
                  className={`text-xs font-medium ${selectedIndex === index ? 'text-white' : 'text-gray-700'
                    }`}
                >
                  {data.name}
                </span>
              </div>
              <span
                className={`${selectedIndex === index ? 'text-white' : 'text-gray-700'
                  } text-sm font-medium`}
              >
                {data.reward}{' '}
                <span
                  className={`text-xs font-medium ${selectedIndex === index ? 'text-white' : 'text-gray-400'
                    }`}
                >
                  KLEO
                </span>
              </span>
            </li>
          ))}

          {/* <!-- More entries can go here --> */}
        </ul>
      </div>
    )
  }

  const Privacy = () => {
    return (
      <div
        className="bg-white p-6 rounded-lg "
        style={{
          background:
            'linear-gradient(219.02deg, #293056 17.14%, #5969BC 118.66%)'
        }}
      >
        <h3 className="text-2xl mb-2 text-white font-semibold">Your Privacy</h3>
        <p className="text-sm mt-4 text-white font-inter">
          We value your privacy and remove all the PIIS before encrypting your
          data, safeguarded your identity by removing.
        </p>
        <p className="text-4xl font-bold text-white mt-4 font-inter">
          2,400 <span className="text-white text-lg">PIIS Removed</span>
        </p>
      </div>
    )
  }

  const Leader = () => {
    return (
      <div
        className="bg-white p-6 rounded-lg  col-span-2 relative"
        style={{
          background:
            'linear-gradient(90deg, rgba(254, 254, 254, 1) 0%, rgba(224, 215, 247, 1) 100%)'
        }}
      >
        <div className="absolute right-1">
          <BigStar />
        </div>
        <div className="absolute right-32 top-0">
          <MediumStar />
        </div>
        <div className="absolute right-52 bottom-0">
          <SmallStar />
        </div>
        <h3 className="text-3xl mb-2 font-semibold">Leaderboard</h3>
        <p className="text-sm text-gray-600 mb-4 font-inter">
          Keep up with the team to receive rewards!
        </p>
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded-full mt-10"
          style={{
            backgroundColor: 'rgba(127, 86, 217, 1)'
          }}
        >
          Know More
        </button>
      </div>
    )
  }

  return (
    <div className="bg-slate-100">
      <div className="w-full bg-white fixed z-10">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src={KLEO}
              alt="Tweet your activity graph"
              className="w-24 h-8"
            />
          </div>
          <div className="flex space-x-6">
            <button className="bg-gray-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800">
              Dashboard
            </button>
            <button className="text-gray-700">My Data</button>
            <img
              src={'https://picsum.photos/40'}
              alt="User"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* <!-- Main Content --> */}
      <div
        className="container mx-auto p-6 grid lg:grid-cols-3 gap-6 mt-14"
        style={{ marginTop: '7%' }}
      >
        {/* <!-- Left Column: Points and Data --> */}
        {PointsAndData()}

        {/* <!-- Middle Column: Data Quality and DataQuality --> */}
        {DataQuality()}

        {/* <!-- Milestones --> */}
        {Milestones()}

        <div className="space-y-6 col-span-2">
          {/* <!-- Snapshot Section --> */}
          {Snapshot()}

          {/* <!-- My Referrals Section --> */}
          {Referrals()}
        </div>

        {/* <!-- Leaderboard Section with Enhanced Design --> */}
        {Leaderboard()}

        {/* <!-- Footer Section --> */}
      </div>
      <div
        className="container mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6"
      // style={{ paddingInline: '100px' }}
      >
        {/* <!-- Privacy Card --> */}
        {Privacy()}

        {/* <!-- Second Leaderboard --> */}
        {Leader()}
      </div>
    </div>
  )
}
export default First

const LeaderBoardData = [
  { id: '288', name: 'Ruchi Tripathi', reward: '213' },
  { id: '1', name: 'Alex Johnson', reward: '180' },
  { id: '2', name: 'Jamie Lee', reward: '150' },
  { id: '3', name: 'Taylor Smith', reward: '140' },
  { id: '4', name: 'Jordan Brown', reward: '130' },
  { id: '5', name: 'Morgan White', reward: '120' },
  { id: '6', name: 'Casey Harris', reward: '110' },
  { id: '7', name: 'Riley Clark', reward: '100' },
  { id: '8', name: 'Avery Lewis', reward: '90' },
  { id: '9', name: 'Quinn Martin', reward: '80' },
  { id: '10', name: 'Samantha Green', reward: '75' },
  { id: '11', name: 'Liam Mitchell', reward: '60' },
  { id: '12', name: 'Olivia King', reward: '55' },
  { id: '13', name: 'Noah Scott', reward: '50' },
  { id: '14', name: 'Emily Carter', reward: '48' },
  { id: '15', name: 'Lucas Moore', reward: '45' },
  { id: '16', name: 'Sophia Wright', reward: '40' },
  { id: '17', name: 'Mason Hall', reward: '35' },
  { id: '18', name: 'Isabella Young', reward: '30' },
  { id: '19', name: 'Ethan Thompson', reward: '25' }
]

const Referral = [
  { address: '0x5656565433...', dateJoined: '15.07.2024', xpEarned: '+120' },
  { address: '0x1234abcd9876...', dateJoined: '18.07.2024', xpEarned: '+200' },
  { address: '0xabcdef123456...', dateJoined: '20.07.2024', xpEarned: '+150' },
  { address: '0x87654321abcd...', dateJoined: '22.07.2024', xpEarned: '+175' },
  { address: '0x112233445566...', dateJoined: '25.07.2024', xpEarned: '+90' },
  { address: '0xaabbccddeeff...', dateJoined: '28.07.2024', xpEarned: '+220' },
  { address: '0x998877665544...', dateJoined: '30.07.2024', xpEarned: '+300' },
  { address: '0x776655443322...', dateJoined: '02.08.2024', xpEarned: '+110' },
  { address: '0xabcdef098765...', dateJoined: '05.08.2024', xpEarned: '+180' }
]

const options = {
  scales: {
    r: {
      angleLines: {
        display: true
      },
      suggestedMin: 0,
      suggestedMax: 5,
      ticks: {
        stepSize: 1,
        backdropColor: 'rgba(255, 255, 255, 0)' // Transparent background for labels
      }
    }
  },
  plugins: {
    legend: {
      display: false // Hide the legend
    }
  }
}

const data = {
  labels: [
    'Trading',
    'Coding',
    'Medicine',
    'Government',
    'Planning',
    'Music',
    'Podcasts',
    'Designing'
  ],
  datasets: [
    {
      label: 'Skill Levels',
      data: [2, 4, 3, 1, 3, 4, 2, 3],
      backgroundColor: 'rgba(99, 102, 241, 0.2)', // Purple fill
      borderColor: 'rgba(99, 102, 241, 1)', // Purple border
      pointBackgroundColor: 'rgba(99, 102, 241, 1)', // Purple points
      borderWidth: 2
    }
  ]
}




// import React, { useState } from 'react';


// export default function Dashboard() {
//   return (
//     <div className="bg-gray-50 p-6">
//       <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
//         <div className="flex items-center">
//           <div className="bg-purple-600 w-8 h-8 mr-2 rounded-sm transform rotate-45"></div>
//           <h1 className="text-xl font-bold text-gray-800">KLEO</h1>
//         </div>
//         <nav className="flex items-center mt-4 sm:mt-0">
//           <button className="bg-gray-800 text-white px-4 py-2 rounded-full mr-4 text-sm font-medium">Dashboard</button>
//           <button className="text-gray-600 px-4 py-2 rounded-full mr-4 text-sm font-medium hover:bg-gray-100 transition-colors duration-200">My Data</button>
//           <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
//             <img src="/path-to-user-avatar.jpg" alt="User avatar" className="w-full h-full object-cover" />
//           </div>
//         </nav>
//       </header>

//       <div className="grid grid-cols-3 gap-6">
//         <StatsCard
//           icon={
//             <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
//             </svg>
//           }
//           title="Total Points Earned"
//           value="2,400"
//           unit="KLEO XP"
//           bgColor="bg-purple-600"
//           textColor="text-white"
//         />
//         <StatsCard
//           icon={
//             <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//             </svg>
//           }
//           title="Total Data Quantity"
//           value="34 MB"
//           unit="till date"
//           bgColor="bg-white"
//           textColor="text-gray-800"
//         />
//         <DataQualityCard />
//         <MilestonesList />
//         <div className="col-span-2">
//           <SnapshotSection />
//         </div>
//         <Leaderboard />
//         <div className="col-span-2">
//           <ReferralsTable />
//         </div>
//         <PrivacyCard />
//       </div>
//     </div>
//   );
// }

// function StatsCard({ icon, title, value, unit, bgColor, textColor }) {
//   return (
//     <div className={`${bgColor} rounded-2xl p-6 ${textColor}`}>
//       <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
//         {icon}
//       </div>
//       <h2 className="text-sm font-medium mb-2 opacity-80">{title}</h2>
//       <p className="text-4xl font-bold">
//         {value} <span className="text-lg font-normal">{unit}</span>
//       </p>
//     </div>
//   );
// }

// function DataQualityCard() {
//   return (
//     <div className="bg-white rounded-2xl p-6">
//       <div className="flex justify-between items-start mb-4">
//         <div>
//           <h2 className="text-xl font-semibold text-gray-800">My Data Quality</h2>
//           <p className="text-sm text-gray-500 mt-1 font-inter">Data quality is defined by lorem ipsum dolor sit amit</p>
//         </div>
//         <div className="bg-purple-500 text-white text-3xl font-bold px-4 py-2 rounded-xl">
//           87<span className="text-lg">%</span>
//         </div>
//       </div>
//       <div className="mb-4">
//         <div className="w-full h-64 bg-gray-50 rounded-xl flex items-center justify-center">
//           {/* Placeholder for radar chart */}
//           <svg className="w-full h-full text-purple-400" viewBox="0 0 100 100">
//             <g fill="none" fillRule="evenodd">
//               <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
//               <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
//               <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
//               <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
//               <path d="M50 5 L95 50 L50 95 L5 50 Z" stroke="currentColor" strokeWidth="0.5" opacity="0.2" transform="rotate(45 50 50)" />
//               <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
//             </g>
//             <text x="50" y="15" textAnchor="middle" fill="#4B5563" fontSize="3">Trading</text>
//             <text x="85" y="50" textAnchor="start" fill="#4B5563" fontSize="3">Coding</text>
//             <text x="75" y="85" textAnchor="middle" fill="#4B5563" fontSize="3">Medicine</text>
//             <text x="50" y="95" textAnchor="middle" fill="#4B5563" fontSize="3">Government</text>
//             <text x="25" y="85" textAnchor="middle" fill="#4B5563" fontSize="3">Planning</text>
//             <text x="15" y="50" textAnchor="end" fill="#4B5563" fontSize="3">Music</text>
//             <text x="25" y="15" textAnchor="middle" fill="#4B5563" fontSize="3">Podcasts</text>
//             <text x="50" y="5" textAnchor="middle" fill="#4B5563" fontSize="3">Designing</text>
//           </svg>
//         </div>
//       </div>
//       <div className="bg-gray-800 text-white p-4 rounded-xl text-sm font-medium">
//         <span className="font-bold">64%</span> of your data quality is from <span className="font-bold">Designing</span>
//       </div>
//     </div>
//   );
// }

// function MilestonesList() {
//   const milestones = [
//     { icon: "X", text: "Tweet your activity graph", xp: 120, completed: true },
//     { icon: "🛡️", text: "Own and protect 200 MB of data.", xp: 120, completed: false, progress: 87 },
//     { icon: "👥", text: "Refer 10 friends to join Kleo Network", xp: 120, completed: false, progress: 10 },
//     { icon: "X", text: "Follow us on twitter", xp: 120, completed: false },
//   ];

//   return (
//     <div className="bg-white rounded-2xl p-6">
//       <h2 className="text-lg font-semibold mb-2">Milestones</h2>
//       <p className="text-sm text-gray-500 mb-4">Keep up with the team to receive rewards!</p>
//       {milestones.map((milestone, index) => (
//         <div key={index} className="flex items-center mb-4 bg-gray-50 p-3 rounded-lg">
//           <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${milestone.completed ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
//             {milestone.icon}
//           </div>
//           <div className="flex-grow">
//             <p className="text-sm">{milestone.text}</p>
//             {milestone.progress && (
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                 <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${milestone.progress}%` }}></div>
//               </div>
//             )}
//           </div>
//           <div className="text-purple-600 font-semibold">+{milestone.xp} XP</div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function SnapshotSection() {
//   const [expandedProposal, setExpandedProposal] = useState(0);

//   const proposals = [
//     { title: "Kleo Mate", description: "a social networking dating website wants to request your data." },
//     { title: "Defi Creator", description: "a decentralised finance is requesting your data to share top investment..." },
//     { title: "Decentralised Youtube", description: "seeking user data for personalised recommendation engine..." },
//   ];

//   return (
//     <div className="bg-white rounded-2xl p-6">
//       <h2 className="text-lg font-semibold mb-2">Snapshot</h2>
//       <p className="text-sm text-gray-500 mb-4">Vote and be eligible to earn more KLEO XP!</p>
//       <div className="grid grid-cols-3 gap-4">
//         {proposals.map((proposal, index) => (
//           <div
//             key={index}
//             className={`bg-gray-800 text-white p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${expandedProposal === index ? 'col-span-2' : ''}`}
//             onClick={() => setExpandedProposal(index)}
//           >
//             <h3 className="font-semibold mb-2">{proposal.title}</h3>
//             <p className="text-sm mb-4 opacity-80 font-inter">{proposal.description}</p>
//             <button className="bg-white text-gray-800 px-4 py-2 rounded-full text-sm hover:bg-gray-100 transition-colors duration-300">View Proposal</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function ReferralsTable() {
//   const referrals = [
//     { address: "0x5656565433...", dateJoined: "15.07.2024", xpEarned: 120 },
//     { address: "0x5656565433...", dateJoined: "15.07.2024", xpEarned: 120 },
//     { address: "0x5656565433...", dateJoined: "15.07.2024", xpEarned: 120 },
//   ];

//   return (
//     <div className="bg-white rounded-2xl p-6">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold font-inter">My Referrals</h2>
//         <div>
//           <span className="bg-gray-100 px-3 py-1 rounded-full text-sm mr-2">Referrals: 3</span>
//           <button className="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors duration-300">Copy Referral Link</button>
//         </div>
//       </div>
//       <p className="text-sm text-gray-500 mb-4 font-inter">Bring people onboard on Kleo and earn points!</p>
//       <table className="w-full">
//         <thead>
//           <tr className="text-left text-sm text-gray-500">
//             <th className="pb-2 font-inter">Address</th>
//             <th className="pb-2 font-inter">Date Joined</th>
//             <th className="pb-2 font-inter">XP Earned</th>
//           </tr>
//         </thead>
//         <tbody>
//           {referrals.map((referral, index) => (
//             <tr key={index} className="border-t border-gray-100">
//               <td className="py-3 flex items-center">
//                 <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
//                 {referral.address}
//               </td>
//               <td className="py-3">{referral.dateJoined}</td>
//               <td className="py-3 text-purple-600">+{referral.xpEarned} XP</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// function Leaderboard() {
//   const leaders = [
//     { name: "Ruchi Tripathi", xp: 213, rank: 288 },
//     { name: "Zahir Mays", xp: 2513 },
//     { name: "Natale Clague", xp: 1784 },
//     { name: "Ava Wright", xp: 1687 },
//     { name: "Joshua Winson", xp: 1224 },
//   ];

//   return (
//     <div className="bg-white rounded-2xl p-6">
//       <h2 className="text-lg font-semibold mb-2">Leaderboard</h2>
//       <p className="text-sm text-gray-500 mb-4 font-inter">Keep up with the team to receive rewards!</p>
//       {leaders.map((leader, index) => (
//         <div key={index} className={`flex items-center justify-between mb-3 ${index === 0 ? 'bg-gray-800 text-white p-3 rounded-lg' : ''}`}>
//           <div className="flex items-center">
//             {leader.rank && <span className="mr-2 text-sm">{leader.rank}</span>}
//             <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
//             <span>{leader.name}</span>
//           </div>
//           <span className="font-semibold">{leader.xp} KLEO</span>
//         </div>
//       ))}
//     </div>
//   );
// }

// function PrivacyCard() {
//   return (
//     <div className="bg-white rounded-2xl p-6">
//       <h2 className="text-lg font-semibold mb-2 font-inter">Privacy Settings</h2>
//       <p className="text-sm text-gray-500 mb-4 font-inter">Manage your data privacy settings</p>
//       {/* Add privacy settings controls here */}
//     </div>
//   );
// }

