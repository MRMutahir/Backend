// import express from "express";
// import "dotenv/config";
// import bodyparser from "body-parser";
// import fs from "fs";
// import multer from "multer";

// const app = express();
// app.use(bodyparser.urlencoded({ extended: true }));
// app.use(bodyparser.json());
// app.set("view engine", "ejs");

// const PORT = 3000;
// const upload = multer({ dest: "uploads/" });

// app.get("/", (req, res) => {
//   res.render("index");
// });

// app.post("/convertFileToJson", upload.single("profileImage"), (req, res) => {
//   console.log(req.body, "reqBody>>>>>>>>>>>>>>>>>>>>>>>>>>>");
//   console.log(req.file, "reqFile>>>>>>>>>>>>>>>>>>>>>>>>>>>");

//   return res.redirect("/");
//   // const file = req.body.file;
//   // console.log(file, ">>>>>>>>>>>.file");
//   // res.send(file);
// });

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// file save ho rahi hen server  m

// const express = require("express");
// const http = require("http");
// const socketIO = require("socket.io");
// const fs = require("fs");

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);
// app.set("view engine", "ejs");

// const port = 3000;

// app.use(express.static(__dirname + "/public")); // Serve static files

// // Socket.IO logic for real-time communication
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   // Handle file sharing events
//   socket.on("file", (data) => {
//     const fileName = data.fileName;
//     const fileContent = data.fileContent;

//     // Save the file to the server
//     fs.writeFile(`./public/${fileName}`, fileContent, (err) => {
//       if (err) {
//         console.error("Error saving file:", err);
//       } else {
//         console.log("File saved successfully");
//         // Broadcast the file name to all connected clients
//         io.emit("file", fileName);
//       }
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });

// // Serve the main HTML file
// app.get("/", (req, res) => {
//   res.render("index");
// });

// server.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// buffer

const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const fs = require("fs");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.set("view engine", "ejs");

const port = 3000;

app.use(express.static(__dirname + "/public")); // Serve static files

// Socket.IO logic for real-time communication
io.on("connection", (socket) => {
  console.log("A user connected");

  // Handle file sharing events
  socket.on("file", (data) => {
    const fileName = data.fileName;
    const fileContent = data.fileContent;

    // Convert the file content to a Buffer
    const buffer = Buffer.from(fileContent, "base64");
    console.log(buffer, "buffer");

    // Send the file content as a response
    socket.emit("file", { fileName, fileContent });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Serve the main HTML file
app.get("/", (req, res) => {
  res.render("index");
});

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
