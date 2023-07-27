import React, { useEffect,useState } from 'react'
import {getuseradventure} from '../../services/Userapi'
import Header from './Layout/Header';
 
import { MdPlace } from "react-icons/md";
import { baseUrl } from "../../files/file";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
 
import Footer from './Layout/Footer';

const Adventure = () => {
  const users = useSelector((state) => state.user);
  console.log(users,"zcc")
    const [adventure,setAdventure]=useState([])
    const [currentpage, setCurrentpage] = useState(1);
    console.log(currentpage, "current page");
    const recordpage = 1;
    const lastIndex = currentpage * recordpage;
    const firstIndex = lastIndex - recordpage;
    const records = adventure.slice(firstIndex, lastIndex);
    console.log(records, "record count in user side...");
    const npage = Math.ceil(adventure.length / recordpage);
    console.log(npage, "npage of count...");
    const numbers = [...Array(npage + 1).keys()].slice(1);
    function changePage(id){
 
      setCurrentpage(id)
      }
      
      function prePage()
      
      {
        if(currentpage!==firstIndex)
        {
          setCurrentpage(currentpage-1)
        }
      }
      function nextPage()
      {
        if(currentpage!==lastIndex){
          setCurrentpage(currentpage+1)
        }
      
      }
    useEffect(()=>{
        useradventure()
    },[])
    const useradventure=async()=>{
        try {
            let {data}=await getuseradventure();
            if(data.success){
                setAdventure(data.adventure)
            }
        } catch (error) {
            
        }
    }
    const navigate = useNavigate();
    const handleView=async(item)=>{
      try {
        navigate(`/viewadventure/${item}`,{state:{item}})
      } catch (error) {
        
      }
    }
    console.log(adventure,"adventure datas are coming....")

  return (
    <div className='mx-auto max-w-screen-2xl'>
        <Header/>
        <div className="flex flex-wrap">
        {records.map((item)=>(
             <div className="bg-white shadow-1 p-5 rounded-tl-[20px] w-full max-w-[352px] mx-auto cursor-pointer hover:shadow-2xl transition hover:scale-105 ">
             <figure><img src={`${baseUrl}${item?.image[0]}`}  className="rounded-tl-[20px] mb-8" alt="Movie"/></figure>
             <div className="mb-4 flex flex-col">
             <div className="flex items-center mb-2">
            <div className="text-lg mr-2" />
            <div className="text-lg font-semibold">{item.activity}</div>
          </div>
          <div className="flex items-center">
            <MdPlace className="text-lg mr-2" />
            <div className="text-lg font-semibold">{item.place}</div>
            
          </div>
          <div className="flex items-center">
            <div className="text-lg mr-2" />
            <div className="text-black">{item.resortName}</div>
            
          </div>
              
               
                 <button  onClick={()=>{
                
                  handleView(item._id)}}className="btn btn-primary">View Details</button>
               
             </div>
           </div>
        

        ))}
        </div>
        <div className="join flex  justify-center ">
        <button className="join-item btn btn-outline  btn-info"  onClick={prePage}>
          Prev
        </button>
        {numbers.map((n, i) => (
          <div className={`join ${currentpage===n  ? 'active' : ''}`} key={i}>
            <button className="join-item btn btn-outline btn-info"     onClick={()=>changePage(n)}>{n}</button>
             
          </div>
        ))}
        <button className="join-item btn btn-outline btn-info"    onClick={nextPage}>Next</button>
      </div>
        <Footer/>
      

    </div>
       
  )
}

export default Adventure