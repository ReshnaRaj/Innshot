import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch,useSelector } from 'react-redux';
import { setUserDetails } from '../../redux/userSlice';
import { userlogin } from '../../services/Userapi';


const UserLogin = () => {
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  useEffect(() => {
    const token=localStorage.getItem('usertoken')
    if (token) {
      navigate('/');
    }
  },[navigate]);

  const generateError = (err) => {
    toast.error(err, {
      position: 'top-center'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user.email) {
      generateError('email is required');
      return;
    }
    if (!user.password) {
      generateError('password is required');
      return;
    }
    try {
     const data =await userlogin({...user})
      if (data.data) {
        // console.log(data);
        console.log(data.data,"data coming")
        if (data.data.errors) {
          const { email, password } = data.data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {

          dispatch(setUserDetails({
            name: data.data.user.name,
            id: data.data.user._id,
            email: data.data.user.email,
            phone: data.data.user.phone,
            token: data.data.token
          }));
          
          if(data.data.user.verifiyd){
            localStorage.setItem('usertoken',data.data.token)
            navigate('/');
          }
          else{
            navigate('/login')
          }
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">User Login</h2>
     
      <form onSubmit={handleSubmit}>
        
        
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
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          Login
        </button>
      </form>
      <p className="mt-4">Not registered? <Link to="/register" className="text-blue-500">Signup here</Link></p>
      <p className="mt-4">Login As A staff?<Link to="/stafflogin" className="text-blue-500"> SignIn</Link></p>
      <ToastContainer />
      {/* <button className="link-btn">
Already have an account? <Link to="/stafflogin" className="text-blue-500">Login here</Link>
</button> */}
    </div>
  </div>
  );
};

export default UserLogin;
