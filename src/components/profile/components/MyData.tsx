import Navbar, { PAGE_NAMES } from "./Navbar";
import { ReactComponent as Clock } from '../../../assets/myData/clock.svg';

interface MyDataComponentProps { }

export const MyData = ({ }: MyDataComponentProps) => {
  const userAddress = localStorage.getItem('address');

  return <div className="bg-slate-100">
    <Navbar
      userAddress={userAddress || ''}
      page={PAGE_NAMES.MY_DATA}
    />
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-[#8257e6] rounded-full">
          <Clock className="w-8 h-8 text-white" />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-center text-[#1e2536]">Coming Soon...</h1>
        <p className="text-center text-gray-600">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
      </div>
    </div>
  </div>
}