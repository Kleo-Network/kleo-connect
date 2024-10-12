import React, { useState } from "react";
import LeaderboardRow from "./LeaderboardRow";

export interface ILeaderboardData {
    id: string;
    name: string;
    reward: string;
    profilePic: string;
}

const leaderboardData: ILeaderboardData[] = [
    { id: '288', name: 'Ruchi Tripathi', reward: '213', profilePic: 'https://picsum.photos/40?random=1' },
    { id: '1', name: 'Alex Johnson', reward: '180', profilePic: 'https://picsum.photos/40?random=2' },
    { id: '2', name: 'Jamie Lee', reward: '150', profilePic: 'https://picsum.photos/40?random=3' },
    { id: '3', name: 'Taylor Smith', reward: '140', profilePic: 'https://picsum.photos/40?random=4' },
    { id: '4', name: 'Jordan Brown', reward: '130', profilePic: 'https://picsum.photos/40?random=5' },
    { id: '5', name: 'Morgan White', reward: '120', profilePic: 'https://picsum.photos/40?random=6' },
    { id: '6', name: 'Casey Harris', reward: '110', profilePic: 'https://picsum.photos/40?random=7' },
    { id: '7', name: 'Riley Clark', reward: '100', profilePic: 'https://picsum.photos/40?random=8' },
    { id: '8', name: 'Avery Lewis', reward: '90', profilePic: 'https://picsum.photos/40?random=9' },
    { id: '9', name: 'Quinn Martin', reward: '80', profilePic: 'https://picsum.photos/40?random=10' },
    { id: '10', name: 'Samantha Green', reward: '75', profilePic: 'https://picsum.photos/40?random=11' },
    { id: '11', name: 'Liam Mitchell', reward: '60', profilePic: 'https://picsum.photos/40?random=12' },
    { id: '12', name: 'Olivia King', reward: '55', profilePic: 'https://picsum.photos/40?random=13' },
    { id: '13', name: 'Noah Scott', reward: '50', profilePic: 'https://picsum.photos/40?random=14' },
    { id: '14', name: 'Emily Carter', reward: '48', profilePic: 'https://picsum.photos/40?random=15' },
    { id: '15', name: 'Lucas Moore', reward: '45', profilePic: 'https://picsum.photos/40?random=16' },
    { id: '16', name: 'Sophia Wright', reward: '40', profilePic: 'https://picsum.photos/40?random=17' },
    { id: '17', name: 'Mason Hall', reward: '35', profilePic: 'https://picsum.photos/40?random=18' },
    { id: '18', name: 'Isabella Young', reward: '30', profilePic: 'https://picsum.photos/40?random=19' },
    { id: '19', name: 'Ethan Thompson', reward: '25', profilePic: 'https://picsum.photos/40?random=20' }
];

const Leaderboard = () => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleClick = (index: React.SetStateAction<number>) => {
        setSelectedIndex(index);
    };

    return (
        <div className="bg-white p-6 rounded-xl h-full w-full flex flex-col">
            <h3 className="text-[28px] mb-2 font-semibold">Leaderboard</h3>
            <p className="text-sm text-[#333F53] mb-4 font-inter">
                Keep up with the team to receive rewards!
            </p>

            {/* Scrollable Leaderboard */}
            <ul className="flex flex-col gap-3 overflow-y-auto max-h-[304px] lg:max-h-[514px] flex-1">
                {leaderboardData.map((data, index) => (
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
