import Feeds from '../profile/Feed/Feed'
import ProfileV3 from '../ProfileV3/index'
import useFetch from '../common/hooks/useFetch'
import { UserDataProps, fullUserData } from '../common/interface'

export default function ProfileV2({ user, setUser }: UserDataProps) {
  const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false)
  const [userFullData, setUserFullData] = useState<fullUserData | null>(null)
  const {
    status,
    data,
    error,
    fetchData: fetchFullUserData
  } = useFetch<fullUserData>()
  const GET_USER_DATA = 'user/{slug}/published-cards/info'

  function getSlug(): string {
    const slug = sessionStorage.getItem('slug')
    if (slug) {
      return slug
    } else {
      return ''
    }
  }

  function makeSlugApiUrl(): string {
    const slug = getSlug()
    return GET_USER_DATA.replace('{slug}', slug)
  }

  useEffect(() => {
    try {
      fetchFullUserData(makeSlugApiUrl(), {
        onSuccessfulFetch(data) {
          if (data) {
            setUserFullData(data)
            setUser(data.user)
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }, [])

  return (
    <div className="flex flex-col">
      <div className="flex w-full items-center mx-auto justify-center">
        <div className="flex w-full justify-center">
          <div className="w-[75%] grid grid-cols-8 gap-1">
            {userFullData?.user && <ProfileV3 data={userFullData} />}
          </div>
        </div>
      </div>
      <div className="flex w-full items-center mx-auto justify-center">
        <div className="flex w-full justify-center">
          <div className="w-[75%] grid">
            {userFullData?.user && (
              <Feeds
                data={userFullData?.published_cards}
                user={userFullData?.user}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
