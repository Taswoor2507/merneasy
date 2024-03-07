import express from "express";
const app = express();

app.use(express.json());

//import product route
import productRoute from "./routes/product.route.js";
app.use("/api/v1", productRoute);
//import error middleware
import errorMiddleware from "./middleware/error.js";
app.use(errorMiddleware);
export default app;
