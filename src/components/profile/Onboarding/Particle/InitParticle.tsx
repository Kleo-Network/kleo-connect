import React, { ReactNode } from 'react'
import { ModalProvider } from '@particle-network/connectkit'
import {
  Ethereum,
  EthereumGoerli,
  EthereumSepolia,
  Solana,
  SolanaDevnet,
  SolanaTestnet
} from '@particle-network/chains'
import { evmWallets, solanaWallets } from '@particle-network/connectors'
import('buffer').then(({ Buffer }) => {
  window.Buffer = Buffer
})

// Define a type for the props
interface ParticleNetworkProviderProps {
  children: ReactNode
}

// ParticleNetworkProvider component
const ParticleNetworkProvider: React.FC<ParticleNetworkProviderProps> = ({
  children
}) => {
  const projectId = '36f97749-861c-48fe-a7e0-e2e259f07d0d'
  const clientKey = 'ct08EB5z9q5xQpfqFS1rdMpOw5J9GAxbPbrkY8wk'
  const appId = '264d68f0-6bcb-4139-8dfc-de21fbc37bad'
  //const walletConnectProjectId = 'walletconnect projectId' // replace with your walletconnect projectId

  return (
    <ModalProvider
      options={{
        projectId: projectId,
        clientKey: clientKey,
        appId: appId,
        chains: [
          Ethereum,
          EthereumGoerli,
          EthereumSepolia,
          Solana,
          SolanaDevnet,
          SolanaTestnet
        ],
        connectors: [
          ...evmWallets({
            projectId: 'd81da1fa1b3a14753839777ad5ee086d',
            showQrModal: true
          }),
          ...solanaWallets()
        ],
        erc4337: {
          name: 'SIMPLE',
          version: '1.0.0'
        },
        wallet: {
          visible: false,
          customStyle: {
            supportChains: [
              Ethereum,
              EthereumGoerli,
              EthereumSepolia,
              Solana,
              SolanaDevnet,
              SolanaTestnet
            ]
          }
        }
      }}
    >
      {children}
    </ModalProvider>
  )
}

export default ParticleNetworkProvider
