import React, { useEffect, useState } from 'react'
import { ReactComponent as Kleo } from '../../../../assets/images/kleoWithBg.svg'
import { ReactComponent as Arrow } from '../../../../assets/images/arrow.svg'
import { ReactComponent as Tick } from '../../../../assets/images/check.svg'
import Accordion from '../../../common/Accordion'
import Alert from '../../../common/Alerts'
import { ReactComponent as AlertIcon } from '../../../../assets/images/alert.svg'
import { useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as MetamaskLogo } from '../../../../assets/images/metamask.svg'
import { ConnectWallet } from '@thirdweb-dev/react'

enum PluginState {
  CHECKING,
  NOT_INSTALLED,
  INSTALLED
}

export default function Onboarding({ handleLogin, user, setUser }: any) {
  const { step } = useParams()
  const [infoExpanded, setInfoExpanded] = useState(false)
  const [pluginState, setPluginState] = useState(PluginState.CHECKING)
  const [currentStep, setCurrentStep] = useState(parseInt(step || '0'))
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

  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-3xl">
      {currentStep == 0 && (
        <div className="flex flex-col items-start justify-center bg-white shadow-lg rounded-lg w-full max-w-3xl">
          <div className="p-6 text-lg w-full font-medium text-gray-900 border-b  border-gray-200 flex justify-center items-center">
            <div className="text-3xl font-shoreline md:text-3xl">login</div>
          </div>
          <div className="flex self-stretch w-full flex-col items-center justify-center p-6 border bg-white shadow-lg border-gray-200 rounded-lg">
            <p className="text-sm font-regular text-gray-500">
              Login to kleo network!
            </p>
          </div>
        </div>
      )}
      {currentStep == 1 && (
        <>
          <div className="flex flex-col items-start justify-center bg-white shadow-lg rounded-lg w-full">
            <div className="p-6 text-lg w-full font-medium text-gray-900 border-b  border-gray-200 flex justify-center items-center">
              <div className="text-3xl md:text-3xl">create account on kleo</div>
            </div>
            <div className="p-6 text-lg w-full font-medium text-gray-900 border-b  border-gray-200">
              Install Kleo and connect to get started! <br />
              <span className="text-gray-400 text-sm font-regular">
                KLEO is a{' '}
                <a
                  href="https://docs.vana.org/vana/core-concepts/network-overview/data-liquidity-layer"
                  target="_blank"
                >
                  <u> VANA DLP</u>
                </a>{' '}
                aimed at using chrome extension to help you own a piece of AI
                models
              </span>
            </div>
            <div className="flex">
              <div className="w-2/3">
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
                    {'metamask wallet connected?' && (
                      <div className="absolute bottom-0 left-auto right-0 top-auto z-10 rounded-full bg-green-600 p-1 border-4 border-white ">
                        <Tick className="w-3 h-3 fill-white" />
                      </div>
                    )}

                    <MetamaskLogo className="w-16 h-16" />
                  </div>
                  {!login && (
                    <div className="w-9/12">
                      <div className="flex items-start justify-between w-full">
                        <div className="flex flex-col items-start justify-center">
                          <span className="text-gray-900 text-base font-medium">
                            Connect Wallet
                          </span>
                          <span className="text-gray-400 text-sm font-regular">
                            To get started, we use Google Account or Email, this
                            will be default authentication
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-center mt-2 text-sm font-medium">
                        {pluginState == PluginState.INSTALLED ? (
                          <ConnectWallet
                            style={{ width: '100%', textAlign: 'center' }}
                            className="w-[200px]"
                          />
                        ) : (
                          <p className="mb-4">
                            Install Kleo Plugin to Create Account!
                          </p>
                        )}

                        <div className="relative w-full mt-2">
                          <div
                            className={`absolute bottom-2 left-auto right-3 top-auto z-10 rounded-full ${
                              login
                                ? 'bg-green-600 border-white'
                                : 'bg-gray-50 border-gray-50'
                            } p-1 border-4 border-white `}
                          >
                            <Tick
                              className={`w-3 h-3 ${
                                login ? 'fill-white' : 'fill-gray-50'
                              }`}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <button
                          disabled={!login}
                          className={`px-4 py-3 ${
                            login
                              ? 'bg-violet-800 text-white'
                              : 'bg-violet-400 text-white'
                          } rounded-lg shadow mx-auto block`}
                          onClick={
                            () => console.log('Kleo world')
                            // function which creates account by signing a transaction and posting to kleo backend api
                          }
                        >
                          Create Account
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-1/3 mt-5 pt-2 pl-5 pr-5 mb-10 border-l border-gray-300">
                <div className="flex flex-col items-start justify-center">
                  <div className="flex mb-20 flex-col items-start justify-center">
                    <span className="text-gray-900 text-base font-sm">
                      Extension Privacy
                    </span>
                    <span className="text-gray-400 text-sm font-regular">
                      Our{' '}
                      <a
                        className=""
                        target="_blank"
                        href="https://github.com/Kleo-Network/"
                      >
                        code
                      </a>{' '}
                      is open source, we want you to{' '}
                      <u className="text-gray-800">own</u> your data.
                    </span>
                  </div>
                  <div className="flex flex-col items-start justify-center">
                    <span className="text-gray-900 text-base font-sm">
                      Wallet Connect
                    </span>
                    <span className="text-gray-400 text-sm font-regular">
                      You will be eligible for{' '}
                      <u className="text-gray-800">10000 $VANA</u> by signing
                      the transaction
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
