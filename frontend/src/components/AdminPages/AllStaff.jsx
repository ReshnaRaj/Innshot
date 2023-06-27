import React, { useEffect, useState } from 'react'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'
import {getAllstaff,blockstaff} from '../../services/Adminapi'
import { ToastContainer, toast } from "react-toastify";

const AllStaff = () => {
    const [staff,Setstaff]=useState([])
    useEffect(()=>{
        getStaffData();
    },[])
    const getStaffData=async()=>{
        try {
            let {data}=await getAllstaff()
            Setstaff(data.staffs)
        } catch (error) {
            
        }
    }
    const  handleBlockUnblock=async(staffId)=>{
        try {
            let {data}=await blockstaff(staffId)
            toast.success(data.message,{
                position:'top-center'
            })
            getStaffData();

        } catch (error) {
            
        }
    }
console.log(staff,"staff displayin...")
  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of Resort Owners"} />
        <div className="form-control float-right">
         
        </div>
        <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Resort Owner</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {staff.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
     <td>{user.admin_approval=='Unblock' ? 'Block':'Unblock'}</td>
    {user.admin_approval=='Unblock' ? (
        <button onClick={()=>handleBlockUnblock(user._id)}
        className='btn btn-xs btn-success'>
            Unblock

        </button>
    ):(
        <button onClick={()=>handleBlockUnblock(user._id)}
        className='btn btn-xs btn-error'>
            Block
        </button>
    )}
    </tr>
  ))}
</tbody>

          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default AllStaff