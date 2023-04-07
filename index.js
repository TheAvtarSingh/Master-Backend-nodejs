import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// uri
const uri =
  "uri";

// Mongoose Connect
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

// Define Schema
const mongooseShema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

// Set Model
const message = mongoose.model("message", mongooseShema);

// Server
const app = express();

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.urlencoded({ extended: true }));

// cookies
app.use(cookieParser());

const isAuthenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    next();
  } else {
    res.render("login_button.ejs");
  }
};

// setting up engine ( only if extension not spedified)
// app.set("view engine","ejs");

// Get request and response
app.get("/", (req, res) => {
  // Sending rendered file
  res.render("form.ejs", {
    name: "Avtar",
  });
});

app.get("/add", (req, res) => {
  message
    .create({
      name: "Avtar",
      email: "singh23@gmail.com",
      password: "Avtar@123",
    })
    .then(() => {
      res.send("Done");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post("/contact", async (req, res) => {
  // Destructuring
  const { name, email, password } = req.body;
  const messageData = { name, email, password };

  await message.create(messageData);
  // console.log(users);
  res.render("success.ejs", {
    Username: name,
    Email: email,
    Password: password,
  });
});

app.post("/login", (req, res) => {
  res.cookie("token", "iamin", {
    httpOnly: true,
    // expires:new Date(Date.now()+60*1000)
  });
  res.render("submitted.ejs");
});

app.get("/login_button", isAuthenticated, (req, res) => {
  res.render("submitted.ejs");
});

// Authentication Using Form with Fields

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userModel = mongoose.model("users", userSchema);

const isPrevious = async (req, res, next) => {
  const { logintoken } = req.cookies;

  if (logintoken) {
    const decoded = jwt.verify(logintoken, "fugdlgfudslvvsuvbldf");
    // console.log(decoded);
    req.user = await userModel.findById(decoded._id);
   //  console.log(req.user);
    next();
  } else {
   //  res.render("login_form.ejs");
   next();
  }
};

app.get("/loginform", (req, res) => {
  res.render("login_form.ejs", {
    name: "Avtar",
  });
});

app.get("/Signupform", (req, res) => {
  res.render("Signup_form.ejs");
});

app.post("/logmein", isPrevious, async (req, res) => {
  const { email, password } = req.body;

  const matched = await userModel.findOne({ email });
//   password === matched.password 

const isMatched = bcrypt.compare(password,matched.password);

  if (isMatched) {
    res.render("submitted.ejs", {
      name: matched.name,
    });
  } else {
    res.render("Signup_form.ejs", { message: "Register First" });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password,10)

  const user = await userModel.create({ name, email, password:hashedPassword });
  const token = jwt.sign({ _id: user._id }, "fugdlgfudslvvsuvbldf");
  // console.log(token);
  res.cookie("logintoken", token, {
    httpOnly: true,
   
  });
  res.render("login_form.ejs");
});

app.get("/logout", (req, res) => {
  res.cookie("logintoken", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.listen(5000, () => {
  console.log("Server Started");
});
