import express from "express";
import path from "path";

// Server
const app = express();

// server listen

// Get request and response
app.get("/",(req,res)=>{
  
 //  Sending File
 
 const pathLocation = path.join(path.resolve(),"./index.html");
 res.sendFile(pathLocation);
})

app.listen(5000,()=>{
   console.log("Server Started");
   
})