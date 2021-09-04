const mongoose = require("mongoose");

const sensorData = new mongoose.Schema({
  deviceID: String,
  heart: String,
  spo2: String,
  ecg: String,
  body_temp: String,
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = {
  sensorData: mongoose.model("SensorData", sensorData),
};
