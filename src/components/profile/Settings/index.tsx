import { useMemo, useState, useEffect } from 'react'
import { UserData } from '../../constants/SignupData'
import Mint from './iExec'
import { ReactComponent as Cat } from '../../../assets/images/astronautCat.svg'
import { ConnectWallet } from '@thirdweb-dev/react'
import { createThirdwebClient, getContract, resolveMethod } from 'thirdweb'
import { defineChain } from 'thirdweb/chains'
import { ThirdwebProvider } from 'thirdweb/react'
import { ReactComponent as Explorer } from '../../../assets/images/claim.svg'
import { ReactComponent as ThirdParty } from '../../../assets/images/third.svg'
import { ReactComponent as Airdrop } from '../../../assets/images/airdrop.svg'
import { Lit } from '../Settings/LitProtocol/index'
import Irys from '@irys/sdk'

interface User {
  user: UserData
}

enum TABS {
  MINT = 'Own your data, earn points'
}

const MediaLeft = () => {
  const [activeIndex, setActiveIndex] = useState(2)
  const titles = [
    'Connect with your tribe!',
    'Be eligible for an airdrop season',
    'Connect with third party apps'
  ]

  const description = [
    'Unlock benefits with explorer and connect with right people and <br /> communities',
    'Receive regular airdrops from our partners, be a part of their success',
    'Unlock more personalised dating applications, shopping experience with <br /> your privacy protected!'
  ]
  useEffect(() => {
   // const interval = setInterval(nextSlide, 3000) // Change slide every 3 seconds
   // return () => clearInterval(interval)
  }, [activeIndex])

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % 3)
  }

  const goToSlide = (index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className='relative'>
      <div className='absolute bottom-[10%] left-[4%] z-50'
      >
        <h1 className="text-white text-3xl">{titles[activeIndex]}</h1>

        <p
          className="text-gray-200"
          dangerouslySetInnerHTML={{ __html: description[activeIndex] }}
        ></p>
      </div>
      <div
         className='absolute bottom-[3%] left-[33%] z-50'
      >
        <div
          key={`1`}
          className={`h-2 bg-white rounded-full mx-2 cursor-pointer active bg-white relative ${activeIndex == 0 ? 'w-14' : 'w-3 bg-opacity-50'}`}
          onClick={() => goToSlide(0)}
        ></div>
        <div
          key={`2`}
          className={`bottom-[8px] relative h-2 bg-white rounded-full ${activeIndex == 0  ? 'left-[63px]' :  'left-[18px]'} mx-2 cursor-pointer ${
            1 === activeIndex
              ? 'active bg-white w-14'
              : 'bg-opacity-50 w-3'
          }`}
          onClick={() => goToSlide(1)}
        ></div>
        <div
          key={`2`}
          className={` bottom-[16px] relative h-2 ${activeIndex == 2 ? 'left-[35px]' : 'left-[80px]'} bg-white rounded-full mx-2 cursor-pointer ${
            2 === activeIndex
              ? 'active bg-white w-14'
              : 'bg-opacity-50 w-3'
          }`}
          onClick={() => goToSlide(2)}
        ></div>
      </div>
      {activeIndex === 0 && <Explorer />}
      {activeIndex === 1 && <Airdrop />}
      {activeIndex === 2 && <ThirdParty />}
    </div>
  )
}

