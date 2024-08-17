import { PendingCard } from "../../../common/interface"
import { extractThumbNailURL } from "../../../utils/utils"

interface YTCardForPublishCardsProps {
  activeCard: PendingCard
}

interface ThumbnailProps {
  videoUrl: string
  thumbUrl: string
  extraStyles?: string
  scale?: string
}

export const YTCardImagesForPublishCards = ({ activeCard }: YTCardForPublishCardsProps) => {
  const videoUrls: { thumbUrl: string, videoUrl: string }[] = activeCard.urls.map(url => ({
    thumbUrl: extractThumbNailURL(url.url),
    videoUrl: url.url,
  })).filter(item => item.thumbUrl !== '');

  const renderThumbnails = () => {
    switch (videoUrls.length) {
      case 4:
        return (
          <div className="flex items-center w-full gap-2">
            <div className="flex items-center justify-center w-3/4">
              <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} extraStyles="w-full h-full max-h-[190px]" />
            </div>
            <div className="flex flex-col gap-2 grow w-1/4 h-full">
              {videoUrls.slice(1).map((url, index) => (
                <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} extraStyles="max-h-[58px]" />
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex items-center w-full gap-2 h-full">
            <div className="flex items-center justify-center w-3/4 h-full">
              <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} extraStyles="w-full h-full max-h-[190px]" />
            </div>
            <div className="flex flex-col gap-2 w-1/4 h-full">
              {videoUrls.slice(1).map((url, index) => (
                <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} extraStyles="h-[91px]" scale="scale-[1.35]" />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center w-full gap-2 h-full">
            {videoUrls.map((url, index) => (
              <Thumbnail key={index} thumbUrl={url.thumbUrl} videoUrl={url.videoUrl} extraStyles="w-1/2 h-[190px]" scale="scale-[1.45]" />
            ))}
          </div>
        );
      case 1:
        return (
          <div className="flex flex-wrap justify-center items-center content-center w-full gap-2 h-full">
            <Thumbnail thumbUrl={videoUrls[0].thumbUrl} videoUrl={videoUrls[0].videoUrl} extraStyles="h-full w-full max-h-[190px]" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full h-full flex content-center max-h-[190px] rounded-lg overflow-hidden">
      {renderThumbnails()}
    </div>
  );
}

function Thumbnail({ thumbUrl, videoUrl, extraStyles = '', scale = '' }: ThumbnailProps) {
  return (
    <div className={`rounded-lg overflow-hidden flex justify-center items-center ${extraStyles}`}>
      <img
        src={thumbUrl}
        alt="Thumbnail"
        className={`bg-gray-200 rounded-lg object-cover cursor-pointer ${scale}`}
        onClick={() => window.open(videoUrl, '_blank')}
      />
    </div>
  );
}
