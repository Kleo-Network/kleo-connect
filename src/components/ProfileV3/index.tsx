import ProfileBio from './ProfileBio'
import GitHubCard from '../profile/ProfileCards/Github'
import TwitterCard from '../profile/ProfileCards/Twitter'
import MonthlyCalendarCard from '../profile/ProfileCards/Calendly'
import MapCard from '../profile/ProfileCards/MapCard'
import TextCard from '../profile/ProfileCards/TextCard'
import InstagramPostCard from '../profile/ProfileCards/Instagram'
import MiniInstagramPostCard from '../profile/ProfileCards/InstagramMini'
import MiniTwitterCard from '../profile/ProfileCards/TwitterMini'
import MiniGitHubCard from '../profile/ProfileCards/GithubMini'
import MiniMonthlyCalendarCard from '../profile/ProfileCards/CalendlyMini'
import {
  StaticCard,
  TwitterCard as TwitterCardType,
  CalendlyCard as CalendlyCardType,
  MapCard as MapCardType,
  GitCard as GitCardType,
  UserData,
  TextCard as TextCardType,
  InstagramCard
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
  const userCardCount = showCardList.length + 1
  const mapCard =
    showCardList.includes('Pin Location') && getCardByType(data, 'PlaceCard')
  const gitCard =
    showCardList.includes('Github Graph') && getCardByType(data, 'GitCard')
  const calendlyCard =
    showCardList.includes('Calendly') && getCardByType(data, 'CalendarCard')
  const twitterCard =
    showCardList.includes('Twitter Profile') && getCardByType(data, 'XCard')
  const instaCard =
    showCardList.includes('Instagram Profile') &&
    getCardByType(data, 'InstaCard')
  const textCard = getCardByType(data, 'TextCard')

  return (
    <>
      <div
        className={`${
          data.length == 0
            ? 'w-full'
            : userCardCount == 1 ||
              (userCardCount == 2 && mapCard && textCard) ||
              (userCardCount == 2 && twitterCard && instaCard) ||
              (userCardCount == 2 && gitCard && calendlyCard)
            ? 'w-1/2'
            : userCardCount == 2 ||
              (userCardCount == 3 && mapCard && textCard) ||
              (userCardCount == 3 && twitterCard && instaCard) ||
              (userCardCount == 3 && gitCard && calendlyCard)
            ? 'w-1/3'
            : 'w-1/4'
        }  rounded-[5px] p-2`}
      >
        <ProfileBio user={user} />
      </div>
      {(mapCard || textCard) && (
        <div
          className={`flex flex-col h-full mr-1 ${
            userCardCount > 3
              ? 'w-1/4'
              : !(userCardCount == 2 && mapCard && textCard) &&
                userCardCount > 1 &&
                userCardCount <= 3
              ? 'w-1/3'
              : 'w-1/2'
          }`}
        >
          {mapCard && (
            <div
              className={`flex items-center justify-between w-full rounded-[5px]  ${
                textCard ? 'h-1/2 mb-1 pb-1' : 'h-full'
              }`}
            >
              {mapCard.cardType === 'PlaceCard' && (
                <MapCard map={mapCard.metadata as MapCardType} />
              )}
            </div>
          )}
          {textCard && (
            <div
              className={`flex items-center justify-between w-full rounded-[5px] ${
                mapCard ? 'h-1/2 mt-1' : 'h-full'
              }`}
            >
              <TextCard
                metadata={textCard?.metadata as TextCardType}
                date={textCard?.last_connected}
              />
            </div>
          )}
        </div>
      )}
      {(twitterCard || instaCard) && (
        <div
          className={`flex flex-col h-full mr-1 ${
            userCardCount > 3
              ? 'w-1/4'
              : !(userCardCount == 2 && twitterCard && instaCard) &&
                userCardCount > 1 &&
                userCardCount <= 3
              ? 'w-1/3'
              : 'w-1/2'
          }`}
        >
          {twitterCard &&
            twitterCard.cardType === 'XCard' &&
            (instaCard ? (
              <div className="flex items-center justify-between w-full h-1/2 rounded-[5px] pb-2">
                <MiniTwitterCard
                  user={twitterCard.metadata as TwitterCardType}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-between rounded-[5px]">
                <TwitterCard user={twitterCard.metadata as TwitterCardType} />
              </div>
            ))}
          {instaCard &&
            instaCard.cardType === 'InstaCard' &&
            (twitterCard ? (
              <div className="flex items-center justify-between w-full rounded-[5px] mt-1 h-1/2">
                <MiniInstagramPostCard
                  instaData={instaCard.metadata as InstagramCard}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-between rounded-[5px]">
                <InstagramPostCard
                  instaData={instaCard.metadata as InstagramCard}
                />
              </div>
            ))}
        </div>
      )}
      {(gitCard || calendlyCard) && (
        <div
          className={`flex flex-col h-full mr-1 ${
            userCardCount > 3
              ? 'w-1/4'
              : !(userCardCount == 2 && gitCard && calendlyCard) &&
                userCardCount > 1 &&
                userCardCount <= 3
              ? 'w-1/3'
              : 'w-1/2'
          }`}
        >
          {gitCard &&
            gitCard.cardType === 'GitCard' &&
            (calendlyCard ? (
              <div className="flex items-center justify-between w-full h-1/2 rounded-[5px] mb-1 pb-1">
                <MiniGitHubCard gitData={gitCard.metadata as GitCardType} />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-between rounded-[5px]">
                <GitHubCard gitData={gitCard.metadata as GitCardType} />
              </div>
            ))}
          {calendlyCard &&
            calendlyCard.cardType === 'CalendarCard' &&
            (gitCard ? (
              <div className="flex items-center justify-between w-full rounded-[5px] mt-1 h-1/2">
                <MiniMonthlyCalendarCard
                  calendlyUrl={makeCalendyCardUrl(
                    calendlyCard.metadata as CalendlyCardType
                  )}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-between rounded-[5px]">
                <MonthlyCalendarCard
                  calendlyUrl={makeCalendyCardUrl(
                    calendlyCard.metadata as CalendlyCardType
                  )}
                />
              </div>
            ))}
        </div>
      )}{' '}
    </>
  )
}
