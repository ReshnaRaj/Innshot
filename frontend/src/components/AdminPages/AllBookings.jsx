import React, { useEffect, useState } from "react";
import Navbars from "./layout/Navbars";
import Headers from "./layout/Headers";
import { getall_bookings } from "../../services/Adminapi";
 

const AllBookings = () => {
  const [allbooking, setAllbooking] = useState([]);
  const [currentpage, setCurrentpage] = useState(1);
  const recordpage = 10;
  const lastIndex = currentpage * recordpage;
  const firstIndex = lastIndex - recordpage;
  const records = allbooking.slice(firstIndex, lastIndex);
  const npage = Math.ceil(allbooking.length / recordpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  function changePage(id) {
    setCurrentpage(id);
  }

  function prePage() {
    if (currentpage !== firstIndex) {
      setCurrentpage(currentpage - 1);
    }
  }
  function nextPage() {
    if (currentpage !== lastIndex) {
      setCurrentpage(currentpage + 1);
    }
  }
  useEffect(() => {
    getallbooking();
  }, []);
  const getallbooking = async () => {
    try {
      let { data } = await getall_bookings();
      console.log(data, "data of booked...");
      if (data.success) {
        setAllbooking(data.result);
      }
    } catch (error) {
      console.log(error, "error");
    }
  };
  console.log(allbooking, "all bookings...");
  return (
    <div className="flex">
      <Navbars />
      <div className="flex-1">
        <Headers name={"List of Destination"} />
        <div className="overflow-x-auto inline">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>

                <th>Booked Resort</th>

                <th>Traveler</th>
                <th>Status</th>
                <th>CheckInDate</th>
                <th>CheckOutDate</th>
              </tr>
            </thead>
            <tbody>
              {records.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.resortId.resortname}</td>
                  <td>{item.traveler.name}</td>
                  <td>{item.status}</td>
                  <td>{item.fromDate}</td>
                  <td>{item.toDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="join flex  justify-center ">
            <button
              className="join-item btn btn-outline  btn-info"
              onClick={prePage}
            >
              Prev
            </button>
            {numbers.map((n, i) => (
              <div
                className={`join ${currentpage === n ? "active" : ""}`}
                key={i}
              >
                <button
                  className="join-item btn btn-outline btn-info"
                  onClick={() => changePage(n)}
                >
                  {n}
                </button>
              </div>
            ))}
            <button
              className="join-item btn btn-outline btn-info"
              onClick={nextPage}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBookings;
