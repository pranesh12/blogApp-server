const User = require("../models/userModel");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sekretKey = "diskodancer";

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const oldUser = await User.findOne({ email });
    if (!oldUser) res.status(404).json({ message: "User doesn't exsist" });
    const isPasswordCorrect = await bycrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) {
      if (!oldUser) res.status(404).json({ message: "Password doesn't match" });
    } else {
      const token = jwt.sign(
        {
          email: oldUser.email,
          _id: oldUser._id,
        },
        sekretKey,
        { expiresIn: "1h" }
      );

      const result = {
        name: oldUser.name,
        email: oldUser.email,
        _id: oldUser._id,
        isAdmin: oldUser.isAdmin,
      };

      res.status(200).json({ token, result });
    }
  } catch (err) {
    res.json({ message: "something went wrong" });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const oldUser = await User.findOne({ email: email });

    if (!oldUser) {
      const hashPassword = await bycrypt.hash(password, 12);
      const newUesr = await User.create({
        name,
        email,
        password: hashPassword,
      });
      const result = {
        name: newUesr.name,
        email: newUesr.email,
        isAdmin: newUesr.isAdmin,
        _id: newUesr._id,
      };
      const token = jwt.sign(
        { email: newUesr.email, _id: newUesr._id },
        sekretKey,
        { expiresIn: "1h" }
      );
      res.status(201).json({ result, token });
    } else {
      res.status(400).json({ meassage: "You already have an account" });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.allUsers = async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email: email, isAdmin: true });
    if ((user.isAdmin = true)) {
      const userList = await User.find({}).select("-password");
      res.status(200).json(userList);
    } else {
      res.status(400).json({ meassage: "Not found" });
    }
  } catch (err) {
    res.json({ message: "something went wrong" });
  }
};

exports.deleteUser = async (req, res) => {
  const { email, id } = req.query;
  try {
    const user = await User.findOne({ email: email, isAdmin: true });
    if ((user.isAdmin = true)) {
      await User.findOneAndDelete({ _id: id });
    }
  } catch (err) {
    res.json({ message: "unsuccessful" });
  }
};
