import React from 'react'
import { TextCard as TextCardT } from '../../common/interface'
interface TextCardProps {
  metadata: TextCardT
}

const TextCard: React.FC<TextCardProps> = ({ metadata }) => {
  return (
    <div className="flex flex-1 self-stretch items-center justify-center h-full bg-red-50 p-6 rounded-lg shadow-lg shadow-opacity-50 shadow-[rgba(191,186,171,0.5)]">
      <p className="text-gray-700 mt-2">{metadata.text}</p>
    </div>
  )
}

export default TextCard
