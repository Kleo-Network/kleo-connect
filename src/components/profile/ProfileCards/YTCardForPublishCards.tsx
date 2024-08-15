import { PendingCard } from "../../common/interface"
import { extractThumbNailURL } from "../../utils/utils"

interface YTCardForPublishCardsProps {
    card: PendingCard
}

interface ThumbnailProps {
    url: string
    extraStyles?: string
}

export const YTCardForPublishCards = ({ card }: YTCardForPublishCardsProps) => {
    const videoUrls: string[] = card.urls.map(url => extractThumbNailURL(url.url));
    const length = videoUrls.length;
    let gridCols = `grid-cols-${length === 2 ? '4' : length}`;

    return (
        <div className="flex justify-center max-h-[148px]">
            <div className={`grid h-full gap-2 content-center ${gridCols}`}>
                {videoUrls.map((url, index) => {
                    // Handle centering for 2 thumbnails case
                    if (length === 2) {
                        return (
                            <div key={index} className={`row-span-1 flex justify-center col-span-1 ${index === 0 ? 'col-start-2' : 'col-start-3'}`}>
                                <Thumbnail url={url} />
                            </div>
                        );
                    }
                    return (
                        <div key={index} className="row-span-1 flex justify-center col-span-1">
                            <Thumbnail url={url} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Thumbnail({ url, extraStyles = '' }: ThumbnailProps) {
    return (
        <img src={url} alt="Thumbnail" className={`bg-gray-200 rounded-lg max-h-[120px] grow object-cover aspect-[1.7] ${extraStyles}`} />
    );
}