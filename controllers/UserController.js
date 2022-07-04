const User = require("../models/useDetailModel");
const bycrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addUser = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const userPTR = new User({
    username,
    password,
  });

  try {
    const newUser = await userPTR.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const userTBD = await User.findById(id);
    userTBD.remove();
    res.send(userTBD);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
