import React from 'react';
import { ReactComponent as Twitter } from '../../../assets/dashboard/XLogo.svg';
import XLogoImage from '../../../assets/dashboard/XLogo.png';

interface MileStoneItemProp {
  label: string,
  icon: string | undefined,
  value: string | undefined,
  progress?: number,
  xp: number;
  conversion?: (value: any) => { value: number | boolean; progress: number }; // Conversion callback
}

const MileStoneDetailsMap: Record<string, MileStoneItemProp> = {
  followed_on_twitter: {
    label: 'Follow us on Twitter',
    icon: XLogoImage,
    value: undefined,
    xp: 120,
    conversion: (value: boolean) => ({
      value,
      progress: value ? 100 : 0, // If true -> 100%, false -> 0%
    }),
  },
  tweet_activity_graph: {
    label: 'Tweet your activity graph',
    icon: XLogoImage,
    value: undefined,
    xp: 120,
    conversion: (value: boolean) => ({
      value,
      progress: value ? 100 : 0, // If true -> 100%, false -> 0%
    }),
  },
  data_owned: {
    label: '⁠Own and protect 200 MB of data.',
    icon: undefined,
    value: undefined,
    xp: 120,
    conversion: (value: number) => {
      const dataOwnedMB = value / (1024 * 1024); // Convert bytes to MB
      const progress = Math.min((dataOwnedMB / 200) * 100, 100).toFixed(2); // Round to 2 decimal places
      return { value: dataOwnedMB, progress: parseFloat(progress) };
    },
  },
  referred_count: {
    label: 'Refer 10 friends to join Kleo Network',
    icon: undefined,
    value: undefined,
    xp: 120,
    conversion: (value: number) => {
      const progress = Math.min((value / 10) * 100, 100).toFixed(2); // Round to 2 decimal places
      return { value, progress: parseFloat(progress) };
    },
  },
};

interface MileStonesProps {
  mileStones: Record<string, number | boolean>;
}

interface ListItemProps {
  icon: string | null;
  text: string;
  xp: number;
  progress?: number;
  opacity?: boolean;
}

interface CircularProgressProps {
  percentage: number;
}

const ListItem: React.FC<ListItemProps> = ({
  icon,
  text,
  xp,
  progress,
  opacity = false, // default to false if not provided
}) => {
  return (
    <li
      className={`flex items-center rounded-lg px-2 justify-between h-16 bg-gray-100 ${opacity ? 'opacity-50' : ''
        }`}
    >
      <div className="flex items-center space-x-2">
        {progress !== undefined ? (
          <CircularProgress percentage={progress} />
        ) : (
          <img
            src={icon || ''}
            alt="Milestone Icon"
            className="w-12"
          />
        )}
        <span className="text-sm font-semibold">{text}</span>
      </div>
      <span className="text-purple-600 font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center gap-1">
        +{xp} <span className="text-xs">XP</span>
      </span>
    </li>
  );
};

const CircularProgress = ({ percentage }: CircularProgressProps) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg className="w-12 h-12" viewBox="0 0 100 100">
      <circle
        className="text-gray-200"
        strokeWidth="10"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
      />
      <circle
        className="text-[#293056]"
        strokeWidth="10"
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        style={{
          transition: 'stroke-dashoffset 0.5s ease',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
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
  );
};

const Milestones = ({ mileStones }: MileStonesProps) => {
  // Map through mileStones and update MileStoneDetailsMap with converted values
  Object.keys(mileStones).forEach((key) => {
    const mileStoneItem = MileStoneDetailsMap[key];
    if (mileStoneItem && mileStoneItem.conversion) {
      const { value, progress } = mileStoneItem.conversion(mileStones[key]);
      mileStoneItem.value = value as unknown as any;
      mileStoneItem['progress'] = progress;
    }
  });

  return (
    <div className="bg-white p-5 rounded-xl flex flex-col justify-between w-full h-full">
      <h3 className="text-2xl mb-2 font-semibold">Milestones</h3>
      <p className="text-sm font-inter">Keep up with the team to receive rewards!</p>
      <ul className="mt-4 flex flex-col gap-4">
        {Object.keys(MileStoneDetailsMap).map((key, index) => {
          const milestone = MileStoneDetailsMap[key];
          const isBoolean = typeof milestone.value === 'boolean';
          const progress = isBoolean ? (milestone.value ? 100 : 0) : milestone.progress;

          // Logic for opacity: Boolean `true` -> low opacity, or 100% progress -> low opacity
          const opacity = isBoolean
            ? milestone.value as unknown as any === true // Low opacity if boolean is `true`
            : progress === 100; // Low opacity if progress is 100%

          return (
            <ListItem
              key={index}
              icon={milestone.icon || null}
              text={milestone.label}
              xp={milestone.xp}
              progress={!isBoolean ? progress : undefined}
              opacity={opacity}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Milestones;
