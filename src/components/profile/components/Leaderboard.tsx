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
    setHighestKleoPoints: React.Dispatch<React.SetStateAction<number>>
}

const LEADER_BOARD_LENGTH = 20;

const Leaderboard = ({ userAddress, setHighestKleoPoints }: LeaderboardProps) => {
    const GET_TOP_USERS = `user/top-users?limit=${LEADER_BOARD_LENGTH}&address=${userAddress}`;

    // State for storing the leaderboard data
    const [leaderboardData, setLeaderboardData] = useState<ILeaderboardData[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetch top users including the user's own rank
    const { data: topUsersData, status: topUsersStatus, fetchData: fetchTopUsers } = useFetch();

    useEffect(() => {
        setIsLoading(true);
        // Fetch the leaderboard data when the component mounts or userAddress changes
        fetchTopUsers(GET_TOP_USERS);
    }, [userAddress]);

    // Set the leaderboard data when top users data is fetched
    useEffect(() => {
        if (topUsersData) {
            setLeaderboardData(topUsersData as ILeaderboardData[]);
            const topUserIndex = (topUsersData as ILeaderboardData[])[0].address === userAddress ? 1 : 0;
            setHighestKleoPoints((topUsersData as ILeaderboardData[])[topUserIndex].kleo_points);
        }
        setIsLoading(false);
    }, [topUsersData]);

    return (
        <div className="bg-white p-6 rounded-xl h-full w-full flex flex-col">
            <h3 className="text-[28px] mb-2 font-semibold">Leaderboard</h3>
            <p className="text-sm text-[#333F53] mb-4 font-inter">
                Keep up with the team to receive rewards!
            </p>

            {isLoading && (
                <div className="h-full w-full flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
            )}
            {/* Scrollable Leaderboard */}
            {!isLoading && <ul className="flex flex-col gap-3 overflow-y-auto max-h-[304px] lg:max-h-[554px] flex-1">
                {leaderboardData.map((data, index) => (
                    <LeaderboardRow
                        key={data.address}
                        address={data.address}
                        kleoPoints={data.kleo_points}
                        rank={data.rank}
                        isUser={index === 0}
                    />
                ))}
            </ul>}
        </div>
    );
};

export default Leaderboard;
