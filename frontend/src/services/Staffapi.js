import { staffAxiosInstance } from "../axios/instance";

const staffregister=(data)=>{
    console.log(data,"data of the staff register page ")
    return staffAxiosInstance.post('/staffregister',data)
}


const stafflogin =(data)=>{
    console.log(data,"data of thelogin  staff")
    return staffAxiosInstance.post('/stafflogin',data)
}
const staffverify=(data)=>{
    console.log(data,"data of staff")
    return staffAxiosInstance.post(`/verifystaffemail/${data}`)
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
    return staffAxiosInstance.get('/getresortdata')
}
const editpostresortdatas=(data,id)=>{
    console.log(data,id,"data editing working..")
    return staffAxiosInstance.post(`/posteditresort/${id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const disableresort=(id)=>{
    console.log(id,"disable working...")
    return staffAxiosInstance.post(`/disableresort/${id}`)  
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
    return staffAxiosInstance.get('/getadvdata')
}
const editadvpost=(id,data)=>{
    console.log(id,"id getting....")
    return staffAxiosInstance.post(`/posteditadv/${id}`,data,{
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
    return staffAxiosInstance.get('/getdestdata')
}
const editdestination=(data,id)=>{
    return staffAxiosInstance.post(`/posteditdest/${id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })

}
const get_book_data=()=>{
    return staffAxiosInstance.get('/getbookedresortdata')
}



export {staffregister,stafflogin,staffresort,staffverify,getResortData,editpostresortdatas,disableresort,authStaff,staffadv,getStaffAdv,editadvpost,AddDest,getDest,editdestination,get_book_data}
