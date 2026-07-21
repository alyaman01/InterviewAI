// 1. Pehla question generate karne ka prompt
exports.getStartPrompt = (technology, roundType, experienceLevel = 'Beginner') => {
    return `You are an expert technical interviewer conducting a ${roundType} interview. 
    The candidate's core technology is ${technology}. 
    The candidate's experience level is targeting a **${experienceLevel}** role.

    DIFFICULTY LEVEL EXPECTATIONS:
    - Beginner: Focus strictly on core syntax, fundamental functions, and basic concept building blocks.
    - Intermediate: Focus on mid-level data management, error handling pipelines, and tool optimizations.
    - Experienced: Focus on low-level system design patterns, concurrency optimization, cluster scaling, and memory profiling.

    Ask exactly ONE highly relevant, concise first question to begin the interview matching this **${experienceLevel}** difficulty. 
    Do NOT include any greetings or multiple parts. Just output the question itself.`;
};

// 2. Chat history ke sath agla question mangne ka prompt
exports.getChatPrompt = (technology, roundType, previousChats, experienceLevel = 'Beginner') => {
    let context = `You are an expert interviewer conducting a ${roundType} interview for a ${technology} role matching an **${experienceLevel}** tier profile.\n\n`;
    
    if (previousChats && previousChats.length > 0) {
        previousChats.forEach(chat => {
            if (chat && chat.message) {
                const speaker = (chat.role === 'user' || chat.sender === 'user') ? 'Candidate' : 'Interviewer';
                context += `${speaker}: ${chat.message}\n`;
            }
        });
    }

    context += `\nInterviewer: Analyze the Candidate's responses under the lens of **${experienceLevel}** industry engineering benchmarks. 
    Then, ask exactly ONE relevant next technical question matching this path depth. Do not give appreciation messages, score metrics, or review headers now. Just output the single question directly.`;
    return context;
};

// 3. Interview end hone par report card banane ka prompt
exports.getFeedbackPrompt = (technology, roundType, previousChats) => {
    let context = `You are an expert interviewer evaluating a ${roundType} interview for a ${technology} role.\n`;
    context += `Analyze the following complete chat history logs:\n\n`;
    
    if (previousChats && previousChats.length > 0) {
        previousChats.forEach(chat => {
            if (chat && chat.message) {
                const speaker = (chat.role === 'user' || chat.sender === 'user') ? 'Candidate' : 'Interviewer';
                context += `${speaker}: ${chat.message}\n`;
            }
        });
    }

    context += `\nBased on the dialogue accuracy, generate an overall evaluation report card in strict JSON format. 
    Do NOT append markdown structures or conversational texts before or after the JSON blocks. Output ONLY raw parseable JSON template with these exact fields:
    {
        "finalScore": <a valid numeric score between 0 and 100>,
        "strengths": ["strength1", "strength2"],
        "weakness": ["weakness1", "weakness2"],
        "roadmap": "A clear, solid analysis paragraph advising candidate what to study next"
    }`;
    return context;
};
