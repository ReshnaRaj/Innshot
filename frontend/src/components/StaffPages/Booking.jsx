import React, { useEffect, useState } from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Headerr";
import { get_book_data } from "../../services/Staffapi";

const Booking = () => {
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    getbookdata();
  }, []);
  const getbookdata = async () => {
    try {
      let { data } = await get_book_data();
      // console.log(data, "boooked all data");
      if (data.success) {
        setBooking(data.result);
      }
    } catch (error) {
      console.log(error, "error booking");
    }
  };
  // console.log(booking, "booking data of resotowner...");
  return (
    <div className="flex">
      <Navbar />
      <div className="flex-1">
        <Headerr name={"Bookings List"} />
        {/* <div className="p-4 flex justify-between items-center"></div> */}

        <div className="overflow-x-auto">
          <table className="table table-compact w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Booking Id</th>
                <th>Booked Resort</th>
                <th>Traveler</th>

                <th>Booked_Date</th>
                <th>CheckOutDate</th>
                <th>Booking Status</th>
              </tr>
            </thead>
            <tbody>
              {booking.map((item, index) => {
              
                    const toDate = item.toDate;
                    // console.log(toDate,"checkout date...")
                    const currentDate = new Date();
                    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
                    const formattedDate = currentDate.toLocaleDateString('en-US');
                // console.log(formattedDate,"today date...")
                console.log(toDate,formattedDate,"oopoppop")
                    const isExpired = toDate < formattedDate;
                    // console.log(isExpired,"checking the date ")
                    const status = isExpired ? 'Expired' : 'Reserved';
                return (
               
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item._id}</td>
                  <td>{item.resortId.resortname}</td>
                  <td>{item.traveler.name}</td>
                  <td>
                    {new Date(item.Booked_at).toLocaleDateString("en-US")}
                  </td>
                  <td>{item.toDate}</td>
                  <td>{item.status}</td>
                </tr>
                )
})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Booking;
