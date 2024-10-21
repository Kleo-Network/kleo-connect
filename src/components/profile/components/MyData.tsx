import Navbar, { PAGE_NAMES } from "./Navbar";

interface MyDataComponentProps { }

export const MyData = ({ }: MyDataComponentProps) => {
  const userAddress = localStorage.getItem('address');

  return <div className="bg-slate-100">
    <Navbar
      userAddress={userAddress || ''}
      page={PAGE_NAMES.MY_DATA}
    />
  </div>
}