interface DataCardBodyData {
  description: string
  data: string
}

export default function DataCardBody({ description, data }: DataCardBodyData) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 self-stretch mt-4 font-medium flex-1">
      <span className="text-sm text-gray-600">{description}</span>
      <span className="text-6xl font-bold text-gray-800">{data}</span>
    </div>
  )
}
