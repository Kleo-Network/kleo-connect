import Navbar, { PAGE_NAMES } from '../../../common/components/Navbar'
import { ReactComponent as SpaceCat } from '../../../assets/myData/spaceCat.svg'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const MyData = () => {
  // --------------- Validate UserAddress Logic --------------- //
  const [userAddress, setUserAddress] = useState<string | null>(
    localStorage.getItem('address')
  )
  const [isKleoConnectReady, setIsKleoConnectReady] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkKleoConnect = () => {
      // Poll for the availability of window.kleoConnect
      if (window.kleoConnect) {
        setIsKleoConnectReady(true)
        console.log('kleoConnect is ready:', window.kleoConnect)

        // Assign signIn method if not already assigned
        if (!window.signIn && window.kleoConnect.signIn) {
          window.signIn = window.kleoConnect.signIn
        }
      } else {
        console.log('Waiting for kleoConnect...')
        setTimeout(checkKleoConnect, 100) // Poll every 100ms
      }
    }

    checkKleoConnect() // Start polling
  }, [])

  useEffect(() => {
    if (!isKleoConnectReady) return // Wait until kleoConnect is ready

    const validateAddresses = async () => {
      try {
        const pathname = window.location.pathname
        let urlAddress = pathname.split('/profile/')[1] // Address from URL
        urlAddress = String(userAddress).replace('/', '')
        const localStorageAddress = localStorage.getItem('address')

        // Call signIn to get the address from the extension
        if (!window.signIn) {
          throw new Error('Kleo sign in is unavailable')
        }
        const result = await window.signIn()
        const extensionAddress = result.address

        // Check if all three addresses match
        if (
          urlAddress !== localStorageAddress ||
          urlAddress !== extensionAddress ||
          localStorageAddress !== extensionAddress
        ) {
          navigate('/signup/0') // Redirect to signup if addresses don't match
        } else {
          setUserAddress(localStorageAddress)
        }
      } catch (error) {
        console.error('Error during signIn or address check:', error)
        navigate('/signup/0') // Redirect on error
      }
    }

    validateAddresses() // Call the validation function
  }, [isKleoConnectReady])

  // --------------- END: Validate UserAddress Logic --------------- //

  return (
    <div className="bg-slate-100">
      <Navbar userAddress={userAddress || ''} page={PAGE_NAMES.MY_DATA} />
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
          <div className="flex items-center justify-center w-full h-fit mb-4">
            <SpaceCat />
          </div>
          <h1 className="mb-4 text-3xl font-bold text-center text-[#1e2536]">
            Coming Soon...
          </h1>
          <p className="text-center text-gray-600">
            We're working hard to bring you something amazing. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  )
}
