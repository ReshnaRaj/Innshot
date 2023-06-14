import { userAxiosInstance } from "../axios/instance";
const userregister=(data)=>{
    console.log(data)
    return userAxiosInstance.post('/register',data)
}
const userlogin=(data)=>{
    console.log(data,"data of the user")
    return userAxiosInstance.post('/login',data)
}
const userverify=(data)=>{
    return userAxiosInstance.post(`/verifyemail/${data}`)
}
const getuserresort=()=>{
    console.log("user resort page working...")
    return userAxiosInstance.get('/resortlist')
}


export {userregister,userlogin,userverify,getuserresort}