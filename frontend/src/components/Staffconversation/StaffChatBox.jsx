import React, {useEffect, useRef, useState } from "react";
import { getStaff,getstaffMessages,addMsg } from "../../services/Staffapi";
import { format } from "timeago.js";
import InputEmoji  from "react-input-emoji";
import { FiSend } from "react-icons/fi";

const StaffChatBox = ({chat, currentStaff,setStaffsendMessage, staffrecievedMessage}) => {
    const [staffData, setStaffData] = useState(null);
    const [stafmessages, setstafMessages] = useState([]);
    const [stafnewMessage, setStafNewMessage] = useState("");
    const scroll=useRef()
    const handleChange = (stafnewMessage) => {
        setStafNewMessage(stafnewMessage);
    };
    useEffect(()=>{
        if(staffrecievedMessage!==null && staffrecievedMessage.ChatId===chat.id){
            setstafMessages([...stafmessages,staffrecievedMessage])
        }
      
      },[staffrecievedMessage])
      useEffect(() => {
        const staffId = chat?.members?.find((id) => id !== currentStaff);
    
        console.log(staffId, "iiiddd");
        const getUserData = async () => {
          const { data } = await getStaff(staffId);
          setStaffData(data.result);
          console.log(data.result);
        };
        if (chat !== null) getUserData();
      }, [chat, currentStaff]);
      useEffect(() => {
        const fetchmessages = async () => {
          try {
            const { data } = await getstaffMessages(chat._id);
            console.log(data);
            setstafMessages(data);
            // console.log(data)
          } catch (error) {
            console.log(error);
          }
        };
        if (chat !== null) fetchmessages();
      }, [chat]);

      const handleSend=async (e)=>{
        e.preventDefault()
        const messag={
         senderId:currentStaff,
         text:stafnewMessage,
         ChatId:chat._id,
        }
        try {
         const {data}=await addMsg(messag)
         setstafMessages([...stafmessages,data])
         setStafNewMessage("")
        } catch (error) {
          console.log(error)
        }
        const receiverId=chat.members.find((id)=>id!==currentStaff)
        setStaffsendMessage({...stafmessages,receiverId})
      }
    
  return (
    <>
    {chat ? (
      <div className="chatBoxcontainer">
        <div>
          {staffData?.map((staffdata, index) => (
            <div
              className="follower conversation flex items-center"
              key={index}
            >
              <div className="text-lg w-full">
                <span>{staffdata?.name}</span>
              </div>
            </div>
          ))}
        </div>
        <hr className="my-4 border-gray-300" />
        <div className="chatmsg">
          {stafmessages.map((message) => (
            <>
              {message.senderId ===  currentStaff ? (
                <div ref={scroll} className="msg justify-end flex mb-2">
                  <div className="text-white p-3 rounded-lg">
                    <span className="text-lg font-semibold">
                      {message.text}
                    </span>
                    <span className="text-sm">
                      {format(message.createdAt)}
                    </span>
                  </div>
                </div>
              ) : (
                <div  ref={scroll} className="msg justify-start flex mb-2">
                  <div className="msg-content bg-gray-200 p-3 rounded-lg">
                    <span className="text-lg font-semibold">
                      {message.text}
                    </span>
                    <span className="text-sm">
                      {format(message.createdAt)}
                    </span>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
        <div>
          <div className="chat-sender flex items-center">
            <div>+</div>
            <InputEmoji
              value={stafnewMessage}
              onChange={handleChange}
              className="mr-2"
            />
            <button className="btn btn-success"  onClick={handleSend}>
              <FiSend />
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center h-screen">
        <span className="text-center">
          Tap on a chat to start conversation
        </span>
      </div>
    )}
  </>
  )
}

export default StaffChatBox