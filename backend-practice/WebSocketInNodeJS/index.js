import express from "express";
import http from "http";
import path from "path";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Sockit io connection

io.on("connection", (socket) => {
  // console.log("connected" + socket.id);
  socket.on("message", (message) => {
    console.log(`${message}`);
    socket.emit("sendmessage", message);
  });
});

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  res.sendFile("/public/index.html");
});

server.listen(9000, () => {
  console.log("Server is running on port 9000");
});
