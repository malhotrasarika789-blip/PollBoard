import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

const io = new Server(server,{
cors:{
origin:[
"http://localhost:5173",
"https://frontend-psi-indol-95.vercel.app",
"https://frontend-4poa466z0-malhotrasarika789-1336s-projects.vercel.app"
],
methods:["GET","POST","PATCH","DELETE"],
credentials:true
}
});

io.on("connection",(socket)=>{

console.log("User connected:",socket.id);

socket.on("disconnect",()=>{

console.log("User disconnected:",socket.id);

});

});

export {io};

server.listen(PORT,()=>{
console.log(`✅ Server running on port ${PORT}`);
});