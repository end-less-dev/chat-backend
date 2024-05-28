const express = require("express");
const router = express.Router();
const messageController = require("../controller/message.controller")

router.post("/create-message", messageController.createMessage)

module.exports = router