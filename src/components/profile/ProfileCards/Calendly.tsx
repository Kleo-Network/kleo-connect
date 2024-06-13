import React from 'react'
import { InlineWidget } from 'react-calendly'
import { ReactComponent as Calendly } from '../../../assets/images/calendar.svg'

interface MonthlyCalendarCardProps {
  calendlyUrl: string
}

const MonthlyCalendarCard: React.FC<MonthlyCalendarCardProps> = ({
  calendlyUrl
}) => {
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' })
  const currentYear = currentDate.getFullYear()
  const currentDay = currentDate.getDate()

  const openPopUp = () => {
    window.open(calendlyUrl, '_blank')
  }

  return (
    <div className="flex-1 h-full w-full bg-white relative rounded-[14px]">
      <div className="bg-white overflow-hidden rounded-[5px] mx-2 mt-3 text-gray-900 font-semibold text-center opacity-60 pointer-events-none">
        <div className="flex items-center justify-around px-2 py-4">
          <div className="text-sm">
            {currentMonth}, {currentYear}
          </div>
        </div>
        <div className="grid grid-cols-7 grid-rows-6 p-2 gap-2 text-xs">
          <div className="text-blue-600">M</div>
          <div className="text-blue-600">T</div>
          <div className="text-blue-600">W</div>
          <div className="text-blue-600">T</div>
          <div className="text-blue-600">F</div>
          <div className="text-blue-600">S</div>
          <div className="text-blue-600">S</div>
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <a
              key={day}
              href="#"
              className={`hover:bg-blue-100 rounded-md p-1 ${
                day === currentDay ? 'bg-blue-600 text-white' : ''
              }`}
            >
              {day}
            </a>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center mb-3 z-10">
        <button
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={openPopUp}
        >
          <Calendly className="text-gray-100 w-5 h-5 mr-2" />
          <div className="border-l border-gray-300 mx-2 h-4"></div>
          <span className="text-sm">Book a meeting</span>
        </button>
      </div>
    </div>
  )
}

export default MonthlyCalendarCard
