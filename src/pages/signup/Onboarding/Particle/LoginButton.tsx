import { ConnectButton } from '@particle-network/connectkit'
import { ReactComponent as Logout } from '../../../../assets/images/logout.svg'
import '@particle-network/connectkit/dist/index.css'

type KleoWindow = Window & { kleoConnect?: boolean }

export const KleoExtensionExists = () => {
  return (window as KleoWindow).kleoConnect === true
}

export const AccountButton = () => {
  return (
    <ConnectButton.Custom>
      {({ openAccountModal, account }) => {
        return (
          <>
            <button
              className="p-2 hover:bg-purple-100 stroke-gray-500 hover:stroke-purple-700 rounded-md"
              onClick={openAccountModal}
              disabled={!account}
            >
              <Logout className="w-5 h-5 stroke-current" />
            </button>
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}

export const SwitchNetworkButton = () => {
  return (
    <ConnectButton.Custom>
      {({ openChainModal, account }) => {
        return (
          <>
            <button onClick={openChainModal} disabled={!account}>
              Open Switch Network
            </button>
          </>
        )
      }}
    </ConnectButton.Custom>
  )
}
type LoginButtonProps = {
  txt: string
}

export const LoginButton: React.FC<LoginButtonProps> = ({ txt }) => {
  return (
    <ConnectButton.Custom>
      {({ account, openConnectModal }) => {
        return (
          <div>
            {!account && (
              <button
                className="px-4 py-3 bg-primary text-white rounded-lg shadow mr-1"
                onClick={openConnectModal}
              >
                {txt}
              </button>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
