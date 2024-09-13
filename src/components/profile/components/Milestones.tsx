import React from "react";
import twitter from '../../../assets/images/X.com.png'
import eightyseven from '../../../assets/images/87percent.png'
import ten from '../../../assets/images/10percent.png'


const CircularProgress = ({ percentage }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <svg className="w-12 h-12" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
                className="text-gray-200"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
            />
            {/* Progress circle */}
            <circle
                className="text-[#293056]"
                strokeWidth="10"
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{
                    transition: 'stroke-dashoffset 0.5s ease',
                    transform: 'rotate(-90deg)',
                    transformOrigin: '50% 50%',
                }}
            />
            {/* Percentage text in the middle */}
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="25"
                className="font-semibold text-black"
            >
                {percentage}%
            </text>
        </svg>
    );
};



const Milestones = () => {
    return (
        <div
            className="bg-white p-5 rounded-xl  relative"
            // style={{ width: '500px', right: '70px' }}
            style={{ maxHeight: '450px' }}
        >
            <h3 className="text-2xl mb-2 font-semibold">Milestones</h3>
            <p className="text-sm font-inter">
                Keep up with the team to receive rewards!
            </p>
            <ul className="mt-4 pb-8 space-y-4">
                <li className="flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100 ">
                    <div className="flex items-center space-x-1">
                        <img
                            src={twitter}
                            alt="Tweet your activity graph"
                            className="w-11 h-11"
                        />
                        <span className='text-sm font-semibold'>Tweet your activity graph</span>
                    </div>
                    <span className="text-purple-600 font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center gap-1">
                        +120 <span className='text-xs'>XP</span>
                    </span>
                </li>
                <li className="flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100">
                    <div className="flex items-center space-x-1">
                        <CircularProgress percentage={80} />
                        <span className="text-sm font-semibold">Tweet your activity graph</span>
                    </div>
                    <span className="text-purple-600 font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center gap-1">
                        +120 <span className="text-xs">XP</span>
                    </span>
                </li>
                <li className="flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100">
                    <div className="flex items-center space-x-1">
                        <CircularProgress percentage={10} />
                        <span className='text-sm font-semibold'>Tweet your activity graph</span>
                    </div>
                    <span className="text-purple-600 font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center gap-1">
                        +120 <span className='text-xs'>XP</span>
                    </span>
                </li>
                <li className="flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100 opacity-50">
                    <div className="flex items-center space-x-1">
                        <img
                            src={twitter}
                            alt="Tweet your activity graph"
                            className="w-11 h-11"
                        />
                        <span className='text-sm font-semibold'>Tweet your activity graph</span>
                    </div>
                    <span className="text-purple-600 font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center gap-1">
                        +120 <span className='text-xs'>XP</span>
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default Milestones;