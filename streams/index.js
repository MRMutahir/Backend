import express from "express";
import fs, { stat } from "fs";
import http from "http";
import path from "path";
import status from "express-status-monitor";
import  zlib from "zlib"

const app = express();
app.use(status());

app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  try {
    const textdata = fs.readFileSync(
      path.resolve("./public/lorem.txt"),
      "utf-8"
    );
    res.send(textdata);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/textStream", (req, res) => {
  const stream = fs.createReadStream(path.resolve("./public/lorem.txt"));
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});




fs.createReadStream("./public/lorem.txt").pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")))


app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
