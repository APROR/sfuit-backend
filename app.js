var express = require("express");
var app = express();
const path = require("path");
const httpServer = require("http").createServer(app);
const server = httpServer;
require("dotenv").config({ path: path.join(__dirname, ".env") });
const awsIot = require("aws-iot-device-sdk");
const io = require("socket.io")(server);
var cors = require("cors");
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const webPush = require("web-push");

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log("DB NOT CONNECTED", err));

const client = awsIot.device({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  host: process.env.HOST,
  region: process.env.REGION,
  protocol: "wss",
  clientId: "node-1",
});
const notifRoute = require("./routes/notification");
const authRoute = require("./routes/auth");
const { UserDevice } = require("./models/user-device");
const {
  getcriticalDescription,
} = require("./controllers/criticalValuesHandler");

app.use(cors());
app.use(express.json());
app.get("/", function (req, res) {
  res.send("Welcome to sfuit API");
});

client.on("connect", function () {
  console.log("connect");
  client.subscribe("apror/#");
});

client.on("message", async function (topic, payload) {
  console.log("message", topic, JSON.parse(payload));
  const deviceID = topic.split("/")[1];
  io.on("connection", async (socket) => {
    let user = await UserDevice.findOne({ deviceID: deviceID });
    if (Object.values(getcriticalDescription(payload)).length > 0) {
      webPush.sendNotification(
        user.subscriptionNotification,
        getcriticalDescription()
      );
      socket.emit(deviceID, { ...payload, isCritical: true });
    } else {
      socket.emit(deviceID, payload);
    }
    //check to be added
  });
});

client.on("timeout", function (thingName, clientToken) {
  console.log(
    "received timeout on " + thingName + " with token: " + clientToken
  );
});

app.use("/notification", notifRoute);
app.use("/", authRoute);

server.listen(8000, function () {
  console.log("app listening on port 8000!");
});
