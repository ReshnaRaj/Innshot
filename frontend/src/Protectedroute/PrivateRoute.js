import React, { useState,useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {authUser} from '../services/Userapi'
import {authAdmin} from '../services/Adminapi'
import { authStaff } from '../services/Staffapi';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { setUserDetails,userlogout } from '../redux/userSlice';
import { adminlogin, adminlogout, setAdminDetails } from '../redux/adminSlice';
import { setStaffDetails, staffLogout } from '../redux/staffSlice';


function PrivateRoute({role,route}) {
  let [auth,setAuth]=useState(null);
  const navigate=useNavigate()
  const dispatch=useDispatch()
  useEffect(()=>{
  
    if(role==='user'){
      // console.log(role,"real role...")
      authUser().then((response)=>{
        console.log(response.data,"ressss")
        if(!response.data.auth){
          // little bit confusion
          localStorage.removeItem('usertoken')
          dispatch(userlogout())
        }
        else if(response.data.auth){
          // console.log(response.data,"ffffff")
          dispatch(setUserDetails(response.data))
        }
        setAuth(response.data.auth)
      }).catch((response)=>{
        console.log(response,"aaaa")
        setAuth(response.data?.auth)
        navigate('/login')
        // i didnt get the need of code ..
      })

    }else if(role==='admin'){
      // console.log(role,"admin role...")
      authAdmin().then((respo)=>{
        // console.log("data display")
        console.log(respo,"data")
        if(!respo.data.auth){
          localStorage.removeItem('admintoken')
          
          dispatch(adminlogout())
          // navigate('/admin/adlogin')
        }
        else if(respo.data.auth){
          // console.log(respo.data,"admin email getting.........")
          dispatch(adminlogin(respo.data))
        } 
        setAuth(respo.data.auth)
      })
      .catch(respo=>{
        setAuth(respo.data?.auth)
        // console.log(respo.data.auth,"authentication.........")
        navigate('/admin/adlogin')
        // console.log("aaaaaa")
      })
    }else if(role==='staff'){
    authStaff().then(respon=>{
      if(!respon.data.auth){
        localStorage.removeItem('stafftoken')
        dispatch(staffLogout())
      }
      else{
        dispatch(setStaffDetails(respon.data))
      }
      setAuth(respon.data.auth)
    }).catch(respon=>{
      setAuth(respon.data?.auth)
      navigate('/staff/stafflogin')
    })
    }
  },[])
  if(auth===null) return 
  // console.log(typeof auth,auth)
  return (
   auth ? <Outlet/> : <Navigate to={route}/>
  )
}

export default PrivateRoute