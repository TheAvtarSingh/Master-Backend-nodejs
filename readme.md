# Backend Development

## Node js Basics 

### Use Http Method

1. import http package

`const http = require("http");`

2. Use to create Server

```
const server = http.createServer((req,res)=>{
    res.end("<h1>Hello</h1>");
    // for routes use if(req.url == "/"){
     //   res.end("<h1>   HomePage </h1>");
    //}
})
```

3. use server
```
server.listen(5000,()=>{
    console.log("Server Started at port 5000");
})
```

### Modules 
1. Built in - http
2. 3rd Party - 
> download by `npm i <name>`
> use by const ... = require("");
3. Custom 
> Made file *index.js*
> make function
> use _module.exports = sayHello;_
> use by _ const name = require("./index.js");

#### Changing Export Method
1. use `  "type": "module",` in `packae.json `
2. use 
```
import http from "http";
import sayHello from "./sayHello.js";
```
3. Change 

```
// module.exports = sayHello;
export default sayHello;
```



#### Exporting Multiple functions or variables

1. in module file
> // module.exports = sayHello;
> export default sayHello;
> export {name1,name2};

2. in Index.js file
> import sayHello from "./sayHello.js";
> import { name1,name2 } from "./sayHello.js";

#### Line wise Export

1. export const name3= "Labana";
2. import 
```
import sayHello from "./sayHello.js";
import { name1,name2,name3 } from "./sayHello.js";
```
3.Single line import
`import sayHello , { name1,name2,name3 }from "./sayHello.js";`

4. all at once (as an object)
> import * as omobj from "./sayHello.js";
> use 
```
/*    console.log(omobj);
   console.log(omobj.default("Yo"));
   console.log(omobj.name1);
   console.log(omobj.name2);
   console.log(omobj.name3);
   console.log(omobj.name4); */

   console.log(omobj.rand());
```

### Built in module - fs to manuplate file
`import fs from "fs";`
```
const home = fs.readFileSync("./index.html",()=>{
console.log("File Reading");

})
```
### Similarly Path to get Path 


## Starting with Express Js ( Switch Branch)

1. Import and use 
```
import express from "express";

// Server
const app = express();

// Get request and response
app.get("/",(req,res)=>{
   // res.send("Hola");
   res.sendStatus(404);
})

// server listen

app.listen(5000,()=>{
   console.log("Server Started");
   
})
```

## Set Scipt 

```
"scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
run by : 

` npm run dev`

## EJS - (Embedded JavaScript Templating) - Generating html from Javascript

`Sending Dynamic Data`

1. install ` npm i ejs `
2. use 
> Make a folder `views`
> move file to views
> change extension from html to ejs
> use 
```
// Get request and response
app.get("/",(req,res)=>{
// Sending rendered file
res.render("index.ejs",{
   name: "Avtar"
});  

})
```

in html specify

```
<body>
    <h1>Hii <%=name %></h1>
    <h1>Hii <%=locals.name %></h1>
    <h1>Hii <%=45+90 %></h1>
</body>
```
`locals is object which is coming from backend`

`Sending Static Data Like Image`

1. Make a Public Folder add files
2. in index.ejs
3. Attach files
4. in index.js use
> app.use(express.static(path.join(path.resolve(),"public")));

`app.use() - to use files`
`express.static() - to import static files`
`specifying path in parameters`

### Lets Make A rEAL FORM USING EJS

1. Create A Form with 3 fields and Make fetching method as post
2. Setup in index.js
```
app.post("/",(req,res)=>{
   console.log(req.body);
})
```
3. Setup url encoded
` app.use(express.urlencoded({extended:true})); `
4. response
```
{
  name: 'AVTAR SINGH',
  email: 'singha2k2@gmail.com',
  password: 'Avtar'
}
```


### Lets Store the Data in Temp Array
1. Make Array : 
const users = [];
2. Push : 
   users.push({"Username":req.body.name,"Email":req.body.email,"Password":req.body.password});
   res.render("success.ejs");
   
   ![image](https://user-images.githubusercontent.com/88712571/230590330-987eacf6-5647-4837-950c-cf0fe3024fa6.png)
   
   ![image](https://user-images.githubusercontent.com/88712571/230590431-e4aa8bb1-a126-4527-9e88-6fc7c501866c.png)
   
   ![image](https://user-images.githubusercontent.com/88712571/230590564-7a9d1866-aba0-442f-ae16-54baa11a130b.png)

3. Showing in Users Page "/users" -> success.ejs

## Mongodb 

### Connection

1. install `npm i mongoose`
2. `import mongoose from "mongoose"`
3. Define String and Connect 
```
// uri
const uri = "uri";

