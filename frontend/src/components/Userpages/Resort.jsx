import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { MdPlace } from "react-icons/md";
import { FaBed } from "react-icons/fa";
import { BiHomeAlt } from "react-icons/bi";
import DatePicker from "react-datepicker";
 
// import { useSelector } from "react-redux";

import "react-datepicker/dist/react-datepicker.css";
import { getuserresort, get_booked_data } from "../../services/Userapi";
import { useNavigate } from "react-router-dom";

const Resort = () => {
  const [resortbooked, setResortbooked] = useState([]);

  const [resort, setuserresort] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState("");
  const [filteredResorts, setFilteredResorts] = useState([]);
  // pagination code works..
  const [currentpage, setCurrentpage] = useState(1);
  console.log(currentpage, "current page");
  const recordpage = 3;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = resort.slice(firstIndex, lastIndex);
  console.log(records, "record count in user side...");
  const npage = Math.ceil(resort.length / recordpage);
  console.log(npage, "npage of count...");
  const numbers = [...Array(npage + 1).keys()].slice(1);
  
 

  const navigate = useNavigate();
  function changePage(id){
 
    setCurrentpage(id)
    }
    
    function prePage()
    
    {
      if(currentpage!==firstIndex)
      {
        setCurrentpage(currentpage-1)
      }
    }
    function nextPage()
    {
      if(currentpage!==lastIndex){
        setCurrentpage(currentpage+1)
      }
    
    }

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
    if (date < checkInDate) {
      setCheckOutDate(checkInDate);
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
      // Formatting the date into the correct format
      const new_checkin = checkInDate;
      const new_checkout = checkOutDate;

      const options = { day: "numeric", month: "numeric", year: "numeric" };
      const formatted_InDate = new_checkin
        .toLocaleDateString("en-GB", options)
        .replace(/\/0(\d)\//, "/$1/");
      const formatted_outDate = new_checkout
        .toLocaleDateString("en-GB", options)
        .replace(/\/0(\d)\//, "/$1/");

      const filterResorts = resort.filter((item) => {
        const isPlaceMatched = item.place === selectedPlace;

        const hasOverlappingBooking = resortbooked?.some((bookedItem) => {
          const bookedFrom = bookedItem.fromDate;
          const bookedTo = bookedItem.toDate;
          console.log(bookedTo, bookedFrom, "gigigigi");
          console.log(formatted_InDate, formatted_outDate, "ooooo");

          // Check for overlapping bookings
          const isOverlapping =
            (formatted_InDate <= bookedFrom &&
              bookedFrom <= formatted_outDate) || // Overlapping start date
            (formatted_InDate <= bookedTo && bookedTo <= formatted_outDate) || // Overlapping end date
            (bookedFrom <= formatted_InDate && formatted_outDate <= bookedTo); // Booking covers the entire search range
          console.log(isOverlapping, "udemy...");

          return (
            bookedItem.resortId._id === item._id &&
            bookedItem.status === "booked" &&
            isOverlapping
          );
        });
        // isUserBooked: Also uses the .some() method on the
        // resortbooked array to check if the user has already
        //  booked the resort for the specified dates.
        //  It compares the booked item's fromDate and toDate
        //  properties with the formatted search dates.
        //  If the user is already booked
        //  for the specified dates, the function returns true.
        const isUserBooked = resortbooked?.some((bookedItem) => {
          return (
            bookedItem.resortId._id === item._id &&
            bookedItem.status === "booked" &&
            formatted_InDate <= bookedItem.fromDate &&
            formatted_outDate >= bookedItem.toDate
          );
        });

        return isPlaceMatched && !hasOverlappingBooking && !isUserBooked;
      });

      console.log(filterResorts, "Filtered Resorts");
      setFilteredResorts(filterResorts);
    }
  };


  // console.log(resort, "all resort datas...");

  const today = new Date();
  const uniquePlaces = [...new Set(resort.map((item) => item.place))];

  return (
    <div className="container mx-auto">
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
            minDate={checkInDate ? new Date(checkInDate) : null}
          />
        </div>

        <button
          className="btn join-item"
          onClick={() => {
            // console.log("searching working....");
            handleSearch();
          }}
        >
          Search
        </button>
      </div>

      <div className="flex flex-wrap">
        {selectedPlace && checkInDate && checkOutDate ? (
          filteredResorts?.length > 0 ? (
            filteredResorts.map((item) => (
              <div
                className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
                key={item.resortname}
              >
                <figure>
                  <img
                    src={`${item.image[0]}`}
                    alt="images_resort"
                    className="rounded-tl-[20px] mb-8"
                  />
                </figure>
                <div className="mb-4 flex flex-col">
                  <div className="flex items-center mb-2">
                    <BiHomeAlt className="text-lg mr-2" />
                    <div className="text-lg font-semibold">
                      {item.resortname}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <MdPlace className="text-lg mr-2" />
                    <div className="text-black">{item.place}</div>
                  </div>

                  <div className="flex items-center">
                    <FaBed className="text-lg mr-2" />
                    <div className="text-lg font-semibold">
                      {item.number_room}
                    </div>
                  </div>

                  <button
                    onClick={() => handleView(item._id)}
                    className="btn btn-primary"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-2xl mx-auto">
              <img
                src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1689588227/new_nf8utw.gif"
                alt="images_resort"
              />
            </div>
          )
        ) : (
          records.map((item) => (
            <div
              className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105"
              key={item.resortname}
            >
              <figure>
                <img
                  src={`${item.image[0]}`}
                  alt="images_resort"
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
                  <div className="text-lg font-semibold">
                    {item.number_room}
                  </div>
                </div>

                <button
                  onClick={() => handleView(item._id)}
                  className="btn btn-primary"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="join flex  justify-center ">
        <button className="join-item btn btn-outline  btn-info"  onClick={prePage}>
          Prev
        </button>
        {numbers.map((n, i) => (
          <div className={`join ${currentpage===n  ? 'active' : ''}`} key={i}>
            <button className="join-item btn btn-outline btn-info"     onClick={()=>changePage(n)}>{n}</button>
             
          </div>
        ))}
        <button className="join-item btn btn-outline btn-info"    onClick={nextPage}>Next</button>
      </div>

      <Footer />
    </div>
  );
};


export default Resort;
