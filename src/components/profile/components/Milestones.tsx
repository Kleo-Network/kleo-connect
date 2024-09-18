import React from 'react'
import { ReactComponent as Twitter } from '../../../assets/dashboard/XLogo.svg'

interface ListItemProps {
  icon: JSX.Element
  text: string
  xp: number
  progress?: number
  opacity?: boolean
}

interface CircularProgressProps {
  percentage: number;
}

const ListItem: React.FC<ListItemProps> = ({
  icon,
  text,
  xp,
  progress,
  opacity
}) => {
  return (
    <li
      className={`flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100 ${opacity ? 'opacity-50' : ''
        }`}
    >
      <div className="flex items-center space-x-1">
        {progress !== undefined ? (
          <CircularProgress percentage={progress} />
        ) : (
          icon
        )}
        <span className="text-sm font-semibold">{text}</span>
      </div>
      <span className="text-purple-600 font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center gap-1">
        +{xp} <span className="text-xs">XP</span>
      </span>
    </li>
  )
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <svg className="w-12 h-12" viewBox="0 0 100 100">
      {/* Background circle */}
      <circle
        className="text-gray-200"
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
      />
      {/* Progress circle */}
      <circle
        className="text-[#293056]"
        strokeWidth="10"
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: 'stroke-dashoffset 0.5s ease',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%'
        }}
      />
      {/* Percentage text in the middle */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="25"
        className="font-semibold text-black"
      >
        {percentage}%
      </text>
    </svg>
  )
}

const Milestones = () => {
  const milestones = [
    { icon: <Twitter />, text: "Tweet your activity graph", xp: 120 },
    { icon: null, text: "Tweet your activity graph", xp: 120, progress: 80 },
    { icon: null, text: "Tweet your activity graph", xp: 120, progress: 10 },
    { icon: <Twitter />, text: "Tweet your activity graph", xp: 120, opacity: true },
  ];

  return (
    <div className="bg-white p-5 rounded-xl relative max-h-[450px]">
      <h3 className="text-2xl mb-2 font-semibold">Milestones</h3>
      <p className="text-sm font-inter">
        Keep up with the team to receive rewards!
      </p>
      <ul className="mt-4 pb-8 space-y-4">
        {milestones.map((item, index) => (
          <ListItem
            key={index}
            icon={item.icon}
            text={item.text}
            xp={item.xp}
            progress={item.progress}
            opacity={item.opacity}
          />
        ))}
      </ul>
    </div>
  );
};


export default Milestones
