const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/", UserController.getUsers);
router.post("/", UserController.addUser);
router.delete("/:id", UserController.deleteUser);

module.exports = router;
