import { Radar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { ReactComponent as ProcessingMessage } from '../../../assets/dashboard/Processing.svg'

const RadarChartOptions = {
    maintainAspectRatio: false, // Allow height to be adjusted
    responsive: true, // Makes the chart responsive
    layout: {
        padding: 20, // Add padding around the chart
    },
    scales: {
        r: {
            beginAtZero: true, // Ensure the scale starts at zero
            angleLines: {
                display: true,
                color: 'rgb(208, 213, 221)', // Light gray color for angle lines
                lineWidth: 0.8, // Adjust the thickness of angle lines
            },
            grid: {
                color: 'rgb(208, 213, 221)', // Grid lines color
                circular: true, // Use circular grid lines
                lineWidth: 0.8, // Adjust the grid line thickness
            },
            suggestedMin: 0, // Suggested minimum value for the radial scale
            suggestedMax: 5, // Suggested maximum value for the radial scale
            pointLabels: {
                color: 'rgba(29, 41, 57, 1)', // Darker color for the point labels
                font: {
                    size: 10, // Font size for point labels
                },
            },
            ticks: {
                display: false, // Show the ticks
                stepSize: 1, // Adjust the spacing between tick marks (higher value = fewer rings)
                backdropColor: "rgba(255, 255, 255, 0)", // Transparent background for labels
                color: 'rgba(29, 41, 57, 0.7)', // Color for tick labels
                z: 1, // Bring the tick labels to the front
            },
        },
    },
    plugins: {
        legend: {
            display: false, // Hide the legend
        },
        point: {
            radius: 10, // Default radius for data points
            hoverRadius: 10, // Radius when hovering over points
        },
    },
};
export const RadarChartData = {
    labels: ['Math', 'Science'],
    datasets: [
        {
            label: 'User Activity Graph',
            data: [20, 30],
            backgroundColor: 'rgba(127, 86, 217, 0.1)',
            borderColor: 'rgba(127, 86, 217, 1)',
            borderWidth: 0.8,
            pointBackgroundColor: 'rgba(127, 86, 217, 1)',
            pointBorderColor: 'rgba(127, 86, 217, 1)',
            pointHoverBackgroundColor: 'rgba(107,33,168, 1)',
            pointHoverBorderColor: 'rgba(107,33,168, 1)',
        },
    ],
};

interface DataQualityProps {
    address: string;
    isLoading: boolean;
    isProcessing: boolean;
    graphData: any;
    userKleoPoints: number;
    highestKleoPoints: number;
}

interface GraphLabelItem {
    label: string;
    percentage: number;
}

interface RadarChartDataset {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        pointBackgroundColor: string;
    }[];
}

const DataQuality = ({ address, isLoading, isProcessing, graphData, userKleoPoints, highestKleoPoints }: DataQualityProps) => {
    const [highestLabel, setHighestLabel] = useState<string>('');
    const [highestValue, setHighestValue] = useState<number>(-1);
    const [highestValueIndex, setHighestValueIndex] = useState<number>(-1);
    const [radarChartData, setRadarChartData] = useState<RadarChartDataset>(RadarChartData);
    const [dataQualityPercentage, setDataQualityPercentage] = useState(0);

    // Reset the Data for RadarChart when data is changed.
    useEffect(() => {
        if (graphData && graphData.length > 0) {
            setRadarChartData((prevState) => ({
                ...prevState,
                labels: graphData.map((item: GraphLabelItem) => item.label),
                datasets: [
                    {
                        ...prevState.datasets[0],
                        data: graphData.map((item: GraphLabelItem) => Math.round(item.percentage))
                    }
                ]
            }))
        }
    }, [graphData])

    // Calculating highest contributor category
    useEffect(() => {
        if (!isLoading) {
            const index = radarChartData.datasets[0].data.indexOf(Math.max(...radarChartData.datasets[0].data));
            setHighestValueIndex(index);
            setHighestValue(radarChartData.datasets[0].data[index]);
            setHighestLabel(radarChartData.labels[index]);
        }
    }, [radarChartData, isLoading]);

    useEffect(() => {
        if (userKleoPoints && highestKleoPoints) {
            const percentage = (userKleoPoints / highestKleoPoints) * 100;
            setDataQualityPercentage(Number(percentage.toFixed(1)));
        } else {
            setDataQualityPercentage(0);
        }
    }, [highestKleoPoints, userKleoPoints])

    return (
        <div className="flex flex-col justify-between bg-white p-5 rounded-xl h-full">
            <div className="flex flex-col justify-start h-full gap-4">
                {/* My Quality + Quality Index */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-2xl mb-2 font-semibold">My Data Quality</h3>
                        <p className="w-5/6 font-inter text-sm">
                            Data quality score is based on <a href="https://docs.kleo.network/kleo_network/rewards/" target="_blank"><u className="text-[#7f56d9]">uniqueness</u></a> of your activity.
                        </p>
                    </div>
                    <div className="text-2xl flex items-center rounded-xl justify-center font-bold w-20 h-16 text-white p-10 bg-[#7f56d9]">
                        {dataQualityPercentage}%
                    </div>
                </div>
                {/* Processing Banner */}
                {isProcessing && !isLoading && <div className="w-full bg-[#F2F4F7] rounded-lg overflow-hidden flex items-center justify-center flex-1">
                    <ProcessingMessage />
                </div>}
                {/* Radar Activity Chart + Max Contribution banner */}
                {!isProcessing && <div className="flex-1">
                    {/* Radar Activity Chart */}
                    <div className="mt-4 relative flex items-center justify-between h-full">
                        <div className="relative bg-gray-100 rounded-lg flex items-center justify-center w-full h-full">
                            <div className="">
                                {isLoading && (
                                    <div className="w-8 h-8 border-4 border-t-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
                                )}
                                {
                                    (!isLoading && !isProcessing) && (
                                        <div className="w-full h-[241px] xl:h-[261px]  py-5">
                                            <Radar data={radarChartData} options={RadarChartOptions} />
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    {/* Max Contribution Banner */}
                    <div className="w-full bg-[#293056] min-h-9 rounded-lg px-4 py-2 flex items-center justify-start gap-2 mt-5 text-sm text-white">
                        <div className="size-3 rounded-full bg-white shrink-0"></div>
                        <div className="font-normal text-gray-blue-25 text-xs">
                            {isLoading ? (
                                'Loading...'
                            ) : (
                                <>
                                    <span className="font-bold">{highestValue !== -1 ? highestValue + '%' : 'N/A'} </span>
                                    of your data quality is from
                                    <span className="font-bold"> {highestLabel || 'N/A'}</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
};

export default DataQuality;
