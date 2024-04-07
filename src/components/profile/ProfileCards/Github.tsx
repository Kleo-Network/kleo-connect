import React, { useMemo } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { ReactComponent as Github } from '../../../assets/images/githubFilled.svg'
import './../../../assets/stylesheets/github.css'
import { GitCard as GitCardType } from '../../common/interface'
interface GitHubCardProps {
  gitData: GitCardType
}

interface TooltipData {
  date: string
  count: number
}

const GitHubCard: React.FC<GitHubCardProps> = ({ gitData }) => {
  const { startDate, endDate, heatmapValues, maxCount } = useMemo(() => {
    const sortedContributions = gitData.contributions.sort(
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
  }, [gitData.contributions])

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

  const handleOnClick = () => {
    window.open(gitData.url, '_blank')
  }

  if (gitData.contributions.length === 0) {
    return <div>No contribution data available.</div>
  }

  return (
    <div
      className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md relative hover:cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="absolute top-0 right-0 p-4">
        <Github className="text-gray-800 w-8 h-8" />
      </div>
      <div className="flex items-center mb-4">
        <div>
          <h2 className="text-lg font-bold">{gitData.username}</h2>
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
      <div className="flex flex-row py-3">
        <span className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2">
          <span className="text-xs"> {gitData.followers} followers</span>
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
          <span className="text-xs"> {gitData.following} following</span>
        </span>
      </div>
    </div>
  )
}

export default GitHubCard
