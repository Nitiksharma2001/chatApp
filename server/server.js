const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

// socket io server formation
const io = new Server(server, {
  cors: {
    origin: "http://localhost:13741",
    methods: ["GET", "POST"],
  },
});

// if user connects in frontend
io.on("connection", (socket) => {
  console.log("user connected ", socket.id);

  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("user with id", socket.id, "connected to room", room)
  });

  // if user disconnects in frontendss
  socket.on("disconnect", () => {
    console.log("User disconnected ", socket.id);
  });
});

const PORT = 4000;
server.listen(PORT, () => {
  console.log("server is listening to port", PORT);
});
