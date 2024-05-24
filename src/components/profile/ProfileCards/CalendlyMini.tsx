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
  const currentDateNumber = currentDate.getDate()
  const currentDay = currentDate.toLocaleDateString('default', {
    weekday: 'long'
  })

  const openPopUp = () => {
    window.open(calendlyUrl, '_blank')
  }

  return (
    <div className="flex-1 h-full w-full bg-white rounded-[5px] shadow-md">
      <div className="flex flex-row bg-white rounded-[5px] h-full p-2">
        <div className="flex flex-row mr-auto">
          <div className="flex items-center justify-center bg-blue-50 rounded-xl mr-2">
            <div className="text-3xl text-blue-500 p-4 font-semibold">
              {currentDateNumber}
            </div>
          </div>
          <div className="flex flex-col h-full">
            <div className="flex text-xl font-inter font-medium text-gray-700">
              {' '}
              {currentMonth}
            </div>
            <div className="flex text-base font-inter text-gray-400">
              {currentDay}
            </div>
          </div>
        </div>
        <div className="flex justify-center bg-white h-full py-11 ml-auto">
          <button
            className="flex flex-row items-center bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-blue-600"
            onClick={openPopUp}
          >
            <Calendly className="text-gray-100 w-4 h-4" />
            <div className="border-l border-gray-300 mx-1 h-5"></div>
            <span className="text-xs">Book a meeting</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MonthlyCalendarCard
