import React, { useEffect, useState } from 'react';
import { get_booked_data,CancelBook} from '../../services/Userapi';
import Header from "./Layout/Header";
import {Link}  from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
const Booking = () => {
  const [resortbooked, setResortbooked] = useState([]);
  const [cancel,setCancel]=useState("")
  useEffect(() => {
    getbooked_data();
  }, [cancel]);

  const getbooked_data = async () => {
    try {
      console.log('getting..');
      let data = await get_booked_data();
      
      setResortbooked(data.data.result);
    } catch (error) {
      console.log(error, 'error getting...');
    }
  };
  console.log(resortbooked,"tttt")
  const CancelBooking=async(BookingId)=>{
    try {
const data=await CancelBook(BookingId)

  console.log(data,"Working of cancel")
  if(data){
    setCancel(data)
    toast.success(data.data.message,{
      position:'top-center'
    })
    // setResortbooked(resortbooked.filter((resort) => resort._id !== BookingId));
  }

      
    } catch (error) {
      
    }
  }

  console.log(resortbooked, 'oooo');

  return (
    <div className='min-h screen'>
      <Header />

      <h1 className='p-5 font-extrabold md:text-2xl text-center  underline-offset-8' >My Booking Details</h1>
      {resortbooked.length === 0 ? (
      <div className="flex flex-col items-center mt-5">
      <h6 className="bg-red-500 text-white w-full text-center p-3 rounded-lg">
        No bookings yet!
      </h6>
      <Link to="/resortlist" className="btn btn-success text-white w-full text-center p-3  mt-3 rounded-lg">
        Go To Booking
      </Link>
    </div>
    
      ) : (
      resortbooked?.map((resort, index) => (
        <div key={index} className="card card-side bg-transparent-400 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Booked Resort:{resort.resortId.resortname}</h2>
            <p>Address:{resort.resortId.address}</p>
            <p>Price:{resort.payment.payment_amount}</p>
            <p>Place:{resort.resortId.place}</p>
            <p>Status:{resort.status}</p>
            <p>Booked Date:{new Date(resort.Booked_at).toLocaleDateString('en-US')}</p>
            <p>CheckIn date:{resort.fromDate}-Check OutDate:{resort.toDate}</p>
            <p>Payment Method: {resort?.payment?.payment_method}</p>
            <p>Payment Status:{resort?.payment?.payment_status}</p>
             <div className="card-actions justify-end">
              {resort.status !== "cancelled" && (
                <button className="btn btn-error" onClick={() => CancelBooking(resort._id)}>Cancel</button>
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      )))}
    </div>
              
  );
};

export default Booking;
