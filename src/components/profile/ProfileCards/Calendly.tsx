import React from 'react'
import { InlineWidget } from 'react-calendly'

interface MonthlyCalendarCardProps {
  calendlyUrl: string
}

const MonthlyCalendarCard: React.FC<MonthlyCalendarCardProps> = ({
  calendlyUrl
}) => {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
  const currentYear = currentDate.getFullYear()

  return (
    <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md relative">
      {/* <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{`${currentMonth.toUpperCase()} ${currentYear}`}</h2>
      </div> */}
      <div className="mt-4" style={{ height: '100%' }}>
        <InlineWidget url={calendlyUrl} styles={{ height: '100%' }} />
      </div>
    </div>
  )
}

export default MonthlyCalendarCard
