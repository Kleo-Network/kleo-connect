import React from "react";
import BigStar from '../../../assets/images/BigStar.jsx'
import MediumStar from '../../../assets/images/MediumStar.jsx'
import SmallStar from '../../../assets/images/SmallStar.jsx'


const Leader = () => {
    return (
        <div
            className="bg-white p-6 rounded-xl  col-span-2 relative"
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

export default Leader;