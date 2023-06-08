import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { setStaffDetails } from '../../redux/staffSlice';
import { stafflogin } from '../../services/Staffapi';

const StaffLogin = () => {
  const staffs = useSelector((state) => state.staffuser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [staffuser, setStaffUser] = useState({
    email: '',
    password: ''
  });
  useEffect(()=>{
    const token=localStorage.getItem('stafftoken')
    if(token){
      navigate('/staffhome')
    }
  },[navigate])
  
  
  const generateError = (err) => {
    toast.error(err, {
      position: 'top-center'
    });
  };


 

  const handleSubmit = async(e) => {
    // console.log("in")
    e.preventDefault();
    if(!staffuser.email){
      generateError('email is required')
      return 
    }
    if(!staffuser.password){
      generateError("password is required")
      return
    }
    try {
      console.log(staffuser,"staff before login")
      // const data=await stafflogin({...staffuser})
      const data=await stafflogin(staffuser)
      console.log("staff login working",data)
      if(data){
        console.log("in",data.data)
        if(data.data.errors){
          const {email,password}=data.data.errors;
          if(email) generateError (email)
          else if(password) generateError(password)
        }
        else{
          dispatch(setStaffDetails({
            name:data.data.staff.name,
            id:data.data.staff._id,
            email:data.data.staff.email,
            phone:data.data.staff.phone,
            token:data.data.staff.token
          }))
          console.log(data.data.token,"token of staff")
          if(data.data.staff.verified){
            console.log("stafffff")
            
            localStorage.setItem('stafftoken',data.data.token)
            navigate('/staffhome')

          }
          else{
            navigate('/stafflogin')
          }
        }
      }
    } catch (error) {
      console.log(error);
      
    }
  }
 


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Resort Owner Login</h2>
       
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
              onChange={(e) => setStaffUser({ ...staffuser, email: e.target.value })}
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
            Login
          </button>
        </form>
        <p className="mt-4">Not registered? <Link to="/staffregister" className="text-blue-500">Signup here</Link></p>
        <p className="mt-4">Login As A Admin?<Link to="/adlogin" className="text-blue-500"> SignIn</Link></p>
        <ToastContainer />
        {/* <button className="link-btn">
  Already have an account? <Link to="/stafflogin" className="text-blue-500">Login here</Link>
</button> */}
      </div>
    </div>
  );
};

export default StaffLogin;
