interface ImageCardData {
  data: ImageCardProp
}

interface ImageCardProp {
  imageUrl: string
  description: string
}

export default function ImagecardBody({ data }: ImageCardData) {
  return (
    <div className="flex flex-col items-center gap-2 self-stretch mt-4 font-medium flex-1">
      <div className="relative w-full max-h-[150px] overflow-hidden rounded-lg">
        <img
          src={data.imageUrl}
          alt="Researched Fiction Books"
          className="w-full h-full object-cover" // This will cover the area of the div, maintaining aspect ratio
        />
        <div className="absolute bottom-0 w-full p-2 bg-black bg-opacity-50 text-white text-center">
          {data.description}
        </div>
      </div>
    </div>
  )
}
