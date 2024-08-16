import { PublishedCard } from "../../../common/interface";
import { extractThumbNailURL } from "../../../utils/utils";

interface YTCardProps {
    card: PublishedCard
}

interface ThumbnailProps {
    videoUrl: string
    thumbUrl: string
    extraStyles?: string
}

export function YTCardBody({ card }: YTCardProps) {
    const videoUrls: { thumbUrl: string, videoUrl: string }[] = card.urls.map(url => ({
        thumbUrl: extractThumbNailURL(url.url),
        videoUrl: url.url,
    }));

    const renderThumbnails = () => {
        switch (videoUrls.length) {
            case 4:
                return (
                    <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                        <div className="flex items-center justify-center w-full grow">
                            <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} extraStyles="w-full" />
                        </div>
                        <div className="flex flex-row gap-2 grow">
                            {videoUrls.slice(1).map((url, index) => (
                                <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} />
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                        <div className="flex items-center justify-center w-full grow">
                            <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} extraStyles="w-full grow" />
                        </div>
                        <div className="flex flex-row gap-2 grow">
                            {videoUrls.slice(1).map((url, index) => (
                                <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} />
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex flex-wrap xl:flex-col justify-evenly items-center content-center w-full gap-2 h-full">
                        {videoUrls.map((url, index) => (
                            <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} />
                        ))}
                    </div>
                );
            case 1:
                return (
                    <div className="flex flex-wrap justify-between items-center content-center w-full gap-2 h-full">
                        <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} />
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

function Thumbnail({ videoUrl, thumbUrl, extraStyles = '' }: ThumbnailProps) {
    return (
        <img
            src={thumbUrl}
            alt="Thumbnail"
            className={`bg-gray-200 rounded-lg object-cover grow min-w-[60px] aspect-[1.7] ${extraStyles} cursor-pointer`}
            onClick={() => window.open(videoUrl, '_blank')}
        />
    );
}