import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
// import axios from 'axios';
 

import { useDispatch } from 'react-redux';
import { setUserDetails } from '../../redux/userSlice';
import { userlogin } from '../../services/Userapi';


const UserLogin = () => {
  const users = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [useremail,setuseremail]=useState('')
  const [userpass,setuserpass]=useState('')
  // const [user, setUser] = useState({
  //   email: '',
  //   password: ''
  // });

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
    // if (!user.email) {
    //   generateError('email is required');
    //   return;
    // }
    // if (!user.password) {
    //   generateError('password is required');
    //   return;
    // }
    try {
      // console.log(user,"login user dataaaa")
     const data =await userlogin({
      email:useremail,
      password:userpass
     })
     console.log(data,"data of user...")
      // if (data.data){
      if(data) {
        // console.log(data);
        // console.log(data.data,"data coming")
        if (data.data.errors) {
          const { email, password } = data.data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          
          dispatch(setUserDetails({
            name: data.data.user.name,
            _id: data.data.user._id,
            email: data.data.user.email,
            phone: data.data.user.phone,
            // token: data.data.token
          }));
          
          if(data.data.user.verifiyd){
            localStorage.setItem('usertoken',data.data.token)
            console.log(data.data.message,"toast working..")
            toast.success(data.data.message, {
              position: "top-center",
            });
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
    <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: "url('https://res.cloudinary.com/dsyln8j3g/image/upload/v1687606220/hermansyah-7uXn7nudorc-unsplash_1_udk8xq.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "100vh",
    }}>
    <div className="w-full max-w-md bg-white-200 rounded-lg shadow-md p-8" style={{ opacity: 0.9 }} >
      <h2 className="text-2xl font-bold mb-6 text-center text-black">User Login</h2>
     
      <form onSubmit={handleSubmit}>
        
        
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-black text-sm font-bold mb-2"
          >
            Email
          </label>
          
          
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            onChange={(e) => setuseremail( e.target.value )}
            required
          />
        </div>
        
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-black text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your password"
            onChange={(e) => setuserpass(e.target.value)}
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
      <p className=" font-bold text-black mt-4">Not registered? <Link to="/register" className="text-black font-bold">Signup here</Link></p>
      <p className=" font-bold text-black mt-4">Login As A staff?<Link to="/staff/stafflogin" className="text-black font-bold"> SignIn</Link></p>
     
     
    </div>
    <ToastContainer />
  </div>
  );
};

export default UserLogin;
