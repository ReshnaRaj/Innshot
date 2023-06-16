import React, { useEffect, useState } from 'react';
import Header from './Layout/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getuserresort } from '../../services/Userapi';
import { baseUrl } from '../../files/file';

const Resort = () => {
  const [resort, setuserresort] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState('');

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  // const handlePlaceChange = (event) => {
  //   setSelectedPlace(event.target.value);
  // };

  useEffect(() => {
    userresort();
  }, []);

  const userresort = async () => {
    try {
      let data = await getuserresort();
      // console.log(data, 'data from user side...');
      if (data.data.success) {
        setuserresort(data.data.resort);
      }
    } catch (error) {
      console.log(error, 'Error');
    }
  };

  const filteredResorts = selectedPlace ? resort.filter((item) => item.place === selectedPlace) : resort;

  return (
    <div>
      <Header />
      <div className="input input-info w-fit  px-0 mx-auto">
        <div className="flex">
          <select className="w-64 h-10 max-w-xs" value={selectedPlace} onChange={(e)=>setSelectedPlace(e.target.value)}>
            <option disabled value="">
              Select your Stay
            </option>
            {resort.map((item, index) => (
              <option key={index}>{item.place}</option>
            ))}
          </select>

          <div className="ml-2">
            <DatePicker
              selected={checkInDate}
              onChange={handleCheckInDateChange}
              placeholderText="Check-in"
              className="w-64 h-10 max-w-xs"
            />
          </div>

          <div className="ml-4">
            <DatePicker
              selected={checkOutDate}
              onChange={handleCheckOutDateChange}
              placeholderText="Check-out"
              className="w-64 h-10 max-w-xs"
            />
          </div>

          <button className="btn btn-info mx-0">Explore</button>
        </div>
      </div>

      {filteredResorts.map((item) => (
        <div className="card card-side bg-sky-500 mt-7 mx-72" key={item.resortname}>
          <figure>
            <img src={`${baseUrl}${item.image[0]}`} alt="resort image" className="w-96 h-32 object-cover" />
          </figure>
          <div className="card-body max-w-lg">
            <h2 className="card-title">{item.resortname}</h2>
            <p>{item.address}</p>
            <div className="card-actions justify-end mt-5">
              Price: {item.price}
              <button className="btn btn-ghost">View Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resort;
