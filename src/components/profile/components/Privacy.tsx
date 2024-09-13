import React from "react";


const Privacy = () => {
    return (
        <div
            className="bg-white p-4 rounded-xl "
            style={{
                background:
                    'linear-gradient(219.02deg, #293056 17.14%, #5969BC 118.66%)'
            }}
        >
            <h3 className="text-2xl mb-2 text-white font-semibold">Your Privacy</h3>
            <p className="text-sm mt-4 text-white font-inter">
                We value your privacy and remove all the PIIS before encrypting your
                data, safeguarded your identity by removing.
            </p>
            <p className="text-4xl font-bold text-white mt-4 font-inter">
                <span className="text-white text-lg font-normal">Total PIIS Removed</span>
            </p>
            <p className="text-4xl font-bold text-white  font-inter">
                2,400 <span className="text-white text-lg font-normal">PIIS </span>
            </p>
        </div>
    )
}

export default Privacy;