import express from "express";
import * as controller from "../Controllers/userControllers.js";


const routes = express.Router();


routes.get("/all",controller.getAllUsers);

routes.post("/register",controller.RegisterUser );
routes.post("/login",controller.LoginUser );
routes.post("/logout",controller.LogoutUser );


// Static
routes.get("/id",controller.findUserById);

// Dynamic
// routes.get("/:id",controller.findUserByUrlId);

// // Using Multiple Routes at once
// routes.put("/:id",controller.updateUser).delete("/:id",controller.DeleteUserByUrlId)

export default routes;