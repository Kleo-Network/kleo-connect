import React from "react";

interface PrivacyProps {
    pii_removed_count: number
}

const Privacy = ({ pii_removed_count }: PrivacyProps) => {
    return (
        <div className="p-4 rounded-xl bg-gradient-to-l from-[#293056] to-[#5969BC]">
            <h3 className="text-2xl mb-2 text-white font-semibold">Your Privacy</h3>
            <p className="text-sm mt-4 text-white font-inter">
                We value your privacy and remove all the PIIS before encrypting your
                data, safeguarded your identity by removing.
            </p>
            <p className="text-4xl font-bold text-white mt-4 font-inter">
                <span className="text-white text-lg font-normal">Total PIIS Removed</span>
            </p>
            <p className="text-4xl font-bold text-white  font-inter">
                {pii_removed_count} <span className="text-white text-lg font-normal">PIIS </span>
            </p>
        </div>
    )
}

export default Privacy;