import React, { useEffect, useState } from 'react';
import { get_booked_data,CancelBook} from '../../services/Userapi';
import Header from "./Layout/Header";
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
      <h1>Your Booking</h1>
      {resortbooked?.map((resort, index) => (
        <div key={index} className="card card-side bg-transparent-400 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Booked Resort:{resort.resortId.resortname}</h2>
            <p>Address:{resort.resortId.address}</p>
            <p>Price:{resort.resortId.price}</p>
            <p>Place:{resort.resortId.place}</p>
            <p>Status:{resort.status}</p>
            <p>Booked Date:{resort.Booked_at}</p>
            <p>CheckIn date:{resort.fromDate}-Check OutDate:{resort.toDate}</p>
            <p>Payment Method: {resort.payment.payment_status}</p>
             <div className="card-actions justify-end">
              {resort.status !== "cancelled" && (
                <button className="btn btn-error" onClick={() => CancelBooking(resort._id)}>Cancel</button>
              )}
            </div>
          </div>
          <ToastContainer />
        </div>
      ))}
    </div>
  );
};

export default Booking;
