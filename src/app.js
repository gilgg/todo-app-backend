const path = require("path");
const express = require("express");
require("dotenv").config();
require("./db/mongoose");
const todoRouter = require("./routers/todo");
const userRouter = require("./routers/user");

const app = express();
app.use(express.json());

// app.use(express.static(path.join("public")));
app.use(express.static(path.join(__dirname, "public")));
app.use(todoRouter);
app.use(userRouter);

app.use("*", (req, res, next) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

app.listen(process.env.PORT, () => {
  console.log("server is up on port 5000");
});
