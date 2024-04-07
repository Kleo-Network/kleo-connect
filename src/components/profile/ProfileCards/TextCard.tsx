import React from 'react'

interface TextCardProps {
  title?: string
  subtitle?: string
  content: string
}

const TextCard: React.FC<TextCardProps> = ({ title, subtitle, content }) => {
  return (
    <div className="flex-1 h-full bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-between">
      {title && (
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-center">{title}</h2>
        </div>
      )}
      {subtitle && <h3 className="text-md text-gray-500">{subtitle}</h3>}
      <p className="text-gray-700 mt-2">{content}</p>
    </div>
  )
}

export default TextCard
