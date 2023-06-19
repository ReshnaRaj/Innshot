import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Headerr";
import { getResortData, staffadv, getStaffAdv } from "../../services/Staffapi";
import { ToastContainer, toast } from "react-toastify";

const StaffAdventure = () => {
  const [AdvActivity, setAdvActivity] = useState([]);
  const [activity, setActivity] = useState("");
  const [price, setPrice] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [desc, setDesc] = useState("");
  const [resort, setResort] = useState("");
  const [list, setList] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    getAdvData();
  }, []);
  const handleModalOpen = () => {
    // console.log("modal working....")
    getresortData();
  };
  const getresortData = async () => {
    try {
      let { data } = await getResortData();
      console.log(data, "data of resort ");

      if (data.success) {
        // console.log(data.result,"result consoling...")
        setList(data.result);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getAdvData = async () => {
    try {
      let { data } = await getStaffAdv();
      if (data.success) {
        setAdvActivity(data.result);
      }
    } catch (error) {}
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("adventureactivity", activity);
    formData.append("adventureprice", price);
    formData.append("adventureTime", time);
    formData.append("adventureplace", place);
    formData.append("adventureresort", resort);
    formData.append("adventuredesc", desc);

    for (let i = 0; i < image.length; i++) {
      const img = image[i];
      formData.append("adventureimage", img);
    }
    try {
      const adv = await staffadv(formData);
      console.log(adv, "adventure formdata");
      if (adv.data.created) {
        toast.success(adv.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.log(error, "Error in adv");
    }

    // Perform your API call or further processing with the formData
    // ...
  };
  // console.log(resort, "pppppppppppppppp");
  // console.log(AdvActivity, "22222222");

  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <Headerr name={"Adventure  Activities"} />
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-xl font-bold mb-4">Details of Adventure</h2>

           
            <label htmlFor="my_modal_6" className="btn">
              Add Activity
            </label>

            <input
              type="checkbox"
              id="my_modal_6"
              onClick={handleModalOpen}
              className="modal-toggle"
            />
          
          <div className="modal">
            <div className="modal-box">
              <form
                onSubmit={handleSubmit}
                className="form-control w-full max-w-xs"
              >
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Activity Name</span>
                  </label>
                  <input
                    value={activity}
                    type="text"
                    onChange={(e) => {
                      const actname = e.target.value.replace(/[^a-zA-Z]/g, " ");
                      setActivity(actname);
                    }}
                    placeholder="Enter the Activity Name"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    value={price}
                    onChange={(e) => {
                      const actprice = e.target.value.replace(/[^0-9]/g, "");
                      if (actprice.length <= 4) {
                        setPrice(actprice);
                      }
                    }}
                    type="number"
                    placeholder="Enter the price"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => {
                      const acttime = e.target.value.replace(/[^0-9]/g, " ");
                      // console.log("actime",acttime);
                      setTime(acttime);
                      console.log(acttime, "after setting..");
                    }}
                    placeholder="Enter the time"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    <span className="label-text">Place</span>
                  </label>
                  <input
                    value={place}
                    onChange={(e) => {
                      setPlace(e.target.value);
                    }}
                    type="text"
                    placeholder="Enter the place"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <label className="label">
                    <span className="label-text">Overview </span>
                  </label>
                  <textarea
                    value={desc}
                    onChange={(e) => {
                      // const words=e.target.value.split(' ')
                      // console.log(words,"words coming...")
                      setDesc(e.target.value);
                    }}
                    placeholder="About the activity"
                    className="textarea textarea-bordered textarea-md w-full max-w-xs"
                  ></textarea>

                  <label className="label">
                    <span className="label-text">Provided by this Resort</span>
                  </label>
                  <select
                    value={resort}
                    onChange={(e) => {
                      // console.log(resort,"tttttttt")
                      setResort(e.target.value);
                    }}
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled value="">
                      List of resorts
                    </option>
                    {list.map((place, index) => (
                      <option key={index} value={place.resortname}>
                        {place.resortname}
                      </option>
                    ))}
                  </select>

                  <label className="label">
                    <span className="label-text">Images of Activity</span>
                  </label>
                  <input
                    type="file"
                    onChange={(e) => {
                      console.log("dddd");
                      setImage(e.target.files);
                    }}
                    className="file-input file-input-bordered w-full max-w-lg"
                    multiple
                  />
                </div>

                <div className="modal-action">
                  <button type="submit" className="btn">
                    Add
                  </button>
                </div>
              </form>
            </div>
            <ToastContainer />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table mx-auto w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Adventure Name</th>
                  <th>Place</th>
                  <th>Price</th>
                  <th>Conducted By</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {AdvActivity.map((item, index) => (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{item.activity}</td>
                    <td>{item.place}</td>
                    <td>{item.price}</td>
                    <td>{item.resortName}</td>
                     <label htmlFor="my_modal_6" className="btn btn-info">
              Edit
            </label>

            <input
              type="checkbox"
              id="my_modal_6"
             
              className="modal-toggle"
            />
            <div className="modal">
            <div className="modal-box">
              <form
               
                className="form-control w-full max-w-xs"
              >
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Activity Name</span>
                  </label>
                  <input
                    value={activity}
                    type="text"
                    
                    placeholder="Enter the Activity Name"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    value={price}
                    
                    type="number"
                    placeholder="Enter the price"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <label className="label">
                    <span className="label-text">Time</span>
                  </label>
                  <input
                    type="number"
                    value={time}
                    
                    placeholder="Enter the time"
                    className="input input-bordered w-full max-w-xs"
                  />
                  <label className="label">
                    <span className="label-text">Place</span>
                  </label>
                  <input
                    value={place}
                    
                    type="text"
                    placeholder="Enter the place"
                    className="input input-bordered w-full max-w-xs"
                  />

                  <label className="label">
                    <span className="label-text">Overview </span>
                  </label>
                  <textarea
                    value={desc}
                    
                    placeholder="About the activity"
                    className="textarea textarea-bordered textarea-md w-full max-w-xs"
                  ></textarea>

                  <label className="label">
                    <span className="label-text">Provided by this Resort</span>
                  </label>
                  <select
                    value={resort}
                    
                    className="select select-bordered w-full max-w-xs"
                  >
                    <option disabled value="">
                      List of resorts
                    </option>
                   
                  </select>

                  <label className="label">
                    <span className="label-text">Images of Activity</span>
                  </label>
                  <input
                    type="file"
                   
                    className="file-input file-input-bordered w-full max-w-lg"
                    multiple
                  />
                </div>

                <div className="modal-action">
                  <button type="submit" className="btn">
                    Update
                  </button>
                </div>
              </form>
            </div>
            <ToastContainer />
            </div>
                  </tr>
                ))}
              </tbody>
              
            </table>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default StaffAdventure;
