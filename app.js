import express from "express";
import mongoose from "mongoose";

const app = express();

// Middle ware
app.use(express.json());

const uri =
  "uri";
// Database
mongoose
  .connect(uri, {
    dbName: "backend",
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("users", userSchema);

app.get("/users/all", async (req, res) => {
  const users = await User.find({});
  console.log(req.query);
  console.log(req.query.keyword);
  res.json({
    name: "Avtar",
    users,
  });
});

app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("temp","Hola").json({
   success : true,
   message : "User Registered Successfully",
  })
});

// Static
app.get("/users/id",async (req,res)=>{
  const {id} = req.body;
const user = await User.findById(id);
res.json({
  success : true,
  user
})
})

// Dynamic 
app.get("/users/:id",async (req,res)=>{
  const {id} = req.params;
const user = await User.findById(id);
res.json({
  success : true,
  user
})
})

app.listen(4000, () => {
  console.log("Server is Working");
});
