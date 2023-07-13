import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { getadvData } from "../../services/Userapi";
import { baseUrl } from "../../files/file";

const AdventureData = () => {
  const [adventdata, setAdventdata] = useState([]);
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getAdvData();
  }, []);
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
 
 
  const images =adventdata?.image?.map((image, index) => ({
    id: index + 1,
    src: `${baseUrl}${image}`,
    isLarge: index === 0,
  }));
  // console.log(adventdata,"advneture data")
  return (
    <div>
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
              
                <div className="text-justify font-semibold">
                 Total Time Allowed:  {adventdata.time}hours
                </div>
                <div className="text-justify font-normal">
                  <h2 className="font-medium">OverView Of Activity</h2>
                  {adventdata.description}
                </div>
              
            </div>
          </div>
        </div>
        
      </div>
      <Footer/>
    </div>
  );
};

export default AdventureData;
