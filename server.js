import { app } from "./app.js";
import { connectDb } from "./Data/database.js";

connectDb();


app.listen(process.env.PORT, () => {
  console.log("Server is Working");
});