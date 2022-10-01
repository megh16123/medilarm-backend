const express = require("express");
const router = express.Router();
const monthlyreminderModel = require("../models/monthlyreminder");
router.post("/", (req, res) => {
  res.send("hello");
});
router.post("/add", (req, res) => {
  const mreminder = new monthlyreminderModel({
    user: req.body.id,
    nameofmedicine: req.body.nameofmedicine,
    date: req.body.date,
    quantity: req.body.quantity,
    unit: req.body.unit,
  });
  mreminder
    .save()
    .then(() => {
      res.status(200).json({ message: "reminder successfully added" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.post("/edit", (req, res) => {
  monthlyreminderModel
    .findOneAndUpdate({ _id: req.body.medid }, { $set: req.body })
    .exec()
    .then(() => {
      res.status(200).json({ message: "Reminder Updated" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.post("/delete", (req, res) => {
  monthlyreminderModel
    .findByIdAndDelete({ _id: req.body.medid })
    .then(() => {
      res.status(200).json({ message: "Reminder Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
