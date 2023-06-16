import { adminAxiosInstance } from "../axios/instance";


const adminlogin=(data)=>{
    return adminAxiosInstance.post('/adlogin',data)
}
const getAllData=()=>{
    console.log('getting')
    return adminAxiosInstance.get('/getallresortdata')
}
const approveresort=(id)=>{
    console.log("approve or reject")
    return adminAxiosInstance.post(`/approveresort/${id}`)
}
const getuniqueresort=(id)=>{
    console.log('resort view page working')
    return adminAxiosInstance.get(`/getuniqueresort/${id}`)
}
const authAdmin=()=>{
    // console.log('privete root of admin is going to backend ')
    return adminAxiosInstance.get('/isAdminauth')
}
export {adminlogin,getAllData,approveresort,authAdmin,getuniqueresort}