import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbars";
import Headers from "./layout/Headers";
import { getAllData,getall_bookings } from "../../services/Adminapi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie} from "react-chartjs-2";
ChartJS.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title)
const AdminHomes = () => {
 
  const [approved,setApproved]=useState([])
  const [rejected,setRejected]=useState([])
  const [allbooking,setAllbooking]=useState([])
  const [cancelbook,setCancelbook]=useState("")
  const resorts={
    labels:['Approved_Resorts','Rejected_Resorts'],
    datasets:[
      {
        label:'Resorts',
        data:[approved,rejected],
        backgroundColor: [
          'rgba(0, 255, 0, 0.2)',
          'rgba(255, 0, 0, 0.2)',
        
        
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)', 
          'rgba(255, 0, 0, 1)', 
        
        
        ],
        borderWidth: 1,
      },
    ]
  }
  const booking={
    labels:['Booked_Resorts','Cancelled_Resorts'],
    datasets:[
      {
        label:'Bookings',
        data:[allbooking,cancelbook],
        backgroundColor: [
          'rgba(0, 255, 0, 0.2)',
          'rgba(255, 0, 0, 0.2)',
        
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)', 
          'rgba(255, 0, 0, 1)', 
        
        ],
        borderWidth: 1,
      },
    ]
  }
  useEffect(()=>{
      getallbooking()
  },[])
  const getallbooking=async()=>{
      try {
          let {data}=await getall_bookings();
          console.log(data,"data of booked...")
      let confirmbooking=data.result.filter(book=>book.status==='booked')
      console.log(confirmbooking,"booked")
      setAllbooking(confirmbooking.length)
      let cancelbooking=data.result.filter(book=>book.status==='cancelled')
      setCancelbook(cancelbooking.length)
       
          
      } catch (error) {
          console.log(error,"error")
          
      }
  }
  // console.log(allbooking,"all bookings...")

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      let dataa = await getAllData();
      console.log(dataa, "data of all resorts");
      const approve=dataa.data.resort.filter(book=>book.verify==='verified')
      console.log(approve,"lenght of approved")
      setApproved(approve.length)
      const reject=dataa.data.resort.filter(book=>book.verify==='rejected')
      console.log(reject,"count of rejected")
      setRejected(reject.length)
    
    } catch (error) {
      console.log(error, "error coming..");
    }
  };
  // console.log(data, "all resort data in admin side");
  return (
    <div className="flex">
      <Navbars />

      {/* Main Content */}
      <div className="flex-1">
        <Headers name={"Dashboard"} />

        <div className="p-4">
          <h3 className="text-xl font-bold mb-4">
            Welcome to the Admin Dashboard!
          </h3>
          <div className="flex p-4 justify-around">
            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
              <h4 className="text-lg font-semibold mb-2">Number of Resorts:</h4>
              <p className="text-gray-600">
              <Pie data={resorts} />
              </p>
              {/* Replace '10' with the actual number of resorts */}
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
              <h4 className="text-lg font-semibold mb-2">
                Number of ResortBooking:
              </h4>
              <p className="text-gray-600">
              <Pie data={booking} />
              </p>
            </div>

            {/* Your additional dashboard content goes here */}
          </div>

          {/* Your additional dashboard content goes here */}
        </div>
      </div>
    </div>
  );
};

export default AdminHomes;
