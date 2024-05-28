const express = require("express");
const router = express.Router();
const userController = require("../controller/user.controller")

router.get("/get-all-users", userController.getAllUsers)
router.get("/get-user-by-userId/:userId", userController.getUserByUserId)
router.post("/create-user", userController.createUser)
router.patch("/update-user/:userId", userController.updateUser)

module.exports = router