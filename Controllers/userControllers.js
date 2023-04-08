import { User } from "../Models/userModel.js";

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  res.json({
    name: "Avtar",
    users,
  });
};

const addNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  res.status(201).cookie("temp", "Hola").json({
    success: true,
    message: "User Registered Successfully",
  });
};

const findUserById = async (req, res) => {
  const { id } = req.body;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};

const findUserByUrlId = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json({
    success: true,
    user,
  });
};
const updateUser = async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  const user = await User.updateOne({ _id: id }, { $set: { name: name } });

  if(user.modifiedCount != 0){
    res.json({
        success:true
        ,user
      })
  }else{
    res.json({
        success:false
        ,user
      })
  }

  
    
};

const DeleteUserByUrlId = async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndRemove(id);
  res.json({
    success: true,
    message: "User Deleted Safely",
    user
  });
};

export {
  getAllUsers,
  addNewUser,
  findUserById,
  findUserByUrlId,
  updateUser,
  DeleteUserByUrlId,
};
