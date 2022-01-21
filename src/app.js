const express = require("express");
const path = require("path");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");
const todoRouter = require("./routers/todo");
const userRouter = require("./routers/user");

const app = express();
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

// app.use(express.static(path.join("public")));
// app.use(express.static(path.join(__dirname, "public")));
app.use(todoRouter);
app.use(userRouter);

// app.use("/*", (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, "public", "index.html"));
// });

// app.listen(5000, () => {
//   console.log("server is up on port 5000");
// });
app.listen(process.env.PORT || 5000);
