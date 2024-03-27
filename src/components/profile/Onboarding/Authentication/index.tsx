import React, { useContext, useEffect, useState } from 'react'
import { ReactComponent as Kleo } from '../../../../assets/images/kleoWithBg.svg'
import { ReactComponent as MetaMaskLogo } from '../../../../assets/images/solanaLogoMark.svg'
import { ReactComponent as Arrow } from '../../../../assets/images/arrow.svg'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'
import { ReactComponent as RightArrow } from '../../../../assets/images/arrow2.svg'
import animationDataProcessing from '../../../../assets/images/welcome.json'
import Accordion from '../../../common/Accordion'
import useFetch, { FetchStatus } from '../../../common/hooks/useFetch'
import Alert from '../../../common/Alerts'
import { ReactComponent as AlertIcon } from '../../../../assets/images/alert.svg'
import { ethers, BrowserProvider } from 'ethers'
import { useAuthContext } from '../../../common/contexts/UserContext'
import { UserResponse } from './interface'
import Lottie from 'react-lottie'
import { LoginButton } from '../Particle/LoginButton'
import { useParams } from 'react-router-dom'
import { isEVMProvider } from '@particle-network/connectors'
import { useAccountInfo } from '@particle-network/connectkit'
import { usePhantomWallet } from '../../../common/hooks/usePhantomWallet'
import { baseUrl } from '../../../common/hooks/useFetch'
import SelectCards from './SelectCards'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import CalendlyLogin from '../Connections/Calendly'
import GitHubSignIn from '../Connections/Github'
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
  const { step } = useParams()
  const { account, particleProvider } = useAccountInfo()
  const [infoExpanded, setInfoExpanded] = useState(false)
  const [pluginState, setPluginState] = useState(PluginState.CHECKING)
  const [currentStep, setCurrentStep] = useState(parseInt(step || '0'))
  const [code, setCode] = useState('')

  const [signedData, setSignedData] = useState<{
    signature: any
    publicKey: any
  } | null>(null)

  const { fetchData, error: loginError, data: loginData } = useFetch<any>()
  const { fetchData: fetchInviteCheck } = useFetch<any>()
  const {
    fetchData: fetchUser,
    status: fetchUserStatus,
    data: user
  } = useFetch<any>()

  const [login, setLogin] = useState(false)

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

  const handleGoogleLogin = (credentialResponse: any) => {
    // Get the Google Access Token from the credential response
    const accessToken = credentialResponse.access_token
    console.log(accessToken)
    // Send the Access Token to your server to authenticate and create an account
    // You can use an API call or any other method to communicate with your server
    // Example using fetch:
    // fetch('/api/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ accessToken })
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // Handle the server response
    //     console.log(data)
    //   })
    //   .catch((error) => {
    //     // Handle any errors
    //     console.error(error)
    //   })
  }

  return (
    <GoogleOAuthProvider clientId="236440189889-c391vfab4cpsqnep0lo31ndg8g8qmq25.apps.googleusercontent.com">
      <div className="flex flex-col items-center justify-center mx-auto max-w-3xl">
        {currentStep == 190 && (
          <div className="flex flex-col gap-4 self-stretch flex-1">
            <div className="flex self-stretch flex-col items-center justify-center border bg-white shadow-lg border-gray-200 rounded-lg">
              <div className="flex flex-col gap-2 p-6 text-lg w-full font-medium text-gray-900 ">
                Invite Only! Do you have the golden key?.
                <span className="text-gray-400 text-sm font-regular">
                  STEP 1/2
                </span>
              </div>
              <div className="flex -mt-10 items-center justify-center self-stretch">
                <Lottie
                  options={defaultOptions}
                  height={'100%'}
                  width={'70%'}
                />
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
                  onClick={() => console.log('enable onclick invite code')}
                >
                  Invite Code
                </button>
              </div>
            </div>
          </div>
        )}
        {currentStep == 0 && (
          <div className="flex flex-col items-start justify-center bg-white shadow-lg rounded-lg w-full max-w-3xl">
            <div className="p-6 text-lg w-full font-medium text-gray-900 border-b  border-gray-200 flex justify-center items-center">
              <div className="text-3xl font-shoreline md:text-3xl">login</div>
            </div>
            <div className="flex self-stretch w-full flex-col items-center justify-center p-6 border bg-white shadow-lg border-gray-200 rounded-lg">
              <p className="text-sm font-regular text-gray-500">
                Launch the app directly
              </p>
              {account}
              {!account ? (
                <LoginButton txt={'Login'} />
              ) : (
                <>Add Login Method here with google!</>
              )}
            </div>
          </div>
        )}
        {currentStep == 1 && (
          <>
            <div className="flex flex-col items-start justify-center bg-white shadow-lg rounded-lg w-full">
              <div className="p-6 text-lg w-full font-medium text-gray-900 border-b  border-gray-200 flex justify-center items-center">
                <div className="text-3xl font-shoreline md:text-3xl">
                  signup
                </div>
              </div>
              <div className="p-6 text-lg w-full font-medium text-gray-900 border-b  border-gray-200">
                Install Kleo and connect to get started! <br />
                <span className="text-gray-400 text-sm font-regular">
                  STEP 1/2
                </span>
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
                    Unlock insights, personalize your Browsing and safeguard
                    your privacy
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
                        onClick={() => location.reload()}
                      >
                        I have already installed
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-row items-start gap-4 p-6 w-full">
                <div className="relative">
                  {/* {pluginState === PluginState.NOT_INSTALLED && (
                    <div className="absolute bottom-0 left-auto right-0 top-auto z-10 rounded-full bg-green-600 p-1 border-4 border-white">
                      <Tick className="w-3 h-3 fill-white" />
                    </div>
                  )} */}

                  <MetaMaskLogo className="w-12 h-12" />
                </div>
                {!login && (
                  <div className="w-9/12">
                    <div className="flex items-start justify-between w-full">
                      <div className="flex flex-col items-start justify-center">
                        <span className="text-gray-900 text-base font-medium">
                          Create Account
                        </span>
                        <span className="text-gray-400 text-sm font-regular">
                          To get started, we use Google Account or Email, this
                          will be default authentication.
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center mt-2 text-sm font-medium">
                      {pluginState === PluginState.INSTALLED ? (
                        <GoogleLogin
                          onSuccess={handleGoogleLogin}
                          render={(renderProps: {
                            onClick:
                              | React.MouseEventHandler<HTMLButtonElement>
                              | undefined
                            disabled: boolean | undefined
                          }) => (
                            <button
                              onClick={renderProps.onClick}
                              disabled={renderProps.disabled}
                              style={{
                                backgroundColor: 'white',
                                color: 'rgba(0, 0, 0, 0.54)',
                                border: 'none',
                                borderRadius: '50%',
                                padding: '10px',
                                cursor: 'pointer',
                                marginBottom: '10px'
                              }}
                            >
                              <img
                                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                alt="Google logo"
                                style={{ width: '20px', height: '20px' }}
                              />
                            </button>
                          )}
                        />
                      ) : (
                        <p className="mb-4">
                          Install Kleo Plugin to Create Account!
                        </p>
                      )}

                      <div className="relative w-full">
                        <input
                          type="search"
                          id="location-search"
                          className="block ps-2 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-s-gray-200  dark:border-gray-300 dark:placeholder-gray-200 dark:text-gray-900 dark:focus:border-blue-500"
                          placeholder="Username"
                          required
                        />
                        <button
                          type="submit"
                          className="absolute top-0 end-0 h-full p-2.5 text-sm font-medium text-white bg-primary rounded-e-lg border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary dark:hover:bg-primary dark:focus:ring-primary-800"
                        >
                          <RightArrow />
                          <span className="sr-only">Search</span>
                        </button>
                      </div>
                    </div>
                    <div className="p-6">
                      <button
                        disabled
                        className="px-4 py-3 bg-gray-400 text-white rounded-lg shadow mx-auto block"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
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
          </>
        )}

        {currentStep == 2 && (
          <>
            <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg w-full">
              <div className="p-6 text-lg w-full font-medium text-gray-900 border-b border-gray-200 flex justify-center items-center">
                <div className="text-3xl font-shoreline md:text-3xl">
                  Signup
                </div>
              </div>
              <div className="p-6 text-lg w-full font-medium text-gray-900 border-b border-gray-200 text-left">
                Upload your profile picture and add a bio to complete the
                signup! <br />
                <span className="text-gray-400 text-sm font-regular">
                  STEP 2/2
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 w-full">
                <SelectCards />
                {/* <div className="flex flex-col items-center md:w-1/3">
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <img
                        id="profile-preview"
                        src={context!.user.avatar}
                        alt="Profile Preview"
                        className="w-16 h-16 rounded-full"
                      />
                      <span className="text-base text-gray-600 mt-2">
                        Click to upload image
                      </span>
                    </div>
                  </label>
                  <input type="file" id="profile-upload" className="hidden" />
                </div>
                <div className="md:w-1/3">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Bio:
                  </label>
                  <textarea
                    id="bio"
                    rows={4}
                    className="shadow-sm focus:ring-primary focus:border-primary mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                    placeholder="Tell us a bit about yourself..."
                  ></textarea>
                </div> */}
              </div>
              <div className="p-6">
                <button className="px-4 py-3 bg-primary text-white rounded-lg shadow mx-auto block">
                  Proceed to Step 3
                </button>
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
          </>
        )}
        {currentStep == 4 && (
          <div>
            <CalendlyLogin />
            <GitHubSignIn />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
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
