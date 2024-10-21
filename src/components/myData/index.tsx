import Navbar, { PAGE_NAMES } from "../profile/components/Navbar";

export const MyData = () => {
  const userAddress = localStorage.getItem('address');

  return <div className="bg-slate-100">
    <Navbar userAddress={userAddress || ''} page={PAGE_NAMES.MY_DATA} />

  </div>
}