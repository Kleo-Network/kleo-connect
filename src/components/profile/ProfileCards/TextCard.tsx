import React from 'react'
import { TextCard as TextCardT } from '../../common/interface'
interface TextCardProps {
  metadata: TextCardT
  date: string
}

const TextCard: React.FC<TextCardProps> = ({ metadata, date }) => {
  return (
    <div className="relative flex flex-1 flex-col self-stretch items-center justify-center h-full w-full bg-purple-100 p-6 rounded-lg">
      <p
        className="absolute left-0 top-0 text-violet-800 font-inter font-semibold text-lg mt-4 mx-4 text-wrap overflow-hidden overflow-ellipsis text-left line-clamp-3"
        title={metadata.text}
      >
        {metadata.text}
      </p>
      <p className="absolute left-0 bottom-0 mb-4 ml-4 text-sm text-violet-600">
        {date}
      </p>
    </div>
  )
}

export default TextCard
