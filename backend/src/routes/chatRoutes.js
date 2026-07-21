const express = require("express");
const router = express.Router();
const chatcontroller = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.use(authMiddleware);


router.post("/message", chatcontroller.sendMessage);
router.get("/chat/:interviewId", chatcontroller.getInterviewChat);

module.exports = router;