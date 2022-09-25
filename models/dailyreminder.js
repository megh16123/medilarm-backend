const mongoose = require("mongoose");

const dailyreminderSchema = new mongoose.Schema({});

module.exports = mongoose.model("dailyreminder", dailyreminderSchema);
