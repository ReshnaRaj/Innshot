import React from "react";
import { Route, Routes } from "react-router-dom";
import ResortList from "../pages/Admin/ResortList";
import PendingRequest from "../components/AdminPages/PendingRequest";
import ViewResort from "../components/AdminPages/ViewResort";
import AdminLogin from "../pages/Admin/Login";
import Adminhome from "../pages/Admin/Dashboard";
import PrivateRoute from "../Protectedroute/PrivateRoute";
import AllAdventure from "../components/AdminPages/AllAdventure";
import AllDestination from "../components/AdminPages/AllDestination";
import ViewAdventure from "../components/AdminPages/ViewAdventure";
import ViewDestination from "../components/AdminPages/ViewDest";
import AllResorters from "../components/AdminPages/AllStaff";
import AllBookings from "../components/AdminPages/AllBookings";
import Error from '../components/Error/Admin'
const AdminRoute = () => {
  return (
    <>
      <Routes>
        
        <Route  path='/adlogin' element={<AdminLogin />} />
        <Route
          element={<PrivateRoute role={"admin"} route={'/admin/adlogin'} />}
        >
          <Route  path="/adminhome" element={<Adminhome />} />
          <Route  path="/adminallresort" element={<ResortList />} />
          <Route  path="/pendingrequest" element={<PendingRequest />} />
          <Route  path="/viewresort/:id" element={<ViewResort />} />
          <Route  path="/adminadventure" element={<AllAdventure />} />
          <Route  path="/viewactivity/:id" element={<ViewAdventure />} />
          <Route  path="/admindestination" element={<AllDestination />} />
          <Route
            
            path="/viewdestination/:id"
            element={<ViewDestination />}
          />
          <Route  path="/allstaff" element={<AllResorters />} />
          <Route path="/allbookings" element={<AllBookings />} />
          {/* <Route exact path='/allresort' element={<Resort/>}/> */}
        </Route>
        <Route   path='/*' element={<Error/>}/>
      </Routes>
    </>
  );
};

export default AdminRoute;
