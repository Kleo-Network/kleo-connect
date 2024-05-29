import { useMemo, useState } from 'react'
import { UserData } from '../../constants/SignupData'
import Mint from './iExec'
import { ReactComponent as Cat } from '../../../assets/images/astronautCat.svg'
interface User {
  user: UserData
}

enum TABS {
  MINT = 'Own your data, earn points'
}

const Settings = ({ user }: User) => {
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.MINT)

  const renderTabContent = () => {
    switch (selectedTab) {
      case TABS.MINT:
        return <Mint />
      default:
        return null
    }
  }
  //umcomment when we implement mint functionality
  // return (
  //   <div className="flex flex-col items-start self-stretch">
  //     <div className="px-6 py-5 border-b border-gray-200 justify-between items-center flex self-stretch">
  //       <div className="text-gray-900 text-lg font-medium">Settings</div>
  //     </div>
  //     <div className="justify-start items-start flex">
  //       <div className="py-4 border-r border-gray-200 justify-start items-start gap-2.5 flex self-stretch">
  //         <div className="grow shrink min-w-[150px] basis-0 flex-col justify-start items-start gap-1 flex">
  //           {Object.values(TABS).map((tab) => (
  //             <button
  //               key={tab}
  //               className={`self-stretch pl-6 pr-3 py-2 justify-start items-start gap-2 flex rounded-md hover:bg-gray-100 ${
  //                 tab === selectedTab && 'bg-gray-200'
  //               }`}
  //               onClick={() => setSelectedTab(tab)}
  //             >
  //               <span className="text-gray-500 text-sm font-medium text-left">
  //                 {tab}
  //               </span>
  //             </button>
  //           ))}
  //         </div>
  //       </div>
  //       <div className="p-6 flex-col justify-start items-start flex">
  //         {renderTabContent()}
  //       </div>
  //     </div>
  //   </div>
  // )

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-50 backdrop-blur-md flex justify-center items-center -z-50">
      <div
        className={
          'flex flex-col max-w-[400px] h rounded-xl relative items-center justify-center'
        }
      >
        <Cat className="h-[250px] w-[250px] mb-4" />
        <div className="font-inter font-semibold text-gray-800 text-[24px] mb-2">
          Comming Soon!!
        </div>
        <div className="flex font-inter font-semibold text-gray-500 text-[14px] justify-center text-center">
          Mint your data on our on-chain social platform to gain unparalleled
          control and ownership over your online presence. Stay tuned!
        </div>
      </div>
    </div>
  )
}

export default Settings
