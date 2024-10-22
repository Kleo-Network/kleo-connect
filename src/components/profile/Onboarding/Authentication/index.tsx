import React, { useEffect, useState } from 'react'
import { ReactComponent as Kleo } from '../../../../assets/images/kleoLogo.svg'
import { ReactComponent as Arrow } from '../../../../assets/images/arrow.svg'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'
import Alert from '../../../common/Alerts'
import { ReactComponent as AlertIcon } from '../../../../assets/images/alert.svg'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as MetamaskLogo } from '../../../../assets/images/metaMaskWithoutBg.svg'
import { MediaBanner } from '../Common/MediaBanner'
import useFetch from '../../../common/hooks/useFetch'
import { UserData } from '../../../constants/SignupData'

enum PluginState {
  CHECKING,
  NOT_INSTALLED,
  INSTALLED
}

export default function Onboarding({ handleLogin, user, setUser }: any) {
  const { step } = useParams()
  const [pluginState, setPluginState] = useState(PluginState.CHECKING)
  const [currentStep, setCurrentStep] = useState(parseInt(step || '0'))
  const [isCreatingAccount, setIsCreatingAccount] = useState(false)

  const [login, setLogin] = useState(false)
  const navigate = useNavigate()
  const walletAddress = ""

  const { fetchData: fetchCreateAndFetchUserData, data: userFromDB } =
    useFetch<UserData>()

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

  const handleUserLogin = async () => {
    const result = await (window as any).signIn();
    localStorage.setItem('address', result.address);
    localStorage.setItem('token', result.token);
    setLogin(true);
    navigate('/profile/' + result.address)
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full">
      {(currentStep == 1 || currentStep == 0) && (
        <>
          <div className="flex flex-row items-start justify-center px-2 py-2 bg-white shadow-lg rounded-lg w-full">
            <div className="w-full p-2 container mx-auto h-screen flex items-center justify-center">
              <div className="flex w-full h-full items-center justify-center">
                <div className="flex flex-col w-[493px]">
                  <div className="mb-[50px] text-lg w-full font-medium text-gray-900 border-gray-200 flex-col justify-center items-center">
                    <h1 className="text-4xl leading-10 pb-2">
                      Create Account To Get
                      <br /> Started On {` `}
                      <span className="text-primary">Kleo</span>
                    </h1>
                    <p className="font-inter text-left text-sm text-md leading-md text-gray-500 pb-5">
                      Install Kleo and connect to get started! KLEO is a{' '}
                      <a
                        href="https://docs.vana.org/vana/core-concepts/network-overview/data-liquidity-layer"
                        target="_blank"
                      >
                        <u> VANA DLP</u>
                      </a>{' '}
                      aimed <br />
                      at using chrome extension to help you own a piece of Al
                      models
                    </p>
                  </div>
                  <div className="flex flex-row items-start gap-4 mb-10">
                    <div className="bg-gray-100 p-4 rounded-2xl">
                      <Kleo className="w-11 h-11" />
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <div className="flex flex-row">
                        <div className="flex text-gray-700 text-base font-medium">
                          Install Kleo Plugin
                        </div>
                        {pluginState === PluginState.INSTALLED && (
                          <div className="flex ml-2 rounded-full bg-green-400 p-1 border-4 border-white">
                            <Tick className="w-3 h-3 fill-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex text-gray-500 text-sm font-regular">
                        Unlock insights, personalize your Browsing and safeguard
                        <br /> your privacy
                      </div>
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
                  <button
                    disabled={!walletAddress || isCreatingAccount}
                    className={`w-full py-3 ${walletAddress && !isCreatingAccount
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 text-gray-500'
                      } rounded-lg shadow mx-auto block`}
                    onClick={handleUserLogin}
                  >
                    {isCreatingAccount
                      ? 'Creating Account...'
                      : 'Sign In'}
                  </button>
                  {login && (
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
                </div>
              </div>
            </div>
          </div>
        </>
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
