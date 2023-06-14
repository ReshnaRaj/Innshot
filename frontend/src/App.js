
// import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
// import LoginPage from './pages/user/LoginPage'
// import RegisterPage from './pages/user/RegisterPage'
// import UserHome from './pages/user/UserHome';
import StaffRoute from "./routes/StaffRoute";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from './routes/UserRoute'
// import StaffLogin from './pages/staff/Login';
// import StaffRegister from './pages/staff/Register';
// import StaffHome from './pages/staff/StaffHome';
// import StaffResort from './pages/staff/StaffResort';
// import AdResort from './pages/staff/AdResort';
// import StafAdventure from './pages/staff/StafAdventure';
// import AdminLogin from './pages/Admin/Login'
// import Adminhome from './pages/Admin/Dashboard'

import 'react-toastify/dist/ReactToastify.css'
// import EmailVerify from './components/LoginPages/EmailVerify';
// import EmailVerifystaff from './components/LoginPages/EmailVerifystaff';
// import EditResort from './pages/staff/EditResort';
// import ResortList from './pages/Admin/ResortList';
// import PendingRequest from './components/AdminPages/PendingRequest';
// import ViewResort from './components/AdminPages/ViewResort';
// import Resort from './components/Userpages/Resort';

function App() {
  return (
    
 <BrowserRouter>
 <Routes>
  {/* <Route exact path='/register' element={<RegisterPage/>}/>
  <Route exact path='/login' element={<LoginPage/>}/> */}
  <Route exact path='/*' element={<UserRoute/>}/>
  <Route exact path='/staff/*' element={<StaffRoute/>}/>
  <Route exact path='/admin/*' element={<AdminRoute/>}/>
  {/* <Route exact path='/stafflogin' element={<StaffLogin/>}/>
  <Route exact path='/staffregister' element={<StaffRegister/>}/>
  <Route exact path='/staffhome' element={<StaffHome/>}/>
  <Route exact path='/staffresorts' element={<StaffResort/>}/>
  <Route exact path='/add-resort' element={<AdResort/>}/>
  <Route exact path='/editresort' element={<EditResort/>}/>
  <Route exact path='/staffadventure' element={<StafAdventure/>}/> */}
  {/* <Route exact path='/adlogin' element={<AdminLogin/>}/> */}
  {/* <Route exact path="/verifyemail/:id" element={<EmailVerify/>} /> */}
  {/* <Route exact path="/verifystaffemail/:id" element={<EmailVerifystaff/>} /> */}
  {/* <Route exact path='/adminhome' element={<Adminhome/>}/>
  <Route exact path='/adminallresort' element={<ResortList/>}/>
  <Route exact path='/pendingrequest' element={<PendingRequest/>}/>
  <Route exact path='/viewresort' element={<ViewResort/>}/>
  <Route exact path='/allresort' element={<Resort/>}/> */}

 </Routes>
 </BrowserRouter>
  );
}

export default App;
