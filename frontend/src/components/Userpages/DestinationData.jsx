import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from './Layout/Header'
import Footer from "./Layout/Footer";
import {getDestinationData} from '../../services/Userapi'
import { baseUrl } from "../../files/file";

const DestinationData = () => {
    const [destdata,setDestdata]=useState([])
    let {id}=useParams()
    useEffect(()=>{
      getdestData()
    },[])
    const getdestData=async()=>{
        try {
            let {data}=await getDestinationData(id)
            setDestdata(data.onedestdata)
        } catch (error) {
            console.log(error)
        }
    }
    const images =destdata?.dest_img?.map((image, index) => ({
        id: index + 1,
        src: `${baseUrl}${image}`,
        isLarge: index === 0,
      }));
    console.log(destdata,"destination details of one destinaton")
  return (
   <div>
    <Header/>
    <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{destdata.name}</h2>
            <h3 className="text-lg mb-4">
              Near To:{destdata.resortName}
            </h3>
          </div>

          <div className="mb-4 lg:mb-0 flex gap-x-2 text-sm">
            <div className="text-3xl font-semibold text-sky-300">
              {/* {destdata.price} */}
              <button
                className="btn btn-ghost ml-4 text-black"
                onClick={(e) => {
                  console.log(destdata, "full detials..");
                }}
              >
                Contact Now
              </button>
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
              
              
                <div className="text-justify font-normal">
                  <h2 className="font-medium">OverView Of Activity</h2>
                  {destdata.about}
                </div>
              
            </div>
          </div>
        </div>
        
      </div>
      <Footer/>
   </div>
  )
}

export default DestinationData