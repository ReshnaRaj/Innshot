import React, { useState, useEffect } from "react";
import Navbars from "./layout/Navbars";
import Headers from "./layout/Headers";
import { getAllData,approveresort } from "../../services/Adminapi";
import {  useNavigate } from "react-router-dom";

const PendingRequest = () => {
  const [data, setdata] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      let dataa = await getAllData();
      console.log(dataa, "data of all resorts");

      if (dataa.data) {
        console.log(dataa.data,"tttttttt")
        // const resortOwnerNames = dataa.data.map(
        //   (resort) => resort.resortowner.name
        // );
        // console.log("Resort Owner Names:", resortOwnerNames);
        setdata(dataa.data);
      }
    } catch (error) {
      console.log(error, "error coming..");
    }
  };
  const handleapprove=async(resortId)=>{
    try {
      let data=await approveresort(resortId)
      if(data){
        getData()
      }
      
    } catch (error) {
      console.log(error,"error")
      
    }
  }
  const handleView = async (item) => {
    try {
      console.log(item, "resortid coming...");

      navigate("/viewresort", { state: { item } });
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
  <div className="input-group">
    <input type="text" placeholder="Search…" className="input input-bordered" />
    <button className="btn btn-square">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
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
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.resortname}</td>
                  <td>{item.resortowner.name}</td>
                  <td>{item.place}</td>
                  <td></td>
                 
                  
                  <button onClick={() => {
                      console.log(item, "item is coming....");
                      handleView(item);
                    }}className="btn btn-sm btn-info"  style={{ marginRight: "10px" }}>View</button>
                  <button onClick={()=>handleapprove(item._id)} className="btn btn-sm btn-success">Approve</button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PendingRequest;
