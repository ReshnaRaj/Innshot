import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { MdPlace } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { getuserresort, get_booked_data } from "../../services/Userapi";
import { useNavigate } from "react-router-dom";

const Resort = () => {
  const [resortbooked, setResortbooked] = useState([]);
  const [resort, setuserresort] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [filteredResorts, setFilteredResorts] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    userresort();
    getbooked_data();
  }, []);

  const getbooked_data = async () => {
    try {
      let data = await get_booked_data();
      setResortbooked(data.data.result);
    } catch (error) {
      console.log(error, "error getting booked resorts");
    }
  };

  const handleView = async (item) => {
    try {
      navigate(`/viewdata/${item}`, { state: { item } });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    if (checkInDate && date <= checkInDate) {
      setCheckOutDate(null);
    } else {
      setCheckOutDate(date);
    }
  };
  useEffect(() => {
    if (checkInDate) {
      localStorage.setItem("checkinDate", checkInDate.toISOString());
    } else {
      localStorage.removeItem("checkinDate");
    }
  }, [checkInDate]);

  useEffect(() => {
    if (checkOutDate) {
      localStorage.setItem("checkoutDate", checkOutDate.toISOString());
    } else {
      localStorage.removeItem("checkoutDate");
    }
  }, [checkOutDate]);

  const userresort = async () => {
    try {
      let { data } = await getuserresort();
      if (data.success) {
        setuserresort(data.resortt);
      }
    } catch (error) {
      console.log(error, "Error");
    }
  };
  const handleSearch = () => {
    if (selectedPlace && checkInDate && checkOutDate) {
      const filterResorts = resort.filter((item) => {
        // console.log(item._id,"all resotss")
        const isBooked = resortbooked.some((bookedItem) => {
          // console.log(bookedItem.resortId._id,"ooooooooooo");
          if (bookedItem.resortId._id === item._id && bookedItem.status === 'booked') {
            return true;
          }
          return false;
        });
        // console.log(isBooked,"checking ")
        const isPlaceMatched = item.place === selectedPlace;
        const isDateAvailable = !resortbooked.some((bookedItem) => {
          return (
            bookedItem.resortId._id === item._id &&
            bookedItem.status === 'booked' &&
            checkInDate <= bookedItem.checkOutDate &&
            checkOutDate >= bookedItem.checkInDate
          );
        });
        return !isBooked && isPlaceMatched && isDateAvailable;
      });
      // console.log(filterResorts, "Filtered Resorts");
      setFilteredResorts(filterResorts);
    }
    // else{
    //   setFilteredResorts(resort)
    // }
   
  };
  console.log(resort,"all resort datas...")

  const today = new Date();
  const uniquePlaces = [...new Set(resort.map((item) => item.place))];

  return (
    <div>
      <Header />

      <div className="px-[30px] py-4 max-w-[1170px] mx-auto flex flex-col lg:flex-row justify-between gap-4 lg:gap-x-3 relative lg:-top-4 lg:shadow-md rounded-lg">
        <select
          className="w-64 h-10 max-w-xs"
          value={selectedPlace}
          onChange={(e) => setSelectedPlace(e.target.value)}
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
            dateFormat="dd MMMM yyyy"
            onChange={handleCheckInDateChange}
            placeholderText="Check-in"
            className="w-64 h-10 max-w-xs"
            minDate={today}
          />
        </div>

        <div className="ml-4">
          <DatePicker
            selected={checkOutDate}
            dateFormat="dd MMMM yyyy"
            onChange={handleCheckOutDateChange}
            placeholderText="Check-out"
            className="w-64 h-10 max-w-xs"
          />
        </div>

        <button className="btn join-item" onClick={handleSearch}>
          Search
        </button>
      </div>
      

      <div className="flex flex-wrap">
      {(filteredResorts?.length > 0 ? filteredResorts : resort).map((item) => (
          <div
            className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
            key={item.resortname}
          >
            <figure>
              <img
                src={`${item.image[0]}`}
                alt="resort image"
                className="rounded-tl-[20px] mb-8"
              />
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

              <button
                onClick={() => handleView(item._id)}
                className="btn btn-primary"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Resort;
