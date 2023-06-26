import { userAxiosInstance } from "../axios/instance";
const userregister=(data)=>{
    console.log(data)
    return userAxiosInstance.post('/register',data)
}
const userlogin=(data)=>{
    // console.log(data,"data of the user")
    return userAxiosInstance.post('/login',data)
}
const userverify=(data)=>{
    return userAxiosInstance.post(`/verifyemail/${data}`)
}
const getuserresort=()=>{
    console.log("user resort page working...")
    return userAxiosInstance.get('/resortlist')
}
const authUser=()=>{
    console.log("private root user root is going to backend...")
    return userAxiosInstance.get('/isUserAuth')
}
const getresortdata=(id)=>{
    return userAxiosInstance.get(`/oneresort/${id}`)
}
const getsimiliarstay=(data)=>{
    return userAxiosInstance.get(`/getsimiliarstay/${data}`)
}
const getuseradventure=()=>{
    console.log("user resort page working...")
    return userAxiosInstance.get('/adventurelist')
}
const  getuserdestination=()=>{
    return userAxiosInstance.get('/destinations')
}
const getadvData=(id)=>{
    // console.log(id,"id getting...")
    return userAxiosInstance.get(`/oneadv/${id}`)
}
const getDestinationData=(id)=>{
    console.log(id,"getting..")
    return userAxiosInstance.get(`/onedest/${id}`)
}
export {userregister,
    userlogin,userverify,getuserresort,authUser,
    getresortdata,getsimiliarstay,getuseradventure,
    getuserdestination,getadvData,getDestinationData}