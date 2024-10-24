import CircularProgress from "./CircularProgress";

interface ProgressMilestoneProps {
  label: string;
  progress: number;
  xp: number;
}

const ProgressMilestone = ({ label, progress, xp }: ProgressMilestoneProps) => {
  const isCompleted = progress === 100;

  return (
    <li
      className={`flex items-center justify-between p-4 rounded-lg bg-gray-100 ${isCompleted ? 'opacity-50 pointer-events-none' : ''}`}
    >
      <div className="flex items-center space-x-3">
        <CircularProgress percentage={progress} />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <span className="text-[#7f56d9] font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center relative">
        +{xp} XP
        {/* Green circle with white checkmark */}
        {isCompleted &&
          <span className="absolute top-[-4px] right-[-4px] bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">✓</span>
        }
      </span>
    </li>
  );
}

export default ProgressMilestone;