const mongoose = require("mongoose");

const monthlyreminderSchema = new mongoose.Schema({});

module.exports = mongoose.model("monthlyreminder", monthlyreminderSchema);
