import ProfileBio from './ProfileBio'
import GitHubCard from '../profile/ProfileCards/Github'
import TwitterCard from '../profile/ProfileCards/Twitter'
import MonthlyCalendarCard from '../profile/ProfileCards/Calendly'
import MapCard from '../profile/ProfileCards/MapCard'
import TextCard from '../profile/ProfileCards/TextCard'
import {
  StaticCard,
  TwitterCard as TwitterCardType,
  CalendlyCard as CalendlyCardType,
  MapCard as MapCardType,
  GitCard as GitCardType,
  UserData,
  TextCard as TextCardType
} from '../common/interface'

const calendlyUrl = 'https://calendly.com/{slug}/'

interface fullUserDataProp {
  data: StaticCard[]
  user: UserData
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

export default function ProfileV3({ data, user }: fullUserDataProp) {
  console.log('staticCards', data)
  const showCardList = user.settings.static_cards
  const mapCard =
    showCardList.includes('Pin Location') && getCardByType(data, 'PlaceCard')
  const gitCard =
    showCardList.includes('Github Graph') && getCardByType(data, 'GitCard')
  const calendlyCard =
    showCardList.includes('Calendly') && getCardByType(data, 'CalendarCard')
  const twitterCard =
    showCardList.includes('Twitter Profile') && getCardByType(data, 'XCard')
  const textCard = getCardByType(data, 'TextCard')

  return (
    <>
      <div className="col-span-2 row-span-1 rounded-[5px] p-2.5">
        <ProfileBio user={user} />
      </div>
      <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
        <TextCard metadata={textCard?.metadata as TextCardType} />
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
      {twitterCard && twitterCard.cardType === 'XCard' && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          <TwitterCard user={twitterCard.metadata as TwitterCardType} />
        </div>
      )}
      {mapCard && (
        <div className="flex items-center justify-between col-span-2 row-span-1 bg-gray-200 rounded-[5px] p-2.5">
          {mapCard.cardType === 'PlaceCard' && (
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
