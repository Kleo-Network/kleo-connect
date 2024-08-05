import { UserDataProps } from '../../common/interface'
import kleoPointsImg from '../../../assets/images/statsImages/kleoPoints.svg'
import fire from '../../../assets/images/statsImages/fire.svg'
import winnerCup from '../../../assets/images/statsImages/winnerCup.svg'
import { PublishCardsComponent } from './PublishCardsComponent'
import { capitalizeWords } from '../../common/utils'
import { LeaderBoardCardComponent } from './LeaderBoardCardComponent'
import useFetch from '../../common/hooks/useFetch'
import { useEffect, useState } from 'react'

const GET_USER_RANK = 'user/rank/{slug}'

export default function PublishCardsPageComponent({
  user,
  setUser
}: UserDataProps) {
  const { fetchData: fetchUserRank } = useFetch()

  const [rank, setRank] = useState('0')
  // TODO : Update once we have API.
  const [lastMintedDate, setLastMintedDate] = useState('April 26, 2024')
  const [streak, setStreak] = useState('-1')

  useEffect(() => {
    if (!user || !user.slug) {
      return
    }

    const updatedGetUserRankUrl = GET_USER_RANK.replace(
      '{slug}',
      user.slug || ''
    )
    fetchUserRank(updatedGetUserRankUrl, {
      onSuccessfulFetch(data) {
        const typedData = data as IGetUserRankResponse
        setRank(typedData['rank'].toString())
      }
    })
  }, [user, user.slug])

  return (
    <div className="h-full w-full bg-gray-50 flex justify-center">
      <div className="w-full px-8 pt-12 max-w-7xl">
        <div className=" h-[540px] w-full flex justify-between gap-6">
          <div className="bg-white rounded-2xl w-1/3 h-full p-5 flex flex-col justify-start gap-4 border border-gray-200">
            <ProfilePicNameComponent
              avatar={user.pfp}
              name={user.name}
              lastMintedDate={lastMintedDate}
            />
            <StatsCardComponent
              kleoPoints={user.profile_metadata['kleo_points']}
              rank={rank}
              streak={streak}
            />
            <div className="text-sm font-medium text-gray-row-dark">
              Leaderboard
            </div>
            <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-webkit rounded-lg">
              <LeaderBoardCardComponent
                name={user.name}
                points={user.profile_metadata['kleo_points']}
                ppUrl={user.pfp}
                rank={rank}
              />
            </div>
          </div>
          <div className="bg-white border border-gray-200 w-2/3 h-full rounded-2xl">
            <PublishCardsComponent user={user} setUser={setUser} />
          </div>
        </div>
      </div>
    </div>
  )
}

const ProfilePicNameComponent = ({
  avatar,
  lastMintedDate,
  name
}: ProfilePicNameComponentProps) => {
  return (
    <div className="h-fit flex justify-start gap-4 items-center">
      <img
        className="img-container w-[60px] h-[60px] rounded-full"
        src={avatar}
      />
      <div className="flex flex-col h-full justify-evenly">
        <p className="font-medium text-2xl">{capitalizeWords(name)}</p>
        <p className="text-gray-subheader font-normal text-sm">
          Last minted on {lastMintedDate}
        </p>
      </div>
    </div>
  )
}

const StatsCardComponent = ({ kleoPoints, rank, streak }: StatesCardProps) => {
  return (
    <div className="flex justify-between items-center h-[52px] w-full font-inter">
      <StatComponent
        legend="KLEO Points"
        count={kleoPoints}
        imgSrc={kleoPointsImg}
      />
      <div className="w-[1px] h-9 bg-gray-background "></div>
      <StatComponent legend="Rank" count={rank} imgSrc={winnerCup} />
      <div className="w-[1px] h-9 bg-gray-background "></div>
      <StatComponent legend="Streak" count={streak} imgSrc={fire} />
    </div>
  )
}

const StatComponent = ({ legend, count, imgSrc }: StateProps) => {
  return (
    <div className="h-full flex justify-start gap-2 py-2 w-[105px]">
      <div className="icon-container h-9 w-9 rounded-lg bg-gray-lightest flex justify-center items-center">
        <img src={imgSrc} alt="" className="w-5 h-5" />
      </div>
      <div className="flex flex-col h-full justify-center">
        <p className="font-semibold text-sm">{count}</p>
        <p className="text-gray-subheader font-medium text-[8px]">{legend}</p>
      </div>
    </div>
  )
}
