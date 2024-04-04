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

export interface StaticCard {
  cardType: string
  id: string
  last_connected: string
  metadata: any
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
