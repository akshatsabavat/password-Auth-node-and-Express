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
  try {
    const salt = await bycrypt.genSalt(10); // higher the salt value better the hash, more secure but the longer it takes to make the hash
    const hashedPassword = await bycrypt.hash(req.body.password, salt);
    const userPTR = new User({
      username: req.body.username,
      password: hashedPassword,
    });
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

exports.loginUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (user == null) res.status(404).send({ message: "user not found" });

  try {
    const passwordMatch = await bycrypt.compareSync(
      req.body.password,
      user.password
    );
    if (passwordMatch) {
      res.send({ message: `Welcome back ${user.username}` });
    } else {
      res.send({ message: `invalid password` });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
