import React, { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { getadvData } from "../../services/Userapi";
import { baseUrl } from "../../files/file";

const AdventureData = () => {
  const [adventdata, setAdventdata] = useState([]);
  let { id } = useParams();
  
  // const navigate = useNavigate();

  useEffect(() => {
    // eslint-disable-next-line 
    getAdvData();
  },[]);
  const getAdvData = async () => {
    try {
      let { data } = await getadvData(id);

      setAdventdata(data.oneadvdata);
    } catch (error) {
      console.log(error);
    }
  };
  // const handleBookView=async(bookedadvdata)=>{
  //   try {
  //     navigate(`/viewbookadv/`,{state:{bookedadvdata}})

  //   } catch (error) {
  //     console.log(error)

  //   }
  // }

  const images = adventdata?.image?.map((image, index) => ({
    id: index + 1,
    src: `${baseUrl}${image}`,
    isLarge: index === 0,
  }));
  // console.log(adventdata,"advneture data")
  return (
    <div className="container mx-auto">
      <Header />
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{adventdata.activity}</h2>
            <h3 className="text-lg mb-4">
              Conducted By:{adventdata.resortName}
            </h3>
          </div>

          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div className="text-3xl font-semibold text-sky-300">
              {/* {adventdata.price} */}
              {/* <button
                className="btn  ml-4 btn-info"
                // onClick={(e)=>{
                //   handleBookView(adventdata)
                // }}
                
              >
                 
              </button> */}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start lg:flex-row">
          {/* <div className="max-w-[768px]">
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
              <div className="text-justify font-semibold">
                Total Time Allowed: {adventdata.time}hours
              </div>
              <div className="text-justify font-normal">
                <h2 className="font-medium">OverView Of Activity</h2>
                {adventdata.description}
              </div>
            </div>
          </div> */}
          <div className="max-w-full">
            <div className="carousel">
              {images?.map((image) => (
                <div
                  id={`slide${image?.id}`}
                  key={image?.id}
                  className="carousel-item relative w-full"
                >
                  
                  <img
                  
                    src={image?.src}
                    className="w-96 h-60 mx-auto"
                   
                    alt="image_resort"
                  />
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
                <div className="flex gap-x-6">
                  {/* <FaBed className="text-2xl" /> */}
                  <div>{adventdata.number_room}</div>
                </div>
                <div className="font-semibold">
                  
                  Total Time Allowed: {adventdata.time}hours 
                </div>
                <div className="text-justify font-serif">
                  {adventdata.description}
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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdventureData;
