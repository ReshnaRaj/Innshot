import React, { useState } from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Headerr";
import { staffresort } from "../../services/Staffapi";
import { ToastContainer, toast } from "react-toastify";
const AddResort = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [resortData, setResortData] = useState({
    resortname: "",
    number_room: "",
    address: "",
    place: "",
    description: "",
    image: [],
    file: null,
    services: [],
    price: "",
    phone: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const descriptionWords = resortData.description.trim().split(/\s+/).length;
    const addres = resortData.address.trim().split(/\s+/).length;

    if (
      resortData.resortname === "" ||
      resortData.number_room === "" ||
      resortData.address === "" ||
      resortData.place === "" ||
      resortData.description === "" ||
      resortData.image.length === 0 ||
      resortData.file === "" ||
      resortData.services.length === 0 ||
      resortData.price === "" ||
      resortData.phone === ""
    ) {
      toast.error("Please fill all the required fields.", {
        position: "top-center",
      });
      return;
    }
    else if (addres<= 5) {
      toast.error("Address should be 5 character", {
        position: "top-center",
      });
    }
   
   else if (descriptionWords <= 80) {
      console.log("inside the condition...");
      toast.error("description atleast be 80 characters", {
        position: "top-center",
      });
    }
    
    else {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("resortname", resortData.resortname);
      formData.append("place", resortData.place);
      formData.append("address", resortData.address);
      formData.append("description", resortData.description);
      formData.append("price", resortData.price);
      formData.append("phone", resortData.phone);
      formData.append("resort_services", resortData.services);

      for (let i = 0; i < resortData.image.length; i++) {
        const file = resortData.image[i];

        formData.append("image", file);
      }
      // while adding the services of resort i want to convert it into array of strings
      // const formattedServices = [];
      // let currentService = "";

      // for (let i = 0; i < resortData.services.length; i++) {
      //   if (resortData.services[i] === "," && currentService !== "") {
      //     formattedServices.push(currentService.trim());
      //     currentService = "";
      //   } else {
      //     currentService += resortData.services[i];
      //   }
      // }

      // if (currentService !== "") {
      //   formattedServices.push(currentService.trim());
      // }

      // for (let i = 0; i < formattedServices.length; i++) {
      //   formData.append("resort_services", formattedServices[i]);
      // }
      formData.append("number_room", resortData.number_room);
      formData.append("document", resortData.document);

      // Add logic to handle the form submission (e.g., sending data to the server)
      try {
        // console.log("resort data submitting from formData");

        const response = await staffresort(formData);
        console.log(response, "response printed...");
        if (response.data.created) {
          setIsLoading(false);
          console.log("inside toast");
          console.log(response.data.message, "message");
          toast.success(response.data.message, {
            position: "top-center",
          });
        }
      } catch (error) {
        console.log(error);
        // setIsLoading(false)
      }
    }
  };
  // console.log(isLoading, "spinnerrrr");
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"Resort Details"} />
        {/* {isLoading && <span className="loading loading-spinner text-success"></span> } */}
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Add Resort</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Resort Name
                </label>
                <input
                  value={resortData.resortname}
                  type="text"
                  onChange={(e) => {
                    setResortData({
                      ...resortData,
                      resortname: e.target.value,
                    });
                  }}
                  placeholder="Type here"
                  className="input input-bordered input-md w-96 max-w-xs"
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Place of the Resort
                </label>
                <input
                  type="text"
                  value={resortData.place}
                  onChange={(e) =>
                    setResortData({ ...resortData, place: e.target.value })
                  }
                  placeholder="Type here"
                  className="input input-bordered input-md w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="form-control mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Address of the Resort
                </label>
                <textarea
                  value={resortData.address}
                  onChange={(e) => {
                    setResortData({
                      ...resortData,
                      address: e.target.value,
                    });
                  }}
                  // onChange={(e) => {
                  //   const addres = e.target.value.split(" ");
                  //   if (addres.length <=5) {
                  //     setResortData({
                  //       ...resortData,
                  //       address: addres.join(" "),
                  //     });
                  //   }
                  // }}
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Address of the resort"
                ></textarea>
              </div>
              <div className="form-control">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Description
                </label>
                <textarea
                  value={resortData.description}
                  onChange={(e) => {
                    setResortData({
                      ...resortData,
                      description: e.target.value,
                    });
                    
                  }}
                  // onChange={(e) => {
                  //   const words = e.target.value.split(" ");
                  //   console.log(words, "words coming.....");
                  //   if (words.length <= 10 || e.target.value.length < 5500) {
                  //     setResortData({
                  //       ...resortData,
                  //       description: words.join(" "),
                  //     });
                  //   }
                  // }}
                  className="textarea textarea-bordered h-24 w-80"
                  placeholder="Description of the resort"
                ></textarea>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Phone number
                </label>
                <input
                  type="text"
                  value={resortData.phone}
                  onChange={(e) => {
                    const phoneNumber = e.target.value.replace(/[^0-9]/g, "");
                    console.log(phoneNumber, "gggggggg");
                    if (phoneNumber.length <= 10) {
                      setResortData({ ...resortData, phone: phoneNumber });
                    }
                  }}
                  placeholder="+91"
                  className="input input-bordered input-md w-96 max-w-xs"
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={resortData.price}
                  onChange={(e) => {
                    const Pricee = e.target.value.replace(/[^0-9]/g, "");
                    if (Pricee.length <= 5) {
                      setResortData({ ...resortData, price: Pricee });
                    }
                  }}
                  placeholder=""
                  className="input input-bordered input-md w-full max-w-xs"
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
                  onChange={(e) => {
                    const file = e.target.files[0];
                    const allowedFormats = ["application/pdf"];

                    if (file && allowedFormats.includes(file.type)) {
                      setResortData({
                        ...resortData,
                        document: file,
                      });
                    } else {
                      // File format not allowed, handle the error
                      setResortData({ ...resortData, document: null });
                      alert("Only PDF files are allowed.");
                      e.target.type = "text";
                      e.target.type = "file";
                    }
                  }}
                  className="file-input w-full max-w-xs"
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Images of the Resort
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    setResortData({ ...resortData, image: e.target.files });
                  }}
                  className="file-input w-full max-w-xs"
                  multiple
                />
                {/* {
                  files.map((img)=>(
                    <img src={URL.createObjectURL(img)}  width='200px' height='200px'/>
                  ))
                } */}
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full max-w-xs mr-4">
                <label
                  htmlFor="number_of_rooms"
                  className="block font-bold mb-1"
                >
                  Number of Rooms
                </label>
                <input
                  type="text"
                  value={resortData.number_room}
                  onChange={(e) => {
                    const rooms = e.target.value.replace(/[^0-9]/g, "");
                    if (rooms.length <= 2) {
                      setResortData({ ...resortData, number_room: rooms });
                    }
                  }}
                  placeholder="Enter no: of rooms:"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="w-full max-w-xs mr-4">
                <label htmlFor="resortname" className="block font-bold mb-1">
                  Services
                </label>
                <input
                  type="text"
                  value={resortData.services}
                  onChange={(e) => {
                  
                    setResortData({ ...resortData, services: e.target.value });
                  }}
                  placeholder="Enter the services"
                  className="input input-bordered input-md w-full max-w-xs"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded px-4 py-2"
              // disabled={isLoading}
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
