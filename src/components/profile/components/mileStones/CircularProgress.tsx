import { useMemo } from "react";

interface CircularProgressProps {
  percentage: number;
  radius?: number; // Allow radius to be customizable with a default
  strokeWidth?: number; // Allow stroke width to be customizable
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  radius = 45,
  strokeWidth = 10,
}) => {
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const strokeDashoffset = useMemo(
    () => circumference - (percentage / 100) * circumference,
    [circumference, percentage]
  );

  return (
    <svg
      className="w-12 h-12"
      viewBox="0 0 100 100"
      role="progressbar"
      aria-valuenow={percentage}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background circle */}
      <circle
        className="text-gray-200"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
      />

      {/* Foreground circle (progress) */}
      <circle
        className="text-[#293056] transition-[stroke-dashoffset] duration-500 ease-in-out transform -rotate-90 origin-center"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
      />

      {/* Percentage text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="25"
        className="font-semibold text-black"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
};

export default CircularProgress;