const jwt = require("jsonwebtoken");
require('dotenv').config()
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // verifies the token contains the correct credentials
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) { // if the credentials supplied to login are wrong
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    res.status(500).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
