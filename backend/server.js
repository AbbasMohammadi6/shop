import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import dbConnect from "./dbConnect.js";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoutes.js";
import http from "http";
import runSocket from "./socket.js";

const app = express();

dotenv.config();
dbConnect();

export const httpServer = http.createServer(app);
runSocket();

app.use(express.json());

if (process.env.NODE_ENV !== "production") app.use(morgan("tiny"));

app.use("/api/products/", productRouter);
app.use("/api/users/", userRouter);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT;

httpServer.listen(PORT, () =>
  console.log(`Server is running on port ${PORT}`.yellow.bold)
);
