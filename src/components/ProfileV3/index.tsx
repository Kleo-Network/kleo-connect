import { ResponsiveContainer } from 'recharts'
import { BrowsingHistoryForRadarChart } from '../mocks/BrowsingHistroyForRadarMock'
import BrowsingHistoryRadarChart from '../common/charts/RadarChart'
import ProfileCardV2 from '../profile/ProfieCardV2'
import { FeedCardMock } from '../mocks/FeedCardMock'
import FeedCard from '../profile/Feed/FeedCard'
import Accordion from '../common/Accordion'
import { useState } from 'react'
import ProfileCards from '../profile/ProfileCards'
import { ReactComponent as Cross } from '../../assets/images/cross.svg'
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg'
import Feeds from '../profile/Feed/Feed'
import ProfileBio from './ProfileBio'
import GitHubCard from '../profile/ProfileCards/Github'
import TwitterCard from '../profile/ProfileCards/Twitter'
import MonthlyCalendarCard from '../profile/ProfileCards/Calendly'
import MapCard from '../profile/ProfileCards/MapCard'
import TextCard from '../profile/ProfileCards/TextCard'
import InstagramPostCard from '../profile/ProfileCards/Instagram'
import LinkedInCard from '../profile/ProfileCards/LinkedIn'
import MintProfile from './connect'
import { useAuthContext } from '../common/contexts/UserContext'
import { StaticCard, fullUserData } from '../common/interface'

const calendlyUrl = 'https://calendly.com/{slug}/'

interface fullUserDataProp {
  data: fullUserData
}

function makeCalendyCardUrl(slug: string): string {
  return calendlyUrl.replace('{slug}', slug)
}

const getCardByType = (cards, cardType) => {
  return cards.find((card) => card.cardType === cardType)
}

export default function ProfileV3({ data }: fullUserDataProp) {
  const [isAccordianOpen, setIsAccordianOpen] = useState<boolean>(false)
  const userExternalTool = data.user.settings.static_cards
  const staticCards = data.static_cards
  const mapCardMetadata = getCardByType(staticCards, 'PlaceCard').metadata
  const gitCardMetadata = getCardByType(staticCards, 'GitCard').metadata

  return (
    <>
      <div className="col-span-2 row-span-1 rounded-[5px] p-2.5">
        <ProfileBio user={data.user} />
      </div>
      <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
        <TextCard content={data.user.about} />
      </div>
      {userExternalTool.includes('CalendarCard') && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          <MonthlyCalendarCard
            calendlyUrl={makeCalendyCardUrl(
              getCardByType(staticCards, 'CalendarCard').metadata.slug
            )}
          />
        </div>
      )}
      {userExternalTool.includes('XCard') && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          <TwitterCard user={getCardByType(staticCards, 'XCard').metadata} />
        </div>
      )}
      {userExternalTool.includes('PlaceCard') && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          <MapCard
            location={mapCardMetadata.location}
            lat={mapCardMetadata?.cordinates?.lat}
            lng={mapCardMetadata?.cordinates?.lng}
          />
        </div>
      )}
      {userExternalTool.includes('GitCard') && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          <GitHubCard
            username={gitCardMetadata?.userName}
            followers={gitCardMetadata?.followers}
            following={gitCardMetadata?.following}
            url={gitCardMetadata?.url}
            contributions={gitCardMetadata?.contribution}
          />
        </div>
      )}
    </>
  )
}
