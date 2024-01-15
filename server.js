import cluster from "cluster";
import os from "os";
import express from "express";

const totalCPUs = os.cpus().length;
// console.log(totalCPUs)
if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  const app = express();
  app.get("/", (req, res) => {
    res.json({ message: `SALAM from express server ${process.pid}` });
  });
  app.listen(3000, () => console.log("Server running on port 3000"));
}
