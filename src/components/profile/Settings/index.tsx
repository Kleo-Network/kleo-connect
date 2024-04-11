import { useMemo, useState } from 'react'
import { UserData } from '../../constants/SignupData'
import Mint from './mint'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import {
  ConnectionProvider,
  WalletProvider
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'

interface User {
  user: UserData
}

enum TABS {
  MINT = 'Mint your cards'
}

const Settings = ({ user }: User) => {
  const network = WalletAdapterNetwork.Devnet

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const phantomWallet = new PhantomWalletAdapter()

  // Pass the wallet adapters to the WalletProvider
  const wallets = [phantomWallet]
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.MINT)

  const renderTabContent = () => {
    switch (selectedTab) {
      case TABS.MINT:
        return (
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                <Mint />
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        )
      default:
        return null
    }
  }
  return (
    <div className="flex flex-col items-start self-stretch">
      <div className="px-6 py-5 border-b border-gray-200 justify-between items-center flex self-stretch">
        <div className="text-gray-900 text-lg font-medium">Settings</div>
      </div>
      <div className="justify-start items-start flex">
        <div className="py-4 border-r border-gray-200 justify-start items-start gap-2.5 flex self-stretch">
          <div className="grow shrink min-w-[150px] basis-0 flex-col justify-start items-start gap-1 flex">
            {Object.values(TABS).map((tab) => (
              <button
                key={tab}
                className={`self-stretch pl-6 pr-3 py-2 justify-start items-start gap-2 flex rounded-md hover:bg-gray-100 ${
                  tab === selectedTab && 'bg-gray-200'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                <span className="text-gray-500 text-sm font-medium text-left">
                  {tab}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="p-6 flex-col justify-start items-start flex">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default Settings
