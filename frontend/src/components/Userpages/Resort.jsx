import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { MdPlace } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import {BiHomeAlt} from 'react-icons/bi'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getuserresort } from "../../services/Userapi";
// import { baseUrl } from '../../files/file';
import { useNavigate } from "react-router-dom";
// import Footer from './Layout/Footer';

const Resort = () => {
  const [resort, setuserresort] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");

  const navigate = useNavigate();

  const handleView = async (item) => {
    try {
      navigate(`/viewdata/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckInDateChange = (date) => {
    console.log(date,"checkin date")
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    console.log(date,"check out date...")
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
      let { data } = await getuserresort();
      // console.log(data, 'data from user side...');
      if (data.success) {
        setuserresort(data.resortt);
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };
  // console.log(selectedPlace,"selected place is coming....")
  // console.log(resort,"rrrrrrrrrrrr")
  const filteredResorts = selectedPlace
    ? resort.filter((item) => item.place === selectedPlace)
    : resort;
  const uniquePlaces = [...new Set(resort.map((item) => item.place))];
  // console.log(uniquePlaces,"ioooooo")
  // console.log(filteredResorts,"iiiiiiiiiiiiiiii")
  return (
    <div>
      <Header />

      <div className="px-[30px] py-4 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-md rounded-lg">
        <select
          className="w-64 h-10 max-w-xs"
          value={selectedPlace}
          onChange={(e) => {
            console.log(selectedPlace, "ooooooooo");
            setSelectedPlace(e.target.value);
          }}
        >
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
        {/* <span className="loading loading-spinner loading-lg"></span> */}
        <button className="btn join-item ">Search</button>
      </div>
      <div className="flex flex-wrap">
      {filteredResorts.map((item) => (
        
        <div className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 " key={item.resortname}>
        <figure>
          <img src={`${item.image[0]}`} alt="resort image" className="rounded-tl-[20px] mb-8" />
        </figure>
        <div className="mb-4 flex flex-col">
          <div className="flex items-center mb-2">
            <BiHomeAlt className="text-lg mr-2" />
            <div className="text-lg font-semibold">{item.resortname}</div>
          </div>
        
          <div className="flex items-center">
            <MdPlace className="text-lg mr-2" />
            <div className="text-black">{item.place}</div>
          </div>
      
          <div className="flex items-center">
            <FaBed className="text-lg mr-2" />
            <div className="text-lg font-semibold">{item.number_room}</div>
          </div>
          {/* <div className="text-lg font-semibold text-sky-300 mb-2">{item.price}</div> */}
      
          <button onClick={() => { 
            console.log(item,"servicess")
            handleView(item._id); }} className="btn btn-primary">View Details</button>
        </div>
        </div>
      
      
      ))}
      </div>
    </div>
  );
};

export default Resort;
