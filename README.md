<div align="center">

  # ⚡ InterviewAI
  ### *Next-Gen AI Powered Technical Interview Simulator*

  [![Next.js 14](https://img.shields.io/badge/Next.js-14_App_Router-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-Backend_API-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas_Cloud-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Design_System-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
  [![Vercel](https://img.shields.io/badge/Vercel-Deployed_Frontend-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
  [![Render](https://img.shields.io/badge/Render-Deployed_Backend-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

  <p align="center">
    <b>Simulate real pressure. Master technical rounds. Get comprehensive AI scorecards.</b>
  </p>

</div>

---

## 🌟 Executive Summary

**InterviewAI** is an end-to-end, full-stack AI platform engineered to revolutionize how software engineers prepare for technical interviews. It bridges the gap between passive learning and realistic interview environments by providing dynamic AI interviewers, strict 90-second response windows, real-time speech-to-text recognition, and detailed performance scorecards.

---

## 🔥 Key Technical Highlights

* 🤖 **Adaptive AI Technical Lead**: Dynamically evaluates candidate responses and generates tailored follow-up technical questions based on the candidate's chosen tech stack.
* 🎙️ **Voice-Enabled Assessment**: Integrated Web Speech API for seamless real-time voice-to-text response submission.
* ⏱️ **Precision Pressure Simulator**: Custom 90-second client/server synchronized countdown timer per node with automated timeout submissions.
* 📈 **Granular Scorecard & Analytics**: Generates performance benchmarks (0-100), highlighted engineering strengths, identified technical gaps, and personalized study roadmaps.
* 🔐 **Secure JWT Session Control**: Persistent token-based authentication with bcrypt password encryption.
* 🎨 **Cyberpunk Modern UI**: Dark-mode-first glassmorphism design built using Tailwind CSS and Next.js App Router.

---

## 🏗️ System Architecture

              +-------------------------------------------------------+
              |                     CLIENT SIDE                       |
              |             Next.js 14 (Hosted on Vercel)             |
              +---------------------------+---------------------------+
                                          |
                                  HTTPS / REST API
                                          |
                                          v
              +-------------------------------------------------------+
              |                     SERVER SIDE                       |
              |            Node.js + Express (Hosted on Render)       |
              +-------------+---------------------------+-------------+
                            |                           |
                    Auth & Session                 AI Engine
                            |                           |
                            v                           v
              +---------------------------+   +-----------------------+
              |      MongoDB Atlas        |   |   AI Evaluation Engine|
              |  (Users & Interview Data)  |   | (Dynamic Prompt Loop) |
              +---------------------------+   +-----------------------+

---

## 🛠️ Tech Stack Matrix

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 14 (React) | App Router, Dynamic Page Routing, SSR & Client State |
| **Styling & UI** | Tailwind CSS, React Icons | Cyber-dark Glassmorphism UI & Responsive Layouts |
| **Backend Runtime** | Node.js, Express.js | Modular REST API Architecture & Auth Middlewares |
| **Database** | MongoDB Atlas, Mongoose | Schematics for Users, Sessions, and Assessment Logs |
| **Security** | JWT, Bcrypt.js | Stateless Authentication & Hashed Credentials |
| **Voice Processing** | Web Speech API | Native Browser Speech Recognition |
| **Deployment** | Vercel & Render | CI/CD Automated Production Pipelines |

---

## 🔌 API Endpoints Summary

### 🔑 Auth Routes (/api/auth)
* POST /api/auth/register — Create a new candidate profile.
* POST /api/auth/login — Authenticate and issue JWT Token.

### 💬 Chat & Session Routes (/api/chat)
* GET /api/chat/chat/:interviewId — Fetch execution logs and history for active node.
* POST /api/chat/message — Submit technical response & trigger AI evaluation cycle.

### 📊 Interview Evaluation Routes (/api/interviews)
* GET /api/interviews/list — Retrieve complete interview analytics for user dashboard.
* POST /api/interviews/end — Finalize evaluation round and compile performance scorecard.

---

## ⚡ Quick Start (Local Setup)

### Prerequisites
* Node.js: v18.x or higher
* npm: v9.x or higher
* MongoDB: Active connection string (Local or Atlas)

### 1. Repository Setup
git clone https://github.com/alyaman01/InterviewAI.git
cd InterviewAI

### 2. Backend Engine Setup
cd backend
npm install

Create a .env file in the backend/ directory:
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/interviewai
JWT_SECRET=your_super_secret_jwt_key

Run Backend:
npm start

### 3. Frontend Client Setup
cd ../frontend
npm install

Create a .env.local file in the frontend/ directory:
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000

Run Client:
npm run dev

Visit http://localhost:3000 on your browser!

---

<div align="center">
  <sub>Built with ❤️ by Al Yaman • Show your support by dropping a ⭐️ on GitHub!</sub>
</div>
