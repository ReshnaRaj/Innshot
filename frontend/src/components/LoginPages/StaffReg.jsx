import React, { useState } from 'react';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { staffregister } from '../../services/Staffapi';



const StaffReg = () => {
  const [message, setMessage] = useState('');
  // const navigate = useNavigate();
  
  // const [staffuser, setStaffUser] = useState({
  //   name: '',
  //   email: '',
  //   phone: '',
  //   password: ''
  // });
  const [staffname,setstaffname]=useState('')
  const [staffemail,setstaffemail]=useState('')
  const [staffphone,setstaffphone]=useState('')
  const [staffpassword,setstaffpassword]=useState('')
  const [staffrepassword, staffsetrepassword] = useState('');
  const generateError = (err) => {
    toast.error(err, {
      position: 'top-center'
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(staffname===""||staffemail===""||staffphone===""||staffpassword===""){
      generateError('Please fill all are required')
    }
    if(staffpassword!==staffrepassword){
      console.log(generateError,"yyyyyyyyyy")
      generateError('Password not match Try again later')
    }
    
    else {
      try {
        const data =await staffregister({
          name: staffname,
          email: staffemail,
          phone: staffphone,
          password:staffpassword
        })
        console.log(data,"data staff")
        if (data.created) {
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
    }


  return (
    <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: "url('https://res.cloudinary.com/dsyln8j3g/image/upload/v1687606220/hermansyah-7uXn7nudorc-unsplash_1_udk8xq.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      width: "100%",
      height: "100vh",
    }}>
      <div className="w-full max-w-md bg-white-200 rounded-lg shadow-md p-8"  style={{ opacity: 0.9 }}>
        <h2 className="text-2xl font-bold mb-1 text-center text-black">Resort Owner Signup</h2>
        {message && (
  <div className="flex items-center font-bold text-center text-black mb-4">
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
             value={staffname}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
              onChange={(e)=>setstaffname(e.target.value)}
              
              
            />
            {/* <span className='text-white font-semibold'>Name should be 3-10 characters</span> */}
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
              value={staffemail}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              onChange={(e) =>setstaffemail(e.target.value)}
              
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
             
              className="block text-black text-sm font-bold mb-2"
            >
              Phone
            </label>
            <input
              type="number"
              id="number"
              value={staffphone}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="+91-"
              onChange={(e) => {
                const phoneNumber = e.target.value.replace(/[^0-9]/g, "")
                console.log(phoneNumber,"aaaaaa")
                if (phoneNumber.length <= 10) {
                  setstaffphone(phoneNumber);
                }
              }}
              
                        
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
              value={staffpassword}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              onChange={(e) => setstaffpassword(e.target.value )}
              
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-black text-sm font-bold mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              value={staffrepassword}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Confirm password"
              onChange={(e) =>staffsetrepassword(e.target.value )}
              
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
        <button className="link-btn  hover:text-white font-bold">
  Already have an account? <Link to="/staff/stafflogin" className="text-black font-bold">Login here</Link>
</button>
      </div>
    </div>
  );
};

export default StaffReg;
