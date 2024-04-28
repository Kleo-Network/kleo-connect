import React, { FC, useCallback, useState } from 'react'
import { IExecDataProtector } from '@iexec/dataprotector'
import useFetch from '../../common/hooks/useFetch'
import { fullUserData } from '../../common/interface'
import { switchOrAddIExecSidechain } from './chains/switchAdd'
import { uploadFileToS3 } from './chains/uploadS2'

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
  const [uploadComplete, setUploadComplete] = useState(false)
  const [chainConnected, setChainConnected] = useState(false)
  const [claimed, setClaimed] = useState(false)
  const [claiming, setClaiming] = useState(false)

  function makeSlugApiUrl(): string {
    return GET_USER_DATA.replace('{slug}', localStorage.getItem('slug') || '')
  }

  const handleMint = useCallback(async () => {
    setClaiming(true)
    switchOrAddIExecSidechain(iExecSidechainParams)
    setChainConnected(true)
    const dataProtector = new IExecDataProtector(window.ethereum)
    fetchFullUserData(makeSlugApiUrl(), {
      onSuccessfulFetch: async (data) => {
        if (data) {
          console.log('data', data)
          try {
            const jsonBlob = new Blob([JSON.stringify(data)], {
              type: 'application/json'
            })
            const jsonFile = new File(
              [jsonBlob],
              `${localStorage.getItem('slug')}.json`,
              { type: 'application/json' }
            )
            setUploadComplete(true)
            // Upload the JSON file to S3
            const uploadedFileUrl = await uploadFileToS3(jsonFile)
            console.log('Uploaded file URL:', uploadedFileUrl)
            // Protect the uploaded file URL using IExecDataProtector
            const protectedData = await dataProtector.protectData({
              data: { url: uploadedFileUrl }
            })
            console.log('Protected data:', protectedData)
            setClaimed(true)
            setClaiming(false)
          } catch (error) {
            console.error('Error uploading or protecting file:', error)
            setClaiming(false)
          }
        }
      }
    })
  }, [])

  return (
    <div className="bg-purple-100 px-25% py-25%">
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={handleMint}
          className="bg-purple-200 text-purple-800 font-cool px-8 py-4 rounded-lg flex items-center space-x-2"
        >
          <span>{claiming ? 'Claiming Rewards...' : 'Claim Rewards'}</span>
        </button>
        <span
          className={`block ${
            uploadComplete ? 'text-green-500' : 'text-gray-500'
          }`}
        >
          Upload your profile page ✓
        </span>
        <span
          className={`block ${
            chainConnected ? 'text-green-500' : 'text-gray-500'
          }`}
        >
          Connect to metamask's right chain ✓
        </span>
        <span
          className={`block ${claimed ? 'text-green-500' : 'text-gray-500'}`}
        >
          Protect using Data Protector & Claim Points ✓
        </span>
      </div>
    </div>
  )
}

export default Mint
