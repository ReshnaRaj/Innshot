import React, { useEffect,useState } from 'react'
import {getuseradventure} from '../../services/Userapi'
import Header from './Layout/Header';
import Footer from "./Layout/Footer";
import { MdPlace } from "react-icons/md";
import { baseUrl } from "../../files/file";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Page from './Layout/Page'

const Adventure = () => {
  const users = useSelector((state) => state.user);
  console.log(users,"zcc")
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
    const navigate = useNavigate();
    const handleView=async(item)=>{
      try {
        navigate(`/viewadventure/${item}`,{state:{item}})
      } catch (error) {
        
      }
    }
    console.log(adventure,"adventure datas are coming....")

  return (
    <div className='mx-auto max-w-screen-2xl'>
        <Header/>
        <div className="flex flex-wrap">
        {adventure.map((item)=>(
             <div className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 ">
             <figure><img src={`${baseUrl}${item?.image[0]}`}  className="rounded-tl-[20px] mb-8" alt="Movie"/></figure>
             <div className="mb-4 flex flex-col">
             <div className="flex items-center mb-2">
            <div className="text-lg mr-2" />
            <div className="text-lg font-semibold">{item.activity}</div>
          </div>
          <div className="flex items-center">
            <MdPlace className="text-lg mr-2" />
            <div className="text-lg font-semibold">{item.place}</div>
            
          </div>
          <div className="flex items-center">
            <div className="text-lg mr-2" />
            <div className="text-black">{item.resortName}</div>
            
          </div>
              
               
                 <button  onClick={()=>{
                
                  handleView(item._id)}}className="btn btn-primary">View Details</button>
               
             </div>
           </div>
        

        ))}
        </div>
        <Page/>
        <Footer />

    </div>
       
  )
}

export default Adventure