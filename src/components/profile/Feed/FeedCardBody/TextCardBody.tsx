interface TextCardData {
  textData: string
  isTextWhite: boolean
  truncateText: boolean
}

export default function TextCardBody({ textData, isTextWhite = false, truncateText = false }: TextCardData) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <blockquote className={`text-lg mt-4 ${isTextWhite ? 'text-white' : 'text-gray-600'}`}>
        {textData.length > 50 && truncateText
          ? `${textData.slice(0, 50)}...`
          : textData}
      </blockquote>
    </div>
  )
}
