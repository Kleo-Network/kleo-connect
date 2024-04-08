import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Tags, { Tag } from '../../common/Tags'
import { Categories } from './Categories'
import useFetch from '../../common/hooks/useFetch'
import { Method } from 'axios'
import { UserResponse } from '../Onboarding/Authentication/interface'
import MintProfile from '../../ProfileV3/connect'
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { clusterApiUrl } from '@solana/web3.js'
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets'
import {
  ConnectionProvider,
  WalletProvider,
  useWallet
} from '@solana/wallet-adapter-react'
import '@solana/wallet-adapter-react-ui/styles.css'
import { fullUserData } from '../../common/interface'
import CryptoJS from 'crypto-js'
import { createHelia } from 'helia'

export default function Mint() {
  const [address, setAddress] = useState<string>('')
  const [ipfsUriLink, setIpfsUriLink] = useState<string>('')
  const [transactionLink, setTransactionLink] = useState<string>('')
  const { fetchData: fetchFullUserData } = useFetch<fullUserData>()
  const GET_USER_DATA = 'user/{slug}/published-cards/info'
  const key = 'kleoUser'
  function makeSlugApiUrl(): string {
    return GET_USER_DATA.replace('{slug}', localStorage.getItem('slug') || '')
  }

  const [keywords, setKeywords] = useState<Tag[]>([])
  const [domains, setDomains] = useState<Tag[]>([])
  const PRIVACY_ENDPOINT = `user/set_privacy`
  const GET_USER_API = 'auth/get_user_privacy'
  const { fetchData } = useFetch()
  const userAddress = localStorage.getItem('userAddress')
  const { fetchData: fetchUserPrivacy } = useFetch<any>()

  const network = WalletAdapterNetwork.Devnet

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(() => [new UnsafeBurnerWalletAdapter()], [network])

  function encryptData(data: fullUserData, key: string) {
    const jsonData = JSON.stringify(data) // Convert JSON data to string
    const encryptedData = CryptoJS.AES.encrypt(jsonData, key).toString() // Encrypt the string using AES
    return encryptedData
  }

  // async function uploadEncryptedDataToIPFS(
  //   encryptedDataFromBE: string
  // ): Promise<string> {
  //   try {
  //     // Upload encrypted data to IPFS\
  //     const helia = await createHelia()
  //     const s = strings(helia)
  //     const myImmutableAddress = await s.add(encryptedDataFromBE)
  //     console.log('Uploaded to IPFS:', myImmutableAddress)
  //     return myImmutableAddress
  //   } catch (error) {
  //     console.error('Error:', error)
  //     return ''
  //   }
  // }

  const fetchUserFromDB = async (address: string): Promise<UserResponse> => {
    return new Promise<UserResponse>((resolve) => {
      fetchUserPrivacy(GET_USER_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          address
        }),
        onSuccessfulFetch(data) {
          return resolve(data)
        }
      })
    })
  }
  // const { publicKey } = useWallet()
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = e.target.value
    if (selectedTag) {
      setKeywords([...keywords, { id: keywords.length + 1, name: selectedTag }])
    }
  }

  const handleWalletConnet = () => {
    setAddress('asdasdasdasdasdasdasdasda')
  }

  const handleUpload = () => {
    try {
      fetchFullUserData(makeSlugApiUrl(), {
        onSuccessfulFetch(data) {
          if (data) {
            const encryptedUserData = encryptData(data, key)
            console.log('data type:', typeof encryptedUserData)
            console.log('data:', encryptedUserData)

            // uploadEncryptedDataToIPFS(encryptedUserData).then(
            //   (result: string) => {
            //     console.log('uri', result)
            //     setIpfsUriLink(result)
            //   }
            // )
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIpfsUriLink('asdadasfsdfsdfsdgfsdgsdf')
  }

  const handleMint = () => {
    setTransactionLink('sadsafsdgtwdcrwfwersdfwef')
  }

  const loadUserPrivacySettings = async () => {
    try {
      const response = await fetchUserFromDB(userAddress || '')
      if (response?.privacy) {
        setKeywords(
          response.privacy.categories.map(
            (category: string, index: number) => ({
              id: index,
              name: category
            })
          )
        )
        setDomains(
          response.privacy.domains.map((domain: string, index: number) => ({
            id: index,
            name: domain
          }))
        )
      }
    } catch (error) {
      console.error('Error fetching user privacy settings:', error)
    }
  }

  // Use useEffect to load the user's current privacy settings when the component mounts
  useEffect(() => {
    loadUserPrivacySettings()
  }, [])

  return (
    <div className=" gap-6 flex-col justify-start items-start flex">
      <div className="self-stretch flex-col justify-start items-start gap-6 flex">
        <div className="self-stretch flex-col justify-start items-start gap-5 flex">
          <div className="self-stretch justify-start items-start gap-4 flex">
            <div className="grow shrink basis-0 self-stretch flex-col justify-center items-start gap-1 flex">
              <div className="self-stretch text-gray-900 text-lg font-medium">
                Mint your cards
              </div>
              <div className="self-stretch text-gray-500 text-sm font-normal">
                Turn your browsing journey into shareable blockchain cards,
                immortalizing your online adventures on social platforms.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-700 text-sm font-medium">
            Select Wallet
          </div>
          <div className="self-stretch grow shrink basis-0 p-3 bg-white rounded-lg shadow border border-gray-300 flex-col justify-start align-center items-start gap-2 flex">
            {!address ? (
              // <button
              //   onClick={handleWalletConnet}
              //   className="px-4 py-3 bg-primary rounded-lg shadow border justify-center items-center gap-2 flex"
              // >
              //   <span className="text-white text-sm font-medium">Connect</span>
              // </button>
              <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                  <WalletModalProvider>
                    <WalletMultiButton />
                  </WalletModalProvider>
                </WalletProvider>
              </ConnectionProvider>
            ) : (
              <span>Wallet connected with address: {publicKey.toBase58}</span>
            )}
          </div>
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-700 text-sm font-medium">
            Upload to IPFS
          </div>
          <div className="self-stretch grow shrink basis-0 p-3 bg-white rounded-lg shadow border border-gray-300 flex-col justify-start align-center items-start gap-2 flex">
            {!ipfsUriLink ? (
              <button
                onClick={handleUpload}
                className="px-4 py-3 bg-primary rounded-lg shadow border justify-center items-center gap-2 flex"
              >
                <span className="text-white text-sm font-medium">Upload</span>
              </button>
            ) : (
              <span>Uploaded on IPFS with URI: {ipfsUriLink}</span>
            )}
          </div>
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-700 text-sm font-medium">Mint NFT</div>
          <div className="self-stretch grow shrink basis-0 p-3 bg-white rounded-lg shadow border border-gray-300 flex-col justify-start align-center items-start gap-2 flex">
            {!transactionLink ? (
              <button
                onClick={handleMint}
                className="px-4 py-3 bg-primary rounded-lg shadow border justify-center items-center gap-2 flex"
              >
                <span className="text-white text-sm font-medium">Mint</span>
              </button>
            ) : (
              <span>
                Transaction complete! View transaction: {transactionLink}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
