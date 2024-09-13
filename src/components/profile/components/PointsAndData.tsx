import React from 'react'
import Reward from '../../../assets/images/reward.png'
import Grids from '../../../assets/images/Frame 456 (1).png'
import Data from '../../../assets/images/data.png'

const PointsAndDataSection = () => {
    return (
        <div className="space-y-6">
            {/* Total Points Earned */}
            <div
                className="relative rounded-lg flex flex-col justify-between text-white p-0"
                style={{ minHeight: '200px' }}
            >
                <img src={Grids} alt="Data Quality Graph" className="absolute inset-0 w-full h-full object-cover rounded-lg" />
                <div className="relative flex flex-col justify-between z-0 p-6" style={{ minHeight: '200px' }}>
                    <img src={Reward} alt="Reward Icon" className="w-20 h-20 mb-4" />
                    <div>
                        <h3 className="text-lg font-medium font-inter">Total Points Earned</h3>
                        <p className="text-4xl font-bold">
                            2,400 <span className="text-lg text-lg font-medium font-inter">KLEO XP</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Total Data Quantity */}
            <div
                className="p-5 rounded-lg flex flex-col justify-between bg-white text-black"
                style={{ minHeight: '215px' }}
            >
                <img src={Data} alt="Data Quantity Icon" className="w-20 h-20 mb-4" />
                <div className="flex flex-col">
                    <h3 className="text-lg font-semibold">Total Data Quantity</h3>
                    <p className="text-4xl font-bold">
                        34 MB <span className="text-lg font-medium font-inter">till date</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PointsAndDataSection
