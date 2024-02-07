import { userAxiosInstance } from "../axios/instance";
const userregister = (data) => {
  console.log(data);
  return userAxiosInstance.post("/register", data);
};
const userlogin = (data) => {
  console.log(data,"data of the userapi")
  return userAxiosInstance.post("/login", data);
};
const userverify = (data) => {
  return userAxiosInstance.post(`/verifyEmail/${data}`);
};
const getuserresort = () => {
  console.log("user resort page working...");
  return userAxiosInstance.get("/resortList");
};
const getuserresort1 = () => {
  console.log("user resort page working...");
  return userAxiosInstance.get("/resortListmain");
};
const authUser = () => {
  // console.log("private root user root is going to backend...")
  return userAxiosInstance.get("/isUserAuth");
};
const getresortdata = (id) => {
  return userAxiosInstance.get(`/oneResort/${id}`);
};
const getsimiliarstay = (data) => {
  return userAxiosInstance.get(`/getsimiliarstay/${data}`);
};
const getuseradventure = () => {
  console.log("user resort page working...");
  return userAxiosInstance.get("/adventureList");
};
const getuserdestination = () => {
  return userAxiosInstance.get("/destinations");
};
const getadvData = (id) => {
  // console.log(id,"id getting...")
  return userAxiosInstance.get(`/oneAdv/${id}`);
};
const getDestinationData = (id) => {
  console.log(id, "getting..");
  return userAxiosInstance.get(`/oneDest/${id}`);
};
// const resort_book=(data)=>{
//     console.log(data,"hhhhhh")
//     return userAxiosInstance.post('/booking',data)
// }
const booked_resort = (data) => {
  console.log(data,"going to book the resort")
  return userAxiosInstance.post("/bookedResort", data);
};
const verifyrazorpay = (data) => {
  console.log(data,"verifying the payment data")
  return userAxiosInstance.post("/verifyPayment", data);
};
const get_booked_data = () => {
  console.log("getiinhhhh");
  return userAxiosInstance.get("/getBookeddata");
};
const CancelBook = (BookingId) => {
  console.log("cancel api call working..");
  return userAxiosInstance.post(`/cancelBooking/${BookingId}`);
};
const updatePassword = (data) => {
  console.log(data, "data getting...");
  console.log("changing password...");
  return userAxiosInstance.post("/updatePassword", data);
};
const SendId=(sentid,receiveid)=>{
  return userAxiosInstance.post('/createChat',{
    senderId: sentid,
    receiverId: receiveid,
  })
}
const userChats = (id) => {
  // shows user msgd resortowners
  console.log(id, "java");
  return userAxiosInstance.get(`/getUserChat/${id}`);
};
const getUser=(id)=>{
  console.log(id,"api call ")
  return userAxiosInstance.get(`/getStaffData/${id}`)
}
const getMessages=(id)=>{
  console.log(id,"id getting..")
  return userAxiosInstance.get(`/getMsg/${id}`)
}
const adMessage=(data)=>{
  console.log(data,"addmessage")
  return userAxiosInstance.post('/addMsg',data)
}
export {
  userregister,
  userlogin,
  userverify,
  getuserresort,
  getuserresort1,
  authUser,
  getresortdata,
  getsimiliarstay,
  getuseradventure,
  getuserdestination,
  getadvData,
  getDestinationData,
  booked_resort,
  get_booked_data,
  verifyrazorpay,
  CancelBook,
  updatePassword,
  SendId,
  userChats,
  getUser,
  getMessages,
  adMessage
};
