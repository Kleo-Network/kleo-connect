import { PendingCard } from "../../../common/interface";
import { getDaysAgo } from "../../../utils/utils";
import ytLogo from '../../../../assets/images/ytLogo.jpeg';
import { YTCardImagesForPublishCards } from "./YTCardImagesForPublishCards";

interface YTCardForPublishCardsProps {
    activeCard: PendingCard
}

export const YTCardForPublishCards = ({ activeCard }: YTCardForPublishCardsProps) => {
    return (
        <div className={`
                rounded-[14px] shadow-lg p-2
                flex flex-col gap-[14px] bg-yt-card
                w-[480px]
            `}
        >
            {/* Images Container */}
            <YTCardImagesForPublishCards activeCard={activeCard} />

            {/* Header with favicons and date. */}
            <header className="relative flex items-center justify-center mx-3 h-[46px]">
                {/* Map over all urls and show the favicon */}
                <div key={activeCard.id} className="w-10 h-10 flex-none rounded-full border-spacing-4">
                    <img
                        className={`
                            absolute w-10 h-10 flex-none rounded-full object-cover
                        `}
                        src={ytLogo}
                    />
                </div>
                <div className="flex flex-row ml-auto items-center">
                    <div className={`flex font-inter text-base font-normal text-white`}>
                        {getDaysAgo(activeCard.date)}
                    </div>
                </div>
            </header>

            {/* Card Content */}
            <div className="flex flex-col mx-3 mb-3 justify-center">
                <blockquote className={`text-base font-normal text-white`}>
                    {activeCard.content}
                </blockquote>
            </div>
        </div>
    );
}
