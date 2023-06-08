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
    // console.log(data,"ggggggggggggggggggggggg")
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
const editpostresortdatas=(data)=>{
    console.log(data,"data editing working..")
    return staffAxiosInstance.post(`/posteditresort/${data.id}`,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    })
}
const disableresort=(id)=>{
    console.log(id,"deletion working...")
    return staffAxiosInstance.post(`/disableresort/${id}`)  
}



export {staffregister,stafflogin,staffresort,staffverify,getResortData,editpostresortdatas,disableresort}
