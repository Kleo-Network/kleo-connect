import React, { useState } from "react";
import Group from '../../../assets/images/group.png'
import Copy from '../../../assets/images/copy.png'

const Referrals = () => {
    const [copied, setCopied] = useState(false);

    const referralLink = "https://example.com/referral"; // Replace with your referral link

    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const Referral = [
        { address: '0x5656565433...', dateJoined: '15.07.2024', xpEarned: '+120' },
        { address: '0x1234abcd9876...', dateJoined: '18.07.2024', xpEarned: '+200' },
        { address: '0xabcdef123456...', dateJoined: '20.07.2024', xpEarned: '+150' },
        { address: '0x87654321abcd...', dateJoined: '22.07.2024', xpEarned: '+175' },
        { address: '0x112233445566...', dateJoined: '25.07.2024', xpEarned: '+90' },
        { address: '0xaabbccddeeff...', dateJoined: '28.07.2024', xpEarned: '+220' },
        { address: '0x998877665544...', dateJoined: '30.07.2024', xpEarned: '+300' },
        { address: '0x776655443322...', dateJoined: '02.08.2024', xpEarned: '+110' },
        { address: '0xabcdef098765...', dateJoined: '05.08.2024', xpEarned: '+180' }
    ]

    return (
        <div className="container flex flex-col justify-between mx-auto p-6 bg-white rounded-xl mt-6 min-h-80">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-3xl mb-2 font-semibold">My Referrals</h3>
                    <p className="text-sm font-normal text-gray-700 font-inter">
                        Bring people onboard on Kleo and earn points!
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 rounded-full bg-gray-100 px-2 py-2">
                        <img
                            src={Group}
                            alt="Tweet your activity graph"
                            className="w-3.5 h-3.5"
                        />
                        <p className="text-xs font-inter">Referrals: 3</p>
                    </div>
                    <div className="flex items-center space-x-1 rounded-full bg-black px-3 py-2">
                        <img
                            src={Copy}
                            alt="Tweet your activity graph"
                            className="w-3.5 h-3.5"
                        />
                        <button onClick={copyToClipboard}>
                            <p className="text-xs text-white font-inter">
                                {copied ? 'Link Copied!' : 'Copy Referral Link'}
                            </p>
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 max-h-44 overflow-y-auto">
                <table className="min-w-full text-left table-auto" >
                    <thead className="sticky top-0 bg-white z-10">
                        <tr>
                            <th className="px-4 py-2 font-normal text-sm text-gray-500"></th>
                            <th className="px-4 py-2 font-normal text-sm text-gray-500 pl-8">
                                Address
                            </th>
                            <th className="px-4 py-2 font-normal text-sm text-gray-500">
                                Date Joined
                            </th>
                            <th className="px-4 py-2 font-normal text-sm text-gray-500">
                                XP Earned
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-200 rounded-lg">
                        {Referral.map((referral, index) => (
                            // <div>
                            <tr
                                key={index}
                                className={`${index % 2 === 0 ? 'bg-gray-100 rounded-lg' : 'bg-white'
                                    } rounded-lg`}
                            >

                                <td className="px-4 py-2 flex items-center gap-4 w-16 text-center ">
                                    <span className="text-sm font-medium">{index + 1}</span>
                                    <img
                                        src={'https://picsum.photos/40'}
                                        alt="User"
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <span className="truncate text-base font-medium text-gray-700">
                                        {referral.address}
                                    </span>
                                </td>
                                <td className="px-4 py-2 text-base font-medium text-gray-700">
                                    {referral.dateJoined}
                                </td>
                                <td
                                    className="gap - 1 text-lg font-semibold w-24 h-8 rounded-full flex items-center justify-center text-center"
                                    style={{
                                        backgroundColor: index % 2 === 0 ? 'white' : '#F4EBFF',
                                        color: '#7F56D9'
                                    }}
                                >

                                    {/* >\ */}
                                    {referral.xpEarned}
                                    <sub className="text-purple-600 text-xs text-xs">
                                        XP
                                    </sub>
                                </td>
                            </tr>
                            // </div>

                        ))}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default Referrals