import React from "react"
import { Radar } from "react-chartjs-2"

const DataQuality = () => {
    const options = {
        scales: {
            r: {
                angleLines: {
                    display: true
                },
                suggestedMin: 0,
                suggestedMax: 5,
                ticks: {
                    stepSize: 1,
                    backdropColor: 'rgba(255, 255, 255, 0)' // Transparent background for labels
                }
            }
        },
        plugins: {
            legend: {
                display: false // Hide the legend
            }
        }
    }

    const data = {
        labels: [
            'Trading',
            'Coding',
            'Medicine',
            'Government',
            'Planning',
            'Music',
            'Podcasts',
            'Designing'
        ],
        datasets: [
            {
                label: 'Skill Levels',
                data: [2, 4, 3, 1, 3, 4, 2, 3],
                backgroundColor: 'rgba(99, 102, 241, 0.2)', // Purple fill
                borderColor: 'rgba(99, 102, 241, 1)', // Purple border
                pointBackgroundColor: 'rgba(99, 102, 241, 1)', // Purple points
                borderWidth: 2
            }
        ]
    }

    return (
        <div className="space-y-6 "
        >
            {/* <!-- My Data Quality --> */}
            <div
                className="bg-white p-5 rounded-xl "
                style={{ minHeight: '450px' }}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl mb-2 font-semibold">My Data Quality</h3>
                        <p className="w-5/6 font-inter text-sm"

                        >
                            Data quality is defined by lorem ipusm dolor sit amit{' '}
                        </p>
                    </div>
                    <div
                        className="text-2xl flex items-center rounded-xl justify-center font-bold text-purple-600 w-20 h-16 bg-primary-btn-300 text-white p-10"
                        style={{
                            backgroundColor: 'rgba(127, 86, 217, 1)'
                        }}
                    >
                        87%
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                    <div
                        className=" bg-gray-100 rounded-lg flex items-center justify-center"
                        style={{ height: '252px', width: '100%' }}
                    >
                        <Radar data={data} options={options} />
                    </div>
                </div>
                <p className="mt-5 rounded-lg text-sm flex items-center pl-4 text-white bg-indigo-950 h-11">
                    <span className="flex items-center text-sm font-bold text-white-600 pr-1">
                        <span
                            style={{
                                height: '11px',
                                width: '11px',
                                backgroundColor: 'white',
                                padding: '1px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginRight: '4px',
                                borderRadius: '50%'
                            }}
                        ></span>{' '}
                        64%{' '}
                    </span>
                    of your data quality is from
                    <span className="text-sm font-bold text-white-600 pl-1">
                        Designing
                    </span>
                </p>
            </div>
        </div>
    )
}

export default DataQuality