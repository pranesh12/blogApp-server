const express = require("express");

const {
  login,
  register,
  allUsers,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", allUsers);
router.delete("/delete", deleteUser);

module.exports = router;
