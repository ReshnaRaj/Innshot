import React from 'react'
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";

const Profile = () => {
  return (
    <div>
      <Header/>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        
      
      <div className="bg-white rounded-lg shadow-md p-8">
      <h1 className='font-bold'>Your Account Details</h1>
       
        <h2 className="text-lg mb-4">Name:
        <input type=''/>
        </h2>
        <h2 className='text-lg mb-4'>
          Phone:
          <input type=''/>
        </h2>
        <h2 className='text-lg mb-4'>
          Email:
          <input type=''/>
        </h2>
        


        {/* <button className='btn btn-warning'>Download Pdf </button> */}

       
      </div>
    </div>
     
      <Footer/>
      

      
    </div>
  )
}

export default Profile