import { useState } from 'react'
import useFetch from '../../common/hooks/useFetch'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import '@solana/wallet-adapter-react-ui/styles.css'
import { fullUserData } from '../../common/interface'
import CryptoJS from 'crypto-js'
import { WebIrys } from '@irys/sdk'

export default function Mint() {
  const [irysUriLink, setIrysUriLink] = useState<string>('')
  const [transactionLink, setTransactionLink] = useState<string>('')
  const [isDataUploaded, setIsDataUploaded] = useState<boolean>(false)
  const { fetchData: fetchFullUserData } = useFetch<fullUserData>()
  const GET_USER_DATA = 'user/{slug}/published-cards/info'
  const key = 'kleoUser'
  const solWallet = useWallet()
  function makeSlugApiUrl(): string {
    return GET_USER_DATA.replace('{slug}', localStorage.getItem('slug') || '')
  }

  function encryptData(data: fullUserData, key: string) {
    const jsonData = JSON.stringify(data) // Convert JSON data to string
    const encryptedData = CryptoJS.AES.encrypt(jsonData, key).toString() // Encrypt the string using AES
    return encryptedData
  }

  const getWebIrys = async (): Promise<WebIrys> => {
    // Devnet RPC URLs change often, use a recent one from https://chainlist.org
    const rpcUrl =
      'https://mainnet.helius-rpc.com/?api-key=444859c7-2f81-4bb7-aa60-4d3ad9e39e4d'
    if (solWallet) {
      const wallet = {
        rpcUrl: rpcUrl,
        name: 'solana',
        provider: solWallet
      }
      console.log(wallet)
      const webIrys = new WebIrys({
        network: 'mainnet',
        token: 'solana',
        wallet
      })
      await webIrys.ready()
      return webIrys
    }
    return null as unknown as WebIrys
  }

  async function uploadToIrys(data: string): Promise<string> {
    const webIrys = await getWebIrys()
    try {
      const fundTx = await webIrys.fund(webIrys.utils.toAtomic(0.0000001))
    } catch (e) {
      console.log('Error uploading data ', e)
    }
    try {
      const receipt = await webIrys.upload(data, {
        tags: [{ name: 'Content-Type', value: 'text/plain' }]
      })
      setIsDataUploaded(true)
      return `https://gateway.irys.xyz/${receipt.id}`
    } catch (e) {
      console.log('Error uploading data ', e)
      return ''
    }
  }

  const handleUpload = () => {
    try {
      setIrysUriLink('initial link')
      fetchFullUserData(makeSlugApiUrl(), {
        onSuccessfulFetch(data) {
          if (data) {
            const encryptedUserData = encryptData(data, key)
            console.log('data type:', typeof encryptedUserData)
            console.log('data:', encryptedUserData)

            uploadToIrys(encryptedUserData).then((result: string) => {
              setIrysUriLink(result)
            })
          }
        }
      })
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleMint = () => {
    setTransactionLink('sadsafsdgtwdcrwfwersdfwef')
  }

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
            {solWallet.connected ? (
              <div className="flex flex-row align-middle items-center">
                <button
                  onClick={solWallet.disconnect}
                  className=" px-4 py-3 ml-14 mr-5 bg-primary rounded-lg shadow border
                justify-center items-center gap-2 flex"
                >
                  Disconnect
                </button>
                <span>
                  Wallet address:
                  {solWallet.publicKey?.toString().slice(0, 4)}
                  ...
                  {solWallet.publicKey?.toString().slice(-4)}
                </span>
              </div>
            ) : (
              <WalletMultiButton />
            )}
          </div>
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start gap-1.5 flex">
        <div className="self-stretch grow shrink basis-0 flex-col justify-start items-start gap-1.5 flex">
          <div className="text-slate-700 text-sm font-medium">
            Upload to IRYS
          </div>
          <div className=" align-middle items-center self-stretch grow shrink basis-0 p-3 bg-white rounded-lg shadow border border-gray-300 flex-col justify-start align-center items-start gap-2 flex">
            {!irysUriLink ? (
              <button
                onClick={handleUpload}
                className="px-4 py-3 bg-primary rounded-lg shadow border justify-center items-center gap-2 flex"
              >
                <span className="text-white text-sm font-medium">Upload</span>
              </button>
            ) : (
              <div>
                <span>
                  Uploaded on IRYS with URI:{' '}
                  {isDataUploaded ? (
                    <a
                      href={irysUriLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold	"
                    >
                      Check encrypted data
                    </a>
                  ) : (
                    'Uploading...'
                  )}
                </span>
              </div>
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
