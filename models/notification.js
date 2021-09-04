const mongoose = require("mongoose");
Schema = mongoose.Schema;

const notifSchema = new mongoose.Schema({
  deviceID: String,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    message: String,
    value: String,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = {
  Notification: mongoose.model("Notification", notifSchema),
};
