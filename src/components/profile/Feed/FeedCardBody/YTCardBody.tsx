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

    const videoUrls: string[] = [];

    card.urls.forEach(url => {
        videoUrls.push(extractThumbNailURL(url.url));
    })

    return (
        <div className="h-full w-full flex content-center">
            {videoUrls.length === 4 && (
                <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                    <div className="flex items-center justify-center w-full grow">
                        <Thumbnail url={videoUrls[0]} extraStyles="w-full" />
                    </div>
                    <div className="flex flex-row gap-2 grow">
                        <Thumbnail url={videoUrls[1]} extraStyles="grow" />
                        <Thumbnail url={videoUrls[2]} extraStyles="grow" />
                        <Thumbnail url={videoUrls[3]} extraStyles="grow" />
                    </div>
                </div>
            )}

            {videoUrls.length === 3 && (
                <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                    <div className="flex items-center justify-center w-full grow">
                        <Thumbnail url={videoUrls[0]} extraStyles="w-full" />
                    </div>
                    <div className="flex flex-row gap-2 grow">
                        <Thumbnail url={videoUrls[1]} extraStyles="grow" />
                        <Thumbnail url={videoUrls[2]} extraStyles="grow" />
                    </div>
                </div>
            )}

            {videoUrls.length === 2 && (
                <div className="flex flex-wrap xl:flex-col justify-evenly items-center content-center w-full gap-2 h-full">
                    <Thumbnail url={videoUrls[1]} extraStyles="grow" />
                    <Thumbnail url={videoUrls[0]} extraStyles="grow" />
                </div>
            )}

            {videoUrls.length === 1 && (
                <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                    <Thumbnail url={videoUrls[0]} extraStyles="grow" />
                </div>
            )}
        </div>
    )
}

function Thumbnail({ url, extraStyles = '' }: ThumbnailProps) {
    return (
        <img src={url} alt="Thumbnail" className={`bg-gray-200 rounded-lg object-cover min-w-[90px] aspect-[1.7] ${extraStyles}`} />
    )
}
