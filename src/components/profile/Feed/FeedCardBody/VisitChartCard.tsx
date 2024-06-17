import { useState, useRef } from 'react'
import chroma from 'chroma-js'
import { VisitCountMap } from '../../../common/interface'

interface VisitMetadata {
  data: VisitCountMap[]
  date: string
}

const VisitChartCard: React.FC<VisitMetadata> = ({ data, date }) => {
  const [hoveredSegment, setHoveredSegment] = useState<{
    category: string
    count: number
    x: number
    y: number
  } | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const total = data.reduce((sum, item) => sum + item.count, 0)

  // Sorting data from high to low count
  const sortedData = [...data].sort((a, b) => b.count - a.count)

  // Generate color scale from violet-50 to violet-900
  const colorScale = chroma
    .scale(['#4c1d95', '#f3e8ff'])
    .colors(sortedData.length)

  const getCoordinatesForPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent)
    const y = Math.sin(2 * Math.PI * percent)
    return [x, y]
  }

  let cumulativePercent = 100

  const handleMouseMove = (
    // event: React.MouseEvent<SVGPathElement, MouseEvent>,
    item: { category: string; count: number },
    midX: number,
    midY: number
  ) => {
    if (svgRef.current) {
      const boundingRect = svgRef.current.getBoundingClientRect()
      const xInPixels = ((midX + 1) * boundingRect.width) / 2
      const yInPixels = ((midY + 1) * boundingRect.height) / 2
      setHoveredSegment({
        ...item,
        x: xInPixels,
        y: yInPixels
      })
    }
  }

  return (
    <div className="flex flex-col justify-between items-center bg-gray-700 p-5 rounded-[14px] md:rounded-[24px] row-span-2">
      <div className="flex flex-col mb-5">
        <div className="flex font-semibold font-inter text-2xl text-white">
          Tag Used
        </div>
        <div className="flex text-[14px] font-inter text-white">
          The tags that are used the most throughout the cards are shown below
        </div>
      </div>
      <div className="relative flex flex-col justify-center items-center">
        <svg
          ref={svgRef}
          width={240}
          height={240}
          viewBox="-1 -1 2 2"
          className="flex rounded-full"
        >
          {sortedData.map((item, index) => {
            const [startX, startY] = getCoordinatesForPercent(cumulativePercent)
            const startPercent = cumulativePercent

            cumulativePercent += item.count / total

            const [endX, endY] = getCoordinatesForPercent(cumulativePercent)
            const endPercent = cumulativePercent

            const midPercent = (startPercent + endPercent) / 2
            const [midX, midY] = getCoordinatesForPercent(midPercent)

            const largeArcFlag = item.count / total > 0.5 ? 1 : 0

            const pathData = [
              `M ${startX} ${startY}`,
              `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
              `L 0 0`
            ].join(' ')

            return (
              <path
                key={item.category}
                d={pathData}
                fill={colorScale[index]}
                stroke="#344054"
                strokeWidth="0.1"
                onMouseEnter={(e) => handleMouseMove(item, midX, midY)}
                onMouseLeave={() => setHoveredSegment(null)}
              ></path>
            )
          })}
          <circle cx="0" cy="0" r="0.75" fill="#344054" />
        </svg>
        <div className="absolute text-center">
          <p className="text-[10px] font-inter text-gray-300">
            Website visited
          </p>
          <p className="text-[40px] font-semibold font-inter text-white">
            {total}
          </p>
          <p className="inline-block bg-gray-600 text-xs text-gray-300 px-2 py-1 rounded-full">
            {date}
          </p>
        </div>
        {hoveredSegment && (
          <div
            className="absolute flex flex-row items-center bg-white bg-opacity-70 rounded-full p-1 text-xs"
            style={{
              left: `${hoveredSegment.x}px`,
              top: `${hoveredSegment.y}px`,
              transform: 'translate(-60%, -60%)'
            }}
          >
            <div className="flex h-full items-center bg-white rounded-full px-1 text-[9px] font-inter text-gray-600">
              {Math.floor((hoveredSegment.count / total) * 100)}%
            </div>
            <p className="flex h-full items-center text-[10px] font-inter font-bold text-gray-600 px-1">
              {hoveredSegment.category}
            </p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-x-8 mt-7">
        {sortedData.map((item, index) => (
          <div key={item.category} className="flex items-center mb-2">
            <div
              className="min-w-3 min-h-3 mr-2 rounded-full"
              style={{ backgroundColor: colorScale[index] }}
            ></div>
            <p className="text-white font-inter text-[14px]">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default VisitChartCard
