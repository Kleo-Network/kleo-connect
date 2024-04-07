import ProfileBio from './ProfileBio'
import GitHubCard from '../profile/ProfileCards/Github'
import TwitterCard from '../profile/ProfileCards/Twitter'
import MonthlyCalendarCard from '../profile/ProfileCards/Calendly'
import MapCard from '../profile/ProfileCards/MapCard'
import TextCard from '../profile/ProfileCards/TextCard'
import {
  StaticCard,
  TwitterCard as TwitterCardType,
  fullUserData,
  CalendlyCard as CalendlyCardType,
  MapCard as MapCardType,
  GitCard as GitCardType
} from '../common/interface'

const calendlyUrl = 'https://calendly.com/{slug}/'

interface fullUserDataProp {
  data: fullUserData
}

function makeCalendyCardUrl(cal: CalendlyCardType): string {
  return calendlyUrl.replace('{slug}', cal.slug)
}

const getCardByType = (cards: StaticCard[], cardType: string) => {
  const foundCard = cards.find((card) => card.cardType === cardType)
  if (foundCard) {
    return foundCard
  }
  return undefined
}

export default function ProfileV3({ data }: fullUserDataProp) {
  const staticCards = data?.static_cards || []
  const mapCard = getCardByType(staticCards, 'PlaceCard')
  const gitCard = getCardByType(staticCards, 'GitCard')
  const calendlyCard = getCardByType(staticCards, 'CalendarCard')
  const twitterCard = getCardByType(staticCards, 'XCard')

  return (
    <>
      <div className="col-span-2 row-span-1 rounded-[5px] p-2.5">
        <ProfileBio user={data.user} />
      </div>
      <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
        <TextCard content={data.user.about} />
      </div>
      {calendlyCard && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          <MonthlyCalendarCard
            calendlyUrl={makeCalendyCardUrl(
              calendlyCard.metadata as CalendlyCardType
            )}
          />
        </div>
      )}
      {twitterCard && twitterCard.cardType === 'twitterCard' && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          <TwitterCard user={twitterCard.metadata as TwitterCardType} />
        </div>
      )}
      {mapCard && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          {mapCard.cardType === 'MapCard' && (
            <MapCard map={mapCard.metadata as MapCardType} />
          )}
        </div>
      )}
      {gitCard && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          {gitCard.cardType === 'GitCard' && (
            <GitHubCard gitData={gitCard.metadata as GitCardType} />
          )}
        </div>
      )}
    </>
  )
}
