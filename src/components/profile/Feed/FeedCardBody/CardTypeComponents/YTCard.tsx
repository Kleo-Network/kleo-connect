import { PublishedCard } from "../../../../common/interface"
import { getDaysAgo, parseUrl } from "../../../../utils/utils";
import { ReactComponent as Hamburger } from '../../../../../assets/images/hamburgerDot.svg'
import { ReactComponent as Pin } from '../../../../../assets/images/pin.svg'
import { ReactComponent as Bin } from '../../../../../assets/images/bin.svg'
import { YTCardImages } from "./YTCardImages";

interface YTCardProps {
  card: PublishedCard
  isPublic: boolean
  showOptions: boolean
  setShowOptions: Function
  setIsModalOpen: Function
  handleOnClick: Function
}

export const YTCard = ({ card, isPublic, showOptions, setShowOptions, setIsModalOpen, handleOnClick, children }: React.PropsWithChildren<YTCardProps>) => {
  return (
    <div
      className={`
            rounded-[14px] p-2
            flex flex-col justify-between min-h-[desiredMinHeight]
            backdrop-blur-md border border-white bg-cover bg-yt-card
          `}
    >
      {/* Render Images */}
      <YTCardImages card={card} />

      {/* Header for card [UrlFavicons, DaysAgoString, Options] */}
      <header className="flex items-center mt-[14px] mx-3 h-[46px]">
        {/* Looping over all urls, taking favicon and showing in top-left part. */}
        {[...new Set(card.urls.map(url => `https://www.google.com/s2/favicons?domain=${parseUrl(url.url)}&sz=40`))].map((iconUrl, index) => (
          <div key={iconUrl} className="w-8 h-8 flex-none rounded-full flex items-center">
            <img
              className={`
                    absolute w-10 h-10 flex-none rounded-full border-[3.5px] ml-4
                    stroke-current stroke-opacity-40 border-white fill-white
                  `}
              style={{ left: `${index * 1.3}rem` }}
              src={iconUrl}
            />
          </div>
        ))}

        {/* Displaying DaysAgo string on right side */}
        <div className="flex flex-row ml-auto mr-0 items-center">
          <div className={`flex font-inter font-normal text-gray-400`}>
            {getDaysAgo(card.date)}
          </div>
        </div>

        {/* If not public then show options for DeleteCard and PinCard */}
        {!isPublic && (
          <div className="relative">
            <button
              className="p-2"
              onClick={() => setShowOptions(!showOptions)}
            >
              <Hamburger className={`w-3 h-4 stroke-gray-400`} />
            </button>
            {showOptions && (
              <div className="absolute mt-8 p-2 bg-white shadow-md rounded-lg top-0 right-0 min-w-[160px]">
                <div className="flex flex-row px-[6px] py-[2px]">
                  <button className="flex flex-row w-full text-left px-[10px] py-[8px] items-center">
                    <Pin className="w-4 h-4 mr-3 stroke-current text-gray-700" />
                    <div className="text-sm font-inter text-gray-700">
                      Pin Card
                    </div>
                  </button>
                </div>
                {!card.minted && (
                  <div className="flex flex-row px-[6px] py-[2px]">
                    <button
                      className="flex flex-row w-full text-left px-[10px] py-[8px] items-center"
                      onClick={() => setIsModalOpen(true)}
                    >
                      <Bin className="w-4 h-4 mr-3 stroke-current text-gray-700" />
                      <div className="text-sm font-inter text-gray-700">
                        Delete Card
                      </div>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </header>

      {/* Card Content */}
      <div className="flex flex-col justify-center mt-[14px] mx-3 mb-3 backdrop-blur-sm rounded-lg">
        <blockquote className={`text-base font-normal text-white`}>
          {card.content.length > 120
            ? `${card.content.slice(0, 120)}...`
            : card.content}
        </blockquote>
      </div>

      {children}
    </div>
  )
}