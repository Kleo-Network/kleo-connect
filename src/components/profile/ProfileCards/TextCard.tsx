import React from 'react'
import { TextCard as TextCardT } from '../../common/interface'
interface TextCardProps {
  metadata: TextCardT
}

const TextCard: React.FC<TextCardProps> = ({ metadata }) => {
  return (
    <div className="flex-1 h-full bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-between">
      <p className="text-gray-700 mt-2">{metadata.text}</p>
    </div>
  )
}

export default TextCard
