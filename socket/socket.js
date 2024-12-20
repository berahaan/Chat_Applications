const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
app.use(cors());

const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
let onlineUsers = []; // To store the list of online users
io.on("connection", (socket) => {
  socket.emit("user-connected");
  socket.on("user-online", (user) => {
    if (user && !onlineUsers.includes(user)) {
      onlineUsers.push(user); // Add the user to the online list if they aren't already there
      io.emit("users-online", onlineUsers); // Broadcast the updated online users list to everyone
    }
  });
  // Handle user logout (disconnect)
  socket.on("user-loggedout", (username) => {
    onlineUsers = onlineUsers.filter((usr) => usr !== username); // Remove user from the online list
    io.emit("users-online", onlineUsers); // Broadcast the updated online users list to everyone
    socket.broadcast.emit("user-disconnected", onlineUsers); // Notify others that a user has disconnected
  });

  // Handle sending messages
  socket.on("send-message", (message) => {
    socket.broadcast.emit("receive-message", message); // Broadcast the message to everyone except the sender
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id); // Log when a user disconnects
    // Remove user from online list if they disconnected
    onlineUsers = onlineUsers.filter((usr) => usr !== socket.username);
    io.emit("users-online", onlineUsers); // Broadcast the updated online users list
  });
});

server.listen(3000, () => {
  console.log("Server listening on port 3000");
});
