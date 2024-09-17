import React, { useState, useEffect } from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

// Mock API function to mimic fetching data
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
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
        skillLevels: [2, 4, 3, 1, 3, 4, 2, 3]
      });
    }, 1000);
  });
};

const SkillRadarChart = () => {
  const [chartData, setChartData] = useState({ labels: [], skillLevels: [] });

  // Mimic the API call
  useEffect(() => {
    fetchData().then((data) => {
      setChartData(data);
    });
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Skill Levels',
        data: chartData.skillLevels,
        backgroundColor: 'rgba(99, 102, 241, 0.2)', // Purple fill
        borderColor: 'rgba(99, 102, 241, 1)', // Purple border
        pointBackgroundColor: 'rgba(99, 102, 241, 1)', // Purple points
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 5,
        ticks: {
          stepSize: 1,
          backdropColor: 'rgba(255, 255, 255, 0)', // Transparent background for labels
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
    },
  };

  return <Radar data={data} options={options} />;
};

export default SkillRadarChart;
