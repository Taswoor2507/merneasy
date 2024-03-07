import express from "express";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
//import product route && user route
import productRoute from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
app.use("/api/v1", productRoute);
app.use("/api/v1", userRouter);

//import error middleware
import errorMiddleware from "./middleware/error.js";
app.use(errorMiddleware);
export default app;
