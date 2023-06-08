import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Headerr";
import { staffresort } from "../../services/Staffapi";
import { ToastContainer, toast } from "react-toastify";
const AddResort = () => {
  const [resortData, setResortData] = useState({
    resortname: "",
    number_room: "",
    address: "",
    place: "",
    // latitude:'',
    // longitude: '',
    description: "",
    image:[],
    file: "",
    price: "",
    phone: "",

  });
// console.log(resortData,"jjjjjjjjj");
  const handleSubmit = async (e) => {
    // console.log("submitting",resortData.image);
    // console.log('documen',resortData.document)
    e.preventDefault();
    const formData=new FormData();
    formData.append('resortname',resortData.resortname)
    formData.append('place',resortData.place)
    formData.append('address',resortData.address)
    formData.append('description',resortData.description)
    formData.append('price',resortData.price)
    formData.append('phone',resortData.phone)
    // formData.append('image',resortData.image)

    for(let i=0;i<resortData.image.length;i++){
      const file=resortData.image[i]
      // console.log(file,"ddddddddddddd")
      formData.append('image',file)
    }
    formData.append('number_room',resortData.number_room)
    formData.append('document',resortData.document)
    // console.log(resortData.document,"sssssssssssss")
   
    
    // Add logic to handle the form submission (e.g., sending data to the server)
    try {
      console.log("resort data submitting from formData");

      const response = await staffresort( formData);
      if(response.data.created)
      {
        console.log("inside toast")
       console.log(response.data.message,"message")
        toast.success(response.data.message,{
          position: "top-center",
        })
      
      }
      console.log("toastify working...")
      console.log(response, "response of data of resort");
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"Resort Details"} />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add Resort</h2>
          <form   onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Resort Name
                </label>
                <input

                  type="text"
                  onChange={(e) =>
                    setResortData({ ...resortData, resortname: e.target.value })
                  }
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
                  onChange={(e) =>
                    setResortData({ ...resortData, place: e.target.value })
                  }
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
                  onChange={(e) =>
                    setResortData({ ...resortData, address: e.target.value })
                  }
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Bio" required
                ></textarea>
              </div>
              <div className="form-control">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Description
                </label>
                <textarea
                  onChange={(e) =>
                    setResortData({
                      ...resortData,
                      description: e.target.value,
                    })
                  }
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
                  onChange={(e) =>
                    setResortData({ ...resortData, phone: e.target.value })
                  }
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
                  onChange={(e) =>
                    setResortData({ ...resortData, price: e.target.value })
                  }
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
                  // name='file'
                  onChange={(e) =>
                    setResortData({ ...resortData,document: e.target.files[0] })
                  }
                  className="file-input w-full max-w-xs" required
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Images of the Resort
                </label>
                <input
                  type="file"
                  onChange={(e) =>{
                    setResortData({...resortData,image:e.target.files})
                  }}
                  className="file-input w-full max-w-xs"
                  multiple
                   required
                />
                {/* {
                  files.map((img)=>(
                    <img src={URL.createObjectURL(img)}  width='200px' height='200px'/>
                  ))
                } */}
              </div>
            </div> 
            <div>
              <label htmlFor="number_of_rooms" className="block font-bold mb-1">
                Number of Rooms
              </label>
              <input
                type="number"
                onChange={(e) =>
                  setResortData({ ...resortData, number_room: e.target.value })
                }
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs" required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
            >
              Add Resort
              
            </button>
            
          </form>
          
        </div>
        <ToastContainer />
      </div>
      
    </div>
    
  );
};

export default AddResort;
