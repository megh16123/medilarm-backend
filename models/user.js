const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: { type: "string", required: true },
  email: { type: "string", required: true },
  password: { type: "string", required: true },
  pharmacistContact: { type: "number" },
  phoneNo: { type: "number", required: true },
  thirdParty: { type: "string" },
});

module.exports = mongoose.model("userModel", user);
