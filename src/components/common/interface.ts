export interface UserData {
  about: string
  badges: string[]
  content_tags: string[]
  identity_tags: string[]
  last_attested: number
  last_cards_marked: number
  name: string
  pfp: string
  profile_metadata: any
  settings: any
  slug: string
  stage: number
  verified: boolean
  email: string
  token: any
}

export interface VisitCountMap {
  category: string
  count: number
}

interface PublishedCardMetadata {
  activity: string[] | VisitCountMap[] | string
  description: string
  entities?: string[]
  dateFrom?: number
  dateTo?: number
  tags?: string[]
  titles?: string[]
}

interface PublishedCardUrls {
  id: string
  title: string
  url: string
}

export enum CardTypeToRender {
  YT = 'YT',
  IMAGE = 'IMAGE',
  DATA = 'DATA'
}

export interface PublishedCard {
  cardType: string
  category: string
  content: string
  date: string
  id: string
  metadata: PublishedCardMetadata
  minted: boolean
  tags: string[]
  urls: PublishedCardUrls[]
  cardTypeToRender?: CardTypeToRender
  stockImage?: string
}
export enum CardType {
  GitCard = 'GitCard',
  CalendlyCard = 'CalendlyCard',
  MapCard = 'PlaceCard',
  TwitterCard = 'XCard'
}
export interface Contribution {
  date: string
  count: number
}
export interface GitCard {
  userName: string
  followers: number
  following: number
  contribution: Contribution[]
  url: string
}
export interface CalendlyCard {
  slug: string
}
export interface MapCard {
  location: string
  cordinates: {
    lat: number
    lng: number
  }
}
//  Type 'GitCard' is missing the following properties from type 'User': pinned_tweet, bio, followers_count, is_verifiedts(2322)
export interface TextCard {
  text: string
}
export interface TwitterCard {
  username: string
  pinned_tweet: string
  followers_count: number
  following_count: number
  bio: string
  is_verified: boolean
}

interface UrlMetadata {
  url: string,
  caption: string
}

export interface InstagramCard {
  urls: UrlMetadata[],
  username: string
}

export interface StaticCard {
  cardType: string
  id: string
  last_connected: string
  metadata: GitCard | CalendlyCard | MapCard | TwitterCard | TextCard | InstagramCard
}

export interface fullUserData {
  user: UserData
  published_cards: PublishedCard[]
  static_cards: StaticCard[]
}

export interface UserDataProps {
  user: UserData
  setUser: React.Dispatch<React.SetStateAction<UserData>>
}

export interface PendingCard {
  cardType: string
  category: string
  content: string
  date: number
  id: string
  metadata: PublishedCardMetadata
  minted: boolean
  tags: string[]
  urls: PublishedCardUrls[]
  cardTypeToRender?: CardTypeToRender
  stockImage?: string
}
