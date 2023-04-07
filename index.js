import express from "express";
import path from "path";
import mongoose from "mongoose";

// uri
const uri = "url";

// Mongoose Connect
mongoose.connect(uri,{
   dbName:"backend"
}).then(()=>{
   console.log("Database Connected");
}).catch((err)=>{
   console.log(err);
})

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

app.get("/users",(req,res)=>{
   res.json(
      {
         users
      }
   )
})

app.listen(5000, () => {
  console.log("Server Started");
});
