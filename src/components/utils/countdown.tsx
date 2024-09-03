import React from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'

interface CountdownTimerProps {
  endDate: string // ISO string format e.g., "2024-12-24T00:00:00Z"
  isProfilePage: boolean
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  endDate,
  isProfilePage
}) => {
  const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed
  }: CountdownRenderProps) => {
    if (completed) {
      // Optionally, reset background color or perform another completion action
      return <div className="text-xl font-semibold">Happy Event!</div>
    } else {
      // Container for countdown units
      const timeUnit = (unit: number | string, label: string) => (
        <>
          <div
            className={`flex flex-col items-center justify-center ${
              isProfilePage ? 'mx-2' : 'm-2'
            }`}
          >
            <div
              className="w-9 h-10 bg-gray-100 text-gray-700 flex items-center justify-center
            text-[15px] font-bold rounded shadow-lg transform transition duration-700 ease-in-out"
            >
              {unit}
            </div>
            {!isProfilePage && (
              <div className="text-[8px] font-normal text-gray-500 mt-2">
                {label}
              </div>
            )}
          </div>
          {label !== 'Seconds' && (
            <img src="../assets/images/Colon.svg" className="w-2 h-2" />
          )}
        </>
      )

      // Render a countdown with turning pages effect simulation
      return (
        <div className="flex justify-center items-center">
          {timeUnit(days, 'Days')} :{timeUnit(hours, 'Hours')} :
          {timeUnit(minutes, 'Minutes')} :{timeUnit(seconds, 'Seconds')}
        </div>
      )
    }
  }

  return (
    <div className={`flex flex-col items-center justify-center`}>
      <Countdown date={endDate} renderer={renderer} />
    </div>
  )
}

export default CountdownTimer
