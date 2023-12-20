import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as Kleo } from '../../../../assets/images/kleoWithBg.svg'
import { ReactComponent as MetaMaskLogo } from '../../../../assets/images/metamask.svg'
import { ReactComponent as Arrow } from '../../../../assets/images/arrow.svg'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'
import animationDataProcessing from '../../../../assets/images/welcome.json'
import Accordion from '../../../common/Accordion'
import useFetch, { FetchStatus } from '../../../common/hooks/useFetch'
import Alert from '../../../common/Alerts'
import { ReactComponent as AlertIcon } from '../../../../assets/images/alert.svg'
import { ethers, BrowserProvider } from 'ethers'
import { useAuthContext } from '../../../common/contexts/UserContext'
import { UserResponse } from './interface'
import Lottie from 'react-lottie'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationDataProcessing,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
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
const INVITE_CODE_API = 'auth/check_invite_code'
const GET_USER_API = 'auth/get_user'

export default function Onboarding({ handleLogin }: OnboardingProps) {
  const context = useAuthContext()
  const [infoExpanded, setInfoExpanded] = useState(false)
  const [pluginState, setPluginState] = useState(PluginState.CHECKING)
  const [currentStep, setCurrentStep] = useState(1)
  const [code, setCode] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [provider, setProvider] = useState<any>(null)
  const [signer, setSigner] = useState<any>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>('')

  const [message, setMessage] = useState<string>(
    'I am signing my one-time nonce: {nonce}'
  )
  const [signedData, setSignedData] = useState<{
    signature: Uint8Array
    publicKey: string
  }>()

  const { fetchData, error: loginError, data: loginData } = useFetch<any>()
  const { fetchData: fetchInviteCheck } = useFetch<any>()
  const {
    fetchData: fetchUser,
    status: fetchUserStatus,
    data: user
  } = useFetch<any>()
  const [login, setLogin] = useState(false)

  const connectMetaMask = async () => {
    if ((window as any).ethereum) {
      try {
        const newProvider = new BrowserProvider((window as any).ethereum)

        setProvider(newProvider)
        const newSigner = await newProvider.getSigner()
        setSigner(newSigner)
        const accounts = await newProvider.send('eth_requestAccounts', [])
        setAccount(accounts[0])
        const user: UserResponse = await fetchUserFromDB(accounts[0])
        setMessage((message) => message.replace('{nonce}', user.nonce))
        setIsWalletConnected(true)
      } catch (error) {
        console.error('Could not get accounts', error)
      }
    } else {
      console.error('Please install MetaMask!')
    }
  }

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

  const inviteCodeNextStep = async () => {
    const urlWithParams = `${INVITE_CODE_API}?code=${code}`
    fetchInviteCheck(urlWithParams, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      onSuccessfulFetch(data) {
        if (data.toString() === 'OK') setCurrentStep(2)
      }
    })
  }

  const checkKleo = async () => {
    if ((window as any).kleoConnect) {
      setPluginState(PluginState.INSTALLED)
    }
  }
  const handleSign = async (signup: boolean) => {
    try {
      if (message && signer) {
        console.log(signer)
        const signature = await signer.signMessage(message)
        console.log('signature', signature)
        if (account)
          setSignedData({
            signature: signature,
            publicKey: account
          })

        fetchData(AUTH_API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            signature: signature,
            publicAddress: account,
            chain: 'ethereum'
          }),
          onSuccessfulFetch(data) {
            sessionStorage.setItem('token', data.accessToken)
            sessionStorage.setItem('userAddress', account!)
            if (signup === true) {
              ;(window as any).kleoUploadHistory(account, data.accessToken)
            }
            setLogin(true)
            document.location = `/profile/${account}`
          }
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (pluginState === PluginState.CHECKING) {
      setTimeout(() => {
        if ((window as any).kleoConnect) {
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
      signedData &&
      signedData.publicKey &&
      login
    ) {
      handleLogin(account || '')
      const user = context!.user
      context?.setUser({
        ...user,
        address: account || '',
        userId: account || ''
      })
    }
  }, [pluginState, signedData, login])

  type SignMessageProps = {
    signup: boolean
  }

  const SignMessage: React.FC<SignMessageProps> = ({ signup }) => {
    return (
      <div className="w-full flex flex-col self-stretch">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to sign"
          className="p-2 border rounded mb-4  "
        />
        <button
          onClick={() => handleSign(signup)}
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
    )
  }

  return (
    <div className="flex flex-col items-start self-stretch">
      {currentStep == 1 && (
        <div className="flex flex-col gap-4 self-stretch flex-1">
          <div className="flex self-stretch flex-col items-center justify-center p-6 border bg-white shadow-lg border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">
              Already a member?
            </h3>
            <p className="text-sm font-regular text-gray-500">
              Launch the app directly
            </p>
            {!isWalletConnected ? (
              <button
                className="px-4 py-3 mt-3 bg-primary text-white rounded-lg shadow-lg"
                onClick={connectMetaMask}
              >
                {fetchUserStatus === FetchStatus.LOADING
                  ? 'Loading...'
                  : 'Connect Metamask'}
              </button>
            ) : (
              <SignMessage signup={false} />
            )}
          </div>
          <div className="flex self-stretch flex-col items-center justify-center border bg-white shadow-lg border-gray-200 rounded-lg">
            <div className="flex flex-col gap-2 p-6 text-lg w-full font-medium text-gray-900 ">
              Invite Only! Do you have the golden key?.
              <span className="text-gray-400 text-sm font-regular">
                STEP 1/2
              </span>
            </div>
            <div className="flex -mt-10 items-center justify-center self-stretch">
              <Lottie options={defaultOptions} height={'100%'} width={'70%'} />
            </div>
            <div className="flex flex-col gap-3 self-stretch px-6 pb-8 justify-center items-center">
              <input
                onChange={(e) => setCode(e.target.value)}
                type="text"
                className="w-full bg-white rounded-lg border border-gray-300 px-6 py-3 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary"
                placeholder="Enter your Invite Code here"
              />

              <button
                className="px-4 py-3 bg-primary text-white rounded-lg shadow"
                onClick={() => inviteCodeNextStep()}
              >
                Invite Code
              </button>
            </div>
          </div>
        </div>
      )}
      {currentStep == 2 && (
        <div className="flex flex-col items-start justify-center bg-white shadow-lg rounded-lg ">
          <div className="p-6 text-lg w-full font-medium text-gray-900 border-b  border-gray-200">
            Connect these to get started! <br />
            <span className="text-gray-400 text-sm font-regular">STEP 2/2</span>
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
                    onClick={() => {
                      // setPluginState(PluginState.INSTALLED)
                      window.open(
                        'https://chromewebstore.google.com/detail/kleo-connect/jimpblheogbjfgajkccdoehjfadmimoo?hl=en'
                      )
                    }}
                  >
                    Install Plugin
                  </button>
                  <button
                    className="px-4 py-3 ml-1 rounded-lg shadow border border-gray-200 text-gray-700"
                    onClick={() => checkKleo()}
                  >
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
              <MetaMaskLogo className="w-16 h-16 fill-[#FFE6D5]" />
            </div>
            {!isWalletConnected ? (
              <div className="flex flex-col items-start justify-center">
                <span className="text-gray-900 text-base font-medium">
                  Connect Metamask Wallet
                </span>
                <span className="text-gray-400 text-sm font-regular">
                  Connect with your Metamask wallet to get started
                </span>
                <div className="flex flex-row justify-start items-center mt-4 text-sm font-medium">
                  <button
                    disabled={fetchUserStatus === FetchStatus.LOADING}
                    className="px-4 py-3 bg-primary text-white rounded-lg shadow mr-1"
                    onClick={connectMetaMask}
                  >
                    {fetchUserStatus === FetchStatus.LOADING
                      ? 'Loading...'
                      : 'Connect'}
                  </button>
                </div>
              </div>
            ) : (
              <SignMessage signup={true} />
            )}
          </div>
          {loginError && (
            <div className="m-3">
              <Alert
                type="danger"
                message="Could not authenticate user, please try again later."
                icon={
                  <AlertIcon className="w-5 h-5 fill-red-200 stroke-red-600" />
                }
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
      )}
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
