import React, {useEffect, useRef, useState } from "react";
import { getUser, getMessages,adMessage } from "../../services/Userapi";
import { format } from "timeago.js";
import InputEmoji  from "react-input-emoji";
import { FiSend } from "react-icons/fi";

const Chatbox = ({ chat, currentUser ,setSendMessage,recievedMessage}) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const scroll=useRef()
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };
  // it is based on the received message
useEffect(()=>{
  if(recievedMessage!==null && recievedMessage.ChatId===chat.id){
setMessages([...messages,recievedMessage])
  }

},[recievedMessage])
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);

    console.log(userId, "iiiddd");
    const getUserData = async () => {
      const { data } = await getUser(userId);
      setUserData(data.result);
      console.log(data.result);
    };
    if (chat !== null) getUserData();
  }, [chat, currentUser]);
  useEffect(() => {
    const fetchmessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        console.log(data);
        setMessages(data);
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
     senderId:currentUser,
     text:newMessage,
     ChatId:chat._id,
    }
    try {
     const {data}=await adMessage(messag)
     setMessages([...messages,data])
     setNewMessage("")
    } catch (error) {
      console.log(error)
    }
    const receiverId=chat.members.find((id)=>id!==currentUser)
    setSendMessage({...messages,receiverId})
  }
  
  return (
    <>
      {chat ? (
        <div className="chatBoxcontainer">
          <div>
            {userData?.map((staffdata, index) => (
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
            {messages.map((message) => (
              <>
                {message.senderId === currentUser ? (
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
                value={newMessage}
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
  );
};

export default Chatbox;
