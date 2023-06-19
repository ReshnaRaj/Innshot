import React, { useEffect, useState } from 'react';
import Header from './Layout/Header';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getuserresort } from '../../services/Userapi';
// import { baseUrl } from '../../files/file';
import {  useNavigate } from "react-router-dom";
// import Footer from './Layout/Footer';

const Resort = () => {
  const [resort, setuserresort] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState('');

  const navigate = useNavigate();

  const handleView=async (item)=>{
    try {
      navigate(`/viewdata/${item}`,{state:{item}})
      
    } catch (error) {
      console.log(error)
      
    }
  }

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
      let {data} = await getuserresort();
      // console.log(data, 'data from user side...');
      if (data.success) {
        setuserresort(data.resortt);
      }
    } catch (error) {
      console.log(error, 'Error');
    }
  };
// console.log(selectedPlace,"selected place is coming....")
// console.log(resort,"rrrrrrrrrrrr")
const filteredResorts = selectedPlace ? resort.filter((item) => item.place === selectedPlace) : resort;
const uniquePlaces = [...new Set(resort.map((item) => item.place))];
console.log(uniquePlaces,"ioooooo")
// console.log(filteredResorts,"iiiiiiiiiiiiiiii")
  return (
    <div>
      <Header />
      <div className="input input-info w-fit  px-0 mx-auto">
        <div className="flex">
       

<select className="w-64 h-10 max-w-xs" value={selectedPlace} onChange={(e) =>{console.log(selectedPlace,"ooooooooo") 
setSelectedPlace(e.target.value)}}>
  <option disabled value="">
    Select your Stay
  </option>
  {uniquePlaces.map((place, index) => (
    <option key={index}>{place}</option>
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
        <div className="card card-side bg-sky-300 mt-7 mx-72" key={item.resortname}>
          <figure>
            <img src={`${item.image[0]}`} alt="resort image" className="w-96 h-32 object-cover" />
          </figure>
          <div className="card-body max-w-lg">
            <h2 className="card-title">{item.resortname}</h2>
            <p>{item.address}</p>
            <div className="card-actions justify-end mt-5">
              Price: {item.price}
              <button  onClick={()=>{
                console.log(item._id,"view button working...")
                handleView(item._id)
              }} className="btn btn-ghost">View Details</button>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
};

export default Resort;
