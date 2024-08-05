interface ProfilePicNameComponentProps {
  name: string
  avatar: string
  lastMintedDate: string
}

interface StatesCardProps {
  kleoPoints: string
  streak: string
  rank: string
}

interface StateProps {
  legend: string
  count: string
  imgSrc: string
}

interface LeaderBoardRowProps {
  isUserRow?: boolean
  rank: string
  userName: string
  points: string
  ppUrl: string
}

interface IGetUserRankResponse {
  kleo_points: number
  rank: number
  slug: string
  total_users: number
}

interface IGetLeaderBoardRowResponse {
  kleo_points: number
  name: string
  rank: number
  slug: string
}

interface ILeaderBoardCardProps {
  ppUrl: string
  name: string
  rank: string
  points: string
}
