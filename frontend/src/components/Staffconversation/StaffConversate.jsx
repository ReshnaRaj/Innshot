import React,{useEffect, useState} from 'react'
import {getStaff} from '../../services/Staffapi'
const StaffConversate = ({data,currentStaffId,stafonline}) => {
    const [staffData,setStaffData]=useState(null)
    useEffect(()=>{
        const staffId=data.members.find((id)=>id!==currentStaffId)
        console.log(staffId,"staff Id in chat")
        const getUserschats=async()=>{
            const {data}=await getStaff(staffId)
            setStaffData(data.result)
            console.log(data.result)
        }
        getUserschats()
    },[])
  return (
    <>
   
    <div className="follower conversation">
        <div>
         

          {staffData?.map((staffdata, index) => {
            return (
              <div
                className="follower conversation flex items-center"
                key={index}
              >
                 
                <div className="text-lg w-full">
                  <span>{staffdata?.name}</span>
                  <span className="float-right mr-2">{stafonline ? "online" : "offline"}</span>
                </div>
              </div>
            );
          })}
        
        </div>
      </div>
      <hr className="my-4 border-gray-300" />
      </>
  )
}

export default StaffConversate