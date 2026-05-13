import Onboarding from './Onboarding/Authentication'

const SignUp = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full bg-gray-100">
      <div className="w-full bg-white h-[calc(100vh-5rem)] md:h-[calc(100vh-5rem)] lg:h-[calc(100vh-8rem)]">
        <Onboarding />
      </div>
    </div>
  )
}

export default SignUp
