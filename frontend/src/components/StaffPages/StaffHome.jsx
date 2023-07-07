import React, {useEffect,useState} from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Headerr";
import {
  getResortData,
} from "../../services/Staffapi";

const StaffHome = () => {
  const [count,setCount]=useState("")

  
  useEffect(() => {
    getresortData();
  }, []);
  const getresortData = async () => {
    try {
      let {data} = await getResortData();
      console.log(data, "data of resort ");
      const approvedResorts = data.result.filter(resort => resort.verify === true);
      setCount(approvedResorts.length)
      console.log(approvedResorts,"ffff")
     
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div className="flex">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1">
        <Headerr name={"Dashboard"} />
        <h3 className="text-xl font-bold mb-4">
            Welcome to the Resort Booking Dashboard!
          </h3>

        <div className="flex p-4 justify-between">
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
            <h4 className="text-lg font-semibold mb-2">
              Number of Approved Resorts:
            </h4>
            <p className="text-gray-600">{count}</p>{" "}
            {/* Replace '10' with the actual number of resorts */}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
            <h4 className="text-lg font-semibold mb-2">
              Number of Approved Adventure:
            </h4>
            <p className="text-gray-600">10</p>{" "}
            {/* Replace '10' with the actual number of resorts */}
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
            <h4 className="text-lg font-semibold mb-2">
              Number of ResortBooking:
            </h4>
            <p className="text-gray-600">10</p>{" "}
            {/* Replace '10' with the actual number of resorts */}
          </div>

          {/* Your additional dashboard content goes here */}
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
