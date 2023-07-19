// import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import StaffRoute from "./routes/StaffRoute";
import AdminRoute from "./routes/AdminRoute";
import UserRoute from './routes/UserRoute'
import 'react-toastify/dist/ReactToastify.css'
import Error from './components/Error/Admin'
function App() {
  return (
 <BrowserRouter>
 <Routes>
  <Route exact path='/*' element={<UserRoute/>}/>
  <Route exact path='/staff/*' element={<StaffRoute/>}/>
  <Route exact path='/admin/*' element={<AdminRoute/>}/>
  <Route exact path='*' element={<Error/>}/>
 </Routes>
 </BrowserRouter>
  );
}
export default App;
