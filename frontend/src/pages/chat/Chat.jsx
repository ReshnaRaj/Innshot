import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {userChats} from '../../services/Userapi'
// import { HiMenu } from "react-icons/hi";
import Header from "../../components/Userpages/Layout/Header";
import Footer from "../../components/Userpages/Layout/Footer";
const Chat = () => {
  const users = useSelector((state) => state.user);
  const [chats,setChats]=useState([])
useEffect(()=>{
const getChats=async()=>{
  try {
    const {data}=await userChats(users.id)
    setChats(data)
    console.log(data,"hhhh")
  } catch (error) {
    console.log(error)
    
  }
}
getChats()
  },[users])
  console.log(users,"user details getting...")
  return (
     
   
    <>
      <Header />

      <div>
        <div className=" mt-4 flex h-screen">
     
          <div className="bg-orange-100 w-1/3 rounded-3xl">
            {/* search component here */}
            <div className="container">
              <h2 className="text-2xl font-bold mb-4  ">Chats</h2>
              <div>
                Conversions
              </div>
            </div>
          </div>
          <div className=" flex flex-col  bg-black w-2/3 p-2 rounded-3xl">
            {/* right side chat component */}
            {/* <ChatBox chat={currentChat} currentuserId={user.id} setSendMessage={setSendMessage} recievedMessage={recievedMessage}/> */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Chat;
