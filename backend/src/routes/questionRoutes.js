const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");
const authMiddleware = require("../middleware/authMiddleware");

// Admin ya testing ke liye endpoint - database mein data seed karne ke liye
// Ise chalu karne se database mein local array save ho jayega
router.post("/seed", authMiddleware, questionController.seedQuestions);

module.exports = router;
