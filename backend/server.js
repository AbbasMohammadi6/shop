import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import dbConnect from "./dbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import productRouter from "./routes/productRoutes.js";

const app = express();

dotenv.config();
dbConnect();
app.use(morgan("tiny"));

// (async function () {
//   try {
//     const mproducts = await Product.insertMany(products);
//     console.log(mproducts);
//   } catch (e) {
//     console.log(e);
//   }
// })();

// app.get("/", async (req, res) => {
//   res.send("Mangool is connected");
// });

app.use("/api/products/", productRouter);
// app.get("/api/products", async (req, res) => {
//   res.send("It is working");
// });

app.use(notFound);
app.use(errorHandler);

app.listen(5000, () =>
  console.log("Server is running on port 5000".yellow.bold)
);
