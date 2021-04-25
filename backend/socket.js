import { Server as socketServer } from "socket.io";
import { httpServer } from "./server.js";

const runSocket = () => {
  const io = new socketServer(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // save messages to send for admin that join the chat after that users have send messages.
  let messages = [];
  // [{message, from, to}]

  // maybe there is more than one admin
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
    }

    if (!isAdmin && !admins.length) {
      socket.emit("private message", "متأسفانه هنوز ادمینی وارد چت نشده است");
    }

    // We are looping over the io.of("/").sockets object, which is a Map of all currently connected Socket instances, indexed by ID.
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        isAdmin: admins.includes(id),
      });
    }
    // send a list of connected users to the user that was just connected
    if (isAdmin) {
      socket.emit("users", users);
      socket.emit("messages", messages);
    }

    /** Think of something so you could send users list only to admins not all of the users that are in chat **/

    // send the new user to other users
    socket.broadcast.to("admins room").emit("user connected", {
      userID: socket.id,
      isAdmin,
    });

    socket.on("chat message", ({ message, from }) => {
      messages.push({ message, from: socket.id });
      socket.broadcast
        .to("admins room")
        .emit("chat message", { message, from });
    });

    socket.on("private message", ({ message, to }) => {
      messages.push({ message, to });
      socket.to(to).emit("private message", message);
    });

    socket.on("disconnect", () => {
      if (admins.includes(socket.id)) {
        admins = admins.filter((a) => a !== socket.id);
      }

      messages = messages.filter(
        (m) => m.to !== socket.id && m.from !== socket.id
      );

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
