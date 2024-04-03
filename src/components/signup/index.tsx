import { UserDataProps } from '../common/interface'
import Onboarding from '../profile/Onboarding/Authentication'
import { useNavigate } from 'react-router-dom'

const SignUp: React.FC<UserDataProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  const handleLogin = (slug: string) => {
    navigate('/profileV2/' + slug)
  }

  return (
    <div className="flex flex-col self-stretch flex-1 items-center justify-center py-12 px-6 md:px-60 lg:px-96 bg-gray-100 ">
      <Onboarding handleLogin={handleLogin} user={user} setUser={setUser} />
    </div>
  )
}

export default SignUp
