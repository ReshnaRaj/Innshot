import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { useSelector } from "react-redux";
import LoginPage from '../pages/user/LoginPage'
import RegisterPage from '../pages/user/RegisterPage'
import UserHome from '../pages/user/UserHome';
import EmailVerify from '../components/LoginPages/EmailVerify';
import ResortList from '../components/Userpages/Resort'
import PrivateRoute from '../Protectedroute/PrivateRoute';
import ResortData from '../components/Userpages/ResortData';
import Adventure from '../components/Userpages/Adventure';
import AdventureData from '../components/Userpages/AdventureData';
import Destination from '../components/Userpages/Destination';
import DestinationData from '../components/Userpages/DestinationData'
import ResortBooking from '../components/Userpages/ResortBooking';
import Hotelpaying from '../components/Userpages/Hotelpaying';
import Booking from '../components/Userpages/Booking';
// import AdventureBooking from '../components/Userpages/AdventureBooking';
import Profile from '../components/Userpages/Profile';
 
import Error from '../components/Error/User'
import Chat from '../pages/chat/Chat'
const UserRoute = () => {
  const user = useSelector((state) => state.user);
  console.log(user,"user fata")
  return (
    <>
    <Routes>
    <Route   path='/*' element={<Error/>}/>
    <Route  path='/' element={<UserHome/>}/>
    <Route  path='/register' element={<RegisterPage/>}/>
    <Route  path='/login' element={<LoginPage/>}/>
    <Route  path="/verifyEmail/:id" element={<EmailVerify/>} />
    <Route  path='/resortList' element={<ResortList/>}/>
    <Route  path='/viewData/:id' element={<ResortData/>}/>
    <Route  path='/adventure' element={<Adventure/>}/>
    <Route  path='/viewAdventure/:id' element={<AdventureData/>}/>
    <Route  path='/destinations' element={<Destination/>}/>
    <Route  path='/viewDestination/:id' element={<DestinationData/>}/>
   
    <Route element={<PrivateRoute role={'user'} route={'/login'} />}>
    
    <Route  path='/viewBook' element={<ResortBooking/>}/>
    <Route  path='/hotelBooking' element={<Hotelpaying/>}/>
    <Route  path='/profile' element={<Profile/>}/>
    <Route  path='/myBooking' element={<Booking/>}/>
    <Route  path='/chat' element= {<Chat/>}/>
    
    </Route>
    </Routes>
    </>
  )
}

export default UserRoute