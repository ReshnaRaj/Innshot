import React, { useEffect,useState } from 'react'
import {getuseradventure} from '../../services/Userapi'
import Header from './Layout/Header';
import { baseUrl } from "../../files/file";

const Adventure = () => {
    const [adventure,setAdventure]=useState([])
    useEffect(()=>{
        useradventure()
    },[])
    const useradventure=async()=>{
        try {
            let {data}=await getuseradventure();
            if(data.success){
                setAdventure(data.adventure)
            }
        } catch (error) {
            
        }
    }
    console.log(adventure,"adventure datas are coming....")

  return (
    <div>
        <Header/>
        {adventure.map((item)=>(
             <div className="card card-side bg-sky-300 mt-7 mx-72 shadow-xl">
             <figure><img src={`${baseUrl}${item?.image[0]}`}  className="w-96 h-32 object-cover" alt="Movie"/></figure>
             <div className="card-body">
               <h2 className="card-title">{item?.activity}</h2>
               <p>{item?.place}</p>
               <p>{item?.price}</p>
               <div className="card-actions justify-end">
                 <button className="btn btn-primary">View Details</button>
               </div>
             </div>
           </div>
        

        ))}
    </div>
       
  )
}

export default Adventure