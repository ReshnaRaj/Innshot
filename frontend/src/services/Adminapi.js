import { adminAxiosInstance } from "../axios/instance";


const adminlogin=(data)=>{
    return adminAxiosInstance.post('/adLogin',data)
}
const getAllData=()=>{
    console.log('getting')
    return adminAxiosInstance.get('/getallResortData')
}
const approveresort=(id)=>{
    console.log("approve or reject")
    return adminAxiosInstance.post(`/approveresort/${id}`)
}
const getuniqueresort=(id)=>{
    console.log('resort view page working')
    return adminAxiosInstance.get(`/getUniqueResort/${id}`)
}
const authAdmin=()=>{
    // console.log('privete root of admin is going to backend ')
    return adminAxiosInstance.get('/isAdminauth')
}
const getalladvData=()=>{
    // console.log("get all adv data")
    return adminAxiosInstance.get("/getAllAdvData")
}
const getuniqadv=(id)=>{
    console.log(id,"uniqqqq")
    return adminAxiosInstance.get(`/getUniqAdv/${id}`)
}
const approveadvent=(id)=>{
    // console.log("approve or reject")
    return adminAxiosInstance.post(`/approveAdvent/${id}`)
}
const getalldestData=()=>{
    // console.log("get all adv data")
    return adminAxiosInstance.get("/getAllDestData")
}
const getuniqdest=(id)=>{
    console.log(id,"uniqqqq")
    return adminAxiosInstance.get(`/getUniqDest/${id}`)
}
const approvedest=(id)=>{
    // console.log("approve or reject")
    return adminAxiosInstance.post(`/approveDest/${id}`)
}
const getAllstaff=()=>{
console.log("getting data....")
    return adminAxiosInstance.get("/getAllstaff")
}
const blockstaff=(id)=>{
    console.log(id,"blocking working...")
    return adminAxiosInstance.post(`/blockStaff/${id}`)
}
const rejectresort=(id,data)=>{
    console.log(id,"ffffff")
    console.log(data,"rejection reason getting in services...")
    return adminAxiosInstance.post(`/rejectResort/${id}`,{data})
}
const approveresortt=(id)=>{
    return adminAxiosInstance.post(`/approvedResort/${id}`)
}
const getall_bookings=()=>{
    console.log("something going ")
    return adminAxiosInstance.get('/getAllBookings')
}
export {adminlogin,getAllData,approveresort,authAdmin,getuniqueresort,getalladvData,getuniqadv,approveadvent,getalldestData,getuniqdest,approvedest,getAllstaff,blockstaff,rejectresort,approveresortt,getall_bookings}