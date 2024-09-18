import React from 'react'
import { formatDate } from '../../utils/utils'

const ReferalTable = ({Referral}) => {
  return (
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
          // <div>
          <tr
            key={index}
            className={`${
              index % 2 === 0 ? 'bg-gray-100 rounded-lg' : 'bg-white'
            } rounded-lg`}
          >
            <td className="px-4 py-2 flex items-center gap-4 w-16 text-center ">
              <span className="text-sm font-medium">{index + 1}</span>
              <img
                src={referral.profilePic}
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
            {formatDate(referral.dateJoined)}
            </td>
            <td
              className="gap - 1 text-lg font-semibold w-24 h-8 rounded-full flex items-center justify-center text-center"
              style={{
                backgroundColor: index % 2 === 0 ? 'white' : '#F4EBFF',
                color: '#7F56D9'
              }}
            >
              {/* >\ */}
              {referral.xpEarned}
              <sub className="text-purple-600 text-xs ">XP</sub>
            </td>
          </tr>
          // </div>
        ))}
      </tbody>
    </table>
  )
}

export default ReferalTable
