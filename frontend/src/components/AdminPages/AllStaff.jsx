import React, { useEffect, useState } from 'react'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'
import {getAllstaff} from '../../services/Adminapi'

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
             {staff.map((user,index)=>(
                <tr  key={index}>
                <td>{index+1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    {user.admin_approval=='Unblock'}
                </td>
            

               
                
              </tr>

             ))}
                
            
            </tbody>
          </table>
        </div>
      </div>
     
    </div>
  )
}

export default AllStaff