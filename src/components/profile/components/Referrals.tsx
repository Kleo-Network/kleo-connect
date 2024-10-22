import React, { useEffect, useState } from 'react'
import Group from '../../../assets/images/group.png'
import { ReactComponent as Copy } from '../../../assets/dashboard/Copy.svg'
import { ReactComponent as GroupPeople } from '../../../assets/dashboard/GroupPeople.svg'
import { ReactComponent as EmptyData } from '../../../assets/dashboard/EmptyData.svg'
import ReferalTable from './ReferalTable'
import useFetch from '../../common/hooks/useFetch'

interface ReferralsProps {
  userAddress: string;
}

interface IReferralData {
  address: string,
  joining_date: number,
  kleo_points: number
}

interface Referral {
  address: string;
  dateJoined: number;
  kleoPoints: string;
}

const referrals: Referral[] = [];

const Referrals = ({ userAddress }: ReferralsProps) => {
  const GET_REFERRALS = `user/referrals/${userAddress}`;
  const REFERRAL_LINK = `https://chromewebstore.google.com/detail/kleo-network/jimpblheogbjfgajkccdoehjfadmimoo?refAddress=${userAddress}`;
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [referralData, setReferralData] = useState<IReferralData[]>([]);
  const { data: referralResponse, fetchData: fetchReferrals } = useFetch();
  useEffect(() => {
    setIsLoading(true);
    fetchReferrals(GET_REFERRALS);
  }, [userAddress]);

  useEffect(() => {
    setIsLoading(false);
    setReferralData(referralResponse as IReferralData[] || []);
  }, [referralResponse])

  const referralLink = REFERRAL_LINK.replace('ADDRESS', userAddress || '')

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
    <>
      {isLoading && <div className="h-full w-full flex items-center justify-center">Loading</div>}
      {!isLoading && <div className="container flex flex-col justify-start mx-auto p-5 bg-white rounded-xl h-full gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl mb-2 font-semibold">My Referrals</h3>
            <p className="text-sm font-normal text-[#333F53] font-inter">
              Bring people onboard on Kleo and earn points!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-2">
              <GroupPeople className="w-3.5 h-3.5" />
              <p className="text-[9px] md:text-xs font-inter whitespace-nowrap">Referrals: {referralData.length}</p>
            </div>
            <div className="flex items-center space-x-1 rounded-full bg-black px-3 py-2">
              <Copy className="w-3.5 h-3.5" />
              <button onClick={copyToClipboard}>
                <p className="text-[9px] md:text-xs text-white font-inter whitespace-nowrap">
                  {copied ? 'Link Copied!' : 'Copy Referral Link'}
                </p>
              </button>
            </div>
          </div>
        </div>
        <div>
          {referralData.length === 0 ?
            <div className='w-full h-full flex flex-col gap-5 items-center justify-center'>
              <EmptyData />
              <div className='text-center w-1/2'>
                <p className='text-[#1D2939] text-lg font-semibold mb-2'>No referrals Yet</p>
                <p className='text-[#667085] text-sm'>Share the link with your friends, and when they sign up on KLEO you will earn XPs.</p>
              </div>
            </div>
            :
            <div className="max-h-[218px] overflow-y-auto align-top">
              <ReferalTable referralData={referralData} />
            </div>
          }
        </div>
      </div>}
    </>
  )
}

export default Referrals
