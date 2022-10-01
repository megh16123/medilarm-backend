const mongoose = require("mongoose");

const monthlyreminderSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'userModel'},
    nameofmedicine:{type:'string'},
    date:{type:'date'},
    quantity:{type:'number'},
    unit:{type:'string'}
});

module.exports = mongoose.model("monthlyreminder", monthlyreminderSchema);