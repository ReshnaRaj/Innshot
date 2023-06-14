import React from 'react'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'

const ApprovedResort = () => {
  return (
    <div className='flex'>
        <Navbars/>
       <div className='flex-1'>
        <Headers name={'List of approved Resorts'}/>
        </div> 
        
    </div>
  )
}

export default ApprovedResort