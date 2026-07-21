const Groq = require("groq-sdk");
const promptService = require('./promptService');

// Groq SDK automatic process.env.GROQ_API_KEY utha leta hai
const groq = new Groq();
// Meta Llama 3 cloud inference model standard configuration
const MODEL_NAME = "llama-3.3-70b-versatile"; 

// 1. Pehla question generate karne ki service (Live vs Stored fallback safety framework)
exports.generateFirstQuestion = async (technology, roundType, experienceLevel) => {
    try {
        const prompt = promptService.getStartPrompt(technology, roundType, experienceLevel);
        
        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: MODEL_NAME,
        });

        return response.choices[0].message.content.trim();
    } catch (err) {
        console.error("❌ GROQ LIVE FIRST QUESTION API ERROR:", err.message);
        return `Welcome to the ${technology || 'technical'} round. Let's start with the core syntax. Can you explain your practical experience working with it?`;
    }
};

// 2. Agla question mangne ki service (ROBUST CONTEXT MATRIX SYSTEM)
exports.generateNextQuestion = async (technology, roundType, previousChats, experienceLevel) => {
    try {
        const systemPrompt = `You are an expert technical interviewer conducting a ${roundType || 'Technical'} interview for a ${technology || 'Software'} role matching a ${experienceLevel || 'Beginner'} standard. Ask exactly ONE relevant next technical question matching this difficulty level. Do not give any scores, feedback, or appreciation phrases right now. Just ask the question directly.`;

        // Database timeline format transformation
        const chatTimeline = [{ role: "system", content: systemPrompt }];
        
        if (previousChats && previousChats.length > 0) {
            previousChats.forEach(chat => {
                if (chat && chat.message && chat.message.trim() !== "") {
                    // Mapping standard dialogue protocol array matrix
                    const currentRole = (chat.role === 'user' || chat.sender === 'user') ? 'user' : 'assistant';
                    chatTimeline.push({
                        role: currentRole,
                        content: chat.message.trim()
                    });
                }
            });
        }

        const response = await groq.chat.completions.create({
            messages: chatTimeline,
            model: MODEL_NAME,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error("❌ GROQ LIVE NEXT QUESTION API ERROR:", error.message);
        return "That's an interesting explanation. Can you elaborate on how you approach performance optimization and database caching strategies in this specific scenario?";
    }
};

// 3. Final feedback/score calculation service layer
exports.generateInterviewFeedback = async (technology, roundType, previousChats) => {
    try {
        const prompt = promptService.getFeedbackPrompt(technology, roundType, previousChats);
        
        const response = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: MODEL_NAME,
            response_format: { type: "json_object" } // Strict JSON enforcement configuration 
        });
        
        let cleanText = response.choices[0].message.content.trim();
        return JSON.parse(cleanText);
    } catch (parseError) {
        console.error("❌ GROQ FEEDBACK API PARSER ERROR:", parseError.message);
        return {
            finalScore: 70,
            strengths: ["Completed the full technical interaction rounds", "Demonstrated capability in addressing questions"],
            weakness: ["Requires deeper syntax precision under high concurrency scenarios", "Needs more exposure to database indexing constraints"],
            roadmap: "Focus heavily on designing architecture systems, caching mechanisms, and asynchronous process optimizations."
        };
    }
};
