import { PendingCard } from "../../../common/interface"
import { getDaysAgo, parseUrl } from "../../../utils/utils"


interface ImageCardForPublishCardsProps {
  card: PendingCard
}

export const ImageCardForPublishCards = ({ card }: ImageCardForPublishCardsProps) => {
  return (
    <div
      className={`rounded-lg shadow-lg p-3 px-5 flex flex-col justify-between gap-3 max-h-[264px] bg-cover border border-white min-h-[150px]`}
      style={{ backgroundImage: `url(${card.stockImage})` }}>
      {/* Header for card [UrlFavicons, DaysAgoString, Options] */}
      <header className="relative flex items-center backdrop-blur-sm h-[46px]">
        {/* Map over all urls and show the favicon */}
        {[...new Set(card.urls.map(url => `https://www.google.com/s2/favicons?domain=${parseUrl(url.url)}&sz=40`))].map((iconUrl, index) => (
          <div key={iconUrl} className="w-8 h-8 flex-none rounded-full border-spacing-4 flex items-center">
            <img
              className={`absolute w-10 h-10 flex-none rounded-full border-white border-[3.5px] fill-white stroke-current stroke-opacity-40`}
              style={{ left: `${index * 1.3}rem` }}
              src={iconUrl}
            />
          </div>
        ))}
        <div className="flex flex-row ml-auto items-center">
          <div className="flex font-inter text-sm text-white font-normal">
            {getDaysAgo(card.date)}
          </div>
        </div>
      </header>

      {/* Card Content */}
      <div className="flex flex-col justify-center mt-1 backdrop-blur-sm">
        <blockquote className={`text-base font-normal text-white`}>
          {card.content}
        </blockquote>
      </div>
    </div>
  )
}
