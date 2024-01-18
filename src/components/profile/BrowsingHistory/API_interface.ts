export interface Domain {
  domain: string
  icon: string
  title: string
  visitCounterTimeRange: number
}

export interface Category {
  hidden: boolean
  domains: Domain[]
  totalCategoryVisits: number
}

export interface TimeRange {
  [key: string]: Category
}
export interface ProcessItems {
  user_id: string
  signup: boolean
  counter: number
}
export interface BrowsingHistory {
  [key: string]: TimeRange
}

export interface ProcessingHistory {
  processing: boolean
}
