require('dotenv').config(); 
const express = require("express")
const app = express();
const dotenv = require("dotenv")
const cors = require("cors");
const connectDB = require("./src/config/db")
const authMiddleware = require("./src/middleware/authMiddleware");

dotenv.config();

app.use(express.json());
app.use(cors());

connectDB();

const authRoutes = require("./src/routes/authRoutes");

app.use('/api/auth', authRoutes);

const interviewRoutes = require("./src/routes/interviewRoutes");

app.use('/api/interviews', authMiddleware, interviewRoutes);

const chatRoutes = require("./src/routes/chatRoutes");

app.use('/api/chat', authMiddleware,chatRoutes);

// server.js ke andar existing chatRoutes ke bilkul niche ye add karein:
const questionRoutes = require("./src/routes/questionRoutes");
app.use('/api/questions', questionRoutes);


app.listen(4000,()=>{
    console.log("Server Started Beta")
})
