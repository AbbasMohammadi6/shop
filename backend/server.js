import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnect from "./dbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();
dbConnect();
app.use(morgan("tiny"));

app.use("/api/products/", productRouter);
app.use("/api/users/", userRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () =>
  console.log("Server is running on port 5000".yellow.bold)
);
