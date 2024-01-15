import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: `SALAM from express server ${process.pid}` });
});
app.listen(3000, () => console.log("Server running on port 3000"));
