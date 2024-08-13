import { PublishedCard } from "../../../common/interface";
import { extractThumbNailURL } from "../../../utils/utils";

interface YTCardProps {
    card: PublishedCard
}

interface ThumbnailProps {
    url: string
    extraStyles?: string
}

export function YTCardBody({ card }: YTCardProps) {
    const videoUrls: string[] = card.urls.map(url => extractThumbNailURL(url.url));

    const renderThumbnails = () => {
        switch (videoUrls.length) {
            case 4:
                return (
                    <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                        <div className="flex items-center justify-center w-full grow">
                            <Thumbnail url={videoUrls[0]} extraStyles="w-full" />
                        </div>
                        <div className="flex flex-row gap-2 grow">
                            {videoUrls.slice(1).map((url, index) => (
                                <Thumbnail key={index} url={url} />
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                        <div className="flex items-center justify-center w-full grow">
                            <Thumbnail url={videoUrls[0]} extraStyles="w-full grow" />
                        </div>
                        <div className="flex flex-row gap-2 grow">
                            {videoUrls.slice(1).map((url, index) => (
                                <Thumbnail key={index} url={url} />
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-wrap xl:flex-col justify-evenly items-center content-center w-full gap-2 h-full">
                        {videoUrls.map((url, index) => (
                            <Thumbnail key={index} url={url} />
                        ))}
                    </div>
                );
            case 1:
                return (
                    <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                        <Thumbnail url={videoUrls[0]} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="h-full w-full flex content-center">
            {renderThumbnails()}
        </div>
    );
}

function Thumbnail({ url, extraStyles = '' }: ThumbnailProps) {
    return (
        <img src={url} alt="Thumbnail" className={`bg-gray-200 rounded-lg object-cover grow min-w-[60px] aspect-[1.7] ${extraStyles}`} />
    );
}
