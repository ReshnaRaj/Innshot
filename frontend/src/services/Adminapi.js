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
const getalladvData=()=>{
    // console.log("get all adv data")
    return adminAxiosInstance.get("/getalladvdata")
}
const getuniqadv=(id)=>{
    console.log(id,"uniqqqq")
    return adminAxiosInstance.get(`/getuniqadv/${id}`)
}
const approveadvent=(id)=>{
    // console.log("approve or reject")
    return adminAxiosInstance.post(`/approveadvent/${id}`)
}
const getalldestData=()=>{
    // console.log("get all adv data")
    return adminAxiosInstance.get("/getalldestdata")
}
const getuniqdest=(id)=>{
    console.log(id,"uniqqqq")
    return adminAxiosInstance.get(`/getuniqdest/${id}`)
}
const approvedest=(id)=>{
    // console.log("approve or reject")
    return adminAxiosInstance.post(`/approvedest/${id}`)
}
const getAllstaff=()=>{
console.log("getting data....")
    return adminAxiosInstance.get("getallstaff")
}
const blockstaff=(id)=>{
    console.log(id,"blocking working...")
    return adminAxiosInstance.post(`/blockstaff/${id}`)
}
const rejectresort=(id,data)=>{
    console.log(id,"ffffff")
    console.log(data,"rejection reason getting in services...")
    return adminAxiosInstance.post(`/rejectresort/${id}`,{data})
}
const approveresortt=(id)=>{
    return adminAxiosInstance.post(`/approvedresort/${id}`)
}
export {adminlogin,getAllData,approveresort,authAdmin,getuniqueresort,getalladvData,getuniqadv,approveadvent,getalldestData,getuniqdest,approvedest,getAllstaff,blockstaff,rejectresort,approveresortt}