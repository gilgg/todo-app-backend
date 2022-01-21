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

app.use(todoRouter);
app.use(userRouter);

app.listen(process.env.PORT || 5000);
