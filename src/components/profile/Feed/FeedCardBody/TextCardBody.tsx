interface TextCardData {
  textData: string
  isYTCard: boolean
}

export default function TextCardBody({ textData, isYTCard = false }: TextCardData) {
  return (
    <div className="flex-1 flex flex-col justify-center">
      <blockquote className={`text-lg mt-4 ${isYTCard ? 'text-white' : 'text-gray-600'}`}>
        {textData}
      </blockquote>
    </div>
  )
}
