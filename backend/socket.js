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

  let admins = [];

  io.on("connection", (socket) => {
    const isAdmin = socket.handshake.auth.isAdmin;

    console.log("*******************");

    isAdmin
      ? console.log("a admin joined the chat", socket.id)
      : console.log("A USER WAS CONNECTED", socket.id);

    if (isAdmin) {
      admins.push(socket.id);
      socket.join("admins room");
      // io.to('some room').emit('some event');
      // socket.to('some room').emit('some event');
    }

    // We are looping over the io.of("/").sockets object, which is a Map of all currently connected Socket instances, indexed by ID.
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        isAdmin: admins.includes(id),
        // username: socket.username,
      });
    }
    // send a list of connected users to the user that was just connected
    if (isAdmin) {
      console.log("HERE ARE THE USERS:", users);
      socket.emit("users", users);
    }

    /** Think of something so you could send users list only to admins not all of the users that are in chat **/

    // send the new user to other users
    socket.broadcast.to("admins room").emit("user connected", {
      userID: socket.id,
      isAdmin,
      // username: socket.username,
    });

    socket.on("chat message", ({ message, from }) => {
      /** Todo: send this to admins only **/
      // messages.push({ from: socket.id, message });
      socket.broadcast
        .to("admins room")
        .emit("chat message", { message, from });
    });

    socket.on("private message", ({ message, to }) => {
      socket.to(to).emit("private message", message);
    });

    socket.on("disconnect", () => {
      if (admins.includes(socket.id)) {
        admins = admins.filter((a) => a !== socket.id);
      }

      /** Todo: send this only to admins not all of the users, maybe create a room or something  **/
      socket.broadcast
        .to("admins room")
        .emit("user disconnected", { userID: socket.id });

      // messages = messages.filter((msg) => msg.from !== socket.id);

      isAdmin
        ? console.log("An admin was disconnected", socket.id)
        : console.log("a user was disconnected", socket.id);
    });
  });
};

export default runSocket;
