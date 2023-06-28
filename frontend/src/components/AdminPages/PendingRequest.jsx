import React, { useState, useEffect } from "react";
import Navbars from "./layout/Navbars";
import Headers from "./layout/Headers";
import { getAllData, approveresort } from "../../services/Adminapi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const PendingRequest = () => {
  const [data, setdata] = useState([]);
  const [search,setSearch]=useState("")
  console.log(search,"searching working...")
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      let dataa = await getAllData();
      // console.log(dataa, "data of all resorts");

      if (dataa.data.resort) {
        console.log(dataa.data, "tttttttt");
        // const resortOwnerNames = dataa.data.map(
        //   (resort) => resort.resortowner.name
        // );
        // console.log("Resort Owner Names:", resortOwnerNames);
        setdata(dataa.data.resort);
      }
    } catch (error) {
      console.log(error, "error coming..");
    }
  };
  const handleapprove = async (resortId) => {
    try {
      let { data } = await approveresort(resortId);
      // console.log(data,"data from approve part of admin")
      if (data) {
        // console.log(data.message,"message came")
        toast.success(data.message, {
          position: "top-center",
        });
        getData();
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  const handleView = async (item) => {
    try {
      console.log(item, "resort full coming...");

      navigate(`/admin/viewresort/${item}`, { state: { item } });
    } catch (error) {}
  };
  // console.log(data,"ffffff")
  //    const handleToggle = (index) => {
  //     const updatedData = [...data];
  //     updatedData[index].checked = !updatedData[index].checked;
  //     setdata(updatedData);
  //   };

  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of Resorts"} />
        <div className="form-control float-right">
          <div className="form-control">
            <div className="input-group">
              <input onChange={(e)=>{
                setSearch(e.target.value)
              }}
                type="text"
                placeholder="Search…"
                className="input input-bordered mt-1 mb-1"
              />
             
            </div>
          </div>
        </div>
        <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Resort name</th>
                <th>Resort Owner</th>
                <th>Place</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.filter((item)=>{
                return search.toLowerCase()==='' ? item : item.resortname.toLowerCase().includes(search);
              }).map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.resortname}</td>
                  <td>{item?.resortowner?.name}</td>
                  <td>{item?.place}</td>
                  <td>{item?.verify ? "approved" : "rejected"}</td>

                  <button
                    onClick={() => {
                      console.log(item, "item is coming....");
                      handleView(item._id);
                    }}
                    className="btn btn-xs btn-info"
                    style={{ marginRight: "10px" }}
                  >
                    View
                  </button>
                  {item.verify === false ? (
                    <button
                      onClick={() => handleapprove(item._id)}
                      className="btn btn-xs btn-success"
                      style={{ marginRight: "10px" }}
                    >
                      Approve
                    </button>
                  ) : (
                    <button
                      onClick={() => handleapprove(item._id)}
                      className="btn btn-xs btn-error"
                      style={{ marginRight: "10px" }}
                    >
                      Reject
                    </button>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PendingRequest;
