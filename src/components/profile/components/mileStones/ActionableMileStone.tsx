interface ActionableMileStoneProps {
  label: string;
  icon: string;
  onClick: () => void;
  xp: number;
  completed: boolean;
}

const ActionableMileStone = ({ completed, icon, label, onClick, xp }: ActionableMileStoneProps) => {
  const handleOnClick = () => {
    onClick();
  }

  return (
    <li className={`flex items-center justify-between p-4 bg-gray-100 rounded-lg cursor-pointer ${completed ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-200'}`}
      onClick={handleOnClick}
    >
      <div className="flex items-center space-x-3">
        <img src={icon} alt="Twitter Logo" className="w-10 h-10" />
        <span className="text-sm font-semibold">{label}</span>
      </div>
      <span className="text-[#7f56d9] font-bold bg-white w-24 h-8 rounded-full flex items-center justify-center relative">
        +{xp} XP
        {/* Green circle with white checkmark */}
        {completed &&
          <span className="absolute top-[-4px] right-[-4px] bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">✓</span>
        }
      </span>
    </li>
  )
}

export default ActionableMileStone;