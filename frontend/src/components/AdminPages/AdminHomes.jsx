import React from 'react';
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'


const AdminHomes = () => {
  return (
    
    <div className="flex">
      <Navbars/> 
      
      {/* Main Content */}
      <div className="flex-1">
        <Headers name={"Dashboard"}/>
      
        <div className="p-4">
         
  <h3 className="text-xl font-bold mb-4">Welcome to the Admin Dashboard!</h3>
  <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
    <h4 className="text-lg font-semibold mb-2">Number of Resorts:</h4>
    <p className="text-gray-600">10</p>
    <h4 className="text-lg font-semibold mb-2">Number of Booking:</h4>
    <p className="text-gray-600">10</p> {/* Replace '10' with the actual number of resorts */}
  </div>
  
  {/* Your additional dashboard content goes here */}
</div>
        
      </div>
    </div>
  );
};

export default AdminHomes;
