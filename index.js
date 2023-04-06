// import http
// const http = require("http");

import http from "http";
import fs from "fs";
import * as omobj from "./sayHello.js";
// specify port
const port = 5000;

//  import custom modules
// const sayHello = require("./sayHello.js");

const home = fs.readFileSync("./index.html",()=>{
console.log("File Reading");

})


// Create Server with req and response
const server  =  http.createServer((req,res)=>{
    
    // console.log(req.url);
    // Routes
    if(req.url === "/"){
       res.end("Homepage");
       res.end(sayHello("Avtar"));
    }
    else if(req.url === "/about"){
       res.end("about");
    }
    else if(req.url === "/contact"){
       res.end("contact");
    }
    else if(req.url === "/github"){
       res.end("https://github.com/theavtarsingh");
    }
    
});


// Listen On Server
server.listen(port,()=>{
/*    console.log(omobj);
   console.log(omobj.default("Yo"));
   console.log(omobj.name1);
   console.log(omobj.name2);
   console.log(omobj.name3);
   console.log(omobj.name4); */

   console.log(omobj.rand());
   console.log(home);
   
   
console.log(`Server Started at Port Number : ${port}`);

})