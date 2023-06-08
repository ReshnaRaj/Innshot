import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Headerr from "./layout/Headerr";
import Navbar from "./layout/Navbar";
import {
  getResortData,
  disableresort,
  editResort,
} from "../../services/Staffapi";

const StafResort = () => {
  const [resort, setresort] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getresortData();
  }, []);
  const getresortData = async () => {
    try {
      let data = await getResortData();
      console.log(data, "data of resort ");

      if (data) {
        setresort(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = async (item) => {
    try {
      console.log(item, "resortid coming...");

      navigate("/editresort", { state: { item } });
    } catch (error) {}
  };
  const handledisable = async (resortId) => {
    try {
      console.log(resortId, "resort is coming...");

      let { data } = await disableresort(resortId);
      console.log(data, "kkkkkk");
      if (data) {
        getresortData();
      }
    } catch (error) {
      console.log(error,"eeeeeeeeeee")
    }
  };

  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"List of Resorts"} />
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold mb-4">Details of Booked Resort</h2>
          <Link to="/add-resort" className="btn btn-ghost">
            Add Resort
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Resort name</th>
                <th>Address</th>
                <th>Place</th>
                <th>Price</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {resort.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.resortname}</td>
                  <td>{item.address}</td>
                  <td>{item.place}</td>
                  <td>{item.price}</td>
                  <td>{item.status}</td>
                  <button
                    className="btn btn-xs btn-success"
                    onClick={() => {
                      console.log(item, "item is coming....");
                      handleEdit(item);
                    }}
                    style={{ marginRight: "10px" }}
                  >
                    Edit
                  </button>
                  {/* <Link to='' onClick={()=>handleEdit(item._id)} className='btn btn-xs btn-success' style={{marginRight:'10px'}}>Edit </Link> */}
                
                  {item.status==='Enable' ? (
  <button 
    onClick={() => handledisable(item._id)}
    className="btn btn-error" 
    style={{ marginRight: "10px" }}
  >
    Disable
  </button>
) : (
  <button 
    onClick={() => handledisable(item._id)}
    className="btn btn-success"
    style={{ marginRight: "10px" }}
  >
    Enable
  </button>
)}

                  {/* <Link to='' onClick={()=> { 
            console.log(item._id,"delete id coming...")
            handleDelete(item._id)}} className='btn btn-xs btn-error'>Unlist</Link> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StafResort;
