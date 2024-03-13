import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Label
} from 'recharts'

export interface BrowsingDataForRadarChart {
  category: string
  categoryVisits: number
  totalCategoryVisits: number
}

interface RadarChartProps {
  browsingData: BrowsingDataForRadarChart[]
  radarCharName?: string
  dataKey?: string
  dataKeyForRadar: string
}

export function BrowsingHistoryRadarChart({
  browsingData,
  radarCharName,
  dataKey,
  dataKeyForRadar
}: RadarChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart title={radarCharName} cx="50%" cy="50%" data={browsingData}>
        <PolarGrid />
        <PolarAngleAxis
          dataKey={dataKey}
          fontSize={12}
          tickLine={false}
          width={12}
        >
          <Label offset={5} position="outside" />
        </PolarAngleAxis>
        <PolarRadiusAxis fontSize={12} />
        <Radar
          name={radarCharName}
          dataKey={dataKeyForRadar}
          fontSize={12}
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip
          contentStyle={{
            borderRadius: '0.375rem',
            border: '1px solid #E5E7EB',
            boxShadow:
              '0 2px 4px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)'
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default BrowsingHistoryRadarChart
