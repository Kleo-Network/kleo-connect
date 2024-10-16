import { MetaMaskAvatar } from 'react-metamask-avatar';
import KleoUserImage from '../../../assets/images/KleoToken.svg'
import { truncateText } from '../../utils/utils';

interface LeaderboardRowProps {
    address: string,
    kleoPoints: number,
    rank: number,
    isUser: boolean
}

const LeaderboardRow = ({ address, kleoPoints, rank, isUser }: LeaderboardRowProps) => {
    const isWalletAddress = /^0x[a-fA-F0-9]{40}$/.test(address);

    return (
        <li
            className={`mr-2 flex justify-between items-center p-4 rounded-md cursor-pointer ${isUser ? 'bg-[#293056]' : 'bg-gray-100'}`}
        >
            <div className="flex items-center space-x-2">
                <span
                    className={`font-medium text-xs w-3 ${isUser ? 'text-white' : 'text-gray-700'}`}
                >
                    {rank}
                </span>
                <hr className="w-6 rotate-90 border-white p-0" />
                {isWalletAddress ?
                    <MetaMaskAvatar address={address} size={24} />
                    : <img src={KleoUserImage}
                        alt="User image"
                        className="w-6 h-6 rounded-full" />
                }
                <span
                    className={`text-xs font-medium ${isUser ? 'text-white' : 'text-gray-700'}`}
                >
                    {isWalletAddress ? truncateText(address, 20) : address}
                </span>
            </div>
            <span
                className={`${isUser ? 'text-white' : 'text-gray-700'} text-sm font-medium`}
            >
                {kleoPoints}
                <span className={`text-[10px] ${isUser ? 'text-white' : 'text-gray-400'} ml-1`}>
                    KLEO
                </span>
            </span>
        </li>
    );
};

export default LeaderboardRow;
