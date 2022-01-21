const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/api/users/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send(token);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/api/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send(token);
  } catch (err) {
    res.status(500).send();
  }
});

router.post("/api/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (err) {
    res.status(500).send();
  }
});

router.get("/api/users/me", auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
