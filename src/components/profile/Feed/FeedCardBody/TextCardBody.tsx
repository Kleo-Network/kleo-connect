interface TextCardData {
  textData: string
}

export default function TextCardBody(data: TextCardData) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <blockquote className="text-gray-600 text-lg mt-4">
        {data.textData}
      </blockquote>
    </div>
  )
}
