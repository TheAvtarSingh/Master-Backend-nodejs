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