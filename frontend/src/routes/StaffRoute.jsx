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
const StaffRoute = () => {
  return (
    <>
    <Routes>
    <Route exact path='/stafflogin' element={<StaffLogin/>}/>
    <Route exact path='/staffregister' element={<StaffRegister/>}/>
    <Route exact path="/verifystaffemail/:id" element={<EmailVerifystaff/>} />
    <Route element={<PrivateRoute role={'staff'} route={'/staff/stafflogin'}/>}>
    <Route exact path='/staffhome' element={<StaffHome/>}/>
    <Route exact path='/staffresorts' element={<StaffResort/>}/>
    <Route exact path='/add-resort' element={<AdResort/>}/>
    <Route exact path='/editresort' element={<EditResort/>}/>
    <Route exact path='/staffadventure' element={<StafAdventure/>}/>
    <Route exact path='/staffdestination' element={<StaffDest/>}/>
    <Route exact path='/add-dest' element={<AddDestination/>}/>
    <Route exact path='/editdest' element={<EditDest/>}/>
    
    </Route>
    </Routes>
    </>
  )
}

export default StaffRoute