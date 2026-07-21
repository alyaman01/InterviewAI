const Interview = require("../models/Interview");
const interviewService = require("../services/interviewService");
const questionController = require("./questionController");
const ChatHistory = require("../models/ChatHistory"); // Fixed Model Load

exports.startInterview = async(req,res) => {
    try {
        const { jobRole, topic, technology, roundType, experienceLevel, interviewMode } = req.body;
        const userId = req.userData.userId;

        if(!jobRole) {
            return res.status(400).json({ message: 'Job role is required' });
        }

        const newInterview = new Interview({
            userId,
            jobRole,
            topic: topic || 'General',
            technology,
            roundType,
            experienceLevel: experienceLevel || 'Beginner', 
            interviewMode: interviewMode || 'Stored', 
            status: 'ongoing'
        });
        await newInterview.save();

        let firstQuestion = "";

        if (interviewMode === 'Live') {
            firstQuestion = await interviewService.generateFirstQuestion(technology, roundType, experienceLevel || 'Beginner');
        } else {
            // Local Database question pick execution
            const storedQ = await questionController.getRandomStoredQuestion(technology, experienceLevel || 'Beginner', []);
            firstQuestion = storedQ ? storedQ.questionText : `Explain the difference between state and props in React.`;
        }

        // 🔥 FIX: Pehla sawaal instantly database chat history mein save kiya role: 'model' ke sath
        const initialChat = new ChatHistory({
            interviewId: newInterview._id,
            role: 'model',
            message: firstQuestion
        });
        await initialChat.save();

        return res.status(201).json({
            message: 'Interview Session Started successfully',
            interview: newInterview,
            firstQuestion: firstQuestion
        });
    } catch(error) {
        console.error("❌ INTERVIEW START CONTROLLER CRASH:", error.message);
        return res.status(500).json({ message: 'Error starting interview session', error: error.message });
    }
};

exports.endInterview = async (req, res) => {
    try {
        const { interviewId } = req.body;
        const chats = await ChatHistory.find({ interviewId }).sort({ createdAt: 1 });

        const interview = await Interview.findById(interviewId);
        if (!interview) {
            return res.status(404).json({ message: 'Interview session not found' });
        }

        const feedback = await interviewService.generateInterviewFeedback(
            interview.technology,
            interview.roundType,
            chats
        );

        interview.status = 'completed';
        interview.finalScore = feedback.finalScore || 70;
        interview.aiFeedback = {
            strengths: feedback.strengths || ["Completed technical interactive sessions"],
            weakness: feedback.weakness || ["Deep technical optimizations review suggested"],
            roadmap: feedback.roadmap || "Review past conversation transcripts for core improvements."
        };
        await interview.save();

        return res.status(200).json({
            message: 'Interview ended successfully and feedback generated!',
            reportCard: interview
        });
    } catch (error) {
        console.error("❌ INTERVIEW END EXECUTION FAULT:", error.message);
        return res.status(500).json({ message: 'Error closing interview round process', error: error.message });
    }
};

exports.getUserInterviews = async(req,res) => {
    try {
        const userId = req.userData.userId;
        const interviews = await Interview.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(interviews);
    } catch(error) {
        return res.status(500).json({ message: 'Error fetching customer list history', error: error.message });
    }
};
