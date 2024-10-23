import ActionableMileStone from "./ActionableMileStone";
import XLogoImage from '../../../../assets/dashboard/XLogo.png';

interface MilestonesProps {
  mileStones: Record<string, number | boolean>
  /* Example mileStones object.
    {
      "data_owned": 0,
      "followed_on_twitter": false,
      "referred_count": 0,
      "tweet_activity_graph": false
    }
  */
}

const Milestones = ({ mileStones }: MilestonesProps) => {
  const handleFollowClick = () => {
    console.log('Followed.');
  }

  const handleShareGraphClick = () => {
    console.log('Sharing graph.');
  }

  return (
    <div className="bg-white p-5 rounded-xl flex flex-col w-full">
      <h3 className="text-2xl mb-2 font-semibold">Milestones</h3>
      <p className="text-sm font-inter">Keep up with the team to receive rewards!</p>

      <ul className="mt-4 flex flex-col gap-4">
        {/* Twitter milestones */}
        <ActionableMileStone
          label="Follow us on Twitter"
          icon={XLogoImage}
          onClick={handleFollowClick}
          xp={120}
          completed={mileStones.followed_on_twitter as boolean}
        />
        <ActionableMileStone
          label="Tweet your activity graph"
          icon={XLogoImage}
          onClick={handleShareGraphClick}
          xp={120}
          completed={mileStones.tweet_activity_graph as boolean}
        />
      </ul>
    </div>
  )
}

export default Milestones;