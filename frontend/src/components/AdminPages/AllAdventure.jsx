import React, { useEffect ,useState} from 'react'
import Navbars from './layout/Navbars'
import Headers from './layout/Headers'
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import {getalladvData,approveadvent} from '../../services/Adminapi'

const AllAdventure = () => {
    const [advdata,setadvdata]=useState([])
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    
    useEffect(()=>{
        getadvData();
    },[])
    const handleView=async(item)=>{
      try {
        console.log(item,"******++++++")
        navigate(`/admin/viewactivity/${item}`,{state:{item}})
      } catch (error) {
        
      }
    }
    const handleapprove = async (adventId) => {
      try {
        let { data } = await approveadvent(adventId);
        console.log(data, "data from approve part of admin");
        if (data) {
          const message = data.message
          toast.success(message, {
            position: 'top-center',
          });
          getadvData();
        }
      } catch (error) {
        console.log(error, 'error');
      }
    }
    const getadvData=async()=>{
        try {
            let data=await getalladvData()
            if(data.data.adventureactivity){
                setadvdata(data.data.adventureactivity)
            }
        } catch (error) {
            console.log("error")
            
        }
    }
    // console.log(advdata,"000008888")
  return (
    <div className='flex'>
        <Navbars/>
        <div className="flex-1">
        <Headers name={'List of activities'}/>
        <div className="form-control float-right">
          <div className="form-control">
            <div className="input-group">
              <input
                onChange={(e) => {
                  setSearch(e.target.value);
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
                <th>Activity name</th>
                <th>Resort Owner</th>
                <th>Place</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {advdata.filter((item)=>{
                return search.toLowerCase()==="" ? item:item.activity.toLowerCase().includes(search)
              })
              .map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.activity}</td>
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
  )
}

export default AllAdventure