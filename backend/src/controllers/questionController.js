const Question = require("../models/Question");

// 1. Database mein saare stacks ke questions bulk seed karne ka master code
exports.seedQuestions = async (req, res) => {
    try {
        const sampleQuestions = [
            // === NODE.JS QUESTIONS ===
            { technology: "Node.js", experienceLevel: "Beginner", questionText: "What is Node.js and how does it differ from browser JavaScript?" },
            { technology: "Node.js", experienceLevel: "Beginner", questionText: "What is npm and why do we use package.json file?" },
            { technology: "Node.js", experienceLevel: "Beginner", questionText: "Explain the difference between require() and ES modules import in Node.js." },
            { technology: "Node.js", experienceLevel: "Beginner", questionText: "What is the purpose of the path module in Node.js?" },
            { technology: "Node.js", experienceLevel: "Intermediate", questionText: "What is the role of the Event Loop in Node.js, and what are its main phases?" },
            { technology: "Node.js", experienceLevel: "Intermediate", questionText: "Explain the difference between setImmediate() and setTimeout()." },
            { technology: "Node.js", experienceLevel: "Intermediate", questionText: "What are Node.js streams and when should you use them instead of fs.readFile?" },
            { technology: "Node.js", experienceLevel: "Experienced", questionText: "How does the clusters module work, and how do you handle worker crashes in production?" },
            { technology: "Node.js", experienceLevel: "Experienced", questionText: "What is backpressure in Node.js streams, and how do you mitigate it?" },
            { technology: "Node.js", experienceLevel: "Experienced", questionText: "How do you profile and detect memory leaks in a running Node.js server?" },

            // === REACT QUESTIONS ===
            { technology: "React", experienceLevel: "Beginner", questionText: "What is the Virtual DOM and how does React optimize page rendering?" },
            { technology: "React", experienceLevel: "Beginner", questionText: "Explain the differences between state and props in React components." },
            { technology: "React", experienceLevel: "Beginner", questionText: "What are React Hooks and why were they introduced to replace class components?" },
            { technology: "React", experienceLevel: "Intermediate", questionText: "How does dependency array work in useEffect, and how do you prevent infinite loops?" },
            { technology: "React", experienceLevel: "Intermediate", questionText: "What is the useMemo hook, and when is it actually beneficial to use it?" },
            { technology: "React", experienceLevel: "Intermediate", questionText: "Explain custom hooks in React and provide a practical use-case scenario." },
            { technology: "React", experienceLevel: "Experienced", questionText: "Explain the reconciliation process and how the Fiber architecture works in React." },
            { technology: "React", experienceLevel: "Experienced", questionText: "How does concurrent rendering work in React 18, and when should you use useTransition?" },
            { technology: "React", experienceLevel: "Experienced", questionText: "How do you optimize a large-scale React app to prevent redundant sub-tree re-renders?" },

            // === EXPRESS.JS QUESTIONS ===
            { technology: "Express", experienceLevel: "Beginner", questionText: "What is Express.js and what are its core advantages over the native http module?" },
            { technology: "Express", experienceLevel: "Beginner", questionText: "What is standard middleware in Express, and how do app.use() and next() function?" },
            { technology: "Express", experienceLevel: "Beginner", questionText: "How do you capture query string parameters and route params in Express parameters?" },
            { technology: "Express", experienceLevel: "Intermediate", questionText: "How do you handle errors properly using middleware error handlers in an Express setup?" },
            { technology: "Express", experienceLevel: "Intermediate", questionText: "What is the difference between router.use() and app.use() in large systems?" },
            { technology: "Express", experienceLevel: "Intermediate", questionText: "How do you configure CORS middleware inside an Express API engine setup securely?" },
            { technology: "Express", experienceLevel: "Experienced", questionText: "How do you manage robust session scaling across multiple Express cluster servers using Redis store?" },
            { technology: "Express", experienceLevel: "Experienced", questionText: "How do you implement sub-routing patterns and clean controller mappings for 50+ database api nodes?" },
            { technology: "Express", experienceLevel: "Experienced", questionText: "Explain how middleware pipelines pipe data stream layers and secure protection validation routes." },

            // === MERN STACK QUESTIONS ===
            { technology: "MERN", experienceLevel: "Beginner", questionText: "What are the core components of the MERN stack and how do they communicate with each other?" },
            { technology: "MERN", experienceLevel: "Beginner", questionText: "What is Mongoose and how does it help connect Node app with MongoDB collections?" },
            { technology: "MERN", experienceLevel: "Intermediate", questionText: "How do you implement JWT based authentication across React client state and Node backend routes?" },
            { technology: "MERN", experienceLevel: "Intermediate", questionText: "Explain standard context state passing methods from DB queries up to dynamic React UI models." },
            { technology: "MERN", experienceLevel: "Experienced", questionText: "How do you manage full stack tracking deployment environments across Next/React and separated API servers?" },
            { technology: "MERN", experienceLevel: "Experienced", questionText: "How do you scale database connections pools via Mongoose under heavy production workloads?" },

            // === HR ROUND QUESTIONS ====
            { technology: "HR", experienceLevel: "Beginner", questionText: "Tell me about Yourself?"},
            { technology: "HR", experienceLevel: "Beginner", questionText: "Why do you want to work here?"},
            { technology: "HR", experienceLevel: "Beginner", questionText: "What is your strengths?"},
            { technology: "HR", experienceLevel: "Beginner", questionText:"What is your weakness?"},
            { technology: "HR", experienceLevel: "Intermediate", questionText: "Explain Your Project?"},
            { technology: "HR", experienceLevel: "Intermediate", questionText:"Expalin your yesterday?"},
            { technology: "HR", experienceLevel: "Experienced", questionText:"Tell me about your previous job"},
            { technology: "HR", experienceLevel: "Experienced", questionText:"What is your expected salary"}
        ];

        await Question.deleteMany({});
        await Question.insertMany(sampleQuestions);

        return res.status(201).json({ message: "Questions seeded successfully into the database!" });
    } catch (error) {
        return res.status(500).json({ message: "Error seeding questions", error: error.message });
    }
};

// 2. Utility fetch tool (Cleaned fallback sequence tracking)
exports.getRandomStoredQuestion = async (technology, experienceLevel, excludedTexts = []) => {
    try {
        const query = {
            technology,
            experienceLevel,
            questionText: { $nin: excludedTexts } // Filter out questions matching text
        };

        const questions = await Question.find(query);
        if (questions.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * questions.length);
        return questions[randomIndex];
    } catch (error) {
        console.error("Error in getRandomStoredQuestion utility:", error.message);
        throw error;
    }
};
