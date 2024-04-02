import Onboarding from '../profile/Onboarding/Authentication'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../common/contexts/UserContext'

const SignUp = () => {
  const navigate = useNavigate()
  const context = useAuthContext()

  const handleLogin = (slug: string) => {
    console.log('logged in successfully')
    navigate('/profilev3/' + slug)
  }

  return (
    <div className="flex flex-col self-stretch flex-1 items-center justify-center py-12 px-6 md:px-60 lg:px-96 bg-gray-100 ">
      <Onboarding handleLogin={handleLogin} />
    </div>
  )
}

export default SignUp
