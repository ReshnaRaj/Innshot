import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import { useParams,useNavigate } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { getresortdata, getsimiliarstay } from "../../services/Userapi";

const ResortData = () => {
  const [resortdata, setResortdata] = useState([]);
  const [similarStays, setSimilarStays] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getResortData();
  }, []);
  useEffect(() => {
    if (resortdata.place) {
      fetchSimilarStays();
    }
  }, [resortdata.place]);

  const getResortData = async () => {
    try {
      let { data } = await getresortdata(id);
      console.log(data, "resort one data get");
      if (data.success) {
        setResortdata(data.oneresortdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleBookView=async(bookeddata)=>{
    try {
      navigate(`/viewbook/`,{state:{bookeddata}})
      
    } catch (error) {
      console.log(error)
      
    }
  }
  const fetchSimilarStays = async () => {
    try {
      let { data } = await getsimiliarstay(resortdata.place);
      console.log(resortdata.place, "similar stays data get");
      if (data.success) {
        setSimilarStays(data.similarStays);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const images = resortdata?.image?.map((image, index) => ({
    id: index + 1,
    src: `${image}`,
    isLarge: index === 0,
  }));
  // console.log(similarStays,"ooooooo")

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
            <div className="text-3xl font-semibold text-sky-300">
              {resortdata.price}
              <button
                className="btn btn-ghost ml-4 text-black"
                onClick={(e) => {
                 handleBookView(resortdata)
                  console.log(resortdata, "full detials..");
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
          <div className="max-w-[768px]">
            <div className="mb-8 grid grid-cols-2 gap-11">
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
            </div>
            <div>
              <div>
                <div className="flex gap-x-6">
                  <FaBed className="text-2xl" />
                  <div>{resortdata.number_room}</div>
                </div>
                <div className="font-semibold">
                  Services:{" "}
                  {resortdata.service ? resortdata.service.join(", ") : ""}
                </div>
                <div className="text-justify font-serif">
                  {resortdata.description}
                </div>
                <div>
                  <h3 className="text-2xl">Hotel Policies</h3>
                  <ul>
                    <li>Check In Time is 12 PM.</li>
                    <li>Check Out time is 11 AM.</li>
                    <li>No smoking in rooms or public areas.</li>
                  </ul>

                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 bg-sky-100 w-full mb-8 border border-gray-300 rounded-lg px-6 py-8">
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
            {/* <button className="btn btn-outline btn-info ml-4">Video Call</button> */}
          </div>
        </div>
      </div>
      {similarStays.length > 0 ? (
        <div className="container mt-5">
          <h2 className="text-center text-black">Similar Stays</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {similarStays.map((stay) => (
              <div key={stay._id} className="card">
                {resortdata._id === stay._id ? null : (
                  <>
                    {stay.image && stay.image.length > 0 ? (
                      <img
                        src={`${stay.image[0]}`}
                        alt={`Image ${stay.id}`}
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <p>No image available</p>
                    )}
                    <div className="card-body">
                      <h2 className="card-title">{stay.resortname}</h2>
                      <p>{stay.address}</p>
                      {/* Render any other details of the similar stays */}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="container mt-5">
          <h2 className="text-center text-black">No similar stays available</h2>
        </div>
      )}

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
    </div>
  );
};

export default ResortData;
