const express = require("express");
const Todo = require("../models/todo");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/api/todos", auth, async (req, res) => {
  try {
    await req.user.populate("todos");
    res.send(req.user.todos.reverse());
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/api/todos", auth, async (req, res) => {
  const todo = new Todo({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await todo.save();
    await req.user.populate("todos");
    res.status(201).send(req.user.todos.reverse());
  } catch (err) {
    res.status(500).send();
  }
});

router.patch("/api/todos/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    const toUpdate = req.body.desc
      ? { desc: req.body.desc }
      : { isCompleted: req.body.isCompleted };
    await Todo.findByIdAndUpdate(id, toUpdate);
    await req.user.populate("todos");
    res.send(req.user.todos.reverse());
  } catch (err) {
    res.status(500).send();
  }
});

router.delete("/api/todos/:id", auth, async (req, res) => {
  const id = req.params.id;

  try {
    await Todo.findByIdAndDelete(id);
    await req.user.populate("todos");
    res.send(req.user.todos.reverse());
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
