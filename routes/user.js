const express = require("express");
const router = express.Router();
const User = require("../models/useDetailModel");

router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/users", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userPTR = new User({
    username,
    password,
  });

  try {
    const newUser = await userPTR.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
