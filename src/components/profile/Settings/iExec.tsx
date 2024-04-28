import React, { FC, useCallback } from 'react'
import { IExecDataProtector } from '@iexec/dataprotector'
// import { UserData } from '../../constants/SignupData'
import useFetch from '../../common/hooks/useFetch'
import { fullUserData } from '../../common/interface'
import { switchOrAddIExecSidechain } from './chains/switchAdd'
// interface MintProps {
//   user: UserData
// }

interface ChainParams {
  chainId: string
  chainName: string
  chainRpcUrl: string
  name: string
  symbol: string
  decimals: number
}

const iExecSidechainParams: ChainParams = {
  chainId: '0x86',
  chainName: 'iExec Sidechain',
  chainRpcUrl: 'https://bellecour.iex.ec',
  name: 'xRLC',
  symbol: 'xRLC',
  decimals: 18
}
const Mint: FC = () => {
  const { fetchData: fetchFullUserData } = useFetch<fullUserData>()
  const GET_USER_DATA = 'user/{slug}/published-cards/info'
  function makeSlugApiUrl(): string {
    return GET_USER_DATA.replace('{slug}', localStorage.getItem('slug') || '')
  }
  //const account = useAccount()
  //const { open: openConnectModal } = useWeb3Modal()
  const handleMint = useCallback(async () => {
    // const provider = await detectEthereumProvider()
    switchOrAddIExecSidechain(iExecSidechainParams)
    const dataProtector = new IExecDataProtector(window.ethereum)

    fetchFullUserData(makeSlugApiUrl(), {
      onSuccessfulFetch: async (data) => {
        if (data) {
          console.log('data', data)
          const protectedData = await dataProtector.protectData({
            data: 'data'
          })
          console.log('protectedData', protectedData)
        }
      }
    })
  }, [])
  return <button onClick={handleMint}> Claim Rewards</button>
}

export default Mint
