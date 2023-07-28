import { staffAxiosInstance } from "../axios/instance";

const staffregister=(data)=>{
    console.log(data,"data of the staff register page ")
    return staffAxiosInstance.post('/staffRegister',data)
}


const stafflogin =(data)=>{
    console.log(data,"data of thelogin  staff")
    return staffAxiosInstance.post('/staffLogin',data)
}
const staffverify=(data)=>{
    console.log(data,"data of staff")
    return staffAxiosInstance.post(`/verifyStaffEmail/${data}`)
}
const staffresort=(data)=>{
    console.log(data,"ggggggggggggggggggggggg")
    return staffAxiosInstance.post('/add-resort',data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const getResortData=()=>{
    console.log("resort details")
    return staffAxiosInstance.get('/getResortData')
}
const editpostresortdatas=(data,id)=>{
    console.log(data,id,"data editing working..")
    return staffAxiosInstance.post(`/postEditResort/${id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const disableresort=(id)=>{
    console.log(id,"disable working...")
    return staffAxiosInstance.post(`/disableResort/${id}`)  
}
const authStaff=()=>{
    console.log("authstaff")
    return staffAxiosInstance.get('/isStaffAuth')
}
const staffadv=(data)=>{
    console.log("adv data added working")
    return staffAxiosInstance.post('/add-adv',data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const getStaffAdv=()=>{
    // console.log("advvvvvvvvvvv")
    return staffAxiosInstance.get('/getAdvData')
}
const editadvpost=(id,data)=>{
    console.log(id,"id getting....")
    return staffAxiosInstance.post(`/postEditAdv/${id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const AddDest=(data)=>{
    console.log(data,"ggggggggggggggggggggggg")
    return staffAxiosInstance.post('/add-dest',data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}

const getDest=()=>{
    // console.log("resort details")
    return staffAxiosInstance.get('/getDestData')
}
const editdestination=(data,id)=>{
    return staffAxiosInstance.post(`/postEditdest/${id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

}
const get_book_data=()=>{
    return staffAxiosInstance.get('/getBookedResortdata')
}
// starting of chat in staff side
const staffChats=(id)=>{
    console.log(id,"staff id in api call chat")
    return staffAxiosInstance.get(`/getStaffchat/${id}`)
}
const getStaff=(id)=>{
    console.log(id,"staff chhatting working..")
    return staffAxiosInstance.get(`/getUserData/${id}`)
}
const getstaffMessages=(id)=>{
    return staffAxiosInstance.get(`/getStaffMsg/${id}`)
}
const addMsg=(data)=>{
    return staffAxiosInstance.post('/adMsg',data)
}

export {staffregister,stafflogin,staffresort,staffverify,getResortData,editpostresortdatas,disableresort,authStaff,staffadv,getStaffAdv,editadvpost,AddDest,getDest,editdestination,get_book_data,staffChats,getStaff,getstaffMessages,addMsg}
