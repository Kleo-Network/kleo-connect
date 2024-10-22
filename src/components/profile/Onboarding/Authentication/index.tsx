import React, { useEffect, useState } from 'react'
import { ReactComponent as Kleo } from '../../../../assets/images/kleoLogo.svg'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'
import Alert from '../../../common/Alerts'
import { ReactComponent as AlertIcon } from '../../../../assets/images/alert.svg'
import { useNavigate } from 'react-router-dom'
import useFetch from '../../../common/hooks/useFetch'
import { UserData } from '../../../constants/SignupData'

enum PluginState {
  CHECKING,
  NOT_INSTALLED,
  INSTALLED
}

export default function Onboarding({ handleLogin, user, setUser }: any) {
  const [pluginState, setPluginState] = useState(PluginState.CHECKING)
  const [login, setLogin] = useState(false)
  const navigate = useNavigate()

  const { fetchData: fetchCreateAndFetchUserData, data: userFromDB } =
    useFetch<UserData>()

  useEffect(() => {
    if (pluginState === PluginState.CHECKING) {
      setTimeout(() => {
        // Check if plugin (kleoConnect) is installed
        if ((window as any).kleoConnect) {
          setPluginState(PluginState.INSTALLED)
        } else {
          setPluginState(PluginState.NOT_INSTALLED)
        }
      }, 2000)
    }
  }, [pluginState])

  // Handle user login when Sign In button is clicked
  const handleUserLogin = async () => {
    const result = await (window as any).signIn()
    localStorage.setItem('address', result.address)
    localStorage.setItem('token', result.token)
    setLogin(true)
    navigate('/profile/' + result.address)
  }

  return (
    <div className="flex flex-col items-center justify-center mx-auto w-full">
      {/* Main container for content */}
      <div className="flex flex-row items-start justify-center px-2 py-2 bg-white shadow-lg rounded-lg w-full">
        <div className="w-full p-2 container mx-auto h-screen flex items-center justify-center">
          <div className="flex w-full h-full items-center justify-center">
            <div className="flex flex-col w-[493px]">
              {/* Heading section */}
              <div className="mb-[50px] text-lg w-full font-medium text-gray-900 border-gray-200 flex-col justify-center items-center">
                <h1 className="text-4xl leading-10 pb-2">
                  Create Account To Get
                  <br /> Started On
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
                  at using chrome extension to help you own a piece of AI
                  models.
                </p>
              </div>

              {/* Plugin installation check section */}
              <div className="flex flex-row items-start gap-4 mb-10">
                <div className="bg-gray-100 p-4 rounded-2xl">
                  <Kleo className="w-11 h-11" />
                </div>
                <div className="flex flex-col items-start justify-center">
                  <div className="flex flex-row">
                    <div className="flex text-gray-700 text-base font-medium">
                      Install Kleo Plugin
                    </div>
                    {/* Show tick icon if plugin is installed */}
                    {pluginState === PluginState.INSTALLED && (
                      <div className="flex ml-2 rounded-full bg-green-400 p-1 border-4 border-white">
                        <Tick className="w-3 h-3 fill-white" />
                      </div>
                    )}
                  </div>
                  <div className="flex text-gray-500 text-sm font-regular">
                    Unlock insights, personalize your browsing and safeguard
                    <br /> your privacy.
                  </div>
                  {/* Show loader while plugin check is in progress */}
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
                  {/* Buttons to install plugin or reload page */}
                  {pluginState === PluginState.NOT_INSTALLED && (
                    <div className="flex flex-row justify-start items-center mt-4 text-sm font-medium">
                      <button
                        className="px-4 py-3 bg-primary text-white rounded-lg shadow mr-1"
                        onClick={() => {
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

              {/* Sign In button - disabled if plugin is not installed */}
              <button
                disabled={pluginState !== PluginState.INSTALLED}
                className={`w-full py-3 ${pluginState === PluginState.INSTALLED
                  ? 'bg-violet-600 text-white'
                  : 'bg-gray-100 text-gray-500'
                  } rounded-lg shadow mx-auto block`}
                onClick={handleUserLogin}
              >
                Sign In
              </button>

              {/* Show error message if login fails */}
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
    </div>
  )
}
