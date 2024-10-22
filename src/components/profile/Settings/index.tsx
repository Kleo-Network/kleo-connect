import { useMemo, useState, useEffect } from 'react'
import { UserData } from '../../constants/SignupData'
import { ReactComponent as Explorer } from '../../../assets/images/claim.svg'
import { ReactComponent as ThirdParty } from '../../../assets/images/third.svg'
import { ReactComponent as Airdrop } from '../../../assets/images/airdrop.svg'
import useFetch from '../../common/hooks/useFetch'
import { fullUserData } from '../../common/interface'
import { contract_address, contractABI } from "../../contracts/mint";
import config from '../../common/config'

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
    <div className="relative">
      <div className="absolute bottom-[10%] left-[4%] z-50">
        <h1 className="text-white text-3xl">{titles[activeIndex]}</h1>

        <p
          className="text-gray-200"
          dangerouslySetInnerHTML={{ __html: description[activeIndex] }}
        ></p>
      </div>
      <div className="absolute bottom-[3%] left-[33%] z-50">
        <div
          key={`1`}
          className={`h-2 bg-white rounded-full mx-2 cursor-pointer active bg-white relative ${activeIndex == 0 ? 'w-14' : 'w-3 bg-opacity-50'
            }`}
          onClick={() => goToSlide(0)}
        ></div>
        <div
          key={`2`}
          className={`bottom-[8px] relative h-2 bg-white rounded-full ${activeIndex == 0 ? 'left-[63px]' : 'left-[18px]'
            } mx-2 cursor-pointer ${1 === activeIndex ? 'active bg-white w-14' : 'bg-opacity-50 w-3'
            }`}
          onClick={() => goToSlide(1)}
        ></div>
        <div
          key={`2`}
          className={` bottom-[16px] relative h-2 ${activeIndex == 2 ? 'left-[35px]' : 'left-[80px]'
            } bg-white rounded-full mx-2 cursor-pointer ${2 === activeIndex ? 'active bg-white w-14' : 'bg-opacity-50 w-3'
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
  const [settings, setSettings] = useState([false, false, false, false])
  const [keepAnonymous, setKeepAnonymous] = useState(false)

  const selectAll = () => {
    if (!keepAnonymous) {
      setKeepAnonymous(true);
      setSettings([true, true, true, true])
    }
    else {
      setKeepAnonymous(false);
      setSettings([false, false, false, false])
    }
  }

  const onChangeChecked = (index: number) => {
    const tempSettings = [...settings];
    console.log(tempSettings)
    tempSettings[index] = !settings[index];
    if (!tempSettings[index]) {
      setKeepAnonymous(false)
    }
    else {
      const allSelected = tempSettings.every(setting => setting)
      if (allSelected) {
        setKeepAnonymous(true)
      }
    }
    setSettings(tempSettings);
  }

  const [selectedTab, setSelectedTab] = useState<TABS>(TABS.MINT)
  const [encryptedData, setEncryptedData] = useState<any>(null)
  const [isDataUploaded, setIsDataUploaded] = useState<boolean>(false)


  const [userAddress, setUserAddress] = useState<string | undefined>(undefined);
  const address = "";

  useEffect(() => {
    setUserAddress(address);
  }, [address]);



  const { fetchData: fetchFullUserData } = useFetch<fullUserData>()

  const GET_USER_DATA = 'user/{slug}/published-cards/info'

  function makeSlugApiUrl(): string {
    return GET_USER_DATA.replace('{slug}', localStorage.getItem('slug') || '')
  }

  const handleMint = async () => {
    try {
      console.log("Starting handleMint");
      return new Promise<string>((resolve, reject) => {
        fetchFullUserData(makeSlugApiUrl(), {
          onSuccessfulFetch: async (data) => {
            if (data) {
              console.log("Fetched data:", data);
              try {
                const url = await uploadEncryptedData(data, settings);
                console.log("URL from uploadEncryptedData:", url);
                resolve(url);
              } catch (error) {
                console.error("Error in uploadEncryptedData:", error);
                reject(error);
              }
            } else {
              reject(new Error("No data fetched"));
            }
          }
        });
      });
    } catch (error) {
      console.error('Error in handleMint:', error);
      throw error;
    }
  };

  async function uploadEncryptedData(encryptedData: any, selectedFields: any) {
    try {
      console.log("hit api", config.decentralised_upload.host);
      const response = await fetch(config.decentralised_upload.host, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: encryptedData, selected: selectedFields }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(response);
      return result.url;
    } catch (error) {
      console.error('Error uploading encrypted data:', error);
      throw error;
    }
  }


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
            <span className={`absolute flex items-center justify-center w-7 h-7 rounded-full -left-3 ${userAddress === null ? 'border-dashed' : 'border-solid'} ring-4 ring-white bg-purple-500`}>
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

            </div>
          </li>


          <li className="ml-12">
            <span className="absolute flex items-center justify-center w-8 h-8 rounded-full -left-4 ring-4 ring-white bg-purple-100 text-purple-500">
              2
            </span>
            <h3 className="font-medium text-black leading-tight">
              Claim points
            </h3>
            <div className="ml-4">
              <p className="text-sm">
                This ensures your data is safe, decentralised and owned by you!
              </p>



            </div>
          </li>
        </ol>
      </div>
    </div>
  )
}

const Settings = ({ user }: User) => {


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
