const { json } = require("express");
const express = require("express");
const { get } = require("mongoose");
const UserModel = require("../models/userModel");
// const app = express();
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({
      userId: req.body.userId,
      password: req.body.password,
      verified: true,
    });
    if (user) res.send(user);
    else res.status(400).json({ message: "Login Failed", user });
  } catch (error) {
    res.status(400).json(error);
  }
});
router.post("/register", async (req, res) => {
  try {
    const newuser = new UserModel({ ...req.body, verified: false });
    await newuser.save();
    res.send("User registered successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;