import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// uri
const uri = "mongodb+srv://singha2k2:Avtar123@backend.r2gb0rh.mongodb.net/?retryWrites=true&w=majority";

// Mongoose Connect
/* mongoose.connect(uri,{
   dbName:"backend"
}).then(()=>{
   console.log("Database Connected");
}).catch((err)=>{
   console.log(err);
}) */

// Define Schema
const mongooseShema = mongoose.Schema({
   name : String,
   email : String,
   password : String
})

// Set Model
const message = mongoose.model("message",mongooseShema);


// Server
const app = express();



app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

// cookies
app.use(cookieParser());

const isAuthenticated = (req,res,next) =>{
   const {token} = req.cookies;
   if(token){
     next();
   }else{
      res.render("login_button.ejs");
   }
}

// setting up engine ( only if extension not spedified)
// app.set("view engine","ejs");

// Get request and response
app.get("/", (req, res) => {
  
  // Sending rendered file
  res.render("form.ejs", {
    name: "Avtar",
  });
});

app.get("/add",(req,res)=>{
   message.create({name:"Avtar",email:"singh23@gmail.com",password:"Avtar@123"}).then(()=>{
      res.send("Done");
   }).catch((err)=>{
      console.log(err);
   })
})


app.post("/contact",async (req, res) => {
// Destructuring
   const {name,email,password} = req.body;
  const messageData = {name,email,password};
  
  await message.create(messageData);
  // console.log(users);
  res.render("success.ejs", {
    Username: name,
    Email: email,
    Password: password,
  });
});


app.post("/login",(req,res)=>{
   res.cookie("token","iamin",{
      httpOnly:true,
      // expires:new Date(Date.now()+60*1000)
   })
   res.render("submitted.ejs");
})

app.get("/login_button",isAuthenticated,(req,res)=>{
  
res.render("submitted.ejs");
})

app.get("/logout",(req,res)=>{
   res.cookie("token",null,{
      httpOnly:true,
      expires: new Date(Date.now()),
   })
   res.redirect("/");
})

app.listen(5000, () => {
  console.log("Server Started");
});
