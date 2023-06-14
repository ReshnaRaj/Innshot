import React from 'react'
import {Route,Routes} from 'react-router-dom'
import ResortList from '../pages/Admin/ResortList';
import PendingRequest from '../components/AdminPages/PendingRequest';
import ViewResort from '../components/AdminPages/ViewResort';
import AdminLogin from '../pages/Admin/Login'
import Adminhome from '../pages/Admin/Dashboard'

const AdminRoute = () => {
  return (
    <>
    <Routes>
    <Route exact path='/adlogin' element={<AdminLogin/>}/>
    <Route exact path='/adminhome' element={<Adminhome/>}/>
  <Route exact path='/adminallresort' element={<ResortList/>}/>
  <Route exact path='/pendingrequest' element={<PendingRequest/>}/>
  <Route exact path='/viewresort/:id' element={<ViewResort/>}/>
  {/* <Route exact path='/allresort' element={<Resort/>}/> */}
    </Routes>
    </>
  )
}

export default AdminRoute