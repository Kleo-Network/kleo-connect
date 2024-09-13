import React from "react";
import KleoMate from '../../../assets/images/KleoMate.jsx'

const Snapshot = () => {
    return (
        <div className="bg-white p-6 rounded-xl mx-auto">
            <h3 className="text-2xl font-semibold mb-2">Snapshot</h3>
            <p className="text-gray-500 mb-6">
                Vote and be eligible to earn more KLEO XP!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* <!-- First Card - Kleo Mate --> */}
                <div
                    className="text-white p-5 rounded-lg"
                    style={{ backgroundColor: '#293056' }}
                >
                    <div
                        className="flex items-center justify-center h-10 w-10 rounded"
                        style={{ backgroundColor: '#475467' }}
                    >
                        <KleoMate color={'white'} />
                    </div>
                    <div className="flex items-center mb-2 mt-2">
                        <h4 className="text-lg font-semibold">Kleo Mate</h4>
                    </div>
                    <p className="text-sm font-normal mb-4">
                        a social networking dating website wants to request your data..
                    </p>
                    <button
                        className="bg-white py-2 px-4 rounded-lg font-semibold hover:bg-gray-100"
                        style={{ color: '#6941C6' }}
                    >
                        View Proposal
                    </button>
                </div>
                <div className="bg-gray-50 text-black p-5 rounded-lg">
                    <div className="flex items-center justify-center h-10 w-10 rounded bg-gray-100">
                        <KleoMate color={'#363F72'} />
                    </div>
                    <div className="flex items-center mb-2 mt-2">
                        <h4 className="text-lg font-semibold">Defi Creator</h4>
                    </div>
                    <p className="text-sm font-normal text-gray-600 mb-4">
                        a decentralised finance is requesting your data to share top
                        investment ...
                    </p>
                    <button
                        className=" text-white py-2 px-4 rounded-lg font-semibold "
                        style={{ backgroundColor: '#7F56D9' }}
                    >
                        View Proposal
                    </button>
                </div>
                <div className="bg-gray-50 text-black p-5 rounded-xl">
                    <div className="flex items-center justify-center h-10 w-10 rounded bg-gray-100">
                        <KleoMate color={'#363F72'} />
                    </div>
                    <div className="flex items-center mb-2 mt-2">
                        <h4 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                            Decentralised Youtube
                        </h4>
                    </div>
                    <p className="text-sm font-normal text-gray-600 mb-4">
                        seeking user data for personalised recommendation engine...
                    </p>
                    <button
                        className=" text-white py-2 px-4 rounded-lg font-semibold "
                        style={{ backgroundColor: '#7F56D9' }}
                    >
                        View Proposal
                    </button>
                </div>
            </div>
        </div>
    )
}


export default Snapshot