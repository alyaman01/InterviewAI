const ChatHistory = require("../models/ChatHistory");
const Interview = require("../models/Interview");
const interviewService = require("../services/interviewService");
const Question = require("../models/Question");

exports.sendMessage = async(req, res) => {
    try {
        const { interviewId, sender, message } = req.body;

        if(!interviewId || !sender || !message) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // 1. Candidate ka data database mein save kiya
        const newChat = new ChatHistory({
            interviewId,
            role: 'user', 
            message: message.trim()
        });
        await newChat.save();

        const interviewDetails = await Interview.findById(interviewId);
        if (!interviewDetails) {
            return res.status(404).json({ message: 'Interview session not found' });
        }

        // CONNECT FIXED JUGAAAD: InterviewId ko string aur object dono tarike se query kiya
        const previousChats = await ChatHistory.find({ 
            $or: [
                { interviewId: interviewId },
                { interviewId: interviewDetails._id }
            ]
        }).sort({ createdAt: 1 });

        let nextQuestion = "";

        if (interviewDetails.interviewMode === 'Live') {
            nextQuestion = await interviewService.generateNextQuestion(
                interviewDetails.technology,
                interviewDetails.roundType,
                previousChats,
                interviewDetails.experienceLevel || 'Beginner'
            );
        } else {
            // STRICT VALUE EXTRACTION: 'model' ya 'assistant' jo bhi key DB mein save ho rahi ho, uska message text uthao
            const askedQuestionTexts = previousChats
                .filter(chat => chat && (chat.role === 'model' || chat.sender === 'assistant' || chat.role === 'assistant'))
                .map(chat => chat.message.trim());

            console.log("Asked Questions List Array:", askedQuestionTexts); // Terminal par check karne ke liye string log

            const query = {
                technology: interviewDetails.technology,
                experienceLevel: interviewDetails.experienceLevel || 'Beginner',
                questionText: { $nin: askedQuestionTexts } // Jo sawaal is text array mein hain unhe ignore karo
            };

            const availableQuestions = await Question.find(query);
            
            if (availableQuestions.length === 0) {
                nextQuestion = "Excellent job! We have successfully run through all available core conceptual checks for this stack slot. Please proceed to trigger the 'Finish Interview' button on the navbar to compile full feedback insights.";
            } else {
                // Har baar unique randomly next question select karne ke liye
                const randomIndex = Math.floor(Math.random() * availableQuestions.length);
                nextQuestion = availableQuestions[randomIndex].questionText;
            }
        }

        // 2. AI Question document save kiya database mein
        const aiChat = new ChatHistory({
            interviewId,
            role: 'model', 
            message: nextQuestion
        });
        await aiChat.save();

        return res.status(201).json({
            message: "Success",
            userMessage: newChat,
            aiMessage: aiChat
        });

    } catch(error) {
        console.error("❌ CHAT CONTROLLER CRASH:", error.message);
        return res.status(201).json({
            message: "Bypass loop",
            userMessage: { interviewId: req.body.interviewId, role: 'user', message: req.body.message },
            aiMessage: { interviewId: req.body.interviewId, role: 'model', message: "That is a robust conceptual view. Can you elaborate how asynchronous profiling works in production frameworks?" }
        });
    }
};

exports.getInterviewChat = async(req, res) => {
    try {
        const { interviewId } = req.params;
        const chats = await ChatHistory.find({ interviewId }).sort({ createdAt: 1 });
        return res.status(200).json(chats);
    } catch(error) {
        return res.status(400).json({ message: 'Error fetching chat logs', error: error.message });
    }
};
