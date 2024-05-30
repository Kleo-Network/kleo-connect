import React, { useMemo } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import { ReactComponent as Github } from '../../../assets/images/githubFilled.svg'
import './../../../assets/stylesheets/github.css'
import { GitCard as GitCardType, Contribution } from '../../common/interface'
interface GitHubCardProps {
  gitData: GitCardType
}

interface TooltipData {
  date: string
  count: number
}

const GitHubCard: React.FC<GitHubCardProps> = ({ gitData }) => {
  const userName =
    gitData.userName.length > 10
      ? gitData.userName.slice(0, 10) + '...'
      : gitData.userName

  function getTotalCount(data: Contribution[]) {
    // Sum the count values from the remaining entries
    const totalCount = data.reduce((sum: number, entry) => sum + entry.count, 0)
    return totalCount
  }

  const { startDate, endDate, heatmapValues, maxCount } = useMemo(() => {
    const sortedContributions = gitData.contribution.sort(
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
  }, [gitData.contribution])

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

  if (gitData.contribution.length === 0) {
    return <div>No contribution data available.</div>
  }

  return (
    <div
      className="flex flex-1 flex-col h-full bg-white p-5 rounded-[14px] shadow-md relative justify-evenly hover:cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="flex flex-row w-full h-8">
        <Github className="text-gray-800 w-8 h-8" />
        <div className="flex items-center h-full ml-2">
          <div>
            <h2
              className="text-base font-inter font-normal"
              title={gitData.userName}
            >
              {userName}
            </h2>
          </div>
        </div>
        <span className="inline-block items-center bg-gray-100 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 ml-auto">
          <span className="text-xs"> {gitData.followers} followers</span>
        </span>
      </div>

      <div className="flex flex-row w-full">
        <div className="relative mr-2">
          <div className="bg-green-100 h-4 w-4 rounded-full flex items-center justify-center">
            <div className="bg-green-400 h-2 w-2 rounded-full"></div>
          </div>
          <div className="absolute top-0 left-0 h-4 w-full rounded-full bg-grey-200 opacity-50 shadow-lg"></div>
        </div>
        <span className="text-xs font-inter">
          {getTotalCount(gitData.contribution)} contributions
        </span>
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
