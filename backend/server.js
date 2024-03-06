import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";

//confiugure dotenv
dotenv.config({
  path: "backend/config/config.env",
});

//db connection
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`app running in port http://localhost:${process.env.PORT}`);
});
