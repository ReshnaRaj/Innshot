import React, { useState } from 'react';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { userregister } from '../../services/Userapi';


const UserRegister = () => {
  const [message, setMessage] = useState('');
  // const [user, setUser] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   password: ''
  // });
  const [name,setname]=useState('')
  const [email,setemail]=useState('')
  const [phone,setphone]=useState('')
  const [password,setpassword]=useState('')
  const [repassword, setrepassword] = useState('');
  // const navigate = useNavigate();
  const generateError = (err) => {
    toast.error(err, {
      position: 'top-center'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(password!==repassword){
      console.log(generateError,"yyyyyyyyyy")
      generateError('Password not match Try again later')
    }
    else{
      try {
        
        // const data=await userregister(user)
        const data=await userregister({
          name:name,
          email:email,
          phone:phone,
          password:password
        })
        if (data) {
          console.log(data,"data of user")
          if (data.errors) {
            const { name, email, phone, password } = data.errors;
            if (name) generateError(name);
            else if (email) generateError(email);
            else if (password) generateError(password);
            else if (phone) generateError(phone);
          } else {
            setMessage('Account activated, check your email');
            // navigate('/emailverify');
          }
        }
      } catch (error) {
        console.log(error, 'register error problem');
      }
    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: "url(https://res.cloudinary.com/dsyln8j3g/image/upload/v1687606220/hermansyah-7uXn7nudorc-unsplash_1_udk8xq.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "100vh",
    }}>
      <div className="w-full max-w-md bg-white-200 rounded-lg shadow-md p-8"   style={{ opacity: 0.9 }}>
        <h2 className="text-2xl font-bold mb-1 text-center text-black">User Signup</h2>
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
              className="block text-black text-sm font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
             value={name}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              onChange={(e)=> setname(e.target.value)}
              required
            />
          </div>
          
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
              value={email}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) =>  setemail(e.target.value )}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
             
              className="block text-black text-sm font-bold mb-2"
              placeholder="+91-"
            >
              Phone
            </label>
            
            
            <input
              type="number"
              id="phone"
              value={phone}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="+91-"
              onChange={(e) => {
                const phoneNumber = e.target.value.replace(/[^0-9]/g, "")
                if (phoneNumber.length <= 10) {
                  setphone(phoneNumber);
                }
              }}
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
              value={password}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) =>  setpassword( e.target.value )}
              required
            />
          </div><div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black text-sm font-bold mb-2"
            >
             Confirm Password
            </label>
            <input
              type="password"
              id="password"
              value={repassword}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter confirm password"
              onChange={(e) =>  setrepassword( e.target.value )}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-black font-bold py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            Register
          </button>
        </form>
        <ToastContainer />
        <button className="link-btn hover:text-white font-bold">
  Already have an account? <Link to="/login" className="text-black font-bold">Login here</Link>
</button>
      </div>
    </div>

);
};

export default UserRegister;

