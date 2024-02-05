const express = require("express");
const app = express();
 
require("dotenv").config();
const cors = require("cors");
const path = require("path");
// const http = require("http");
const dbConnection = require("./Connection/database");
 

const userouter = require("./Routes/UserRoute");
const staffrouter = require("./Routes/StaffRoute");
const adminrouter = require("./Routes/AdminRoute");
const socket = require("socket.io");
 
dbConnection();
app.use("/", express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin:"*",
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", userouter);
app.use("/staff", staffrouter);
app.use("/admin", adminrouter);

// app.listen(4001,()=>{
//     console.log("server started at port 4001")
// })
const server = app.listen(4001, () => {
  console.log("Server started at port 40001");
});
// socket server created by passing the server object
const io = socket(server, {
  cors: {
    origin: process.env.BASE_URL,
    credentials: true,
  },
});
//   activeusers  means registered with socket server
let activeUsers = [];
// socket event listener for when a new client connects to the server
io.on("connection", (socket) => {
  // add new user
  socket.on("new-user-add", (newUserId) => {
    if (!activeUsers.some((user) => user.userId === newUserId)) {
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id,
      });
    }
    // passing the activeusers in client side 
    console.log("Connected user",activeUsers)
    io.emit("get-users", activeUsers);
  });
  // send message and user variable finding the specific user 
  socket.on("send-message",(data)=>{
    const {receiverId}=data
    const user=activeUsers.find((user)=>user.userId===receiverId)
    console.log("sending from socket",receiverId)
    console.log("data getting",data)
    // user means the activeUser so emit function is doing sending the message 
    if(user){
      io.to(user.socketId).emit("receiver-msg",data)
    }
  })




  // when someone disconnects the server
  socket.on("disconnect",()=>{
    activeUsers=activeUsers.filter((user)=>user.socketId!==socket.id)
    console.log("User disconnected",activeUsers)
    io.emit('get-users',activeUsers)
    // may be passing the disconnected users into client
  })
});
