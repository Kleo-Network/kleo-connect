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
