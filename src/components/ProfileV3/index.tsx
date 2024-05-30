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
import { useEffect, useState } from 'react'
import { ReactComponent as Cat } from '../../assets/images/astronautCat.svg'
import { ReactComponent as Plus } from '../../assets/images/plus.svg'
import { useNavigate } from 'react-router-dom'

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
  const showCardList = user.settings.static_cards
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
  const userCardCount = textCard ? showCardList.length + 1 : showCardList.length
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    const slug_from_local_storage = localStorage.getItem('slug')
    if (slug_from_local_storage == user.slug) {
      setIsPublic(false)
    } else {
      setIsPublic(true)
    }
  }, [])

  const handleStaticCardCreation = () => {
    sessionStorage.setItem('isStaticCardUpdating', JSON.stringify(true))
    navigate('/signup/2')
  }

  return (
    <>
      <div
        className={`${
          userCardCount == 0 ||
          userCardCount == 1 ||
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
        }  rounded-[5px] px-2`}
      >
        <ProfileBio user={user} />
      </div>
      {userCardCount == 0 && !textCard && !isPublic && (
        <div className="flex flex-row w-1/2 h-full bg-gray-100 rounded-[14px] px-8 py-4">
          <div className="flex flex-row h-full w-full items-center">
            <div className="flex h-full items-center mr-8">
              <Cat className="h-full w-full" />
            </div>
          </div>
          <div className="flex flex-col h-full w-full items-start justify-center">
            <div className="font-inter text-2xl text-gray-800 mb-2 text-start">
              Wow so empty!
            </div>
            <div className="font-inter text-[14px] text-gray-500 mb-4">
              It's time to flaunt your internet identity! Get started by adding
              your cards.
            </div>
            <div className="flex flex-row self-stretch items-start justify-start w-full">
              <button
                className="flex flex-row bg-primary text-white px-[18px] py-[10px] rounded-lg shadow items-center justify-start"
                onClick={handleStaticCardCreation}
              >
                <div className="flex items-center h-full mr-2">
                  <Plus className="stroke-white w-5 h-5" />
                </div>
                <div className="w-full text-white font-inter text-base">
                  Add Card
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
      {(mapCard || textCard) && (
        <div
          className={`flex flex-col h-full mr-1 gap-6 ${
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
              className={`flex items-center justify-between w-full rounded-[14px]  ${
                textCard ? 'h-1/2 ' : 'h-full'
              }`}
            >
              {mapCard.cardType === 'PlaceCard' && (
                <MapCard map={mapCard.metadata as MapCardType} />
              )}
            </div>
          )}
          {textCard && (
            <div
              className={`flex items-center justify-between w-full rounded-[14px] ${
                mapCard ? 'h-1/2' : 'h-full'
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
          className={`flex flex-col h-full gap-6 ${
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
              <div className="flex items-center justify-between w-full max-h-1/2 rounded-[14px]">
                <MiniTwitterCard
                  user={twitterCard.metadata as TwitterCardType}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-between rounded-[14px]">
                <TwitterCard user={twitterCard.metadata as TwitterCardType} />
              </div>
            ))}
          {instaCard &&
            instaCard.cardType === 'InstaCard' &&
            (twitterCard ? (
              <div className="flex items-center justify-between w-full rounded-[14px] h-1/2">
                <MiniInstagramPostCard
                  instaData={instaCard.metadata as InstagramCard}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-between rounded-[14px]">
                <InstagramPostCard
                  instaData={instaCard.metadata as InstagramCard}
                />
              </div>
            ))}
        </div>
      )}
      {(gitCard || calendlyCard) && (
        <div
          className={`flex flex-col h-full gap-6 ${
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
              <div className="flex items-center justify-between w-full h-1/2 rounded-[14px]">
                <MiniGitHubCard gitData={gitCard.metadata as GitCardType} />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-between rounded-[14px]">
                <GitHubCard gitData={gitCard.metadata as GitCardType} />
              </div>
            ))}
          {calendlyCard &&
            calendlyCard.cardType === 'CalendarCard' &&
            (gitCard ? (
              <div className="flex items-center justify-between w-full rounded-[14px] h-1/2">
                <MiniMonthlyCalendarCard
                  calendlyUrl={makeCalendyCardUrl(
                    calendlyCard.metadata as CalendlyCardType
                  )}
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-between rounded-[14px]">
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
