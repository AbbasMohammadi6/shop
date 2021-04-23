import { Server as socketServer } from "socket.io";
import { httpServer } from "./server.js";

const runSocket = () => {
  const io = new socketServer(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  let messages = [];
  // [{from, to, message}]

  io.on("connection", (socket) => {
    console.log("A USER WAS CONNECTED");

    // We are looping over the io.of("/").sockets object, which is a Map of all currently connected Socket instances, indexed by ID.
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        // username: socket.username,
      });
    }
    // send a list of connected users to the user that was just connected
    socket.emit("users", users);

    /** Think of something so you could send users list only to admins not all of the users that are in chat **/

    // send the new user to other users
    socket.broadcast.emit("user connected", {
      userID: socket.id,
      // username: socket.username,
    });

    socket.on("chat message", ({ message, from, to }) => {
      /** Todo: send this to admins only **/
      // messages.push({ from: socket.id, message });
      socket.broadcast.emit("chat message", message);
    });

    socket.on("disconnect", () => {
      /** Todo: send this only to admins not all of the users, maybe create a room or something  **/
      socket.broadcast.emit("user disconnected", { userID: socket.id });

      // messages = messages.filter((msg) => msg.from !== socket.id);

      console.log("a user was disconnected");
    });
  });
};

export default runSocket;
