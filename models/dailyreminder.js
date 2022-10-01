const mongoose = require("mongoose");

const dailyreminderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  nameofmedicine: { type: "string" },
  time: [{
    hours: {
        type: Number, required: true, min: 0, max: 23
    },
    minutes: {
        type: Number, required: true, min: 0, max: 59
    },
    seconds: {
        type: Number, required: true, min: 0, max: 59
    }
}],
  quantity: { type: "Number" },
  unit: { type: "string" },
});

module.exports = mongoose.model("dailyreminder", dailyreminderSchema);
