import React from "react";
import { Radar } from "react-chartjs-2";
import { ReactComponent as Loading } from '../../../assets/dashboard/Loading.svg'

const DataQuality = () => {
    const percentage = 87;
    const dataQualityPercentage = 64;
    const options = {
        maintainAspectRatio: false, // Allow height to be adjusted
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: {
                    stepSize: 1,
                    backdropColor: "rgba(255, 255, 255, 0)", // Transparent background for labels
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the legend
            },
        },
    };

    const data = {
        labels: [
            "Trading",
            "Coding",
            "Medicine",
            "Government",
            "Planning",
            "Music",
            "Podcasts",
            "Designing",
        ],
        datasets: [
            {
                label: "Skill Levels",
                data: [2, 4, 3, 1, 3, 4, 2, 3],
                backgroundColor: "rgba(99, 102, 241, 0.2)", // Purple fill
                borderColor: "rgba(99, 102, 241, 1)", // Purple border
                pointBackgroundColor: "rgba(99, 102, 241, 1)", // Purple points
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="flex flex-col justify-between bg-white p-5 rounded-xl h-full">
            {/* My Data Quality */}
            <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl mb-2 font-semibold">My Data Quality</h3>
                        <p className="w-5/6 font-inter text-sm">
                            Data quality is defined by lorem ipusm dolor sit amit{" "}
                        </p>
                    </div>
                    <div className="text-2xl flex items-center rounded-xl justify-center font-bold w-20 h-16 text-white p-10 bg-[#7f56d9]">
                        {percentage}%
                    </div>
                </div>
                <div className="mt-4 relative flex items-center justify-between h-full">
                    <div className="relative bg-gray-100 rounded-lg flex items-center justify-center w-full h-full">
                        {/* Set responsive height for the Radar chart */}
                        <div className="">
                            {
                                data.datasets[0].data.length === 0
                                    ?
                                    <div className="flex flex-col justify-between p-5  items-center text-center">
                                        <Loading />
                                        <div>
                                            <p className="text-lg font-semibold text-[#1D2939]">We are processing your data</p>
                                            <p className="text-sm font-normal text-[#667085]">It takes about 5 minutes for our LLM models to create your activity graph.</p>
                                        </div>
                                    </div>
                                    :
                                    <div className="w-full h-[241px] xl:h-[261px]  py-5">
                                        <Radar data={data} options={options} />
                                    </div>
                            }
                        </div>
                    </div>
                </div>
                {data.datasets[0].data.length != 0 &&
                    <p className="mt-5 rounded-lg text-sm text-white bg-[#293056] h-11 pl-4 flex items-center ">
                        <span className="inline-block align-middle text-sm font-normal text-white-600 pr-1 ">
                            <span className="inline-block h-[11px] w-[11px] bg-white p-[1px] mr-[4px] rounded-full"></span>
                            <span className="font-bold">{dataQualityPercentage}%</span>
                            <span> of your data quality is from </span>
                            <span className="text-sm font-semibold text-white-600">Designing</span>
                        </span>
                    </p>
                }
            </div>
        </div>
    );
};

export default DataQuality;
