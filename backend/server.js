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
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import authRouter from "./routes/authRoutes.js";
import initGoogleStrategy from "./strategies/google.js";
import initLocalStrategy from "./strategies/local.js";
import initLocalSignupStrategy from "./strategies/localSignup.js";

const app = express();

dotenv.config();
dbConnect();

export const httpServer = http.createServer(app);
runSocket();

app.use(express.json());

app.use(
  session({
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
initGoogleStrategy();
initLocalStrategy();
initLocalSignupStrategy();
app.use(passport.session());

if (process.env.NODE_ENV !== "production") app.use(morgan("tiny"));

app.use("/api/users/", userRouter);
app.use("/api/products/", productRouter);
app.use("/api/auth", authRouter);

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
