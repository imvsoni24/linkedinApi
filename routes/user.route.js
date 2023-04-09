const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.json({ msg: "User already exist, please login" });
  } else {
    try {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.json({ msg: err });
        } else {
          const user = new UserModel({
            name,
            email,
            gender,
            password: hash,
            age,
            city,
          });
          await user.save();
          res.json({ msg: "User Registered, please login" });
        }
      });
    } catch (err) {
      res.json({ msg: err });
    }
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.json({ msg: "User is not exist, please register" });
  } else {
    try {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, name: user.name },
            "vivek"
          );
          if (token) {
            jwt.verify(token, "vivek", (err, decoded) => {
              if (decoded) {
                res.json({
                  msg: "Succesfully login",
                  token: token,
                  name: decoded.name,
                });
              } else {
                res.json({ msg: err });
              }
            });
          }
        } else {
          res.json({ msg: "User credentials are wrong" });
        }
      });
    } catch (err) {
      res.json({ msg: err });
    }
  }
});

module.exports = { userRouter };
