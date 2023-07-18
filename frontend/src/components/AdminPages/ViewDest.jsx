import React, { useEffect,useState} from 'react'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'
import { useParams } from 'react-router-dom'
import {getuniqdest} from '../../services/Adminapi'
import { baseUrl } from "../../files/file";

const ViewDest = () => {
    const [destdetails,setDestdetails]=useState([])
    let {id}=useParams()
    useEffect(()=>{
        getdestinations()
        // eslint-disable-next-line
    },[])
    const getdestinations=async()=>{
        try {
            let {data}=await getuniqdest(id)
            console.log(data,"data coming...")
            if(data.success){
                setDestdetails(data.destdata)
            }
        } catch (error) {
            
        }
    }
    console.log(destdetails.dest_img,"coming...")
    const images = Array.from({ length:destdetails?.dest_img?.length }).map((_, index) => ({
        id: index + 1,
        src: `${baseUrl}${destdetails?.dest_img && destdetails?.dest_img[index]}`,
      }));
     
  return (
    <div className='flex'>
        <Navbars/>
        <div className="flex-1">
            <Headers name={'View Destination'}/>
            <div className="carousel">
                    {images?.map((dest_img) => (
                      <div
                        id={`slide${dest_img?.id}`}
                        key={dest_img?.id}
                        className="carousel-item relative w-full"
                      >
                        <img
                          src={dest_img?.src}
                          className='w-96 h-60 mx-auto' 
                          alt="destionations"
                        />
                        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                          <a
                            href={`#slide${
                                dest_img?.id === 1 ? images?.length : dest_img?.id - 1
                            }`}
                            className="btn btn-circle btn-ghost"
                          >
                            ❮
                          </a>
                          <a
                            href={`#slide${
                                dest_img?.id === images?.length ? 1 : dest_img?.id + 1
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
                    <h4 className='font-bold'>{destdetails.dest_name}</h4>
                    <h3 className='font-semibold'>OverView of the destination</h3>
                    <p>{destdetails.about}</p>
                    <p className='text-xl'>Conducted By:{destdetails.resortName} Resort</p>
                    
                    
                    <h3 className='font-bold'>Resort Owner Details</h3>
                    <p>Name:{destdetails?.resortowner?.name}</p>
                    <p>Email:{destdetails?.resortowner?.email}</p>
                    <p>Contact No:{destdetails?.resortowner?.phone}</p>
                  </div>
        </div>
    </div>
  )
}

export default ViewDest