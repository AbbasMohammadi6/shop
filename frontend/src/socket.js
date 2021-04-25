import { io } from "socket.io-client";

const URL = "http://localhost:5000";

const socket = io(URL, {
  autoConnect: false,
});

socket.onAny((events, ...args) => {
  console.log(events, args);
});

export default socket;
