const { UserDevice } = require("../models/user-device");

const userAuth = async (req, res) => {
  try {
    const { deviceID, credentials, user_id } = req.body;
    if (await UserDevice.exists({ deviceID: deviceID })) {
      await UserDevice.findOneAndUpdate({
        isRegistered: true,
        credentials: credentials,
        user__id: user_id,
      });
      res.send({
        message: user,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
};

module.exports = {
  userAuth: userAuth,
};
