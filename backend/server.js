import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import { error } from "console";

//confiugure dotenv
dotenv.config({
  path: "backend/config/config.env",
});

//handle uncaught exception
process.on("uncaughtException", (err) => {
  console.log("Error", err.message);
  console.log("server close due to uncaugth exception error");
  process.exit(1);
});
// console.log(hello);
//db connection
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`app running in port http://localhost:${process.env.PORT}`);
});

//unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`error due to ${err.message}`);
  console.log(`server is close due to unhandled promise rejection `);
  server.close(() => process.exit(1));
});
