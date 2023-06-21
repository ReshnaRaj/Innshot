import React, { useEffect,useState } from 'react'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'
import { useNavigate } from "react-router-dom";
import {getalldestData} from '../../services/Adminapi'

const AllDestination = () => {
  const [destdata,setDestdata]=useState([])
  const navigate = useNavigate();
  useEffect(()=>{
   getdestdata()
  },[])
  const getdestdata=async()=>{
    try {
      let data=await getalldestData()
      if(data.data.destination){
        setDestdata(data.data.destination)
      }
    } catch (error) {
      
    }
  }
  const handleView=async(item)=>{
    try {
      console.log(item,"******++++++")
      navigate(`/admin/viewdestination/${item}`,{state:{item}})
    } catch (error) {
      
    }
  }
  
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
                <th>Destination name</th>
                <th>Resort Owner</th>
                <th>Place</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {destdata.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.dest_name}</td>
                  <td>{item?.resortowner?.name}</td>
                  <td>{item?.place}</td>
                  <td>{item?.verify ? "approved" : "rejected"}</td>

                  <button
                     onClick={() => {
                      console.log(item, "item is coming....");
                      handleView(item._id);
                    }}
                    className="btn btn-xs btn-info"
                    style={{ marginRight: "10px" }}
                  >
                    View
                  </button>
                  {/* {item.verify === false ? (
                    <button
                      // onClick={() => handleapprove(item._id)}
                      className="btn btn-xs btn-success"
                      style={{ marginRight: "10px" }}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      // onClick={() => handleapprove(item._id)}
                      className="btn btn-xs btn-error"
                      style={{ marginRight: "10px" }}
                    >
                      Reject
                    </button>
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
    </div>
  )
}

export default AllDestination