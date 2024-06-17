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
    <div className="flex-1 h-[148px] w-full bg-white rounded-[14px]">
      <div className="flex flex-row bg-white rounded-[14px] h-full p-4">
        <div className="flex flex-row">
          <div className="flex w-[108px] h-[116px] items-center justify-center bg-blue-50 rounded-xl mr-2">
            <div className="text-6xl text-blue-500 p-4 font-semibold">
              {currentDateNumber}
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start bg-white h-full py-2 ml-[16px]">
          <div className="flex text-[32px] font-inter font-medium text-gray-700">
            {' '}
            {currentMonth}
          </div>
          <button
            className="flex flex-row items-center justify-center bg-blue-500 text-white px-1 py-1 rounded-md hover:bg-blue-600 mt-auto h-[36px]"
            onClick={openPopUp}
          >
            <Calendly className="text-gray-100 w-4 h-4 mr-2" />
            <span className="text-xs justify-center">Book a meeting</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MonthlyCalendarCard
