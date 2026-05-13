import React from 'react'
import { ReactComponent as BigStar } from '../../../assets/dashboard/Bigstar.svg'
import { ReactComponent as MediumStar } from '../../../assets/dashboard/MediumStar.svg'
import { ReactComponent as SmallStar } from '../../../assets/dashboard/SmallStar.svg'

const LeaderBoardBanner = () => {
  return (
    <div className="bg-gradient-to-r from-white to-[#e0d7f7] p-6 rounded-xl col-span-2 relative flex flex-col justify-between h-full z-10">
      <div className="absolute right-1 z-20">
        <BigStar />
      </div>
      <div className="absolute right-32 z-1 top-0 z-20">
        <MediumStar />
      </div>
      <div className="absolute right-52 z-1 bottom-0 z-20">
        <SmallStar />
      </div>
      <div className="z-5 z-50">
        <h3 className="text-[28px] mb-2 font-semibold">What's new?</h3>
        <p className="text-md text-gray-600 mb-2 font-inter">
          Unlock exclusive voting rights and shape the future of data ownership
          with Kleo! <br /> Don't miss out on this chance to make an impact –
          support Kleo and claim your place in the future of decentralized data!
          <p className="mt-3 z-[900]">
            Cast your vote in the <b>GG22 Gitcoin Grants</b>
          </p>
        </p>
      </div>
      <a
        href="https://explorer.gitcoin.co/#/round/42161/610/49"
        target="_blank"
        className="bg-[#7f56d9] text-white py-2 px-4 rounded-full w-fit z-50"
      >
        Contribute
      </a>
    </div>
  )
}

export default LeaderBoardBanner
