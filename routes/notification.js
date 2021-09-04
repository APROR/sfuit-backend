const express = require("express");
const {
  subscribeNotification,
  fetchNotifications,
} = require("../controllers/notification");
const router = express.Router();

router.post("/subscribe", subscribeNotification);
router.get("/notifications", fetchNotifications);

module.exports = router;
