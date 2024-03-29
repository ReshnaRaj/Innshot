import React, { useState,useEffect } from 'react'
import { useLocation} from 'react-router-dom'
import Navbar from './layout/Navbar'
import Headerr from './layout/Headerr'
import { editpostresortdatas } from '../../services/Staffapi'
import { ToastContainer, toast } from "react-toastify";
const EditResort = () => {
  const [resortname,setresortname]=useState('')
  const [number_room,setnum]=useState('')
  const [address,setaddress]=useState('')
  const [place,setplace]=useState('')
  const [description,setdescription]=useState('')
  const [image,setimage]=useState([])
  const [document,setdocument]=useState('')
  const [price,setprice]=useState('')
  const [phone,setphone]=useState('')
  const [service,setService]=useState([])
  const [id,setid]=useState('')
  const location=useLocation()
  const items=location.state?.item
  // const {id}=useParams()
  useEffect(() => {
      // setresortt(items)this code is used to show the details of resort of one resort
      // console.log(items,"data.....")
      setresortname(items.resortname);
      setnum(items.number_room)
      setaddress(items.address)
      setplace(items.place)
      setdescription(items.description)
      // setimage(items.image)
      // setdocument(items.document)
      setService(items.service)
      setprice(items.price)
      setphone(items.phone)
      setid(items._id)
  }, []);
  // console.log(id,"id getting from this sde ")
  // console.log(image,"lllllllllllllll")
  const handleEditSubmit=async (e)=>{
    e.preventDefault();
    const formData=new FormData()
    formData.append('resortname',resortname)
    formData.append('place',place)
    formData.append('address',address)
    formData.append('description',description)
    formData.append('price',price)
    formData.append('phone',phone)
    formData.append('number_rooms',number_room)
    formData.append('service',service)
    for(let i=0;i<image.length;i++){
      const file=image[i]
      // console.log(file,"ddddddddddddd")
      formData.append('image',file)
      
    }
    

    formData.append('document',document)
    // console.log("edit submitting working")
    // console.log(items_id,"id getting....")
    let data =await editpostresortdatas(formData,id)
    // console.log(data,"resort coming...")
    if(data.data.success)
      {
        // console.log("inside toast")
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
                    setdocument(e.target.files[0] )
                  }
                />
                
               {/* <iframe src={`${baseUrl}${file}`} title="PDF Viewer" width="100%" height="100px" /> */}

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
                {/* {image.map((img, index) => (
                  <img
                    key={index} 
                    src={`${baseUrl}/${img}`}
                    alt={`Image ${index + 1}`}
                    className="w-40 h-20 object-cover"
                  />
                  ))}  */} 
              </div>
            </div> 
            <div className='flex flex-wrap'>
              <div className='w-full max-w-xs mr-4'>
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
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Services
                </label>
                <input
                  type="text"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  placeholder="Enter the services"
                  className="input input-bordered input-md w-full max-w-xs"
                />
              </div>
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