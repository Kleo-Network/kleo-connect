import Onboarding from './Onboarding/Authentication'
import { useNavigate } from 'react-router-dom'

interface SignupProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const SignUp: React.FC<SignupProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate()

  const handleLogin = (slug: string) => {
    setIsLoggedIn(true)
    navigate('/profile/' + slug)
  }

  return (
    <div className="flex flex-col items-center justify-start w-full bg-gray-100">
      <div className="w-full bg-white h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] lg:h-[calc(100vh-8rem)]">
        <Onboarding handleLogin={handleLogin} />
      </div>
    </div>
  )
}

export default SignUp
