import express from "express";
import path from "path";

// Server
const app = express();
// Temperory Array
const users = [];

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

app.post("/contact", (req, res) => {
  // console.log(req.body);
  users.push({
    Username: req.body.name,
    Email: req.body.email,
    Password: req.body.password,
  });
  // console.log(users);
  res.render("success.ejs", {
    Username: users[0].Username,
    Email: users[0].Email,
    Password: users[0].Password,
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
