const express = require("express");
const { userAuth } = require("../controllers/auth");
const router = express.Router();

router.post("/auth", userAuth);

module.exports = router;
