import ActionableMileStone from "./ActionableMileStone";
import XLogoImage from '../../../../assets/dashboard/XLogo.png';
import ProgressMilestone from "./ProgressMilestone";
import { useCallback, useMemo } from "react";

interface MilestonesProps {
  mileStones: Record<string, number | boolean>
  handleShareGraph: () => Promise<void>
  isGraphAvailable: boolean
  /* Example mileStones object.
    {
      "data_owned": 0,
      "followed_on_twitter": false,
      "referred_count": 0,
      "tweet_activity_graph": false
    }
  */
}

const Milestones = ({ mileStones, handleShareGraph, isGraphAvailable }: MilestonesProps) => {
  const handleFollowClick = () => {
    window.open('https://x.com/kleo_network', '_blank');
  };

  const handleShareGraphClick = () => {
    console.log('Sharing graph.');
    handleShareGraph();
  }

  const convertDataSizeToPercentage = (value: number) => {
    const dataOwnedMB = value / (1024 * 1024); // Convert bytes to MB
    const progress = Math.min((dataOwnedMB / 200) * 100, 100).toFixed(1); // Cap progress at 100%
    return { value: dataOwnedMB, progress: parseFloat(progress) };
  };

  const convertReferredCountsToPercentage = (value: number) => {
    const progress = Math.min((value / 10) * 100, 100).toFixed(1); // Cap progress at 100%
    return { value, progress: parseFloat(progress) };
  };

  return (
    <div className="bg-white p-5 rounded-xl flex flex-col w-full h-full">
      <h3 className="text-2xl mb-2 font-semibold">Milestones</h3>
      <p className="text-sm font-inter">Keep up with the team to receive rewards!</p>

      <ul className="mt-4 flex flex-1 flex-col gap-4">
        {/* Twitter milestones */}
        <ActionableMileStone
          label="Follow us on Twitter"
          icon={XLogoImage}
          onClick={handleFollowClick}
          xp={120}
          completed={mileStones.followed_on_twitter as boolean}
        />
        {(mileStones.tweet_activity_graph || isGraphAvailable) && (
          <ActionableMileStone
            label="Tweet your activity graph"
            icon={XLogoImage}
            onClick={handleShareGraphClick}
            xp={120}
            completed={mileStones.tweet_activity_graph as boolean}
          />
        )}

        {/* Progress-based milestones */}
        <ProgressMilestone
          label="Own and protect 200 MB of data."
          progress={convertDataSizeToPercentage(Number(mileStones.data_owned) || 0).progress}
          xp={120}
        />
        <ProgressMilestone
          label="Refer 10 friends to join Kleo Network"
          progress={convertReferredCountsToPercentage(Number(mileStones.referred_count) || 0).progress}
          xp={120}
        />
      </ul>
    </div>
  )
}

export default Milestones;