import React from 'react';
import { Link } from 'react-router-dom';
import { MdHomeWork,MdDashboard,MdBookmarkAdded,MdLogout,MdDataThresholding } from "react-icons/md";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const staffs=useSelector((state)=>state.staff)
  const handleLogout=()=>{
    localStorage.removeItem('stafftoken')
  }
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white  min-h-screen">
        {/* Logo */}
        <div className="p-6">
      
          <h1 className="text-2xl font-bold">Staff Dasboard</h1>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col p-4">
          <Link to="/staffhome" className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"><span className='inline-block'><MdDashboard/></span>Dashboard</Link>
          <Link to="/staffresorts" className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"><span className='inline-block'><MdHomeWork /></span> Resort</Link>
          <Link to="/staffadventure" className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"><span className='inline-block'><MdDataThresholding/></span>Adventure</Link>
          <Link to="/bookings" className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"><span className='inline-block'><MdBookmarkAdded/></span>Booking</Link>
          {staffs.name?(
            <>
            <div className='dropdown dropdown-hover'>
            <label tabIndex={0} className="py-2 px-4"><span className='hover:text-white-300'>{staffs.name}</span></label>
            <ul tabIndex={0} className="dropdown-content menu shadow w-22 bg-slate-900">
            <li className=''><a>Profile</a></li>
            <Link to='/stafflogin'><a onClick={handleLogout} className="py-2 px-4 text-gray-400 hover:text-white hover:bg-gray-700"><span className='inline-block'><MdLogout /></span>Logout</a></Link>
              </ul>
            </div>
            </>
          ):(
            <li><Link to="/stafflogin" className="hover:text-gray-300">Login</Link></li>
          )}
          
          {/* <li><Link to ='/login'><a onClick={handleLogout}>Logout</a></Link></li> */}
          
        </nav>
      </div>
      {/* <div className='flex-1'>
      <header className="bg-white p-4 shadow-md">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </header>
      </div> */}
  
</div>
        
 
  );
};

export default Navbar;
