import { PublishedCard } from "../../../common/interface"
import { getDaysAgo, parseUrl } from "../../../utils/utils"
import { ReactComponent as Hamburger } from '../../../../assets/images/hamburgerDot.svg'
import { ReactComponent as Pin } from '../../../../assets/images/pin.svg'
import { ReactComponent as Bin } from '../../../../assets/images/bin.svg'

interface ImageCardProps {
  card: PublishedCard
  isPublic: boolean
  showOptions: boolean
  setShowOptions: Function
  setIsModalOpen: Function
}

export default function ImageCard({ card, isPublic, showOptions, setShowOptions, setIsModalOpen, children }: React.PropsWithChildren<ImageCardProps>) {
  return (
    <div className={`rounded-[14px] md:rounded-[24px] p-5 flex flex-col justify-between border border-white bg-cover min-h-[260px]`}
      style={{ backgroundImage: `url(${card.stockImage})` }}>
      {/* Header for card [UrlFavicons, DaysAgoString, Options] */}
      <header className="flex items-center mt-3 backdrop-blur-[2px] h-[46px] rounded-lg">
        {/* Looping over all urls, taking favicon and showing in top-left part. */}
        {[...new Set(card.urls.map(url => `https://www.google.com/s2/favicons?domain=${parseUrl(url.url)}&sz=32`))].map((iconUrl, index) => (
          <div key={iconUrl} className="w-8 h-8 flex-none rounded-full border-spacing-4 flex items-center">
            <img
              className={`absolute w-10 h-10 flex-none rounded-full border-white border-[3.5px] fill-white stroke-current stroke-opacity-40`}
              style={{ left: `${index * 1.3}rem` }}
              src={iconUrl}
            />
          </div>
        ))}

        {/* Displaying DaysAgo string on right side */}
        <div className="flex flex-row ml-auto items-center">
          <div className="flex font-inter text-white font-normal">
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
              <Hamburger className="w-3 h-4 stroke-white" />
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
      <div className="flex flex-col justify-center mt-1 backdrop-blur-md rounded-lg p-2">
        <blockquote className={`text-base font-normal text-white`}>
          {card.content}
        </blockquote>
      </div>

      {children}
    </div>
  )
}
