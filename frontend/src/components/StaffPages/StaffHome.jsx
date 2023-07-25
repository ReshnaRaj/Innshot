import React, {useEffect,useState} from "react";
import Navbar from "./layout/Navbar";
import Headerr from "./layout/Headerr";
import {
  getResortData,getStaffAdv,get_book_data
} from "../../services/Staffapi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Pie ,Bar} from "react-chartjs-2";
ChartJS.register(ArcElement,Tooltip,Legend,CategoryScale,LinearScale,BarElement,Title)

const StaffHome = () => {
  const [count,setCount]=useState("")
  const [totalcount,setTotalcount]=useState("")
  const [countadv,setCountAdvent]=useState("")
  const [totaladv,setTotaladv]=useState("")
  const [countbook,setCountbook]=useState("")
  const [countcancel,setCountcancel]=useState("")
  const data={
    labels:['Total_Resorts','Approved_Resorts'],
    datasets:[
      {
        label:'Resorts',
        data:[totalcount,count],
        backgroundColor: [
          'rgba(0, 255, 0, 0.2)',
          'rgba(255, 0, 0, 0.2)',
        
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)', 
          'rgba(255, 0, 0, 1)', 
        
        ],
        borderWidth: 1,
      },
    ]
  }
  const adv={
    labels:['Total_Adv','Approved_Adv'],
    datasets:[
      {
        label:'Adventures',
        data:[totaladv,countadv],
        backgroundColor: [
          'rgba(0, 255, 0, 0.2)',
          'rgba(255, 0, 0, 0.2)',
        
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)', 
          'rgba(255, 0, 0, 1)', 
        
        ],
        borderWidth: 1,
      },
    ]
  }
  const booked={
    labels:['Booked','Cancelled'],
    datasets:[
      {
        label:'Resorts',
        data:[countbook,countcancel],
        backgroundColor: [
          'rgba(0, 255, 0, 0.2)',
          'rgba(255, 0, 0, 0.2)',
        
        ],
        borderColor: [
          'rgba(0, 255, 0, 1)', 
          'rgba(255, 0, 0, 1)', 
        
        
        ],
        borderWidth: 1,
      },
    ]
  }

  
  useEffect(() => {
    getresortData();
  }, []);
  useEffect(()=>{
    getAdvData();
  })
  useEffect(() => {
    getbookdata();
  }, []);
  const getbookdata = async () => {
    try {
      let { data } = await get_book_data();
      let confirmbooking=data.result.filter(book=>book.status==='booked')
      setCountbook(confirmbooking.length);
      let cancelbooking=data.result.filter(book=>book.status==='cancelled')
      setCountcancel(cancelbooking.length)
     
     
       
      
    } catch (error) {
      console.log(error, "error booking");
    }
  };

  const getAdvData = async () => {
    try {
      let { data } = await getStaffAdv();
      console.log(data, "77777777777777");
      const alladv=data.result.length
      setTotaladv(alladv)
      const approvedadventure = data.result.filter(advent => advent.verify === true);
      setCountAdvent(approvedadventure.length)
    } catch (error) {}
  };
  const getresortData = async () => {
    try {
      let {data} = await getResortData();

      // console.log(data, "data of resort ");
      const allresort=data.result.length
      console.log(allresort,"count of all resorts")
      setTotalcount(allresort)

      const approvedResorts = data.result.filter(resort => resort.verify === 'verified');
      setCount(approvedResorts.length)
      // console.log(approvedResorts,"ffff")
     
    } catch (error) {
      console.log(error);
    }
  };
 console.log(totalcount,"total counting...")
  return (
    <div className="flex">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1">
        <Headerr name={"Dashboard"} />
        <h3 className="text-xl font-bold mb-4">
            Welcome to the Resort Booking Dashboard!
          </h3>

        <div className="flex p-4 justify-between">
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
            <h4 className="text-lg font-semibold mb-2">
              Number of Resorts:
            </h4>
            <p className="text-gray-600">
            <Pie data={data} />
            </p>
            {/* Replace '10' with the actual number of resorts */}
          </div>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
            <h4 className="text-lg font-semibold mb-2">
              Number of ResortBooking:
            </h4>
            <p className="text-gray-600">
            <Bar data={booked} />
            </p>
           
          </div>
          <div className="bg-gray-100 p-4 rounded-lg mb-4 max-w-xs">
            <h4 className="text-lg font-semibold mb-2">
              Number of Approved Adventure:
            </h4>
            <p className="text-gray-600">
            <Doughnut data={adv} />
            </p>
        
          </div>

          {/* Your additional dashboard content goes here */}
        </div>
      </div>
    </div>
  );
};

export default StaffHome;
