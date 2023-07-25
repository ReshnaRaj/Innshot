import React, { useEffect, useState } from "react";

import Header from "./Layout/Header";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { getresortdata, SendId } from "../../services/Userapi";
import Footer from "./Layout/Footer";

const ResortData = () => {
  const users = useSelector((state) => state.user);
  const [resortdata, setResortdata] = useState([]);
  const [rooms, setRooms] = useState(0);
  const [price, setPrice] = useState(0);
  // const [similarStays, setSimilarStays] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line
    getResortData();
  }, []);

  // useEffect(() => {
  //   if (resortdata.place) {
  //     fetchSimilarStays();
  //   }
  // }, [resortdata.place]);

  const getResortData = async () => {
    try {
      let { data } = await getresortdata(id);
      // console.log(data, "resort one data get");
      if (data.success) {
        setResortdata(data.oneresortdata);
        setPrice(data.oneresortdata.price);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const increment = () => {
    // console.log(resortdata.number_room,"count of room")
    console.log(rooms,"number of user entered count")
    if (rooms <resortdata.number_room) 
    setRooms(rooms + 1);
    if(rooms<=resortdata.number_room-1)
    priceChange();
  };
  const decrement = () => {
    if (rooms > 1) {
      setRooms(rooms - 1);
      priceChang();
    }
  };

  const handleBookView = async (bookeddata) => {
    try {
      console.log(price,"price of the resort...")
      console.log(rooms,"count of rooms user selected...")
      navigate(`/viewbook/`, { state: { bookeddata ,price,rooms} });
    } catch (error) {
      console.log(error);
    }
  };
  const handleSendIds = async (sender, reciever) => {
    console.log(sender, reciever, "ttttttt");
    const ids = await SendId(sender, reciever);
    navigate("/chat");
    console.log(ids);
  };
  // const fetchSimilarStays = async () => {
  //   try {
  //     let { data } = await getsimiliarstay(resortdata.place);
  //     console.log(resortdata.place, "similar stays data get");
  //     if (data.success) {
  //       setSimilarStays(data.similarStays);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const images = resortdata?.image?.map((image, index) => ({
    id: index + 1,
    src: `${image}`,
    isLarge: index === 0,
  }));
  const priceChange = () => {
    // console.log(price, "oo")
    // console.log(rooms,"tttt")
    var updatedPrice = resortdata.price * (rooms+1);
    console.log(updatedPrice,"updated price...");
    setPrice(updatedPrice);
  };
  const priceChang = () => {
    // console.log(price, "oo")
    // console.log(rooms,"tttt")
    var updatedPrice = resortdata.price * (rooms-1);
    console.log(updatedPrice);
    setPrice(updatedPrice);
  };
  // console.log(similarStays,"ooooooo")
  // console.log(users, "user id checking...");
  // console.log(resortdata, "resort details...");
  // console.log(rooms,"count of user entered resort")
  // console.log(price, "price of resort");
  return (
    <div>
      <Header />
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{resortdata.resortname}</h2>
            <h3 className="text-lg mb-4">{resortdata.address}</h3>
          </div>
          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <button
              className="btn btn-info"
              onClick={() => {
                handleSendIds(users.id, resortdata?.resortowner?._id);
              }}
            >
              Chat
            </button>

            <div className="text-2xl font-semibold text-sky-300">
              <span>
                <FaRupeeSign className="inline" />
              </span>
              <span className="inline" onChange={priceChange}>
              
                {price}
              </span>

              <button
                className="btn btn-info ml-4 text-black"
                disabled={resortdata.number_room===0}
                onClick={(e) => {
                  
                  handleBookView(resortdata,price);
                 
                  console.log(price, "full detials..");
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col items-start  lg:flex-col ">
          <div className="max-w-[768px]">
            <div className="mb-8">
              {images &&
                images.map((image, index) => (
                  <figure key={image.id}>
                    <img  src={image.src} alt={`Image ${image.id}`} className="flex flex-col"/>
                  </figure>
                ))}
            </div>
            <div>
              <div>
                <div className="flex gap-x-6">
                <FaBed className="text-2xl"/>
                <div>
                {resortdata.number_room}
                </div>
                </div>
                <div>
                  Services: {resortdata.service ? resortdata.service.join(', ') : ''}</div>
                <div>{resortdata.description}</div>
                
                
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-col items-start lg:flex-row">
          <div className="max-w-full">
            <div className="carousel">
              {images?.map((image) => (
                <div
                  id={`slide${image?.id}`}
                  key={image?.id}
                  className="carousel-item relative w-full"
                >
                  <img src={image?.src} className="w-96 h-60 mx-auto" />
                  <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a
                      href={`#slide${
                        image?.id === 1 ? images?.length : image?.id - 1
                      }`}
                      className="btn btn-circle btn-ghost"
                    >
                      ❮
                    </a>
                    <a
                      href={`#slide${
                        image?.id === images?.length ? 1 : image?.id + 1
                      }`}
                      className="btn btn-circle btn-ghost"
                    >
                      ❯
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="mb-8 grid grid-cols-2 gap-11">
              {images && images.length > 0 ? (
                <figure>
                  <img
                    src={images[0].src}
                    alt={`Image ${images[0].id}`}
                    className="h-96"
                  />
                </figure>
              ) : null}

              <div className="col-span-1 grid grid-rows-2 gap-4">
                {images && images.length > 1
                  ? images.slice(1).map((image) => (
                      <figure key={image.id}>
                        <img
                          src={image.src}
                          alt={`Image ${image.id}`}
                          className="h-28"
                        />
                      </figure>
                    ))
                  : null}
              </div>
            </div> */}
            <div>
              <div>
                <div className="flex gap-x-6 font-bold">
                  Total Rooms :
                  <FaBed className="text-2xl" />
                  <div>{resortdata.number_room}</div>
                </div>
                <div className="font-bold">how many rooms you need?</div>
                <div>
                  <button
                    onClick={decrement}
                    className=" btn-info btn-md rounded-3xl mr-2"
                  >
                    -
                  </button>
                  {rooms}
                  <button
                    onClick={increment}
                    className="btn-info btn-md rounded-3xl ml-2"
                  >
                    +
                  </button>
                </div>
                <div className="font-semibold">
                  Services:{" "}
                  {resortdata.service ? resortdata.service.join(", ") : ""}
                </div>
                <div className="text-justify font-serif">
                  {resortdata.description}
                </div>
                {/* <div>
                  <h3 className="text-2xl">Hotel Policies</h3>
                  <ul>
                    <li>Check In Time is 12 PM.</li>
                    <li>Check Out time is 11 AM.</li>
                    <li>No smoking in rooms or public areas.</li>
                  </ul>

                </div> */}
              </div>
            </div>
          </div>

          {/* <div className="flex-1 bg-sky-100 w-full mb-8 border border-gray-300 rounded-lg px-6 py-8">
            <h4 className="font-extrabold">Resort Owner</h4>
            <div className="flex items-center gap-x-4 mb-8">
              <div className="w-20 h-20  p-1 border border-gray-300 rounded-none">
                <img
                  src="https://res.cloudinary.com/dsyln8j3g/image/upload/v1687521072/bij_dbcv5b.jpg"
                  alt="owner_profile"
                />
              </div>
            </div>
            <div className="font-bold text-lg">
              {resortdata?.resortowner?.name}
            </div>
            <div className="text-gray-600 mt-2">
              Iam 12 years experienced with this platform if you need any help
              select any one of the button given below
            </div>
            <button className="btn btn-outline btn-info">Chat</button>
            <button className="btn btn-outline btn-info ml-4">Video Call</button>
          </div> */}
        </div>
      </div>

      {/* <div className="container mt-5">
        <div className="card lg:card-side bg-sky-300 mt-9 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Resort Owner Details</h2>
            <p>{resortdata?.resortowner?.name}</p>
            <p>{resortdata?.resortowner?.email}</p>
            <p>{resortdata?.resortowner?.phone}</p>
          </div>
        </div>
      </div> */}
      <Footer />
    </div>
  );
};

export default ResortData;
