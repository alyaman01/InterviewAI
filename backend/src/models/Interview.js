const mongoose = require("mongoose");

const InterviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    jobRole: { type: String, required: true },
    topic: { type: String, default: 'General' },
    technology: { type: String, required: true },
    roundType: { type: String, required: true },
    // DYNAMIC DATA INJECTION CONTROLS FIELDS ARRAYS:
    experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Experienced'], default: 'Beginner' },
    interviewMode: { type: String, enum: ['Live', 'Stored'], default: 'Stored' }, 
    status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
    finalScore: { type: Number, default: 0 },
    aiFeedback: {
        strengths: { type: [String], default: [] },
        weakness: { type: [String], default: [] },
        roadmap: { type: String, default: "" }
    },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Interview", InterviewSchema);
