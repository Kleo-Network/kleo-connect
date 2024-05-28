import { ReactComponent as Arrow } from '../../../../assets/images/arrowDataCard.svg'

interface DataCardBodyData {
  description: string
  data: string
}

export default function DataCardBody({ description, data }: DataCardBodyData) {
  return (
    <div className="flex flex-col items-center justify-end gap-2 self-stretch mt-4 font-medium flex-1 mb-2">
      <div className="flex flex-row items-center justify-start w-full">
        <span className="text-6xl font-bold text-white">{data}</span>
        <Arrow className="w-14 h-14 ml-4" />
      </div>
      <span className="text-sm text-white">{description}</span>
    </div>
  )
}
