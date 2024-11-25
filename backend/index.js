//packages
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import {app} from "./app.js"
import { configureCloudinary } from "./utils/cloudinary.js";

dotenv.config({path: ".env"});

const port = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(port, () => console.log(`server is running on port:${port}`))
  configureCloudinary()

}).catch((error) => console.log(`there was some error: ${error}`));

