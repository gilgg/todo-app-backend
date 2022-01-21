const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const router = express.Router();

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

router.delete("/api/users/me", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id.toString());
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
