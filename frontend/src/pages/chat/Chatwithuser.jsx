import React,{useEffect,useRef,useState} from 'react'
import { useSelector } from 'react-redux';
 import {staffChats} from '../../services/Staffapi'
 import StaffConversate from '../../components/Staffconversation/StaffConversate'
import StaffChatBox from '../../components/Staffconversation/StaffChatBox';
import {io} from 'socket.io-client'
const Chatwithuser = () => {
    const staffs=useSelector((state)=>state.staff)
    const [staffchats, setStaffchats] = useState([]);
    const [staffcurrentChat, setStaffcurrentChat] = useState(null);
    const [staffonlineusers,setStaffOnlineUsers]=useState([])
    const [staffsendMessage,setStaffsendMessage]=useState(null)
    const [staffrecievedMessage,setStaffreceivedMessage]=useState(null)
    const socket=useRef()
    useEffect(()=>{
        if(staffsendMessage!==null){
          socket.current.emit('send-message',staffsendMessage)
        }
      },[staffsendMessage])
      useEffect(()=>{
        socket.current=io(process.env.REACT_APP_BASE_URL)
        // subscribing the socket
        socket.current.emit("new-user-add",staffs.id)
        // getting the emitted data
        socket.current.on("get-users",(users)=>{
            setStaffOnlineUsers(users)
         
        })
        },[staffs])
        useEffect(()=>{
            socket.current.on("receive-message",(data)=>{
                setStaffreceivedMessage(data)
            })
           },[])
           const checksOnlinestatus=(chat)=>{
            const chatMembers=chat.members.find((member)=>member!== staffs.id)
            const online=staffonlineusers.find((user)=>user.userId===chatMembers)
            return online?true:false
          }
    useEffect(() => {
        const getChats = async () => {
          try {
            const { data } = await staffChats(staffs.id);
            setStaffchats(data);
            console.log(data, "hddd");
          } catch (error) {
            console.log(error);
          }
        };
        getChats();
      }, [ staffs]);
      console.log(staffs,"staff from redux...")
  return (
    <div>
        <div className=" mt-4 flex h-screen">
          <div className="bg-orange-100 w-1/3  ">
            {/* search component here */}
            <div className="container">
              <h2 className="text-2xl font-bold mb-4  ">Users Query</h2>
              <div>
                {staffchats.map((chat) => (
                  <div onClick={() => setStaffcurrentChat(chat)}>
                    <StaffConversate data={chat} currentStaffId={staffs.id} stafonline={checksOnlinestatus(chat)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className=" flex flex-col  bg-black w-2/3 p-2 ">
            {/* right side chat component */}
            <StaffChatBox
              chat={staffcurrentChat}
              currentStaff={staffs.id}
              setStaffsendMessage={setStaffsendMessage}
              staffrecievedMessage={staffrecievedMessage}
              
            />
          </div>
        </div>
      </div>
  )
}

export default Chatwithuser