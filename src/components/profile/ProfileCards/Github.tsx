import React, { useMemo } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { ReactComponent as Github } from '../../../assets/images/githubFilled.svg'

interface Contribution {
  date: string
  count: number
}

interface GitHubCardProps {
  profileImage: string
  username: string
  bio: string
  contributions: Contribution[]
}

interface TooltipData {
  date: string
  count: number
}

const GitHubCard: React.FC<GitHubCardProps> = ({
  profileImage,
  username,
  bio,
  contributions
}) => {
  const { startDate, endDate, heatmapValues, maxCount } = useMemo(() => {
    const sortedContributions = contributions.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const startDate =
      sortedContributions.length > 0
        ? new Date(sortedContributions[0].date)
        : new Date()
    const endDate =
      sortedContributions.length > 0
        ? new Date(sortedContributions[sortedContributions.length - 1].date)
        : new Date()
    const heatmapValues = sortedContributions.map(({ date, count }) => ({
      date,
      count
    }))
    const maxCount = Math.max(
      ...sortedContributions.map((contrib) => contrib.count),
      0
    )
    return { startDate, endDate, heatmapValues, maxCount }
  }, [contributions])

  const getClassForValue = (value: TooltipData | null) => {
    if (!value || maxCount === 0) {
      return 'color-empty'
    }
    const ratio = value.count / maxCount
    if (ratio === 0) return 'color-empty'
    else if (ratio <= 0.2) return 'color-scale-1'
    else if (ratio <= 0.4) return 'color-scale-2'
    else if (ratio <= 0.6) return 'color-scale-3'
    else if (ratio <= 0.8) return 'color-scale-4'
    else return 'color-scale-5'
  }

  if (contributions.length === 0) {
    return <div>No contribution data available.</div>
  }

  return (
    <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md relative">
      <div className="absolute top-0 right-0 p-4">
        <Github className="text-gray-800 w-8 h-8" />
      </div>
      <div className="flex items-center mb-4">
        <img
          src={profileImage}
          alt={`Profile of ${username}`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-lg font-bold">{username}</h2>
          <p className="text-gray-600 text-sm">{bio}</p>
        </div>
      </div>
      <div className="mt-4">
        <CalendarHeatmap
          startDate={startDate}
          endDate={endDate}
          values={heatmapValues}
          classForValue={getClassForValue}
          gutterSize={2}
          tooltipDataAttrs={(value: TooltipData) => ({
            'data-tip': `${value.date} has count: ${value.count}`
          })}
        />
      </div>
    </div>
  )
}

export default GitHubCard
