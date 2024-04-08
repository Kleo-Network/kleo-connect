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
      return (
        <div className="text-xl font-semibold">Time's up! Happy Event!</div>
      )
    } else {
      // Container for countdown units
      const timeUnit = (unit: number | string, label: string) => (
        <div
          className={`flex flex-col items-center justify-center ${
            isProfilePage ? 'mx-2' : 'm-2'
          }`}
        >
          <div
            className={`${
              isProfilePage
                ? 'w-8 h-8 bg-white text-violet-700'
                : 'w-24 h-24 bg-violet-700 text-white'
            }  flex items-center justify-center
            ${
              isProfilePage ? 'text-xs' : 'text-2xl'
            } font-bold rounded shadow-lg transform transition duration-700 ease-in-out`}
          >
            {unit}
          </div>
          {!isProfilePage && (
            <div className="text-sm text-gray-700 mt-2">{label}</div>
          )}
        </div>
      )

      // Render a countdown with turning pages effect simulation
      return (
        <div className="flex justify-center items-center">
          {timeUnit(days, 'Days')}
          {timeUnit(hours, 'Hours')}
          {timeUnit(minutes, 'Minutes')}
          {timeUnit(seconds, 'Seconds')}
        </div>
      )
    }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center ${
        isProfilePage ? 'py-2' : 'p-4'
      }`}
    >
      {!isProfilePage && (
        <h1 className="text-2xl font-bold mb-4">New Cards Coming In...</h1>
      )}
      <Countdown date={endDate} renderer={renderer} />
    </div>
  )
}

export default CountdownTimer
