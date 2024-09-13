import React, { useState } from 'react'
import KLEO from '../../assets/images/KLEO Logo.png'
import PointsAndDataSection from './components/PointsAndData'
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
import Leader from './components/Leader'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

function First() {
  return (
    <div className="bg-slate-100">
      <div
        className="w-full bg-white fixed z-10"
        style={{ backgroundColor: 'rgba(248, 249, 252, 1)' }}
      >
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
        className="container mx-auto p-6 gap-5 flex  mt-14 pt-10"
        style={{ marginTop: '80px' }}
      >
        {/*Left Column: Points and Data */}
        <div style={{ flex: '0 0 25%', width: '25%', marginRight: '0px' }}>
          <PointsAndDataSection />
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
      <div
        className="container mx-auto p-6 grid lg:grid-cols-3 gap-5 "
        style={{ marginTop: '-10px' }}
      >
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
        <Leader />
      </div>
    </div>
  )
}
export default First

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
//     <div className={${bgColor} rounded-2xl p-6 ${textColor}}>
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
//           <div className={w-8 h-8 rounded-full flex items-center justify-center mr-3 ${milestone.completed ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}}>
//             {milestone.icon}
//           </div>
//           <div className="flex-grow">
//             <p className="text-sm">{milestone.text}</p>
//             {milestone.progress && (
//               <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
//                 <div className="bg-purple-600 h-2 rounded-full" style={{ width: ${milestone.progress}% }}></div>
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
//             className={bg-gray-800 text-white p-4 rounded-xl cursor-pointer transition-all duration-300 ease-in-out ${expandedProposal === index ? 'col-span-2' : ''}}
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
//         <div key={index} className={flex items-center justify-between mb-3 ${index === 0 ? 'bg-gray-800 text-white p-3 rounded-lg' : ''}}>
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
