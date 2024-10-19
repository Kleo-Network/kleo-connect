import { ReactComponent as Data } from '../../../assets/dashboard/Data.svg'
import rewardImage from '../../../assets/dashboard/Reward.png';

interface PointsAndDataCardProps {
  kleo_points: number,
  data_quantity: number,
}

// Function to format kleo points with commas (e.g., 12,334)
const formatKleoPoints = (points: number): string => {
  return points.toLocaleString(); // This adds commas as thousand separators
}

// Function to convert bytes to MB with 2 decimal places
const convertBytesToMB = (bytes: number): string => {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2); // Converts to MB and rounds to 2 decimal places
}

const PointsAndDataCard = ({ kleo_points, data_quantity }: PointsAndDataCardProps) => {
  const formattedKleoPoints = formatKleoPoints(kleo_points);
  const dataQuantityInMB = convertBytesToMB(data_quantity);

  return (
    <div className="flex flex-col justify-between h-full gap-5">
      {/* Total Points Earned */}
      <div className="relative rounded-2xl flex flex-col justify-between text-white p-0 bg-[url('/src/assets/dashboard/Grid.svg')] bg-no-repeat bg-cover h-full">
        <div className="relative flex flex-col justify-between z-0 p-6 h-full">
          {/* <Reward className="w-20 h-20 mb-4" /> */}
          <img src={rewardImage} className="w-20 h-20 mb-4" />
          <div>
            <h3 className="text-base font-medium font-inter">
              Total Points Earned
            </h3>
            <p className='text-lg font-normal'>
              <span className="text-5xl font-bold">{formattedKleoPoints} </span>
              KLEO XP
            </p>
          </div>
        </div>
      </div>

      {/* Total Data Quantity */}
      <div className="p-5 rounded-lg flex flex-col justify-between bg-white text-black h-full">
        <Data className="w-20 h-20 mb-4" />
        <div className="flex flex-col">
          <h3 className="text-base font-medium">Total Data Quantity</h3>
          <p className='text-lg font-normal'>
            <span className="text-5xl font-bold">{dataQuantityInMB} MB </span>
            till date
          </p>
        </div>
      </div>
    </div>
  )
}

export default PointsAndDataCard;
