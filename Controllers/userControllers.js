import { User } from "../Models/userModel.js";
import bcrypt from "bcrypt";

import { sendCookie } from "../utils/cookieFeature.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    users,
  });
};

const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  let user = await User.findOne({ email });
  if (user) {
    return res.status(404).json({
      success: false,
      message: "User Already Exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  sendCookie(user, res, "Registered Successfully", 201);
};

const LogoutUser = async(req,res) =>{
  // const token = 
  DeleteCookie(user)
  sendCookie(user,res,` Welcome Back ${user.name}`,201);
}

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
  }).select("+password") ; 

  if(!user){
return res.status(404).json({
  success : false,
  message : "Invalid Email or Password"
})
  }

  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
    return res.status(404).json({
      success : false,
      message : "Invalid Email or Password"
    })
  }

  sendCookie(user,res,` Welcome Back ${user.name}`,201);
 

  
};

const findUserById = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  const { name,email,password } = req.body;

  const user = await User.updateOne({ _id: id }, { $set: { name: name, email: email, password: password } });

  if (user.modifiedCount != 0) {
    res.json({
      success: true,
      user,
    });
  } else {
    res.json({
      success: false,
      user,
    });
  }
};

const DeleteUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOneAndRemove({email:email});
  res.json({
    success: true,
    message: "User Deleted Safely",
    user,
  });
};

export {
  getAllUsers,
  RegisterUser,
  findUserById,
  updateUser,
  LoginUser,
  LogoutUser,
  DeleteUser,
};
