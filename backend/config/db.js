import mongoose from "mongoose";
import DB_NAME from "../constant.js";
const connectDB = async () => {
  const connectionInstance = await mongoose.connect(
    `${process.env.MONGODB_URI}/${DB_NAME}`
  );
  console.log(`DATABASE connect on host ${connectionInstance.connection.host}`);
};

export default connectDB;
