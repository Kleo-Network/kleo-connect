export default function BadgesList() {
  return (
    <div className="mx-auto h-full w-full self-stretch">
      <header className="flex flex-row gap-2 justify-between items-center px-6 py-5 font-medium border-b border-gray-200">
        <div className="flex w-full justify-between items-center gap-2">
          <div>
            <h3 className="text-xl text-gray-900 flex-grow-0">The Quests</h3>
          </div>
        </div>
      </header>
      <div className="flex flex-col justify-center items-center self-stretch m-6 h-1/3 bg-violet-200 border border-2 border-violet-600 rounded-lg">
        <div className="flex flex-col md:flex-row justify-self-center items-center self-stretch m-2 md:m-6 p-2 ">
          <div className="flex flex-col justify-center items-center w-1/3">
            <img
              src="https://bonkcoin.com/static/media/bonkog_200.e87b5d92088ca7a75178.png"
              alt="7 day strike"
              className="w-32 h-32 rounded-full"
            />
            <span className="font-normal mt-2"> Unlcoked </span>
          </div>
          <span className="flex justify-center items-center h-full my-2 md:my-none mx-8 md:mx-16 items-center text-xl font-semibold md:w-1/3">
            7 Nouveau: Unlocked Ownership! Mint NFT!
          </span>
          <span className="mx-8 md:mx-16 text-l font-normal md:w-1/3">
            This allows them to mint an NFT! We are giving away Bonk tokens for
            being active on our platform. The NFT PFP itself will have a small
            Bonk dog logo along with your profile image! This offer is only
            valid for the first 1000 users.
          </span>
          <div className="flex h-full item-start justify-end">
            <input
              className="rounded-full"
              style={{
                backgroundColor: '#4c1d95'
              }}
              type="checkbox"
              checked={true}
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center self-stretch m-6 h-1/3 bg-violet-200 border border-2 border-violet-600 rounded-lg h-1/3">
        <div className="flex flex-col md:flex-row justify-self-center items-center self-stretch m-6 p-2">
          <div className="flex flex-col justify-center items-center w-1/3">
            <img
              src="src\assets\images\superteam.png"
              alt="7 day strike"
              className="w-32 h-32 rounded-full"
            />
            <span className="font-normal mt-2"> Unlcoked </span>
          </div>
          <span className=" flex justify-center items-center h-full my-2 md:my-none mx-8 md:mx-16 items-center text-xl font-semibold md:w-1/3">
            15 Noob: Unlocked Same Same but Different
          </span>
          <span className="mx-8 md:mx-16 text-l font-normal md:w-1/3">
            For users active for 15 days on Kleo, they can compare two different
            profiles and find data consumption similarities and differences. The
            first 1000 users to unlock this will get some extra BONK as well!
          </span>
          <input
            className="rounded-full"
            style={{
              backgroundColor: '#4c1d95'
            }}
            type="checkbox"
            checked={true}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className={`relative ${true ? 'pointer-events-none' : ''}`}>
        {/* Overlay */}
        {true && (
          <div className="absolute inset-0 bg-neutral-800 opacity-75 mx-6 rounded-lg"></div>
        )}
        {/* Card content */}
        <div className="flex flex-col justify-center items-center self-stretch m-6 h-1/3 bg-white border border-2 border-violet-600 rounded-lg h-1/3">
          <div className="flex flex-col md:flex-row justify-self-center items-center self-stretch m-6 p-2">
            <div className="flex flex-col justify-center items-center w-1/3">
              <img
                src="src\assets\images\community.svg"
                alt="7 day strike"
                className="w-32 h-32 rounded-full"
              />
              <span className="font-normal mt-2">
                {' '}
                Unlocking Soon! 9 days of streak left{' '}
              </span>
            </div>
            <span className="flex justify-center items-center h-full my-2 md:my-none mx-8 md:mx-16 items-center text-xl font-semibold md:w-1/3 ">
              30 Ranger: Unlock Communities
            </span>
            <span className="mx-8 md:mx-16 text-l font-normal md:w-1/3 ">
              Find and match with people on Kleo having a similar data identity
              as you do! Using a different key (account abstraction), this will
              ensure you remain anonymous. The first 30 topics to form
              communities will get some BONK drops.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
