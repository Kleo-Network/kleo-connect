import winnerCup from '../../../assets/images/statsImages/winnerCup.svg'
import kleoPointsImg from '../../../assets/images/statsImages/kleoPoints.svg'

export const LeaderBoardCardComponent = () => {
  return (
    <div className=" rounded-lg relative">
      <div className="p-2 flex flex-col gap-2 w-full bg-gray-background rounded-lg rounded-t-none">
        {/* TODO: Replace this with an Map when we have APIs ready. */}
        <LeaderBoardRowComponent
          isUserRow={true}
          rank="141"
          userName="Prince Dalsaniya"
          points="120"
          ppUrl={winnerCup}
        />
        <LeaderBoardRowComponent
          rank="1"
          userName="ABC"
          points="5000"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="2"
          userName="DEF"
          points="490"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="3"
          userName="GHI"
          points="480"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="4"
          userName="JKL"
          points="470"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="5"
          userName="MNO"
          points="460"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="6"
          userName="PQR"
          points="450"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="7"
          userName="STU"
          points="400"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="8"
          userName="VWX"
          points="350"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="9"
          userName="YZ"
          points="300"
          ppUrl={kleoPointsImg}
        />
        <LeaderBoardRowComponent
          rank="10"
          userName="12345"
          points="250"
          ppUrl={kleoPointsImg}
        />
      </div>
    </div>
  )
}

const LeaderBoardRowComponent = ({
  isUserRow = false,
  rank,
  userName,
  points,
  ppUrl
}: LeaderBoardRowProps) => {
  return (
    <div
      className={`h-[44px] rounded-lg px-4 py-2 flex justify-between items-center  ${
        isUserRow
          ? 'bg-gray-row-dark text-white'
          : 'bg-white text-gray-row-dark'
      }`}
    >
      <div className="flex items-center align-middle justify-between gap-2 font-medium text-xs">
        <div className="w-6 text-center ">{rank}</div>
        <img src={ppUrl} className="w-6 h-6 rounded-full" />
        <div className="text-left">{userName}</div>
      </div>
      <div className="font-medium text-sm align-middle">
        {points} <span className="text-[10px] align-middle">KLEO</span>
      </div>
    </div>
  )
}
