import React, { useEffect, useState } from "react";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { json, useLocation } from "react-router-dom";
import { FaBed } from "react-icons/fa";
import { MdPlace } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { RxCalendar } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
// import {resort_book} from '../../services/Userapi'
import { useSelector } from "react-redux";
import { booked_resort,verifyrazorpay} from "../../services/Userapi";
import { ToastContainer, toast } from "react-toastify";
import  {keyId}  from "../../files/file";
// import  StripeCheckout  from "react-stripe-checkout";

const ResortBooking = () => {
  const users = useSelector((state) => state.user);
  const navigate = useNavigate();
  const keyid=keyId
  console.log(keyid,"ppp")
  // console.log(users,"tooooo")
  // const dispatch = useDispatch();
  const [resortdata, setResortdata] = useState([]);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [paymentt, setPaymentt] = useState("");
  // const [name, setName] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");

  const location = useLocation();
  const booked = location.state?.bookeddata;
  // console.log(booked,"booked data of resort...")

  // const handleSubmitt = async (e) => {
  //   e.preventDefault();
  //   console.log("submitting ");
  // };
  console.log(checkInDate,"check in date...")
  console.log(checkOutDate,"checkout date..")
  const timeDifference = checkOutDate?.getTime() - checkInDate?.getTime();
const dayCount = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
console.log(dayCount,"counting...")
  const handlebookingHotel = async (bookedd) => {
    try {
      // console.log(resortQuery,"ppppp")
      // console.log("paying booking")
      const data = await booked_resort({
        resortId: bookedd,
        traveler: users,
        fromDate: checkInDate,
        toDate: checkOutDate,
        payment: paymentt,
      });
      localStorage.removeItem("checkinDate");
      localStorage.removeItem("checkoutDate");
      console.log(data,"ffff")
      if(data.data.success){
      // console.log(data,"fffff")
      navigate('/hotelbooking/');
      }
      
    } catch (error) {
      console.log(error.response.data.error, "i8i8i8i");
      toast.error(error.response.data.error, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };
  const handleOnlinePayment=async(resortdat)=>{
    try {
      
      const data=await booked_resort({
        resortId: booked,
        traveler: users,
        fromDate: checkInDate,
        toDate: checkOutDate,
        payment: paymentt,

      })
      console.log(data,"uuuu")
      console.log(resortdat,"yyyy")
      initPayment(data.data,resortdat, checkInDate,checkOutDate,paymentt)
      console.log(data,"data apply")
      localStorage.removeItem("checkinDate");
      localStorage.removeItem("checkoutDate");
      
    } catch (error) {
      console.log(error,"222222")
      toast.error("Resort already booked for the selected dates", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  }
  const initPayment=(data,resortdat,checkInDate,checkOutDate,paymentt)=>{
    console.log(data.data.id,"oooo")
    console.log(dayCount,"count of days..")
    const options={
      key:keyid,
      name:booked.resortname,
      description:"Test Payment",
      amount:booked.price*dayCount*100,
      currency:data.currency,
      order_id:data.data.id,
     handler:async(response)=>{
      try {
        console.log(response,"resonse..")
        const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=response;
        const {data}=await verifyrazorpay({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          resortdat,
          checkInDate,checkOutDate,paymentt
          
        
        
        })
        if(data.success){
          navigate('/hotelbooking/');
        }
        else{
          alert('payment failed')
        }
        console.log(data,"data coming...")
        
      } catch (error) {
        console.log(error,"----")
        
      }
     },
     theme:{
      color:'#3499cc',
     }
    }
    const rzp1=new window.Razorpay(options)
    rzp1.open()

  }
 

  useEffect(() => {
    setResortdata(booked.resortname);
    setResortdata(booked.price);
    setResortdata(booked.image);
    setResortdata(booked.number_room);
    setResortdata(booked.place);

    const checkInDateFromStorage = localStorage.getItem("checkinDate");
    // console.log(checkInDateFromStorage,"check in date..")
    const checkOutDateFromStorage = localStorage.getItem("checkoutDate");
    // console.log(checkOutDateFromStorage,"checkout")
    // updating the state of date 
    if (checkInDateFromStorage) {
      setCheckInDate(new Date(checkInDateFromStorage));
    }

    if (checkOutDateFromStorage) {
      setCheckOutDate(new Date(checkOutDateFromStorage));
    }
  }, []);

  //  async function onToken(token){
  //   console.log(booked,"token getting... ")
  //   try {
  //     // console.log(resortQuery,"ppppp")
  //     // console.log("paying booking")
  //     const data = await booked_resort({
  //       resortId: booked,
  //       traveler: users,
  //       fromDate: checkInDate,
  //       toDate: checkOutDate,
  //       payment: payment,
  //       token
  //     });
  //     localStorage.removeItem("checkinDate");
  //     localStorage.removeItem("checkoutDate");
  //     navigate('/hotelbooking/');
  //   } catch (error) {
  //     console.log(error,"error...")
  //   }
  //  }
  // const checkOut=async ()=>{
  //   console.log("checking..")
  //   const data =await booked_resort({
  //     resortId: booked,
  //     traveler: users,
  //     fromDate: checkInDate,
  //     toDate: checkOutDate,
  //     payment: payment,

  //   }).then(res=>{
  //     if(res.ok) return res.json
  //     return res.json().then(json=>Promise.reject(json))
  //   })
  //   .then(({url})=>{
  //     window.location=url
  //   })
  //   .catch(e=>{
  //     console.log(e.error)
  //   })
  // }

  // console.log(paymentt, "00000....");
 

  // console.log(from,to,"number")


  

  return (
    <div>
      <Header />
      <div className="container mx-auto min-h-[800px] mb-14">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-[768px]">
            <h2 className="text-2xl font-semibold mt-5">User Details Form</h2>
            <h3 className="text-lg mb-4">
              Please provide your details for Booking:
            </h3>
            <form
              // onSubmit={handleSubmitt}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  type="text"
                  id="fullname"
                  value={users?.name}
                  // onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={users?.email}
                  // onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Mobile No:</label>
                <input
                  type="text"
                  id="phone"
                  value={users?.phone}
                  // onChange={(e) => setPhone(e.target.value)}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </form>
          </div>
          <div className="max-w-[900px] bg-gray-100 p-4 mt-5 rounded-lg">
            <h2 className="font-semibold">{booked?.resortname}</h2>
            <h2 className="font-semibold flex items-center">
              <RxCalendar className="text-lg mb-6" />
              <span className="ml-2 mb-6">
                {checkInDate && checkOutDate
                  ? `${checkInDate.toLocaleDateString(
                      "en-GB"
                    )}-${checkOutDate.toLocaleDateString("en-GB")}`
                  : "Date not selected"}
              </span>
            </h2>

            <img
              src={`${booked.image[0]}`}
              alt="Resort"
              className="w-72 h-56"
            />

            <h2 className="font-semibold flex items-center">
              <FaBed className="text-sm" />
              <span className="ml-2">{booked?.number_room}</span>
            </h2>
            <h2 className="font-semibold flex items-center">
              <MdPlace className="text-sm" />
              <span className="ml-2">{booked?.place}</span>
            </h2>

            <h2 className="font-semibold flex items-center">
              <FaRupeeSign className="text-sm" />
              <span className="ml-2">{booked?.price}*{dayCount} =</span>
              <span className="ml-2">{booked?.price*dayCount}</span>
            </h2>
            <div className="form-group">
              <label>Payment Method:</label>
              <div>
                <input
                  type="radio"
                  id="cod"
                  value="cod"
                  checked={paymentt === "cod"}
                  onChange={(e) => setPaymentt(e.target.value)}
                  required
                />
                <label htmlFor="cod" className="ml-2">
                  Cash on Reach
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  id="online"
                  value="online"
                  checked={paymentt === "online"}
                  onChange={(e) => setPaymentt(e.target.value)}
                  required
                />
                <label htmlFor="online" className="ml-2">
                  Online Payment
                </label>
              </div>
            </div>
            <button
              onClick={() => {
                console.log(booked,"789")
                handleOnlinePayment(booked);
              }}
              className="btn btn-success mr-4"
            >
              Pay Now
            </button>

            {/* <StripeCheckout
            amount={booked?.price*100}
            currency="INR"
        token={onToken}
        stripeKey="pk_test_51NPVEoSCd62kI4oXPSJiZEVTITYH76H4UAOBRKz6Hxw3oUEgg6dp921VrRtiqHTQqkMSpWzHCTMyHa7avKWVsj4b00ilrTn2Np">
        <button
        disabled={!checkInDate || !checkOutDate}
        // onClick={()=>{
        //   handleStripeNow()
        // }}
        
        className="btn btn-success mr-4"
      >
        Stripe Now
      </button>


      </StripeCheckout> */}
            <button
              disabled={!checkInDate || !checkOutDate}
              onClick={() => {
                // console.log(booked,"id of resort...")
                handlebookingHotel(booked);
              }}
              className="btn btn-success"
            >
              Pay Hotel
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      <Footer/>
    </div>
  );
};

export default ResortBooking;
