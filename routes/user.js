const express = require("express");

const { login, register, allUsers } = require("../controllers/userController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers", allUsers);

module.exports = router;
