import { ReactComponent as Data } from '../../../assets/dashboard/Data.svg'
import rewardImage from '../../../assets/dashboard/Reward.png';

const PointsAndDataCard = () => {
  const kleoPoint = '2,400'
  const dataQuantity = 34
  return (
    <div className="flex flex-col justify-between h-full">
      {/* Total Points Earned */}
      <div className="relative rounded-2xl flex flex-col justify-between text-white p-0 min-h-[200px] bg-[url('/src/assets/dashboard/Grid.svg')] bg-no-repeat bg-cover">
        <div className="relative flex flex-col justify-between z-0 p-6 h-full">
          {/* <Reward className="w-20 h-20 mb-4" /> */}
          <img src={rewardImage} className="w-20 h-20 mb-4" />
          <div>
            <h3 className="text-base font-medium font-inter">
              Total Points Earned
            </h3>
            <p className='text-lg font-normal'>
              <span className="text-5xl font-bold">{kleoPoint} </span>
              KLEO XP
            </p>
          </div>
        </div>
      </div>

      {/* Total Data Quantity */}
      <div className="p-5 rounded-lg flex flex-col justify-between bg-white text-black min-h-[215px]">
        <Data className="w-20 h-20 mb-4" />
        <div className="flex flex-col">
          <h3 className="text-base font-medium">Total Data Quantity</h3>
          <p className='text-lg font-normal'>
            <span className="text-5xl font-bold">{dataQuantity} MB </span>
            till date
          </p>
        </div>
      </div>
    </div>
  )
}

export default PointsAndDataCard
