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


export {userregister,userlogin,userverify,getuserresort,authUser,getresortdata,getsimiliarstay,getuseradventure}