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
        
        <Route  path='/adLogin' element={<AdminLogin />} />
        <Route
          element={<PrivateRoute role={"admin"} route={'/admin/adLogin'} />}
        >
          <Route  path="/adminHome" element={<Adminhome />} />
          <Route  path="/adminAllResort" element={<ResortList />} />
          <Route  path="/pendingRequest" element={<PendingRequest />} />
          <Route  path="/viewResort/:id" element={<ViewResort />} />
          <Route  path="/adminAdventure" element={<AllAdventure />} />
          <Route  path="/viewActivity/:id" element={<ViewAdventure />} />
          <Route  path="/adminDestination" element={<AllDestination />} />
          <Route
            
            path="/viewDestination/:id"
            element={<ViewDestination />}
          />
          <Route  path="/allStaff" element={<AllResorters />} />
          <Route path="/allBookings" element={<AllBookings />} />
          {/* <Route exact path='/allresort' element={<Resort/>}/> */}
        </Route>
        <Route   path='/*' element={<Error/>}/>
      </Routes>
    </>
  );
};

export default AdminRoute;
