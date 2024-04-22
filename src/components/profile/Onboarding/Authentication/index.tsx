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
import Lottie from 'react-lottie'
import { useParams, useNavigate } from 'react-router-dom'
import SelectCards from './SelectCards'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import CalendlyLogin from '../Connections/Calendly'
import GitHubSignIn from '../Connections/Github'
//import InstagramConnect from '../Connections/Instagram'
//import LinkedInSignIn from '../Connections/LinkedIn'
import TwitterSignIn from '../Connections/Twitter'
import CityAutocomplete from '../Connections/Place'
import useDebounce from '../../../common/hooks/useDebounce'
import { SlugData, UserData } from '../../../constants/SignupData'
import TextComponent from '../Connections/Text'
import { StaticCard as StaticCardType } from '../../../common/interface'
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
  user: UserData
  setUser: React.Dispatch<React.SetStateAction<UserData>>
}

enum PluginState {
  CHECKING,
  NOT_INSTALLED,
  INSTALLED
}

export default function Onboarding({
  handleLogin,
  user,
  setUser
}: OnboardingProps) {
  const { step } = useParams()
  const [infoExpanded, setInfoExpanded] = useState(false)
  const [pluginState, setPluginState] = useState(PluginState.INSTALLED)
  const [currentStep, setCurrentStep] = useState(parseInt(step || '0'))
  const [code, setCode] = useState('')

  const [login, setLogin] = useState(false)

  // Var and methods for login step 0
  const USER_LOGIN_PATH = 'user/create-user'
  const handleUserLogin = (credentialResponse: any) => {
    const token = credentialResponse.credential
    console.log(token)
    fetchCreateAndFetchUserData(USER_LOGIN_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        signup: false,
        stage: 0,
        code: token
      }),
      onSuccessfulFetch: (data) => {
        if (data?.slug) {
          localStorage.setItem('slug', data.slug)
        }
        if (data?.token) {
          setLogin(true)
          localStorage.setItem('token', data.token)
        } else {
          window.alert('Error while creating user')
        }
      }
    })
  }

  // Var and methods for signup step 1

  const CHECK_SLUG_FOR_USER = 'user/check_slug?slug={slug}'
  const CREATE_USER_FOR_KLEO = 'user/create-user'
  const navigate = useNavigate()
  const [userSlug, setUserSlug] = useState('')
  const [isSlugAvailable, setIsSlugAvailable] = useState(false)
  const debouncedIsSlugAvailableTerm = useDebounce(userSlug, 500)
  const { fetchData: fetchSlugAvaibility } = useFetch<SlugData>()
  const { fetchData: fetchCreateAndFetchUserData, data: userFromDB } =
    useFetch<UserData>()

  const { fetchData: fetchUser, data: userDataFromDB } = useFetch<UserData>()

  const [userGoogleToken, setUserGoogleToken] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [createdStaticCards, setCreatedStaticCards] =
    useState<StaticCardType[]>()
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setUserSlug(value)

    // Check if the length of the input is greater than or equal to 4
    if (value.length < 4) {
      setIsSlugAvailable(false)
    }
  }

  useEffect(() => {
    const checkSlugAvaibility = async () => {
      if (userSlug.length < 4) {
        setIsSlugAvailable(false)
      } else {
        fetchSlugAvaibility(makeSlugApiUrl(), {
          onSuccessfulFetch(data) {
            if (data) {
              setIsSlugAvailable(data.result)
            }
          }
        })
      }
    }

    if (debouncedIsSlugAvailableTerm !== '') {
      checkSlugAvaibility()
    }
  }, [debouncedIsSlugAvailableTerm])

  function makeSlugApiUrl(): string {
    return CHECK_SLUG_FOR_USER.replace('{slug}', userSlug)
  }

  const handleUserCreation = (slug: string, token: string) => {
    fetchCreateAndFetchUserData(CREATE_USER_FOR_KLEO, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        signup: true,
        stage: 1,
        slug: slug,
        code: token
      }),
      onSuccessfulFetch: (data) => {
        if (data?.slug) {
          localStorage.setItem('slug', data.slug)
        }
        if (data?.token) {
          localStorage.setItem('token', data.token)
          ;(window as any).kleoUploadHistory(data.slug, data.token)
          alert('upload called?')
          setCurrentStep(currentStep + 1)
          setIsSignUp(true)
          navigate('/signup/' + (currentStep + 1))
        } else {
          window.alert('Error while creating user')
        }
      }
    })
  }

  const handleGoogleSignUp = (credentialResponse: any) => {
    // Get the Google Access Token from the credential response
    const accessToken = credentialResponse.credential
    setUserGoogleToken(accessToken)
  }

  // Var and methods for signup step 2
  const UPDATE_USER_SETTING = 'user/update-settings/{slug}'
  const [externalToolArray, setExternalToolArray] = useState<string[]>([])
  const [userBio, setUserBio] = useState('')
  const { fetchData: UpdateUserData } = useFetch<UserData>()

  const handleUserUpdation = (cards: string[]) => {
    sessionStorage.setItem('externalTools', JSON.stringify(cards))
    UpdateUserData(makeUserUpdationUrl(UPDATE_USER_SETTING), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        stage: 3,
        about: '',
        settings: {
          static_cards: cards
        }
      }),
      onSuccessfulFetch: () => {
        setCurrentStep(currentStep + 2)
        navigate('/signup/' + (currentStep + 2))
      }
    })
  }

  function makeUserUpdationUrl(slug_string: string): string {
    const slug = localStorage.getItem('slug') || ''
    return slug_string.replace('{slug}', slug)
  }

  //const [isTextCardCreated, setIsTextCardCreated] = useState(false)
  const CREATE_TEXT_CARD = 'cards/static/{slug}'
  const { error, fetchData: createTextCard } = useFetch()
  const { fetchData: CreatePlaceCard } = useFetch<any>()
  const [city, setCity] = useState('')
  const [cordinates, setCordinates] = useState()
  const [step4button, setStep4Button] = useState(false)
  const handleButtonClickStep4 = () => {
    if (userBio.trim() !== '') {
      createTextCard(makeUserUpdationUrl(CREATE_TEXT_CARD), {
        method: 'POST',
        body: JSON.stringify({
          card: {
            type: 'TextCard',
            metadata: {
              text: userBio
            }
          }
        }),
        headers: {
          'Content-Type': 'application/json'
        },
        onSuccessfulFetch: () => {
          console.log('text card created success!')
        }
      })
      if (externalToolArray.includes('Pin Location')) {
        CreatePlaceCard(makeUserUpdationUrl(CREATE_TEXT_CARD), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            card: {
              type: 'PlaceCard',
              metadata: {
                cordinates: cordinates,
                location: city
              }
            }
          }),
          onSuccessfulFetch: () => {
            console.log('successfull place card created')
          }
        })
      }
      setStep4Button(true)
      navigate(`/profilev2/${localStorage.getItem('slug')}`)
    } else {
      alert('Please enter some text')
    }
  }

  const GET_STATIC_CARDS = 'cards/static/{slug}'
  const { error: _errorstatic, fetchData: fetchStaticCards } = useFetch()
  const GET_USER_API = 'user/get-user/{slug}'
  useEffect(() => {
    if (step == '4') {
      fetchUser(makeUserUpdationUrl(GET_USER_API), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        onSuccessfulFetch: (data) => {
          console.log('user data', data?.settings?.static_cards)
          setExternalToolArray(data?.settings?.static_cards)
        }
      })

      fetchStaticCards(makeUserUpdationUrl(GET_STATIC_CARDS), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        onSuccessfulFetch: (data) => {
          console.log('static cards', data)
          setCreatedStaticCards(data as StaticCardType[])
        }
      })
    }
  }, [])
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
    if (login) {
      setUser({
        about: userFromDB?.about || '',
        badges: userFromDB?.badges || [],
        content_tags: userFromDB?.content_tags || [],
        identity_tags: userFromDB?.identity_tags || [],
        last_attested:
          userFromDB?.last_attested || Math.floor(Date.now() / 1000),
        last_cards_marked:
          userFromDB?.last_cards_marked || Math.floor(Date.now() / 1000),
        name: userFromDB?.name || '',
        pfp: userFromDB?.pfp || '',
        profile_metadata: userFromDB?.profile_metadata || {},
        settings: userFromDB?.settings || {},
        slug: userFromDB?.slug || '',
        stage: userFromDB?.stage || 1,
        verified: userFromDB?.verified || false,
        email: userFromDB?.email || '',
        token: userFromDB?.token || ''
      })
      handleLogin(user?.slug || '')
    }
  }, [isSignUp, login])

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
                Login to kleo network!
              </p>
              <GoogleLogin
                onSuccess={handleUserLogin}
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
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                      alt="Google logo"
                      style={{ width: '20px', height: '20px' }}
                    />
                  </button>
                )}
              />
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
                  STEP 1/3
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
                      {userGoogleToken.length > 0 && (
                        <div className="absolute  top-[33px]  left-[30px]  z-10 rounded-full bg-green-600 p-1 border-4 border-white">
                          <Tick className="w-3 h-3 fill-white" />
                        </div>
                      )}

                      {/* <MetaMaskLogo className="w-12 h-12" /> */}
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                        alt="Google logo"
                        style={{ width: '48px', height: '48px' }}
                      />
                    </div>
                    {!login && (
                      <div className="w-9/12">
                        <div className="flex items-start justify-between w-full">
                          <div className="flex flex-col items-start justify-center">
                            <span className="text-gray-900 text-base font-medium">
                              Create Account
                            </span>
                            <span className="text-gray-400 text-sm font-regular">
                              To get started, we use Google Account or Email,
                              this will be default authentication
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-center mt-2 text-sm font-medium">
                          {pluginState == PluginState.INSTALLED ? (
                            <GoogleLogin
                              onSuccess={handleGoogleSignUp}
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
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
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

                          <div className="relative w-full mt-2">
                            <input
                              type="search"
                              id="location-search"
                              className="block ps-2 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg appearance-none"
                              placeholder="Enter username"
                              value={userSlug}
                              onChange={handleInputChange}
                              disabled={userGoogleToken.length <= 0}
                              required
                            />
                            <div
                              className={`absolute bottom-2 left-auto right-3 top-auto z-10 rounded-full ${
                                isSlugAvailable
                                  ? 'bg-green-600 border-white'
                                  : 'bg-gray-50 border-gray-50'
                              } p-1 border-4 border-white `}
                            >
                              <Tick
                                className={`w-3 h-3 ${
                                  isSlugAvailable
                                    ? 'fill-white'
                                    : 'fill-gray-50'
                                }`}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="p-6">
                          <button
                            disabled={
                              !isSlugAvailable || userGoogleToken.length <= 0
                            }
                            className={`px-4 py-3 ${
                              isSlugAvailable && userGoogleToken.length > 0
                                ? 'bg-violet-800 text-white'
                                : 'bg-violet-400 text-white'
                            } rounded-lg shadow mx-auto block`}
                            onClick={() =>
                              handleUserCreation(userSlug, userGoogleToken)
                            }
                          >
                            Next Step
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
                        <u className="text-gray-800">own</u> your data. Learn
                        how to self host your backend.
                      </span>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-gray-900 text-base font-sm">
                        Google Account
                      </span>
                      <span className="text-gray-400 text-sm font-regular">
                        We only fetch{' '}
                        <u className="text-gray-800">
                          email, profile picture, name
                        </u>{' '}
                        from your google account.
                      </span>
                    </div>
                  </div>
                </div>
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
                How about some static cards to liven up your profile? <br />
                <span className="text-gray-400 text-sm font-regular">
                  STEP 2/3
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-6 w-full">
                <div className="w-2/3">
                  <SelectCards
                    selectedButtons={externalToolArray}
                    setSelectedButtons={setExternalToolArray}
                  />
                </div>
                <div className="w-1/3 mt-5 pt-2 pl-5 pr-5 mb-5 border-l border-gray-300">
                  <div className="flex flex-col items-start justify-center">
                    <div className="flex mb-20 flex-col items-start justify-center">
                      <span className="text-gray-900 text-base font-sm">
                        Static Cards
                      </span>
                      <span className="text-gray-400 text-sm font-regular">
                        You need to{' '}
                        <u className="text-gray-800 bold">
                          select 2 cards from 4
                        </u>{' '}
                        that you think will be relevant for your profile.
                      </span>
                    </div>
                    <div className="flex flex-col items-start justify-center">
                      <span className="text-gray-900 text-base font-sm">
                        What to choose?
                      </span>
                      <span className="text-gray-400 text-sm font-regular">
                        Select the cards that define you, this information will
                        go {` `}
                        <u className="text-gray-800">on chain</u>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-2 pb-5">
                <button
                  className="px-4 py-3 bg-primary text-white rounded-lg shadow mx-auto block"
                  onClick={() => handleUserUpdation(externalToolArray)}
                >
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
          <>
            <div className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg w-full">
              <div className="p-6 text-lg w-full font-medium text-gray-900 border-b border-gray-200 flex justify-center items-center">
                <div className="text-3xl font-shoreline md:text-3xl">
                  Signup
                </div>
              </div>
              <div className="p-6 text-lg w-full font-medium text-gray-900 border-b border-gray-200 text-left">
                How about some static cards to liven up your profile? <br />
                <span className="text-gray-400 text-sm font-regular">
                  STEP 2/3
                </span>
              </div>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
                <div className="w-full pl-10 pr-10">
                  {externalToolArray.includes('Calendly') && (
                    <CalendlyLogin cards={createdStaticCards} />
                  )}
                  {externalToolArray.includes('Github Graph') && (
                    <GitHubSignIn cards={createdStaticCards} />
                  )}
                  {externalToolArray.includes('Pin Location') && (
                    <CityAutocomplete
                      city={city}
                      setCity={setCity}
                      cordinates={cordinates}
                      setCordinates={setCordinates}
                      cards={createdStaticCards}
                    />
                  )}
                  {externalToolArray.includes('Twitter Profile') && (
                    <TwitterSignIn cards={createdStaticCards} />
                  )}
                  <TextComponent about={userBio} setAbout={setUserBio} />
                </div>
              </div>
              <div className="p-2 pb-5">
                <button
                  className={`px-4 py-3 ${
                    step4button ? 'bg-primary' : 'bg-gray-400'
                  } text-white rounded-lg shadow mx-auto block`}
                  onClick={() => handleButtonClickStep4()}
                >
                  Create Profile & Take Me to it!
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
