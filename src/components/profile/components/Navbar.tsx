import React from 'react'
import KLEO from '../../../assets/images/.png'
import { ReactComponent as Logo } from '../../../assets/images/nameLogo.svg'

export const MOCK_USER = {
  badges: [],
  content_tags: [],
  first_time_user: false,
  identity_tags: [],
  kleo_points: 1234,
  data_quality: 87,
  slug: '0x573aFF24788A7c28dE5E94C945e7b46a6f16f7C1',
  verified: false,
  last_minted: 1722523989,
  total_data_quantity: 34,
};

const Navbar = () => {
  const user = MOCK_USER;  
  const avatarUrl = `https://api.dicebear.com/9.x/identicon/svg?seed=${user.slug}`;

  return (
    <div className="w-full bg-[#f8f9fc] fixed z-10">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Logo/>
        </div>
        <div className="flex space-x-6">
          <button className="bg-gray-800 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800">
            Dashboard
          </button>
          <button className="text-gray-700">My Data</button>
          {/* <MetaMaskAvatar address={user.slug} size={36} /> */}
          <img
            src={avatarUrl}
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar
