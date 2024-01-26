import { ConnectButton, useAccountInfo } from '@particle-network/connectkit'
import { ReactComponent as Logout } from '../../../../assets/images/logout.svg'
import '@particle-network/connectkit/dist/index.css'
import { isEVMProvider } from '@particle-network/connectors'
import bs58 from 'bs58'

export const KleoExtensionExists = () => {
  return (window as any)?.kleoConnect === true
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
      {({
        account,
        chain,
        openAccountModal,
        openConnectModal,
        openChainModal,
        accountLoading
      }) => {
        //const { particleProvider } = useAccountInfo()

        // const onLogin = async () => {
        //   openConnectModal()

        //   console.log(particleProvider)
        //   if (!particleProvider) {
        //     throw new Error('Please connect wallet first!')
        //   }
        //   try {
        //     let signature
        //     if (isEVMProvider(particleProvider)) {
        //       signature = await particleProvider.request({
        //         method: 'personal_sign',
        //         params: [
        //           `0x${Buffer.from('signedMessage').toString('hex')}`,
        //           account
        //         ]
        //       })
        //       console.log('signature', signature)
        //     } else {
        //       const result = await particleProvider.signMessage(
        //         Buffer.from('signedMessage')
        //       )
        //       signature = bs58.encode(result)
        //       console.log('signature', signature)
        //     }
        //   } catch (error: any) {
        //     console.log('error', error)
        //   }
        // }

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
