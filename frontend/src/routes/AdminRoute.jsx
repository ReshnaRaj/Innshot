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
        
        <Route exact path='/adlogin' element={<AdminLogin />} />
        <Route
          element={<PrivateRoute role={"admin"} route={'/admin/adlogin'} />}
        >
          <Route exact path="/adminhome" element={<Adminhome />} />
          <Route exact path="/adminallresort" element={<ResortList />} />
          <Route exact path="/pendingrequest" element={<PendingRequest />} />
          <Route exact path="/viewresort/:id" element={<ViewResort />} />
          <Route exact path="/adminadventure" element={<AllAdventure />} />
          <Route exact path="/viewactivity/:id" element={<ViewAdventure />} />
          <Route exact path="/admindestination" element={<AllDestination />} />
          <Route
            exact
            path="/viewdestination/:id"
            element={<ViewDestination />}
          />
          <Route exact path="/allstaff" element={<AllResorters />} />
          <Route exact path="/allbookings" element={<AllBookings />} />
          {/* <Route exact path='/allresort' element={<Resort/>}/> */}
        </Route>
        <Route   path='/*' element={<Error/>}/>
      </Routes>
    </>
  );
};

export default AdminRoute;
