import io from "socket.io-client";

const socket = io("http://localhost:5000");//server domain
socket.on("connection");

export const SocketConnect = () => {
  return socket;
};
