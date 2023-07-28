import React from 'react'
import { Route, Routes } from 'react-router-dom'
import StaffLogin from '../pages/staff/Login';
import StaffRegister from '../pages/staff/Register';
import StaffHome from '../pages/staff/StaffHome';
import StaffResort from '../pages/staff/StaffResort';
import AdResort from '../pages/staff/AdResort';
import StafAdventure from '../pages/staff/StafAdventure';
import EditResort from '../pages/staff/EditResort';
import StaffDest from '../components/StaffPages/StaffDest';
import EmailVerifystaff from '../components/LoginPages/EmailVerifystaff';
import PrivateRoute from '../Protectedroute/PrivateRoute';
import AddDestination from '../components/StaffPages/AddDestination';
import EditDest from '../components/StaffPages/EditDest';
import Booking from '../components/StaffPages/Booking';
import Error from '../components/Error/Staff'
 
import Chatwithuser from '../pages/chat/Chatwithuser';
const StaffRoute = () => {
  return (
    <>
    <Routes>
    <Route path='/*' element={<Error/>}/>
    <Route  path='/staffLogin' element={<StaffLogin/>}/>
    <Route  path='/staffRegister' element={<StaffRegister/>}/>
    <Route  path="/verifyStaffemail/:id" element={<EmailVerifystaff/>} />
    <Route element={<PrivateRoute role={'staff'} route={'/staff/staffLogin'}/>}>
    <Route  path='/staffHome' element={<StaffHome/>}/>
    <Route  path='/staffResorts' element={<StaffResort/>}/>
    <Route  path='/add-resort' element={<AdResort/>}/>
    <Route  path='/editResort' element={<EditResort/>}/>
    <Route  path='/staffAdventure' element={<StafAdventure/>}/>
    <Route  path='/staffDestination' element={<StaffDest/>}/>
    <Route  path='/add-dest' element={<AddDestination/>}/>
    <Route  path='/editDest' element={<EditDest/>}/>
    <Route  path='/hotelBookings' element={<Booking/>}/>
  
    <Route path='/chatWithUser' element={<Chatwithuser/>}/>
    
    </Route>
    </Routes>
    </>
  )
}

export default StaffRoute