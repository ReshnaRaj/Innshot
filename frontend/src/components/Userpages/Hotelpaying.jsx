import React from 'react'
import {Link}  from 'react-router-dom'
import {get_booked_data} from '../../services/Userapi'
// import { useLocation } from "react-router-dom";

const Hotelpaying = () => {
  // const [resortbooked,setResortbooked]=useState([])

//   useEffect(()=>{
//  getbooked_data()
//   },[])
//   const getbooked_data=async()=>{
//     try {
//       console.log("uuuu")
//       let data=await get_booked_data()
//       setResortbooked(data.bookedresort)
//      console.log(data,"ooooo")
//     } catch (error) {
      
//     }
//   }
  
  // const location=useLocation()
  // const resortDataa=location.state?.resortIdd
  // console.log(resortDataa,"data of selected resort.....")
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
      <div className="bg-white rounded-lg shadow-md p-8">
       <img src='https://res.cloudinary.com/dsyln8j3g/image/upload/v1688207220/success_yutxdw.gif' className='w-96 h-64'/>
        <h2 className="text-2xl font-bold mb-4">Your Resort is successfully reserved</h2>
        <Link  to="/resortlist" className='btn btn-info mr-4'>HomePage</Link>
        {/* <button className='btn btn-warning'>Download Pdf </button> */}
        <Link to="/mybooking" className='btn btn-success'>View Booking</Link>
       
      </div>
    </div>
  )
}

export default Hotelpaying