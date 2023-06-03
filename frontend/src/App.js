
// import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LoginPage from './pages/user/LoginPage'
import RegisterPage from './pages/user/RegisterPage'
import UserHome from './pages/user/UserHome';
import StaffLogin from './pages/staff/Login';
import StaffRegister from './pages/staff/Register';
import StaffHome from './pages/staff/StaffHome';
import StaffResort from './pages/staff/StaffResort';
import AdResort from './pages/staff/AdResort';
import StafAdventure from './pages/staff/StafAdventure';
import AdminLogin from './pages/Admin/Login'
import Adminhome from './pages/Admin/Dashboard'

import 'react-toastify/dist/ReactToastify.css'
import EmailVerify from './components/LoginPages/EmailVerify';
import EmailVerifystaff from './components/LoginPages/EmailVerifystaff';
function App() {
  return (
    
 <BrowserRouter>
 <Routes>
  <Route exact path='/register' element={<RegisterPage/>}/>
  <Route exact path='/login' element={<LoginPage/>}/>
  <Route exact path='/' element={<UserHome/>}/>
  <Route exact path='/stafflogin' element={<StaffLogin/>}/>
  <Route exact path='/staffregister' element={<StaffRegister/>}/>
  <Route exact path='/staffhome' element={<StaffHome/>}/>
  <Route exact path='/staffresorts' element={<StaffResort/>}/>
  <Route exact path='/add-resort' element={<AdResort/>}/>
  <Route exact path='/staffadventure' element={<StafAdventure/>}/>
  <Route exact path='/adlogin' element={<AdminLogin/>}/>
  <Route exact path="/verifyemail/:id" element={<EmailVerify/>} />
  <Route exact path="/verifystaffemail/:id" element={<EmailVerifystaff/>} />
  <Route exact path='/adminhome' element={<Adminhome/>}/>
  {/* <Route exact path='/adresort' element={<AdminResort/>}/> */}
  {/* <Route exact path='/adstaff' element={<AdminStaff/>}/> */}
 </Routes>
 </BrowserRouter>
  );
}

export default App;
