import { useState, useEffect } from "react";
import LeaderboardRow from "./LeaderboardRow";
import useFetch from "../../common/hooks/useFetch";

export interface ILeaderboardData {
    address: string;
    rank: number;
    kleo_points: number;
}

interface LeaderboardProps {
    userAddress: string;
}

const LEADER_BOARD_LENGTH = 20;

const Leaderboard = ({ userAddress }: LeaderboardProps) => {
    const GET_TOP_USERS = `user/top-users?limit=${LEADER_BOARD_LENGTH}&address=${userAddress}`;

    // State for storing the leaderboard data
    const [leaderboardData, setLeaderboardData] = useState<ILeaderboardData[]>([]);

    // Fetch top users including the user's own rank
    const { data: topUsersData, status: topUsersStatus, fetchData: fetchTopUsers } = useFetch();

    useEffect(() => {
        // Fetch the leaderboard data when the component mounts or userAddress changes
        fetchTopUsers(GET_TOP_USERS);
    }, [userAddress]);

    // Set the leaderboard data when top users data is fetched
    useEffect(() => {
        if (topUsersData) {
            setLeaderboardData(topUsersData as ILeaderboardData[]);
        }
    }, [topUsersData]);

    return (
        <div className="bg-white p-6 rounded-xl h-full w-full flex flex-col">
            <h3 className="text-[28px] mb-2 font-semibold">Leaderboard</h3>
            <p className="text-sm text-[#333F53] mb-4 font-inter">
                Keep up with the team to receive rewards!
            </p>

            {/* Scrollable Leaderboard */}
            <ul className="flex flex-col gap-3 overflow-y-auto max-h-[304px] lg:max-h-[554px] flex-1">
                {leaderboardData.map((data, index) => (
                    <LeaderboardRow
                        key={data.address}
                        address={data.address}
                        kleoPoints={data.kleo_points}
                        rank={data.rank}
                        isUser={index === 0}
                    />
                ))}
            </ul>
        </div>
    );
};

export default Leaderboard;
