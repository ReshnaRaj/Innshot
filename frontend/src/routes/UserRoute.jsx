import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginPage from '../pages/user/LoginPage'
import RegisterPage from '../pages/user/RegisterPage'
import UserHome from '../pages/user/UserHome';
import EmailVerify from '../components/LoginPages/EmailVerify';
import ResortList from '../components/Userpages/Resort'
const UserRoute = () => {
  return (
    <>
    <Routes>
    <Route exact path='/' element={<UserHome/>}/>
    <Route exact path='/register' element={<RegisterPage/>}/>
    <Route exact path='/login' element={<LoginPage/>}/>
    <Route exact path="/verifyemail/:id" element={<EmailVerify/>} />
    <Route exact path='/resortlist' element={<ResortList/>}/>
    </Routes>
    </>
  )
}

export default UserRoute