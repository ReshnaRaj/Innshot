import React, { useState,useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Headerr from './layout/Headerr'
import { editpostresortdatas } from '../../services/Staffapi'
import {  baseUrl} from '../../files/file';
import { ToastContainer, toast } from "react-toastify";



const EditResort = () => {
  // const [resortt,setresortt]=useState({
  //   resortname:'',
  //   number_room:'',
  //   address:'',
  //   place:'',
  //   description:'',
  //   image:[],
  //   file:'',
  //   price:'',
  //   phone:''

  // })
  const [resortname,setresortname]=useState('')
  const [number_room,setnum]=useState('')
  const [address,setaddress]=useState('')
  const [place,setplace]=useState('')
  const [description,setdescription]=useState('')
  const [image,setimage]=useState([])
  const [file,setfile]=useState('')
  const [price,setprice]=useState('')
  const [phone,setphone]=useState('')
  const [id,setid]=useState('')
  const location=useLocation()
  const items=location.state?.item
  console.log(items,"resorrrrrrrrrrr")
  const [images,setimages]=useState([])
  const [doc,setdoc]=useState('')

  useEffect(() => {
      // setresortt(items)
      setresortname(items.resortname);
      setnum(items.number_room)
      setaddress(items.address)
      setplace(items.place)
      setdescription(items.description)
      setimage(items.image)
      setfile(items.document)
      setprice(items.price)
      setphone(items.phone)
      setid(items._id)

    
  }, []);
  // console.log(image,"lllllllllllllll")

  const handleEditSubmit=async (e)=>{
    e.preventDefault();
    const formData=new FormData()
    formData.append('resortname',items.resortname)
    formData.append('place',items.place)
    formData.append('address',items.address)
    formData.append('description',items.description)
    formData.append('price',items.price)
    formData.append('phone',items.phone)
    for(let i=0;i<image.length;i++){
      const file=image[i]
      // console.log(file,"ddddddddddddd")
      formData.append('image',file)
    }
    
    // console.log(image,"image success")
    // console.log(file,"file success")
  
    console.log("edit submitting working")
    let data =await editpostresortdatas({resortname,number_room,address,place,description,price,phone,id,image,file})
    console.log(data,"resort coming...")
    if(data.data.success)
      {
        console.log("inside toast")
       console.log(data.data.message,"message")
        toast.success(data.data.message,{
          position: "top-center",
        })
      
      }
    
    
 
  }
  
 

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"Edit Resort Details"} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Edit</h2>
          <form  onSubmit={handleEditSubmit} className="space-y-4">
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Resort Name
                </label>
                <input

                  type="text"
                 value={resortname} onChange={(e) =>
                  setresortname(e.target.value) }
                  placeholder="Type here"
                  className="input input-bordered input-md w-96 max-w-xs" required
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Place of the Resort
                </label>
                <input
                  type="text"
                  value={place} 
                  onChange={(e) =>
                    setplace(e.target.value) }
                  placeholder="Type here"
                  className="input input-bordered input-md w-full max-w-xs" required
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="form-control mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Address of the Resort
                </label>
                <textarea
                  value={address}
                  onChange={(e) =>
                    setaddress(e.target.value) }
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Bio" required
                ></textarea>
              </div>
              <div className="form-control">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Description
                </label>
                <textarea
                 value={description}
                 onChange={(e) =>
                  setdescription(e.target.value) }
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Bio" required
                ></textarea>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Phone number
                </label>
                <input
                  type="number"
                  value={phone}
                  onChange={(e) =>
                    setphone(e.target.value) }
                  placeholder="Type here"
                  className="input input-bordered input-md w-96 max-w-xs" required
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Price
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setprice(e.target.value) }
                  placeholder="Type here"
                  className="input input-bordered input-md w-full max-w-xs" required
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Certificate
                </label>
                <input
                  type="file"
                  className="file-input w-full max-w-xs" required  
                  // value={file}
                  onChange={(e) =>
                    setfile(e.target.files[0] )
                  }
                />
                
               <iframe src={`${baseUrl}${file}`} title="PDF Viewer" width="100%" height="100px" />

              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Images of the Resort
                </label>
                <input
                  type="file"
                  onChange={(e) =>{
                    setimage(e.target.files)
                  }}
                  className="file-input w-full max-w-xs"
                  multiple
                   required
                  
                
                />
                {image.map((img, index) => (
                  <img
                    key={index} 
                    src={`${baseUrl}/${img}`}
                    alt={`Image ${index + 1}`}
                    className="w-40 h-20 object-cover"
                  />
                  ))} 
                
              </div>
            </div> 
            <div>
              <label htmlFor="number_of_rooms" className="block font-bold mb-1">
                Number of Rooms
              </label>
              <input
                type="number"
                value={number_room}
                onChange={(e) =>
                  setnum(e.target.value) }
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs" required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Update Resort
              
            </button>
            
          </form>
          
        </div>
        <ToastContainer />
       
      </div>
      
    </div>
  )
}

export default EditResort