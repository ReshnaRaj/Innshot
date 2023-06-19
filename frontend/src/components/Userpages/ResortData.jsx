import React, { useEffect, useState } from 'react';
import Header from './Layout/Header';
import { useParams } from 'react-router-dom';
import { getresortdata,getsimiliarstay } from '../../services/Userapi';


const ResortData = () => {
  const [resortdata, setResortdata] = useState([]);
  const [similarStays, setSimilarStays] = useState([]);
  let { id } = useParams();

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
      console.log(data, 'resort one data get');
      if (data.success) {
        setResortdata(data.oneresortdata);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSimilarStays = async () => {
    try {
      let { data } = await getsimiliarstay(resortdata.place);
      console.log(data, 'similar stays data get');
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
      <div className="container mt-5">
        <div className="card lg:card-side bg-sky-300 mt-9 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images &&
              images.map((image,index) => (
                <figure key={image.id}>
                  <img
                    src={image.src}
                    alt={`Image ${image.id}`}
                    className={`w-full h-auto ${index === 0 ? 'lg:w-full' : 'lg:w-full'}`}
                  />
                </figure>
              ))}
          </div>
          <div className="card-body">
            <h2 className="card-title"> {resortdata.resortname}</h2>
            <p> {resortdata.address}</p>
            <p> {resortdata.place}</p>
            <p> ${resortdata.price}</p>
            <p> {resortdata.description}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Book Now</button>
            </div>
          </div>
        </div>
      </div>
      {similarStays.length > 0 && (
  <div className="container mt-5">
    <h2 className='text-center text-black'>Similar Stays</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {similarStays.map((stay) => (
  <div key={stay._id} className="card">
    {resortdata._id === stay._id ? null : (
      <>
        {stay.image && stay.image.length > 0 ? (
          <img src={`${stay.image[0]}`} alt={`Image ${stay.id}`} className="w-96 h-32 object-cover" />
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
