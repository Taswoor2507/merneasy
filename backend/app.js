import express from "express";
const app = express();

app.use(express.json());

//import product route
import productRoute from "./routes/product.route.js";
app.use("/api/v1", productRoute);

export default app;
