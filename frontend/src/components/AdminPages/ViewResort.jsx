import React, { useState,useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'
import { editpostresortdatas } from '../../services/Staffapi'
// import {  baseUrl} from '../../files/file';




const ViewResort = () => {
 
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

  useEffect(() => {
      // setresortt(items)
      setresortname(items.resortname);
      setnum(items.number_room)
      setaddress(items.address)
      setplace(items.place)
      setdescription(items.description)
      setimage(items.image)
      setfile(items.file)
      setprice(items.price)
      setphone(items.phone)
      setid(items._id)

    
  }, []);

  
 

  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"View "} />
        <div className="p-4">
         
          <form  className="space-y-4">
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
              {/* <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Certificate
                </label>
                <input
                  type="file"
                  className="file-input w-full max-w-xs" required  
                  value={file}
                />
                
               <iframe src={`${baseUrl}${file}`} title="PDF Viewer" width="100%" height="500px" />

              </div> */}
              {/* <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Images of the Resort
                </label>
                <input
                  type="file"
                 
                  className="file-input w-full max-w-xs"
                  multiple
                   required
                  
                
                />
              </div> */}
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
            
              
            </button>
            
          </form>
          
        </div>
        
       
      </div>
      
    </div>
  )
}

export default ViewResort