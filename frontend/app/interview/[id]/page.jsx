'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function InterviewChatPage() {
  const { id: interviewId } = useParams();
  const router = useRouter();

  const [chats, setChats] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [endLoading, setEndLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [questionNonce, setQuestionNonce] = useState(0);

  const chatEndRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats]);

  // Fetch initial chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`http://localhost:4000/api/chat/chat/${interviewId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setChats(data);
        }
      } catch (err) {
        console.error('Error fetching chat:', err.message);
      }
    };
    if (interviewId) fetchChatHistory();
  }, [interviewId]);

  // Handle timeout auto-submit safely
  const handleAutoSubmitTimeOut = useCallback(() => {
    console.log("Time's up! Submitting answer automatically...");
    // Auto submit empty or default text if user didn't answer in time
    const autoText = inputMessage.trim() || "[Time Expired - Candidate provided no response]";
    
    // Trigger submit directly
    triggerMessageSubmit(autoText);
  }, [inputMessage]);

  // High-performance timer effect
  useEffect(() => {
    const targetEndTime = Date.now() + 90 * 1000;
    let localTimeoutRef = null;

    const countdownTicker = () => {
      const now = Date.now();
      const remainingSeconds = Math.max(0, Math.floor((targetEndTime - now) / 1000));

      setTimeLeft(remainingSeconds);

      if (remainingSeconds <= 0) {
        handleAutoSubmitTimeOut();
      } else {
        localTimeoutRef = setTimeout(countdownTicker, 1000);
      }
    };

    localTimeoutRef = setTimeout(countdownTicker, 1000);

    return () => {
      if (localTimeoutRef) clearTimeout(localTimeoutRef);
    };
  }, [questionNonce, handleAutoSubmitTimeOut]);

  // Common function to send message
  const triggerMessageSubmit = async (msgText) => {
    if (loading) return;
    setInputMessage('');
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:4000/api/chat/message', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ interviewId, sender: 'user', message: msgText })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send message');
      
      setChats((prev) => [...prev, data.userMessage, data.aiMessage]);
      setQuestionNonce((prev) => prev + 1); // Reset 90s timer for new question
    } catch (err) { 
      alert(err.message); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;
    triggerMessageSubmit(inputMessage);
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { 
      alert("Voice input is best supported in Google Chrome."); 
      return; 
    }
    const rec = new SpeechRecognition();
    rec.continuous = false; 
    rec.lang = 'en-US'; 
    rec.interimResults = false;

    rec.onstart = () => setIsListening(true);
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.onresult = (e) => setInputMessage(e.results[0][0].transcript);
    
    rec.start();
  };

  const handleEndInterview = async () => {
    if (!window.confirm('Are you sure you want to wrap up and generate your evaluation score?')) return;
    setEndLoading(true); 
    const token = localStorage.getItem('token');

    try {
      const res = await fetch('http://localhost:4000/api/interviews/end', {
        method: 'POST', 
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ interviewId })
      });
      if (!res.ok) throw new Error("Failed to finish evaluation");
      router.push(`/feedback/${interviewId}`);
    } catch (err) { 
      alert(err.message); 
    } finally { 
      setEndLoading(false); 
    }
  };

  // Helper to safely fetch last AI question
  const aiQuestions = chats.filter(c => (c.role === 'model' || c.sender === 'model' || c.sender === 'ai'));
  const latestQuestion = aiQuestions.length > 0 
    ? aiQuestions[aiQuestions.length - 1].message 
    : "Initializing candidate assessment portal...";

  return (
    <div className="flex flex-col h-screen bg-[#050508] text-slate-100 overflow-hidden font-sans selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Top Header Navigation */}
      <div className="bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/[0.08] px-6 py-3.5 flex justify-between items-center z-20">
        <div className="flex items-center gap-3">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-2">
              AI Technical Evaluation Round
            </h1>
            <p className="text-[10px] font-mono text-slate-400">ID: {interviewId}</p>
          </div>
        </div>

        {/* Digital Clock Header Badge */}
        <div className="bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 rounded-xl flex items-center gap-3">
          <span className="text-[11px] font-mono font-medium text-slate-400 uppercase tracking-wider">Window</span>
          <span className={`text-base font-mono font-bold tracking-widest ${timeLeft <= 15 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60) < 10 ? `0${timeLeft % 60}` : timeLeft % 60}
          </span>
        </div>

        <button 
          onClick={handleEndInterview} 
          disabled={endLoading} 
          className="bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 hover:text-red-300 font-semibold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 disabled:opacity-50"
        >
          {endLoading ? 'Generating Score...' : 'Finish Interview'}
        </button>
      </div>

      {/* Main Container Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: AI Avatar & Current Question Focus */}
        <div className="w-1/3 min-w-[320px] max-w-[400px] bg-[#0a0a0f]/60 border-r border-white/[0.08] p-6 flex flex-col justify-between hidden md:flex backdrop-blur-sm relative">
          <div className="space-y-6">
            
            {/* AI Host Card */}
            <div className="bg-[#0e0e14] border border-white/[0.08] rounded-2xl p-6 text-center shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
              <div className={`mx-auto h-20 w-20 rounded-2xl bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-blue-600/30 border border-purple-500/30 flex items-center justify-center text-3xl shadow-inner ${loading ? 'animate-pulse scale-105' : ''}`}>
                🤖
              </div>
              <h2 className="text-base font-bold mt-3 text-slate-100">AI Lead Evaluator</h2>
              <p className="text-[11px] text-purple-400 font-mono mt-0.5">
                {loading ? 'Evaluating Response...' : 'Listening & Analyzing'}
              </p>
            </div>

            {/* Current Question Box */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-purple-400 block">
                Active Question Node
              </span>
              <div className="bg-[#0e0e14] border border-white/[0.08] rounded-2xl p-5 text-sm text-slate-200 min-h-[150px] flex items-center border-l-4 border-l-purple-500 shadow-lg leading-relaxed">
                "{latestQuestion}"
              </div>
            </div>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-3 text-center">
            <p className="text-[11px] text-slate-400">
              💡 Tip: Clear, structured answers yield higher technical precision scores.
            </p>
          </div>
        </div>

        {/* Right Panel: Chat Stream & Input Area */}
        <div className="flex-1 flex flex-col bg-[#050508] relative">
          
          {/* Chat Messages Log */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 max-w-3xl w-full mx-auto">
            {chats.map((chat, idx) => {
              const isUser = chat.role === 'user' || chat.sender === 'user';
              return (
                <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg ${
                    isUser 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none' 
                      : 'bg-[#0e0e14] border border-white/[0.08] text-slate-200 rounded-tl-none'
                  }`}>
                    <div className={`text-[10px] font-mono uppercase mb-1.5 font-bold ${isUser ? 'text-purple-200' : 'text-purple-400'}`}>
                      {isUser ? '👨‍💻 Candidate' : '🤖 AI Technical Lead'}
                    </div>
                    <p className="whitespace-pre-wrap">{chat.message}</p>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-[#0e0e14] border border-white/[0.08] rounded-2xl rounded-tl-none p-4 flex items-center gap-3 text-xs text-slate-400">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce"></span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                  <span>AI is processing your answer and generating the next question...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Controls Bar */}
          <div className="bg-[#0a0a0f]/90 border-t border-white/[0.08] p-4 backdrop-blur-md">
            <form onSubmit={handleSendMessage} className="max-w-3xl mx-auto flex gap-3">
              <input 
                type="text" 
                required 
                value={inputMessage} 
                onChange={(e) => setInputMessage(e.target.value)} 
                disabled={loading} 
                placeholder={loading ? "AI is typing..." : "Type your technical response..."} 
                className="flex-1 bg-[#050508] border border-white/[0.1] focus:border-purple-500/80 p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500/50 text-sm text-slate-100 placeholder:text-slate-600 transition" 
              />

              <button 
                type="button" 
                onClick={startVoiceRecognition} 
                className={`px-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider border transition-all duration-200 flex items-center gap-1.5 ${
                  isListening 
                    ? 'bg-rose-600 border-rose-500 animate-pulse text-white shadow-[0_0_15px_rgba(225,29,72,0.4)]' 
                    : 'bg-white/[0.04] border-white/[0.1] text-slate-300 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                🎙️ {isListening ? 'Listening...' : 'Speak'}
              </button>

              <button 
                type="submit" 
                disabled={loading || !inputMessage.trim()} 
                className="bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-30 disabled:hover:bg-purple-600 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition duration-200 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
              >
                Send
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}