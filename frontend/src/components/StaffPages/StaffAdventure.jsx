import React from 'react'
import Navbar from './layout/Navbar'
import Headerr from './layout/Headerr'

const StaffAdventure = () => {
  return (
    <div className='flex'>
        <Navbar/>
        <div className='flex-1'>
            <Headerr name={'Adventure  Activities'}/>
            <div className='p-4'>
                <h2 className='text-xl font-bold mb-4'>
                    Details of Adventure
                </h2>
            </div>
        </div>
        
    </div>
  )
}

export default StaffAdventure