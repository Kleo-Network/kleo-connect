import React from 'react'
import KLEO from '../../../assets/images/.png'
import { ReactComponent as Logo } from '../../../assets/images/nameLogo.svg'


const Navbar = () => {
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
          <img
            src={'https://picsum.photos/40'}
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar
