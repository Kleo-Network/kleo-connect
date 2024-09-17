import React from 'react';

const LeaderboardRow = ({ data, isSelected, onClick }) => {
    return (
        <li
            className={`mr-2 flex justify-between items-center p-4 rounded-md cursor-pointer ${isSelected ? 'bg-cyan-950' : 'bg-gray-100'}`}
            onClick={onClick}
        >
            <div className="flex items-center space-x-2">
                <span
                    className={`font-normal text-xs w-3 ${isSelected ? 'text-white' : 'text-gray-700'}`}
                >
                    {data.id}
                </span>
                <hr className="w-6 rotate-90 border-white p-0" />
                <img
                    src="https://picsum.photos/40"
                    alt="User image"
                    className="w-6 h-6 rounded-full"
                />
                <span
                    className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-gray-700'}`}
                >
                    {data.name}
                </span>
            </div>
            <span
                className={`${isSelected ? 'text-white' : 'text-gray-700'} text-base font-medium`}
            >
                {data.reward}{' '}
                <span className={`text-xs ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                    KLEO
                </span>
            </span>
        </li>
    );
};

export default LeaderboardRow;
