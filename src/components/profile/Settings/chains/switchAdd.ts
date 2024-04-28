interface ChainParams {
  chainId: string
  chainName: string
  chainRpcUrl: string
  name: string
  symbol: string
  decimals: number
}

export async function switchOrAddIExecSidechain({
  chainId,
  chainName,
  chainRpcUrl,
  name,
  symbol,
  decimals
}: ChainParams): Promise<void> {
  if (typeof (window as any).ethereum !== 'undefined') {
    const { ethereum } = window as any

    try {
      // Get the current chain ID
      const currentChainId = await ethereum.request({ method: 'eth_chainId' })

      // Check if the requested chain ID matches the current chain ID
      if (currentChainId !== chainId) {
        try {
          // Switch to the requested chain
          await ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: chainId }]
          })
        } catch (switchError) {
          // This error code indicates that the chain has not been added to MetaMask
          if ((switchError as any).code === 4902) {
            try {
              // Attempt to add the chain
              await ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId,
                    chainName,
                    rpcUrls: [chainRpcUrl],
                    nativeCurrency: {
                      name: name,
                      symbol: symbol,
                      decimals: decimals
                    }
                  }
                ]
              })
            } catch (addError) {
              console.error(
                'Failed to add the iExec Sidechain to MetaMask:',
                addError
              )
              throw addError
            }
          } else {
            console.error(
              'Failed to switch to the iExec Sidechain:',
              switchError
            )
            throw switchError
          }
        }
      } else {
        console.log('Already connected to the requested chain')
      }
    } catch (error) {
      console.error('Failed to check the current chain:', error)
      throw error
    }
  } else {
    console.error('MetaMask is not available')
    throw new Error('MetaMask is not available')
  }
}
