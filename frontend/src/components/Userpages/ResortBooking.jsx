import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { useLocation } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import {RxCalendar} from 'react-icons/rx'
const ResortBooking = () => {
  const [resortdata, setResortdata] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const location = useLocation();
  const booked = location.state?.bookeddata;
  //   console.log(booked,"dddddddddd")
  useEffect(() => {
    setResortdata(booked.resortname);
    setResortdata(booked.price);
    setResortdata(booked.image);
    setResortdata(booked.number_room);
    setResortdata(booked.place);
     const checkInDateFromStorage = localStorage.getItem("checkinDate");
     console.log(checkInDateFromStorage,"check in date getting...")
    const checkOutDateFromStorage = localStorage.getItem("checkoutDate");
     if (checkInDateFromStorage) {
      setCheckInDate(new Date(checkInDateFromStorage));
    }

    if (checkOutDateFromStorage) {
      setCheckOutDate(new Date(checkOutDateFromStorage));
    }
  }, []);
  console.log(checkInDate, "updated...");
  return (
    <div>
      <Header />
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[768px]">
            <h2 className="text-2xl font-semibold mt-5">User Details Form</h2>
            <h3 className="text-lg mb-4">
              Please provide your details for Confirmation:
            </h3>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Mobile No:</label>
                <input
                  type="text"
                  id="phone"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="form-group">
                <label htmlFor="passcode">Enter 4 digit passcode</label>
                <div className="flex gap-4">
                  <input
                    type="password"
                    id="passcode"
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                  <button className="btn btn-success">Send passCode</button>
                </div>
              </div>
            </form>
          </div>
          <form>
            <div className="max-w-[900px] bg-gray-100 p-4 mt-5 rounded-lg">
              <h2 className="font-semibold">{booked?.resortname}</h2>
              <h2 className="font-semibold flex items-center">
                <RxCalendar className="text-lg mb-6" />
                <span className="ml-2 mb-6">{checkInDate?.toLocaleDateString("en-GB")}-{checkOutDate?.toLocaleDateString("en-GB")}</span>
              </h2>
              <img
                src={`${booked.image[0]}`}
                alt="Resort"
                className="w-72 h-56"
              />

              <h2 className="font-semibold flex items-center">
                <FaBed className="text-sm" />
                <span className="ml-2">{booked?.number_room}</span>
              </h2>
              <h2 className="font-semibold flex items-center">
                <MdPlace className="text-sm" />
                <span className="ml-2">{booked?.place}</span>
              </h2>

              <h2 className="font-semibold flex items-center">
                <FaRupeeSign className="text-sm" />
                <span className="ml-2">{booked?.price}</span>
              </h2>
              <button className="btn btn-success">Pay Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResortBooking;
