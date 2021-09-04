const mongoose = require("mongoose");

const UserDevice = new mongoose.Schema({
  deviceID: String,
  isRegistered: Boolean,
  user_id: String,
  subscriptionNotification: Object,
  socket_id: String,
  credentials: {
    type: Object,
  },
  token: String,
  sensors: [
    {
      name: {
        type: String,
        default: "Pulse Rate",
      },
    },
    {
      name: {
        type: String,
        default: "Spo2",
      },
    },
    {
      name: {
        type: String,
        default: "ECG",
      },
    },
    {
      name: {
        type: String,
        default: "Temperature",
      },
    },
  ],
});

module.exports = {
  UserDevice: mongoose.model("UserDevice", UserDevice),
};
