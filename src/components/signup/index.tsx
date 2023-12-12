import Onboarding from '../profile/Onboarding/MetaMask'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()

  const handleLogin = (userAddress: string) => {
    console.log('logged in successfully')
    navigate('/profile/' + userAddress)
  }

  return (
    <div className="flex flex-col self-stretch flex-1 items-center justify-center py-12 px-6 md:px-32 lg:px-80 bg-gray-100 ">
      <Onboarding handleLogin={handleLogin} />
    </div>
  )
}

export default SignUp
