import { ReactComponent as Arrow } from '../../../../assets/images/arrowDataCard.svg'

interface DataCardBodyData {
  description: string
  data: string
  direction: string
  pendingCard: boolean
}

export default function DataCardBody({
  description,
  data,
  direction,
  pendingCard = false
}: DataCardBodyData) {
  return (
    <div
      className={`${
        pendingCard && 'w-[500px]'
      } flex flex-col justify-end gap-2 self-stretch mt-4 font-medium flex-1 mb-2`}
    >
      <div className="flex flex-row items-center justify-start w-full">
        <span className="text-[100px] font-semibold font-inter text-white">
          {data}%
        </span>
        <Arrow
          className={`w-[68px] h-[68px] ml-[11px] ${
            direction == 'increased' ? '' : 'rotate-180'
          }`}
        />
      </div>
      <span
        className={`${
          pendingCard && 'flex items-start'
        } text-2xl font-normal font-inter text-[#FCFCFD] -mt-5`}
      >
        {description}
      </span>
    </div>
  )
}
