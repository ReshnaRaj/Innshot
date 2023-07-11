import React,{useEffect, useState} from 'react'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'
import {getall_bookings} from '../../services/Adminapi'

const AllBookings = () => {
    const [allbooking,setAllbooking]=useState([])
    useEffect(()=>{
        getallbooking()
    },[])
    const getallbooking=async()=>{
        try {
            let {data}=await getall_bookings();
            console.log(data,"data of booked...")
            if(data.success){
                setAllbooking(data.result)
            }
        } catch (error) {
            console.log(error,"error")
            
        }
    }
    console.log(allbooking,"all bookings...")
  return (
    <div className='flex'>
        <Navbars/>
        <div className='flex-1'>
            <Headers name={"List of Destination"} />
            <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
              
                <th>Booked Resort</th>
               
                <th>Traveler</th>
                <th>Status</th>
                <th>CheckOutDate</th>
                
            
              </tr>
            </thead>
            <tbody>
                {allbooking.map((item,index)=>(
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{item.resortId.resortname}</td>
                        <td>{item.traveler.name}</td>
                        <td>{item.status}</td>
                        <td>{item.toDate}</td>
                    </tr>
                ))}
            </tbody>
          </table>
          </div>
        </div>
        
    </div>
  )
}

export default AllBookings