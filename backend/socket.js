import { Server as socketServer } from "socket.io";
import { httpServer } from "./server.js";

const runSocket = () => {
  const io = new socketServer(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A USER WAS CONNECTED");

    socket.on("disconnect", () => console.log("a user was disconnected"));
  });
};

export default runSocket;
