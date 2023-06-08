import React, { useState } from 'react';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { staffregister } from '../../services/Staffapi';


const StaffReg = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [staffuser, setStaffUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const generateError = (err) => {
    toast.error(err, {
      position: 'top-center'
    });
  };


 

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const data =await staffregister(staffuser)
      console.log(data,"data staff")
      if (data) {
        console.log(data,"data of staff")
        if (data.errors) {
          const { name, email, phone, password } = data.errors;
          if (name) generateError(name);
          else if (email) generateError(email);
          else if (password) generateError(password);
          else if (phone) generateError(phone);
        } else {
          setMessage('Account will  be activate please wait and check your email');
          // navigate('/emailverify');
        }
      }
      
    } catch (error) {
      console.log(error, 'register error problem');
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Resort Owner Signup</h2>
        {message && (
  <div className="flex items-center font-bold text-center text-yellow-500 mb-4">
    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
    {message}
  </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
             
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              onChange={(e)=>setStaffUser({...staffuser,name:e.target.value})}
              required
            />
          </div>
          
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            
            
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setStaffUser({ ...staffuser, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone
            </label>
            
            
            <input
              type="number"
              id="phone"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setStaffUser({ ...staffuser, phone: e.target.value })}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setStaffUser({ ...staffuser, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            Register
          </button>
        </form>
        <ToastContainer />
        <button className="link-btn">
  Already have an account? <Link to="/stafflogin" className="text-blue-500">Login here</Link>
</button>
      </div>
    </div>
  );
};

export default StaffReg;
