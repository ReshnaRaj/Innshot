import React, { useEffect, useState } from 'react'
import Header from './Layout/Header';
import { MdPlace } from "react-icons/md";
import { baseUrl } from "../../files/file";
import { getuserdestination} from '../../services/Userapi'
const Destination = () => {
    const [destination,setDestination]=useState([])
    useEffect(()=>{
userdestination()
    },[])
    const userdestination=async()=>{
        try {
            let {data}=await getuserdestination()
            if(data.success){
                setDestination(data.destination)
            }
        } catch (error) {
            
        }
    }
    console.log(destination)
  return (
    <div>
        <Header/>
        <div className="flex flex-wrap">
        {destination.map((item)=>(
             <div className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 ">
             <figure><img src={`${baseUrl}${item?.dest_img[0]}`}  className="rounded-tl-[20px] mb-8" alt="Movie"/></figure>
             <div className="mb-4 flex flex-col">
             <div className="flex items-center mb-2">
            <div className="text-lg mr-2" />
            <div className="text-lg font-semibold">{item.dest_name}</div>
          </div>
          <div className="flex items-center">
            <MdPlace className="text-lg mr-2" />
            <div className="text-black">{item.place}</div>
            
          </div>
          <div className="flex items-center">
            <div className="text-lg mr-2" />
            <div className="text-black">{item.resortName}</div>
            
          </div>
              
               <div className="card-actions justify-end">
                 <button  className="btn btn-primary">View Details</button>
               </div>
             </div>
           </div>
        

        ))}
        </div>
    </div>
  )
}

export default Destination