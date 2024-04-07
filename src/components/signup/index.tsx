import { UserData } from '../common/interface'
import Onboarding from '../profile/Onboarding/Authentication'
import { useNavigate } from 'react-router-dom'

interface SignupProps {
  user: UserData
  setUser: React.Dispatch<React.SetStateAction<UserData>>
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

const SignUp: React.FC<SignupProps> = ({ user, setUser, setIsLoggedIn }) => {
  const navigate = useNavigate()

  const handleLogin = (slug: string) => {
    setIsLoggedIn(true)
    navigate('/profileV2/' + slug)
  }

  return (
    <div className="flex flex-col self-stretch flex-1 items-center justify-center py-12 px-6 md:px-60 lg:px-96 bg-gray-100 ">
      <Onboarding handleLogin={handleLogin} user={user} setUser={setUser} />
    </div>
  )
}

export default SignUp
