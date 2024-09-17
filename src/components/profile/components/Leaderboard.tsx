import React, { useState } from "react";
import LeaderboardRow from "./LeaderboardRow";

const Leaderboard = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = (index) => {
        setSelectedIndex(index);
    };

    const LeaderBoardData = [
        { id: '288', name: 'Ruchi Tripathi', reward: '213' },
        { id: '1', name: 'Alex Johnson', reward: '180' },
        { id: '2', name: 'Jamie Lee', reward: '150' },
        { id: '3', name: 'Taylor Smith', reward: '140' },
        { id: '4', name: 'Jordan Brown', reward: '130' },
        { id: '5', name: 'Morgan White', reward: '120' },
        { id: '6', name: 'Casey Harris', reward: '110' },
        { id: '7', name: 'Riley Clark', reward: '100' },
        { id: '8', name: 'Avery Lewis', reward: '90' },
        { id: '9', name: 'Quinn Martin', reward: '80' },
        { id: '10', name: 'Samantha Green', reward: '75' },
        { id: '11', name: 'Liam Mitchell', reward: '60' },
        { id: '12', name: 'Olivia King', reward: '55' },
        { id: '13', name: 'Noah Scott', reward: '50' },
        { id: '14', name: 'Emily Carter', reward: '48' },
        { id: '15', name: 'Lucas Moore', reward: '45' },
        { id: '16', name: 'Sophia Wright', reward: '40' },
        { id: '17', name: 'Mason Hall', reward: '35' },
        { id: '18', name: 'Isabella Young', reward: '30' },
        { id: '19', name: 'Ethan Thompson', reward: '25' }
    ];

    return (
        <div className="bg-white p-6 rounded-xl">
            <h3 className="text-3xl mb-2 font-semibold">Leaderboard</h3>
            <p className="text-sm text-gray-500 mb-4 font-inter">
                Keep up with the team to receive rewards!
            </p>

            {/* <!-- Scrollable Leaderboard --> */}
            <ul
                className="space-y-3  overflow-y-auto"
                style={{ scrollbarWidth: 'auto', maxHeight: '600px' }}
            >
                {LeaderBoardData.map((data, index) => (
                    <LeaderboardRow
                        key={data.id}
                        data={data}
                        isSelected={selectedIndex === index}
                        onClick={() => handleClick(index)}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