// Mongoose Connect
mongoose.connect(uri,{
   dbName:"backend"
}).then(()=>{
   console.log("Database Connected");
}).catch((err)=>{
   console.log(err);
})

```
4. Define Schema - for Structure of Collection 
```
const messageSchema = mongoose.Schema({
   name:String,
   email:String,
   Password : String
})
```
5. Defining Model - Basically Collection Name

`const message = mongoose.model("message",messageSchema);`

6. use in method
```
app.get("/add",(req,res)=>{
   message.create({name:"Avtar",email:"singh23@gmail.com",password:"Avtar@123"}).then(()=>{
      res.send("Done");
   }).catch((err)=>{
      console.log(err);
   })
})
```
7. You can also use await and async methods + Getting Data from Input and Sending to Database

```
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

```
## Authentication

1. Make a Simple Login Page without any field
2. Adding Cookies
```app.post("/login",(req,res)=>{
   res.cookie("token","iamin",{
      httpOnly:true,
      expires:new Date(Date.now()+60*1000)
   })
   res.render("submitted.ejs");
})
```

image.png

3. Getting out cookies
use _cookie parser_
`npm i cookie-parser`
> Use `app.use(cookieParser());`
>   console.log(req.cookies);

4. routing on the basis of login and logout
```

app.post("/login",(req,res)=>{
   res.cookie("token","iamin",{
      httpOnly:true,
      // expires:new Date(Date.now()+60*1000)
   })
   res.render("submitted.ejs");
})

app.get("/login_button",(req,res)=>{
   const {token} = req.cookies;
   if(token){
      res.render("submitted.ejs");
   }else{
      res.render("login_button.ejs");
   }

})

app.get("/logout",(req,res)=>{
   res.cookie("token",null,{
      httpOnly:true,
      expires: new Date(Date.now()),
   })
   res.redirect("/");
})
```

5. Seperate Handler (optional)

```
const isAuthenticated = (req,res,next) =>{
   const {token} = req.cookies;
   if(token){
     next();
   }else{
      res.render("login_button.ejs");
   }
}
```


6. Call
```
app.get("/login_button",isAuthenticated,(req,res)=>{
  
res.render("submitted.ejs");
})
```
7. Check Complete Auth at the end

### Using JWT (JSONWEBTOKENS)

check last part about sign and verify

### using bcrypt for hashing password

check signup at last

## Api and Param

1. Make express code

```
import express from "express";

const app = express();

app.get("/",(req,res)=>{
res.send("Hola")
})

app.listen(4000,()=>{
    console.log("Server is Working");
})
```

2. send response as json
```
 res.json({
    name: "Avtar",
    user: []
  });
  ```

3. Connect db
```
const uri =
  "uri";
// Database
mongoose
  .connect(uri,{
    dbName:"backend"
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.json({
    name: "Avtar",
  });
});
```

4. define schema and model and methods

```
const userSchema = mongoose.Schema({
    name : String,
    email : String,
    password : String
})

const User = mongoose.model("users",userSchema);

```
### Getting Data
```

app.get("/users/all", async (req, res) => {
const users  = await User.find({});
console.log(users);
  res.json({
    name: "Avtar",
    users
  });
});


```
 ### sending data throught thunder client

1. Make Method

```
app.post("/users/new", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  res.json({
   success : true,
   message : "User Registered Successfully",
  })
});

``` 
Call
1. To parse json we have to use `app.use(express.json());`
2. now it will be send by json with body

6. Sending Keywords in Params and getting in console see users/all part

### Finding by Id

#### Method 1

```
app.get("/users/id",async (req,res)=>{
  const {id} = req.body;
const user = await User.findById(id);
res.json({
  success : true,
  user
})
})
```

Send
{
  "id" : "64308ddf706c1b6227b371f4"
}

#### Method 2

```
app.get("/users/:id",async (req,res)=>{
  const id = req.params.id;
  console.log(req.params);
const user = await User.findById(id);
res.json({
  success : true,
  user
})
})
```
 ` Url :localhost:4000/users/64308ddf706c1b6227b371f4` 