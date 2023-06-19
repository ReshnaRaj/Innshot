import React, { useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };

  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };
  const images = [
    {
      id: 1,
      src: "https://res.cloudinary.com/dsyln8j3g/image/upload/v1686677179/1_cbhjim.jpg",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/dsyln8j3g/image/upload/v1686677191/2_nfusff.jpg",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/dsyln8j3g/image/upload/v1686677178/3_pxjgsg.jpg",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/dsyln8j3g/image/upload/v1686677184/4_izdg7c.jpg",
    },
  ];

  return (
    <div>
      <Header />
      <div className="carousel">
        {images.map((img) => (
          <div
            id={`slide${img.id}`}
            key={img.id}
            className="carousel-item relative w-full"
          >
            <img
              src={img.src}
              className="w-full max-h-96 object-cover"
              alt="IMAGE"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center mb-16">
              <div
                className="text-slate-100 text-4xl font-thin pt-0"
                style={{ fontFamily: "monospace", fontStyle: "italic" }}
              >
                Explore With Innshot
              </div>
              {/* <p className="text-slate-100 text-lg font-mono">
                Find your next stay Search low prices on hotels, homes and much
                more
              </p> */}
            </div>
            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a
                href={`#slide${img.id === 1 ? images.length : img.id - 1}`}
                className="btn btn-circle btn-ghost"
              >
                ❮
              </a>
              <a
                href={`#slide${img.id === images.length ? 1 : img.id + 1}`}
                className="btn btn-circle btn-ghost"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="input input-info w-fit  px-0 mx-auto">
  <div className="flex">
    <select className="w-64 h-10 max-w-xs">
      <option disabled selected>
        Select your Stay
      </option>
      <option>kumarkom</option>
      <option>Allepey</option>
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
    
    <button className="btn btn-info mx-0 ">Explore</button>
  </div>
</div>
<Footer/>
    </div>
    
    
  );
};

export default Home;
