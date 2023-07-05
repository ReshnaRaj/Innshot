import React, { useEffect, useState } from 'react';
import { get_booked_data } from '../../services/Userapi';
import Header from "./Layout/Header";

const Booking = () => {
  const [resortbooked, setResortbooked] = useState([]);

  useEffect(() => {
    getbooked_data();
  }, []);

  const getbooked_data = async () => {
    try {
      console.log('getting..');
      let data = await get_booked_data();
      setResortbooked(data.data.result);
    } catch (error) {
      console.log(error, 'error getting...');
    }
  };

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
            {/* <div className="card-actions justify-end">
              <button className="btn btn-error">Cancel</button>
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Booking;
