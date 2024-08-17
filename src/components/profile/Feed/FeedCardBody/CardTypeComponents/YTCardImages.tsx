import { PublishedCard } from "../../../../common/interface";
import { extractThumbNailURL } from "../../../../utils/utils";

interface YTCardProps {
    card: PublishedCard
}

interface ThumbnailProps {
    videoUrl: string
    thumbUrl: string
    extraStyles?: string
    scale?: string
}

export function YTCardImages({ card }: YTCardProps) {
    const videoUrls: { thumbUrl: string, videoUrl: string }[] = card.urls.map(url => ({
        thumbUrl: extractThumbNailURL(url.url),
        videoUrl: url.url,
    })).filter(item => item.thumbUrl !== '');

    const renderThumbnails = () => {
        switch (videoUrls.length) {
            case 4:
                return (
                    <div className="flex items-center w-full gap-2 h-full max-h-[190px]">
                        <div className="flex items-center justify-center h-full flex-grow-2 w-3/4">
                            <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} extraStyles="w-full h-full" scale="scale-[1.3]" />
                        </div>
                        <div className="flex flex-col gap-2 grow w-1/4 h-full">
                            {videoUrls.slice(1).map((url, index) => (
                                <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} extraStyles="max-w-[220px] max-h-[58px]" scale="scale-[1.3]" />
                            ))}
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="flex items-center w-full gap-2 h-full max-h-[190px]">
                        <div className="flex items-center justify-center flex-grow-2 w-3/4 h-full">
                            <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} extraStyles="w-full grow h-full" scale="scale-[1.3]" />
                        </div>
                        <div className="flex flex-col gap-2 grow w-1/4 h-full">
                            {videoUrls.slice(1).map((url, index) => (
                                <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} extraStyles="max-w-[220px] h-1/2" scale='scale-[1.3]' />
                            ))}
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="flex items-center w-full gap-2 h-full max-h-[190px]">
                        {videoUrls.map((url, index) => (
                            <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} extraStyles="w-1/2 h-full" scale='scale-[1.3]' />
                        ))}
                    </div>
                );
            case 1:
                return (
                    <div className="flex flex-wrap justify-center items-center content-center w-full gap-2 h-full max-h-[190px]">
                        <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} extraStyles="h-full w-full" scale="scale-125" />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex-1 h-fit w-full flex content-center rounded-lg overflow-hidden">
            {renderThumbnails()}
        </div>
    );
}

function Thumbnail({ videoUrl, thumbUrl, extraStyles = '', scale = '' }: ThumbnailProps) {
    return (
        <div className={`rounded-lg overflow-hidden flex justify-center items-center ${extraStyles}`}>
            <img
                src={thumbUrl}
                alt="Thumbnail"
                className={`bg-gray-200 rounded-lg object-cover transform w-full h-full cursor-pointer ${scale}`}
                onClick={() => window.open(videoUrl, '_blank')}
            />
        </div>
    );
}