import { CardTypeToRender, PublishedCard } from "../../../../common/interface"
import purpleCardBg from '../../../../../assets/images/purpleCardBg.png';
import { getDaysAgo, parseUrl } from "../../../../utils/utils";
import { ReactComponent as Hamburger } from '../../../../../assets/images/hamburgerDot.svg'
import { ReactComponent as Pin } from '../../../../../assets/images/pin.svg'
import { ReactComponent as Bin } from '../../../../../assets/images/bin.svg'

interface DataCardProps {
  card: PublishedCard
  isPublic: boolean
  showOptions: boolean
  setShowOptions: Function
  setIsModalOpen: Function
  handleOnClick: Function
}

export const DataCard = ({ card, isPublic, showOptions, setShowOptions, setIsModalOpen, handleOnClick, children }: React.PropsWithChildren<DataCardProps>) => {
  const isPurpleCard = card.cardTypeToRender === CardTypeToRender.PURPLE;

  return (
    <div
      className={`
            rounded-[14px] md:rounded-[24px] p-5
            flex flex-col justify-between min-h-[desiredMinHeight]
            backdrop-blur-md border border-white bg-cover bg-white
          `}
      style={isPurpleCard ? { backgroundImage: `url(${purpleCardBg})` } : {}}
    >
      {/* Header for card [UrlFavicons, DaysAgoString, Options] */}
      <header className="flex items-center">
        {/* Looping over all urls, taking favicon and showing in top-left part. */}
        {[...new Set(card.urls.map(url => `https://www.google.com/s2/favicons?domain=${parseUrl(url.url)}&sz=40`))].map((iconUrl, index) => (
          <div key={iconUrl} className="w-8 h-8 flex-none rounded-full flex items-center">
            <img
              className={`
                    absolute w-10 h-10 flex-none rounded-full border-[3.5px] ml-4
                    stroke-current stroke-opacity-40
                    ${isPurpleCard ? 'border-purple-card fill-purple-card' : 'border-white fill-white'}
                  `}
              style={{ left: `${index * 1.3}rem` }}
              src={iconUrl}
            />
          </div>
        ))}

        {/* Displaying DaysAgo string on right side */}
        <div className="flex flex-row ml-auto items-center">
          <div className={`flex font-inter font-normal ${isPurpleCard ? 'text-white' : 'text-gray-400'}`}>
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
              <Hamburger className={`w-3 h-4 ${isPurpleCard ? 'stroke-white' : 'stroke-gray-400'}`} />
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
      <div className="flex-1 flex flex-col justify-center">
        <blockquote className={`text-lg mt-4 ${isPurpleCard ? 'text-white' : 'text-gray-600'}`}>
          {card.content}
        </blockquote>
      </div>

      {/* URL Pills at bottom */}
      {<div className="flex flex-row w-full flex-wrap gap-2 self-stretch items-center justify-start pt-5">
        <>
          {card.urls.slice(0, 4).map((urls) => (
            <button
              key={urls.id}
              className={`flex items-center gap-2 rounded-3xl border px-2 py-1 ${isPurpleCard ? 'border-none bg-white/20' : 'border-gray-200 bg-gray-100'}`}
              onClick={() => handleOnClick(urls.url)}
            >
              <img
                className="w-4 h-4 flex-none rounded-full"
                src={`https://www.google.com/s2/favicons?domain=${urls.url}&sz=16`}
              />

              <h3 className={`inline-block text-sm font-medium ${isPurpleCard ? 'text-white' : 'text-gray-700'} overflow-hidden overflow-ellipsis line-clamp-1`}>
                {card.urls.length > 2 && urls.title.length > 10
                  ? urls.title.trim().slice(0, 10) + '...'
                  : urls.title.trim().slice(0, 25) + '...'}
              </h3>
            </button>
          ))}
          {card.urls.length > 4 && (
            <span className={`text-sm ${isPurpleCard ? 'text-white' : 'text-gray-500'}`}>+{card.urls.length - 4} more</span>
          )}
        </>
      </div>}

      {children}
    </div>
  )
}