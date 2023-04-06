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