const ConnectRight = () => {
  const [activeStep, setActiveStep] = useState(3)
  return (
    <div className="bg-white p-10 w-full h-full rounded-2xl font-inter tracking-[-0.02em] text-left">
      <h1 className="text-4xl leading-10 pb-3">
        Mint your identity and secure {` `}
        <span className="text-primary">your data!</span>
      </h1>
      <p className="font-inter text-left text-md leading-md text-gray-500 pb-5">
        You can use this NFT to sign data and be elgibile for more rewards.
      </p>
      <div className="relative">
        <ol className="relative text-gray-500">
          <div className="absolute h-1/2 w-0.5 bg-gray-200"></div>
          <li className="mb-10 ml-12">
            <span className="absolute flex items-center justify-center w-7 h-7 rounded-full -left-3 ring-4 ring-white bg-purple-500">
              <span className="text-white">1</span>
            </span>
            <h3 className="font-medium leading-tight text-gray-900">
              Connect your wallet
            </h3>
            <div className="ml-4 text-left">
              <p className="mt-1 text-sm text-gray-500">
                Connect with your tribe . Earn from your profile and connect
                different applications!
              </p>
              <div className="content-center w-full">
                <ConnectWallet
                  style={{ width: '100%', textAlign: 'center' }}
                  className="w-[200px]"
                />
              </div>
            </div>
          </li>
          <li className="mb-10 ml-12">
            <div
              className={`absolute left-0 h-1/2 border-l-2 ${
                activeStep >= 3 ? 'border-dashed' : 'border-solid'
              } border-gray-200`}
            ></div>
            <span className="absolute mt-3 -left-0 inline-flex items-center justify-center">
              <span className="absolute flex items-center justify-center w-8 h-8 rounded-full ring-4 ring-purple-100 bg-purple-100">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-500">
                  <span className="text-white">2</span>
                </span>
              </span>
            </span>
            <h3 className="font-medium text-black leading-tight">
              Set your privacy settings.
            </h3>
            <div className="ml-4 text-left">
              <div className="flex items-center mb-2 pt-2">
                <input
                  id="default-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500  focus:ring-2 "
                />
                <label
                  for="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-500 "
                >
                  Keep me Entirely Anonymous
                </label>
              </div>
              <div className="mt-2 space-y-2">
                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg grid grid-cols-2 dark:bg-[#363F72] dark:border-gray-600 dark:text-white">
                  <li className="w-full border-b border-gray-200 border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="profile-picture-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="profile-picture-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Profile Picture
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-b dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="username-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="username-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Username
                      </label>
                    </div>
                  </li>
                  <li className="w-full border-r dark:border-gray-600">
                    <div className="flex items-center ps-3">
                      <input
                        id="static-cards-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="static-cards-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Static Cards
                      </label>
                    </div>
                  </li>
                  <li className="w-full">
                    <div className="flex items-center ps-3">
                      <input
                        id="dynamic-cards-checkbox"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        for="dynamic-cards-checkbox"
                        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Dynamic Cards
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </li>

          <li className="ml-12">
            <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white bg-purple-100 text-purple-500">
              3
            </span>
            <h3 className="font-medium text-black leading-tight">
              Mint your data identity
            </h3>
            <div className="ml-4">
              <p className="text-sm">
                This ensures your data is safe, decentralised and owned by you!
              </p>
              <button className="px-4 py-2 w-full mt-4 font-semibold text-white bg-purple-500 rounded-md hover:bg-purple-600">
                Mint my data identity
              </button>
            </div>
          </li>
        </ol>
      </div>
    </div>
  )
}

const Settings = ({ user }: User) => {
  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.MINT)
  const [litInstance, setLitInstance] = useState<Lit | null>(null)
  const [encryptedData, setEncryptedData] = useState<any>(null)
  const [isDataUploaded, setIsDataUploaded] = useState<boolean>(false)

  useEffect(() => {
    const initializeLit = async () => {
      const lit = new Lit('ethereum')
      await lit.connect()
      setLitInstance(lit)
    }

    initializeLit()
  }, [])
  const accessControlConditions = [
    {
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: 'eth_getBalance',
      parameters: [':userAddress', 'latest'],
      returnValueTest: {
        comparator: '>=',
        value: '0' // 0.000001 ETH
      }
    }
  ]

  const clientId =
    process.env.VITE_KLEO_THIRDWEB_CLIENT_KEY ||
    '9af290ad929c4b6241475020bc16ab09'
  const contractAddress = process.env.VITE_CONTRACT_ADDR || ''
  const client = createThirdwebClient({
    clientId
  })

  const contract = getContract({
    client,
    chain: defineChain(10),
    address: contractAddress
  })

  const renderTabContent = () => {
    switch (selectedTab) {
      case TABS.MINT:
        return <Mint />
      default:
        return null
    }
  }
  const encryptData = async () => {
    if (litInstance) {
      const data = 'Hello, Lit!'
      const chain = 'ethereum'

      try {
        const encryptedResult = await litInstance.enryptString(
          data,
          chain,
          accessControlConditions
        )
        console.log('encryptedResult', encryptedResult)
        setEncryptedData(encryptedResult)
      } catch (error) {
        console.error('Error encrypting data:', error)
      }
    }
  }
  const getIrys = async (): Promise<Irys> => {
    const key = JSON.parse(fs.readFileSync('arweaveWallet.json').toString())

    const irys = new Irys({
      network: 'mainnet',
      token: 'arweave',
      key: key
    })

    console.log(irys)
    return irys
  }

  async function uploadToIrys(data: string): Promise<string> {
    const webIrys = await getIrys()

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

  return (
    <div className="bg-gray-50">
      <div className="w-full grid grid-cols-2 p-10 container mx-auto">
        <div className="place-self-end">
          {/* <button onClick={() => encryptData()}>Encryption Check</button> */}
          <MediaLeft />
        </div>
        <div className="pl-5">
          <ConnectRight />
        </div>
      </div>
    </div>
  )
}

export default Settings
