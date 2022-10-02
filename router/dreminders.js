const express = require("express");
const router = express.Router();
const dailyreminderModel = require("../models/dailyreminder");
router.post("/", (req, res) => {
  res.send("hello");
});
router.post("/add", (req, res) => {
  const reminder = new dailyreminderModel({
    user: req.body.id,
    nameofmedicine: req.body.nameofmedicine,
    time: [
      {
        hours: req.body.hours,
        minutes: req.body.minutes,
        seconds: req.body.seconds,
      },
    ],
    quantity: req.body.quantity,
    unit: req.body.unit,
  });
  reminder
    .save()
    .then(() => {
      res.status(200).json({ message: "Success" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
router.post("/getall",(req,res)=>{
  dailyreminderModel.find({user:req.body.uid}).then((data)=>{
    res.json(data);
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
    .findByIdAndDelete({ _id: req.body.medid })
    .then(() => {
      res.status(200).json({ message: "Reminder Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
module.exports = router;
