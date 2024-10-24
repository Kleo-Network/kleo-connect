import React from "react";
import { ReactComponent as BigStar } from '../../../assets/dashboard/Bigstar.svg'
import { ReactComponent as MediumStar } from '../../../assets/dashboard/MediumStar.svg'
import { ReactComponent as SmallStar } from '../../../assets/dashboard/SmallStar.svg'


const LeaderBoardBanner = () => {
    return (
        <div className="bg-gradient-to-r from-white to-[#e0d7f7] p-6 rounded-xl col-span-2 relative flex flex-col justify-between h-full">
            <div className="absolute right-1">
                <BigStar />
            </div>
            <div className="absolute right-32 top-0">
                <MediumStar />
            </div>
            <div className="absolute right-52 bottom-0">
                <SmallStar />
            </div>
            <div className="z-50">
                <h3 className="text-[28px] mb-2 font-semibold">Leaderboard</h3>
                <p className="text-sm text-gray-600 mb-4 font-inter">
                    Keep up with the team to receive rewards!
                </p>
            </div>
            <button
                className="bg-[#7f56d9] text-white py-2 px-4 rounded-full mt-10 w-fit">
                Know More
            </button>
        </div>
    )
}

export default LeaderBoardBanner;