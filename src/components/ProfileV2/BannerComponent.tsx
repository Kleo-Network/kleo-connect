import { UserData } from "../common/interface";
import { convertEpochToISO } from "../common/utils";
import CountdownTimer from "../profile/ProfileCards/countdown";
import { ReactComponent as CloseIcon } from '../../assets/images/cross.svg'

interface IBannerComponent {
    setShowBanner: React.Dispatch<React.SetStateAction<boolean>>;
    user: UserData
}

export function BannerComponent({ setShowBanner, user }: IBannerComponent) {

    const handleBannerClick = () => setShowBanner(false);

    return (
        <div className="max-h-[50px] w-full flex items-center justify-between bg-purple-700">
            <div className="flex-grow flex items-center justify-center text-white text-l font-semibold">
                New cards arriving in{' '}
                <CountdownTimer
                    endDate={convertEpochToISO(user.last_cards_marked + 86400)}
                    isProfilePage={true}
                />
            </div>
            <button
                className="text-white hover:text-primary hover:bg-white focus:outline-none rounded-md mr-5 p-1"
                onClick={handleBannerClick}
            >
                <CloseIcon className="w-5 h-5" />
            </button>
        </div>
    );
}