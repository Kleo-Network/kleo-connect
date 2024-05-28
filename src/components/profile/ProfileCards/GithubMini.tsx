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

const MiniGitHubCard: React.FC<GitHubCardProps> = ({ gitData }) => {
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
        ? new Date(sortedContributions[29].date)
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
    return <div>No contribution</div>
  }

  return (
    <div
      className="flex flex-1 h-full flex-row py-4 px-1 bg-white rounded-lg shadow-md relative justify-evenly hover:cursor-pointer"
      onClick={handleOnClick}
    >
      <div className="flex flex-col h-full w-1/2 justify-between p-1">
        <div className="flex flex-col">
          <div className="flex flex-col w-full">
            <div className="flex flex-row w-full h-31">
              <Github className="text-gray-800 w-[31px] h-[31px]" />
              <div className="flex items-center h-full ml-1">
                <h2
                  className="flex text-[16px] font-inter font-normal"
                  title={gitData.userName}
                >
                  {userName}
                </h2>
              </div>
            </div>
            <div className="flex flex-row w-full mt-2">
              <div className="flex items-center h-full relative mr-2">
                <div className="bg-green-100 h-2 w-2 rounded-full flex items-center justify-center">
                  <div className="bg-green-400 h-1 w-1 rounded-full"></div>
                </div>
                <div className="absolute top-0 left-0 h-2 w-full rounded-full bg-grey-200 opacity-50 shadow-lg"></div>
              </div>
              <span className="text-[10px] font-inter font-medium">
                {getTotalCount(gitData.contribution)} contributions
              </span>
            </div>
          </div>
        </div>

        <span className="inline-block items-center bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-auto">
          {gitData.followers} followers
        </span>
      </div>

      <div className="flex w-1/2 h-full items-center">
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

export default MiniGitHubCard
