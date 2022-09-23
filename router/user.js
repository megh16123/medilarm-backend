const express = require("express");
const router = express.Router();
const crypter = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const connectDB = require("../database/dbconn");
const UserModel = require("../models/user");

connectDB();

router.get("/", (req, res) => {
  res.send("user");
});

router.post("/register", (req, res) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((usr) => {
      if (usr.length >= 1) {
        return res.status(409).json({ message: "Mail Exists!" });
      } else {
        crypter.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(409).json({
              error: err,
              message: "Error",
              data: req.body.email,
            });
          } else {
            const User = new UserModel({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              phoneNo: req.body.phoneNo,
              password: hash,
              pharmacistContact: req.body.pharmacistContact,
              thirdParty: req.body.thirdParty,
            });
            User.save()
              .then(() => {
                res.json({ message: "User Created" });
              })
              .catch((err) => {
                res.status(500).json({ error: err });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
});
// Sign In
router.post("/login", (req, res) => {
  UserModel.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(409).json({ message: "Auth Failed" });
      }
      crypter.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(409).json({ message: "Auth Failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              name: user[0].name,
              email: user[0].email,
              phoneNo: user[0].phoneNo,
              Id: user[0]._id,
              pharmacistContact: user[0].pharmacistContact,
              thirdParty: user[0].thirdParty,
            },
            process.env.THE_SECRET,
            {
              expiresIn: "1hr",
            }
          );
          return res
            .status(200)
            .json({ message: "Auth Success", token: token });
        }
        res.status(409).json({ message: "Auth Failed" });
      });
    })
    .catch((err) => {
      res.status(409).json({ error: err });
    });
});
// Delete User
const func = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.THE_SECRET);
    req.UserData = decoded;
    next();
  } catch (err) {
    res.status(409).json({ error: err });
  }
};
router.delete("/delete", func, (req, res) => {
  UserModel.deleteOne({ _id: req.body.id })
    .exec()
    .then((user) => {
      res.status(200).json({ message: "Deleted Successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;