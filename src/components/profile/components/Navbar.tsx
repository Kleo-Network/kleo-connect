import { useLocation, useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../../assets/images/nameLogo.svg'

export enum PAGE_NAMES {
  PROFILE = 'PROFILE',
  MY_DATA = 'MY_DATA'
}

interface NavbarProps {
  userAddress: string;
  page: PAGE_NAMES
}

const Navbar = ({ userAddress, page }: NavbarProps) => {
  const navigate = useNavigate();

  const getButtonClasses = (isActive: boolean) =>
    `py-2 px-4 rounded-lg font-medium transition duration-300 ${isActive
      ? 'bg-gray-800 text-white'
      : 'bg-[#f8f9fc] text-gray-700 hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <div className="w-full bg-[#f8f9fc] fixed z-10 shadow-md">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <Logo />
        <div className="flex space-x-6">
          <button
            className={getButtonClasses(page === PAGE_NAMES.PROFILE)}
            onClick={() => navigate(`/profile/${userAddress}`)}
          >
            Dashboard
          </button>
          <button
            className={getButtonClasses(page === PAGE_NAMES.MY_DATA)}
            onClick={() => navigate(`/my-data/${userAddress}`)}
          >
            My Data
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
