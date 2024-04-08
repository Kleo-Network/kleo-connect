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

interface PublishedCardMetadata {
  activity: string
  description: string
  entities: string[]
}

interface PublishedCardUrls {
  title: string
  url: string
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
  urls: PublishedCardUrls
}
export enum CardType {
  GitCard = 'GitCard',
  CalendlyCard = 'CalendlyCard',
  MapCard = 'PlaceCard',
  TwitterCard = 'XCard'
}
interface Contribution {
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
  following: number
  bio: string
  is_verified: boolean
}
export interface StaticCard {
  cardType: string
  id: string
  last_connected: string
  metadata: GitCard | CalendlyCard | MapCard | TwitterCard | TextCard
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
  urls: PublishedCardUrls
}
