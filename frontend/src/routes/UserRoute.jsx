import React from 'react'
import { Route,Routes } from 'react-router-dom'
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
const UserRoute = () => {
  return (
    <>
    <Routes>
    <Route exact path='/' element={<UserHome/>}/>
    <Route exact path='/register' element={<RegisterPage/>}/>
    <Route exact path='/login' element={<LoginPage/>}/>
    <Route exact path="/verifyemail/:id" element={<EmailVerify/>} />
    <Route exact path='/resortlist' element={<ResortList/>}/>
    <Route exact path='/viewdata/:id' element={<ResortData/>}/>
    <Route exact path='/adventure' element={<Adventure/>}/>
    <Route exact path='/viewadventure/:id' element={<AdventureData/>}/>
    <Route eaxct path='/destinations' element={<Destination/>}/>
    <Route exact path='/viewdestination/:id' element={<DestinationData/>}/>
    <Route element={<PrivateRoute role={'user'} route={'/login'}/>}>
   
   
    
    </Route>
    </Routes>
    </>
  )
}

export default UserRoute