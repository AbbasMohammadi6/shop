import { Server as socketServer } from "socket.io";
import { httpServer } from "./server.js";

const runSocket = () => {
  const io = new socketServer(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ["GET", "POST"],
    },
  });

  // save messages to send for admin that join the chat after that users have send messages.
  let messages = [];
  // [{message, from, to, isAdmin}]

  // maybe there is more than one admin
  let admins = [];

  io.on("connection", (socket) => {
    const isAdmin = socket.handshake.auth.isAdmin;

    console.log("*******************");

    isAdmin
      ? console.log("a admin joined the chat", socket.id)
      : console.log("A USER WAS CONNECTED", socket.id);

    // If this socket is admin, add them to admins array
    if (isAdmin) {
      admins.push(socket.id);
      socket.join("admins room");
    }

    // If this socket is not admin and there is no admin connected, send a message to them
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
      console.log(messages);
    }

    // send the new socket to admins
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

    socket.on("private message", ({ message, to, from }) => {
      // save isAdmin in each message becuase socket ids change on each connection so we don't which message was sent by a user.
      messages.push({ message, to, isAdmin: admins.includes(from) });
      socket.to(to).emit("private message", message);
    });

    socket.on("disconnect", () => {
      if (isAdmin) {
        admins = admins.filter((a) => a !== socket.id);
      }

      // Don't delete this admin's messages, because maybe there is other admins and they want to continue the chat
      if (!isAdmin) {
        messages = messages.filter(
          (m) => m.to !== socket.id && m.from !== socket.id
        );
      }

      socket.broadcast
        .to("admins room")
        .emit("user disconnected", { userID: socket.id });

      isAdmin
        ? console.log("An admin was disconnected", socket.id)
        : console.log("a user was disconnected", socket.id);
    });
  });
};

export default runSocket;
