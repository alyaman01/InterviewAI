const express = require("express");
const router = express.Router();
const interviewController = require("../controllers/interviewController");

router.post("/start", interviewController.startInterview);
router.get("/list", interviewController.getUserInterviews);

router.post("/end", interviewController.endInterview); 


module.exports = router;