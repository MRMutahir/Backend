import express from "express";
import fs, { stat } from "fs";
import http from "http";
import path from "path";
import { Server } from "socket.io";
import status from "express-status-monitor";

const app = express();
app.use(status());
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
// app.get("/text", (req, res) => {
//   try {
//     const textdata = fs.readFileSync(
//       path.resolve("./public/lorem.txt"),
//       "utf-8"
//     );
//     res.send(textdata);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Internal Server Error");
//   }
// });
// app.get("/textStream", (req, res) => {
//   const stream = fs.createReadStream(path.resolve("/public/lorem.txt"));
//   stream.on("data", (chunk) => res.write(chunk));
//   stream.on("end", () => res.end());
// });

server.listen(9000, () => {
  console.log("Server is running on port 9000");
});
