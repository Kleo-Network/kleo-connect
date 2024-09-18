import React, { useState } from 'react'
import Group from '../../../assets/images/group.png'
import { ReactComponent as Copy } from '../../../assets/dashboard/Copy.svg'
import { ReactComponent as GroupPeople } from '../../../assets/dashboard/GroupPeople.svg'
import ReferalTable from './ReferalTable'


interface Referral {
  address: string;
  dateJoined: number;
  xpEarned: string;
  profilePic?: string; 
}

const referrals: Referral[] = [
  { address: '0x5656565433...', dateJoined: 1720982400, xpEarned: '+120', profilePic: 'https://picsum.photos/40?random=1' }, // 15 July 2024
  { address: '0x1234abcd9876...', dateJoined: 1721241600, xpEarned: '+200', profilePic: 'https://picsum.photos/40?random=2' }, // 18 July 2024
  { address: '0xabcdef123456...', dateJoined: 1721414400, xpEarned: '+150', profilePic: 'https://picsum.photos/40?random=3' }, // 20 July 2024
  { address: '0x87654321abcd...', dateJoined: 1721587200, xpEarned: '+175', profilePic: 'https://picsum.photos/40?random=4' }, // 22 July 2024
  { address: '0x112233445566...', dateJoined: 1721846400, xpEarned: '+90', profilePic: 'https://picsum.photos/40?random=5' }, // 25 July 2024
  { address: '0xaabbccddeeff...', dateJoined: 1722115200, xpEarned: '+220', profilePic: 'https://picsum.photos/40?random=6' }, // 28 July 2024
  { address: '0x998877665544...', dateJoined: 1722288000, xpEarned: '+300', profilePic: 'https://picsum.photos/40?random=7' }, // 30 July 2024
  { address: '0x776655443322...', dateJoined: 1722460800, xpEarned: '+110', profilePic: 'https://picsum.photos/40?random=8' }, // 2 August 2024
  { address: '0xabcdef098765...', dateJoined: 1722720000, xpEarned: '+180', profilePic: 'https://picsum.photos/40?random=9' } // 5 August 2024
];


const Referrals = () => {
  const [copied, setCopied] = useState(false)

  const referralLink = 'https://example.com/referral' // Replace with your referral link

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000) // Reset the copied state after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err)
      })
  }


  return (
    <div className="container flex flex-col justify-between mx-auto p-6 bg-white rounded-xl mt-6 min-h-80">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-3xl mb-2 font-semibold">My Referrals</h3>
          <p className="text-sm font-normal text-gray-700 font-inter">
            Bring people onboard on Kleo and earn points!
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-2">
            <GroupPeople className="w-3.5 h-3.5" />
            <p className="text-xs font-inter">Referrals: 3</p>
          </div>
          <div className="flex items-center space-x-1 rounded-full bg-black px-3 py-2">
            <Copy className="w-3.5 h-3.5" />
            <button onClick={copyToClipboard}>
              <p className="text-xs text-white font-inter">
                {copied ? 'Link Copied!' : 'Copy Referral Link'}
              </p>
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4 max-h-44 overflow-y-auto">
        <ReferalTable Referral={referrals} />
      </div>
    </div>
  )
}

export default Referrals
