import { MetaMaskAvatar } from 'react-metamask-avatar';
import KleoUserImage from '../../../assets/images/KleoToken.svg'
import { formatDate } from '../../utils/utils'

interface IReferralData {
  address: string,
  joining_date: number,
  kleo_points: number
}

interface ReferralTableProps {
  referralData: IReferralData[]
}

const isWalledAddress = (address: string) => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

const ReferalTable = ({ referralData }: ReferralTableProps) => {
  return (
    <table className="min-w-full text-left table-auto">
      <thead className="sticky top-0 bg-white z-10">
        <tr>
          <th className="px-4 py-2 font-normal text-sm text-gray-500"></th>
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
        {referralData.map((referral, index) => (
          <tr
            key={index}
            className={`${index % 2 === 0 ? 'bg-gray-100 rounded-lg' : 'bg-white'
              } rounded-lg`}
          >
            <td className="px-4 py-2 flex items-center text-center ">
              <span className="text-base font-medium">{index + 1}</span>
            </td>
            <td className='align-middle ml-auto'>
              <div className="flex items-center justify-center">
                {
                  isWalledAddress(referral.address) ?
                    <MetaMaskAvatar address={referral.address} className='w-8 h-8 rounded-full' />
                    : <img src={KleoUserImage}
                      alt="User image"
                      className="w-8 h-8 rounded-full" />
                }
              </div>
            </td>
            <td className="px-4 py-2">
              <span className="truncate text-base font-medium text-gray-700">
                {referral.address}
              </span>
            </td>
            <td className="px-4 py-2 text-base font-medium text-gray-700">
              {formatDate(referral.joining_date)}
            </td>
            <td
              className="gap-1 text-[15px] font-semibold w-24 h-8 rounded-full flex items-center justify-center text-center"
              style={{
                backgroundColor: index % 2 === 0 ? 'white' : '#F4EBFF',
                color: '#7F56D9'
              }}
            >
              {referral.kleo_points}
              <sub className="text-purple-600 text-[10px] font-semibold ">XP</sub>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default ReferalTable
