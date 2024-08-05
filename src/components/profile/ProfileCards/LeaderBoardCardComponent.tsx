import kleoPointsImg from '../../../assets/images/statsImages/kleoPoints.svg'
import useFetch, { FetchStatus } from '../../common/hooks/useFetch'
import { useEffect, useState } from 'react'
import { capitalizeWords } from '../../common/utils'

const GET_LEADER_BOARD_USERS = 'user/top-users'

export const LeaderBoardCardComponent = ({
  ppUrl,
  name,
  points,
  rank
}: ILeaderBoardCardProps) => {
  const {
    fetchData: fetchLeaderBoardUsers,
    status: leaderBoardStatus,
    error: leaderBoardError
  } = useFetch()

  const [leaderBoard, setLeaderBoard] = useState<IGetLeaderBoardRowResponse[]>(
    []
  )

  useEffect(() => {
    fetchLeaderBoardUsers(GET_LEADER_BOARD_USERS, {
      onSuccessfulFetch(data) {
        const typedData = (data as IGetLeaderBoardRowResponse[]).sort(
          (a, b) => b.kleo_points - a.kleo_points
        )
        // If we get more than Top 10 then ignore the rest of them.
        setLeaderBoard(
          typedData.length > 10 ? typedData.slice(0, 10) : typedData
        )
      }
    })
  }, [leaderBoard.length === 0])

  return (
    <div className="rounded-lg relative">
      <div className="p-2 flex flex-col gap-2 w-full bg-gray-background rounded-lg rounded-t-none">
        {leaderBoardStatus === 'loading' && (
          <div className="flex items-center p-4 text-sm text-black rounded-lg gap-3 justify-center">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span>Loading...</span>
          </div>
        )}
        {leaderBoardStatus === 'error' && (
          <div className="flex items-center p-4 text-sm text-red-800 rounded-lg gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>

            <div>
              <span className="font-medium">Error : </span>
              {leaderBoardError}
            </div>
          </div>
        )}
        {leaderBoardStatus === 'success' && leaderBoard.length > 0 && (
          <>
            {/* Add current user row first */}
            <LeaderBoardRowComponent
              isUserRow={true}
              rank={rank}
              userName={capitalizeWords(name)}
              points={points}
              ppUrl={ppUrl}
            />
            {/* Map through the top users excluding the current user */}
            {leaderBoard.map((userData, index) => (
              <LeaderBoardRowComponent
                key={userData.slug} // Assuming slug is unique
                isUserRow={false}
                rank={(index + 1).toString()} // Since the first row is the current user, start from 2
                userName={capitalizeWords(userData.name)}
                points={userData.kleo_points.toString()}
                ppUrl={userData.pfp || kleoPointsImg}
              />
            ))}
          </>
        )}
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
