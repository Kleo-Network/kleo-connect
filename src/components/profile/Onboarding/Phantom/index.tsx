import React, { useEffect, useState } from 'react'
import { ReactComponent as Kleo } from '../../../../assets/images/kleoWithBg.svg'

import { ReactComponent as PhantomLogo } from '../../../../assets/images/phantom.svg'
import { ReactComponent as Arrow } from '../../../../assets/images/arrow.svg'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'
import Accordion from '../../../common/Accordion'
import useFetch from '../../../common/hooks/useFetch'
import { usePhantomWallet } from '../../../common/hooks/usePhantomWallet'
import { PublicKey } from '@solana/web3.js'
import Alert from '../../../common/Alerts'
import { ReactComponent as AlertIcon } from '../../../../assets/images/alert.svg'

interface UserResponse {
  gitcoin_passport: boolean
  id: string
  nonce: string
}

interface OnboardingProps {
  handleLogin: (userAddress: string) => void
}

enum PluginState {
  CHECKING,
  NOT_INSTALLED,
  INSTALLED
}

const AUTH_API = 'auth/create_jwt_authentication'
const GET_USER_API = 'auth/get_user'

export default function Onboarding({ handleLogin }: OnboardingProps) {
  const [infoExpanded, setInfoExpanded] = useState(false)
  const [pluginState, setPluginState] = useState(PluginState.CHECKING)
  const {
    connected: isWalletConnected,
    connect,
    signMessage,
    publicKey
  } = usePhantomWallet()

  const [message, setMessage] = useState<string>(
    'I am signing my one-time nonce: {nonce}'
  )
  const [signedData, setSignedData] = useState<{
    signature: Uint8Array
    publicKey: PublicKey
  } | null>(null)
  const { fetchData, error: loginError, data: loginData } = useFetch<any>()
  const [login, setLogin] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const { fetchData: fetchInviteCheck } = useFetch<any>()

  const fetchUserFromDB = async (address: string): Promise<UserResponse> => {
    return new Promise<UserResponse>((resolve) => {
      fetchInviteCheck(GET_USER_API, {
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

  const connectPhantom = async () => {
    const connection = await connect()
    console.log('conn', connection)
    const user: UserResponse = await fetchUserFromDB(
      publicKey?.toString() || ''
    )
    setMessage((message) => message.replace('{nonce}', user.nonce))
  }
  const handleSign = async (signup: boolean) => {
    if (message) {
      const result = await signMessage(message)
      setSignedData(result)
      setAccount(result.publicKey.toString())
      fetchData(AUTH_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signature: Array.from(result.signature),
          publicAddress: result.publicKey.toString(),
          chain: 'solana'
        }),
        onSuccessfulFetch(data) {
          sessionStorage.setItem('token', data.accessToken)

          if (signup === true) {
            ;(window as any).kleoUploadHistory(account, data.accessToken)
          }
          setLogin(true)
        }
      })
    }
  }

  useEffect(() => {
    if (pluginState === PluginState.CHECKING) {
      setTimeout(() => {
        if (
          (window as any).kleoConnect &&
          (window as any).kleoConnect.extension
        ) {
          setPluginState(PluginState.INSTALLED)
        } else {
          setPluginState(PluginState.NOT_INSTALLED)
        }
      }, 2000)
    }
  }, [])

  useEffect(() => {
    if (
      pluginState === PluginState.INSTALLED &&
      isWalletConnected &&
      signedData &&
      signedData.publicKey &&
      login
    ) {
      handleLogin(account || '')
    }
  }, [pluginState, isWalletConnected, signedData, login])

  return (
    <div className="flex flex-col items-start">
      <div className="p-6 text-lg w-full font-medium text-gray-900 border-b border-gray-200">
        Connect these to get started!
      </div>
      <div className="flex flex-row items-start gap-4 p-6">
        <div className="relative">
          {pluginState === PluginState.INSTALLED && (
            <div className="absolute bottom-0 left-auto right-0 top-auto z-10 rounded-full bg-green-600 p-1 border-4 border-white ">
              <Tick className="w-3 h-3 fill-white" />
            </div>
          )}

          <Kleo className="w-16 h-16" />
        </div>
        <div className="flex flex-col items-start justify-center">
          <span className="text-gray-900 text-base font-medium">
            Install Kleo Plugin
          </span>
          <span className="text-gray-400 text-sm font-regular">
            Unlock insights, personalize your Browsing and safeguard your
            privacy
          </span>
          {pluginState === PluginState.CHECKING && (
            <div
              className="inline-block m-1 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          )}
          {pluginState === PluginState.NOT_INSTALLED && (
            <div className="flex flex-row justify-start items-center mt-4 text-sm font-medium">
              <button
                className="px-4 py-3 bg-primary text-white rounded-lg shadow mr-1"
                onClick={() => setPluginState(PluginState.INSTALLED)}
              >
                Install Plugin
              </button>
              <button className="px-4 py-3 ml-1 rounded-lg shadow border border-gray-200 text-gray-700">
                I have already installed
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row items-start gap-4 p-6">
        <div className="relative">
          {isWalletConnected && (
            <div className="absolute bottom-0 left-auto right-0 top-auto z-10 rounded-full bg-green-600 p-1 border-4 border-white">
              <Tick className="w-3 h-3 fill-white" />
            </div>
          )}
          <PhantomLogo className="w-16 h-16 fill-[#ab9ff2]" />
        </div>
        {!isWalletConnected ? (
          <div className="flex flex-col items-start justify-center">
            <span className="text-gray-900 text-base font-medium">
              Connect Phantom Wallet
            </span>
            <span className="text-gray-400 text-sm font-regular">
              Connect with your Phantom wallet to get started
            </span>
            <div className="flex flex-row justify-start items-center mt-4 text-sm font-medium">
              <button
                className="px-4 py-3 bg-primary text-white rounded-lg shadow mr-1"
                onClick={connectPhantom}
              >
                Connect
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message to sign"
              className="p-2 border rounded mb-4"
            />
            <button
              onClick={() => handleSign(true)}
              className="px-4 py-2 bg-primary text-white rounded mb-4"
            >
              Sign Message
            </button>
            {signedData && (
              <div className="bg-white p-2 rounded">
                {/* <p className="mb-2 font-semibold">Signature:</p> 
                 <code className="text-sm bg-gray-200 p-2 rounded">
                  {Array.from(signedData.signature).join(', ')}
                </code> */}
                <p className="mt-4 mb-2 font-semibold">Public Key:</p>
                <code className="text-sm bg-gray-200 p-2 rounded">
                  {signedData.publicKey.toString()}
                </code>
              </div>
            )}
          </div>
        )}
      </div>
      {loginError && (
        <div className="m-3">
          <Alert
            type="danger"
            message="Could not authenticate user, please try again later."
            icon={<AlertIcon className="w-5 h-5 fill-red-200 stroke-red-600" />}
          />
        </div>
      )}
      <div className="p-6 border-t border-gray-200 w-full">
        <Accordion
          expanded={infoExpanded}
          setExpanded={setInfoExpanded}
          header={accordionHeader(infoExpanded)}
          body={accordionBody()}
        />
      </div>
    </div>
  )
}

const accordionHeader = (expanded: boolean) => {
  return (
    <div className="flex flex-row justify-between items-center">
      <span className="text-gray-900 text-sm font-medium">
        Why should I install Kleo Plugin?
      </span>
      <div className="text-gray-400 text-sm font-regular">
        {expanded ? (
          <Arrow className="w-5 h-5" />
        ) : (
          <Arrow className=" w-5 h-5transform rotate-180" />
        )}
      </div>
    </div>
  )
}

const accordionBody = () => {
  return (
    <div className="flex flex-col items-start justify-center">
      <div className="flex flex-col justify-start items-start mt-4 text-sm font-regular">
        <div>
          <span className="text-gray-900">In-Depth Insights : </span>
          <span className="text-gray-400">
            Gain a deep understanding of your online activities and habits for
            better decision-making.
          </span>
        </div>
        <div>
          <span className="text-gray-900">Tailored Recommendations : </span>
          <span className="text-gray-400">
            Receive personalized recommendations to enhance your online
            experience.
          </span>
        </div>
        <div>
          <span className="text-gray-900"> Privacy Assurance : </span>
          <span className="text-gray-400">
            Rest assured, your data remains private and secure while using KLEO.
          </span>
        </div>
        <div>
          <span className="text-gray-900"> User-Friendly Interface :</span>
          <span className="text-gray-400">
            Enjoy a seamless, intuitive experience in exploring your browsing
            data.
          </span>
        </div>
        <div>
          <span className="text-gray-900">Productivity Enhancement : </span>
          <span className="text-gray-400">
            Optimize your online time and boost productivity with KLEO's
            insights.
          </span>
        </div>
      </div>
    </div>
  )
}
