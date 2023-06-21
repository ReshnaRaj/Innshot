import React, { useEffect,useState } from 'react'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'
import { useParams } from 'react-router-dom'
import {getuniqadv} from '../../services/Adminapi'
import { baseUrl } from "../../files/file";

const ViewAdventure = () => {
    const [adventdetails,setAdvdetails]=useState([])
    let {id}=useParams()
    console.log(id,"id adventure..")
useEffect(()=>{
    getadventuredata()
},[])
const getadventuredata=async ()=>{
    try {
        let {data}=await getuniqadv(id)
        console.log(data,"addddd")
        if(data.success) {
            setAdvdetails(data.adventuredata)
        }
    } catch (error) {
        
    }
}
const images = Array.from({ length:adventdetails?.image?.length }).map((_, index) => ({
  id: index + 1,
  src: `${baseUrl}${adventdetails?.image && adventdetails?.image[index]}`,
}));
console.log(adventdetails,"images ")
  return (
    <div className='flex'>
        <Navbars/>
        <div className="flex-1">
            <Headers name={'View Adventure Activity'}/>
            <div className="carousel">
                    {images?.map((image) => (
                      <div
                        id={`slide${image?.id}`}
                        key={image?.id}
                        className="carousel-item relative w-full"
                      >
                        <img
                          src={image?.src}
                          className='w-96 h-60 mx-auto' 
                          alt="IMAGE"
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
                  <div className='flex-row'>
                    <h4 className='font-bold'>{adventdetails.activity}</h4>
                    <p>{adventdetails.description}</p>
                    <p className='text-xl'>Conducted By:{adventdetails.resortName} Resort</p>
                    <p>Time:{adventdetails.time} Hour</p>
                    <p>Price:{adventdetails.price}</p>
                    <h3 className='font-bold'>Resort Owner Details</h3>
                    <p>Name:{adventdetails?.resortowner?.name}</p>
                    <p>Email:{adventdetails?.resortowner?.email}</p>
                    <p>Contact No:{adventdetails?.resortowner?.phone}</p>
                  </div>
                  
        </div>
    </div>
  )
}

export default ViewAdventure