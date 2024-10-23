import CircularProgress from "./CircularProgress";

interface ProgressMilestoneProps {
  label: string;
  progress: number;
  xp: number;
}

const ProgressMilestone = ({ label, progress, xp }: ProgressMilestoneProps) => {
  return (
    <li className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <div className="flex items-center space-x-3">
        <CircularProgress percentage={progress} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <span className="text-purple-600 font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center">
        +{xp} XP
      </span>
    </li>
  )
}

export default ProgressMilestone;