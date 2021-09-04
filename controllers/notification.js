const webPush = require("web-push");
const { UserDevice } = require("../models/user-device");
const { Notification } = require("../models/notification");
const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails(
  "mailto:test@example.com",
  publicVapidKey,
  privateVapidKey
);

const subscribeNotification = async (req, res) => {
  try {
    const { subscription, uid } = req.body;
    let userSubscriptionSuccess = await UserDevice.findOneAndUpdate(
      { user_id: uid },
      { subscriptionNotification: subscription },
      { new: true }
    );
    if (userSubscriptionSuccess) {
      res.status(200).json({
        message: userSubscriptionSuccess,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "error",
    });
  }
  //   webPush.sendNotification(subscription, "hello");
};

// const sendNotification=(req,res)=>{
//     const {subscription}=req.body;
//     webPush.sendNotification(subscription)
// }

const fetchNotifications = async (req, res) => {
  try {
    const { deviceID } = req.body;
    let notificationsResult = await Notification.findById({
      deviceID: deviceID,
    }).sort({ timestamp: -1 });
    res.send({
      message: notificationsResult,
    });
  } catch (e) {
    res.status(500).send({
      message: e.toString(),
    });
  }
};

module.exports = {
  subscribeNotification: subscribeNotification,
  fetchNotifications: fetchNotifications,
};
