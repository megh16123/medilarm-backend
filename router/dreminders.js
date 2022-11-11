const express = require("express");
const router = express.Router();
const dailyreminderModel = require("../models/dailyreminder");
router.post("/", (req, res) => {
  res.send("hello");
});
router.post("/add", (req, res) => {
  const reminder = new dailyreminderModel({
    user: req.UserData.Id,
    nameofmedicine: req.body.nameofmedicine,
    time: req.body.time,
    quantity: req.body.quantity,
    unit: req.body.unit,
  });
  reminder
    .save()
    .then(() => {
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.post("/getall", (req, res) => {
  dailyreminderModel.find({ user: req.UserData.Id }).then((data) => {
    res.json(data);
  });
});
router.post("/take", (req, res) => {
  dailyreminderModel
    .findOne({ _id: req.body.id })
    .exec()
    .then((reminder) => {
      reminder.taken = !reminder.taken;
      reminder.save().then(() => {
        res.status(200).json({ message: "Success" });
      });
    });
});
router.post("/edit", (req, res) => {
  dailyreminderModel
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
  dailyreminderModel
    .findByIdAndDelete({ _id: req.body.id })
    .then(() => {
      res.status(200).json({ message: "Reminder Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
