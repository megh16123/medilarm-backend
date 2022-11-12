const express = require("express");
const router = express.Router();
const monthlyreminderModel = require("../models/monthlyreminder");

router.post("/", (req, res) => {
  res.send("hello");
});
router.post("/getall",(req,res)=>{
monthlyreminderModel.find({user:req.UserData.Id}).then((data)=>{
  res.json(data);
});
});
router.post("/add", (req, res) => {
  const mreminder = new monthlyreminderModel({
    user: req.UserData.Id,
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
    .findOneAndUpdate({ _id: req.body.id }, { $set: req.body })
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
    .findByIdAndDelete({ _id: req.body.id })
    .then(() => {
      res.status(200).json({ message: "Reminder Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
