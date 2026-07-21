'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null); 
  const [experienceLevel, setExperienceLevel] = useState('Beginner');
  const [interviewMode, setInterviewMode] = useState('Stored');
  const [jobRole, setJobRole] = useState('');
  const [userName, setuserName] = useState('candidate');

  // Central Dynamic API Base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://interviewai-bkxb.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
          setuserName(parsedUser.name);
        }
      } catch (err) {
        console.log("Error reading user name from memory:", err);
      }
    }
  }, [router]);

  const interviewCards = [
    { id: 'live', name: 'Live Custom AI Interview', value: 'MERN', desc: 'Completely dynamic AI round mapping full stack workflows.', color: 'from-purple-600 to-indigo-700', icon: '⚡' },
    { id: 'node', name: 'Node.js Core Interview', value: 'Node.js', desc: 'Asynchronous event driven paradigms, clusters, streaming buffers profiling.', color: 'from-green-600 to-teal-700', icon: '🟢' },
    { id: 'react', name: 'React Development Round', value: 'React', desc: 'Concurrent architecture pipelines, hooks engine mechanics, virtual DOM tree optimizations.', color: 'from-blue-600 to-cyan-700', icon: '⚛️' },
    { id: 'express', name: 'Express.js Systems Test', value: 'Express', desc: 'Robust routing lifecycles, middleware pipelines validation systems engineering.', color: 'from-gray-700 to-slate-800', icon: '🚀' },
    { id: 'mern', name: 'MERN Stack Engineering', value: 'MERN', desc: 'End-to-end full stack architecture validation context database controls.', color: 'from-orange-600 to-red-600', icon: '💻' },
    { id: 'hr', name: 'HR Round', value: 'HR', desc: 'Full questions about hr round', color: 'from-yellow-600 to-white-500', icon: '👔' }
  ];

  const handleCreateInterview = async (e) => {
    e.preventDefault();
    if (!jobRole.trim()) {
      alert("Please specify target Job Role!");
      return;
    }
    
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      // 🚀 FIXED: Dynamic Render URL with Fallback
      const res = await fetch(`${API_BASE_URL}/api/interviews/start`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          jobRole: jobRole.trim(), 
          technology: selectedTech.value, 
          roundType: 'Technical_Round', 
          experienceLevel, 
          interviewMode 
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to start interview');
      }

      setSelectedTech(null);
      router.push(`/interview/${data.interview._id}`);

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070708] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))] text-white p-6 md:p-12 font-sans relative overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 tracking-tight"> Hey, {userName}! 👋</h1>
            <p className="text-gray-400 text-sm mt-1">Select an interview card panel layer to initiate automated technical evaluations</p>
          </div>
          <button 
            onClick={() => { localStorage.clear(); router.push('/login'); }}
            className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition duration-200"
          >
            Logout
          </button>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-6 tracking-wide text-gray-300">Available Standard Practice Slots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewCards.map((card) => (
              <div 
                key={card.id}
                onClick={() => {
                  setSelectedTech(card);
                  setJobRole(`${card.value} Developer`);
                }}
                className={`cursor-pointer rounded-2xl bg-[#0d0d12] p-6 border border-zinc-800/80 shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:-translate-y-1 hover:border-zinc-700/60 transition-all duration-300 flex flex-col justify-between min-h-[200px] group relative overflow-hidden`}
              >
                <div className="flex justify-between items-start">
                  <div className="text-4xl">{card.icon}</div>
                  <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Start Round →</div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-extrabold tracking-wide">{card.name}</h3>
                  <p className="text-xs text-white/70 mt-2 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedTech && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-[#0d0d12] border border-zinc-800 w-full max-w-md rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8)] p-6 relative">
              <div className="flex justify-between items-center border-b border-gray-700 pb-3 mb-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span>{selectedTech.icon}</span> Configure {selectedTech.value} Round
                </h3>
                <button onClick={() => setSelectedTech(null)} className="text-gray-400 hover:text-white text-xl font-bold">✕</button>
              </div>

              <form onSubmit={handleCreateInterview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Target Job Role Profile</label>
                  <input 
                    type="text"
                    required
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="w-full bg-[#070708] border border-zinc-800 p-3 rounded-xl focus:outline-none focus:border-zinc-700 text-sm text-white transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1">Experience Level Expectation</label>
                  <select 
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-700 p-3 rounded-xl focus:outline-none focus:border-blue-500 text-sm transition"
                  >
                    <option value="Beginner">Beginner / Fresher Core</option>
                    <option value="Intermediate">Intermediate (1-3 Yrs Experience)</option>
                    <option value="Experienced">Experienced / Tech Arch (3+ Yrs)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-blue-400 mb-1">Interview Execution Strategy</label>
                  <select 
                    value={interviewMode}
                    onChange={(e) => setInterviewMode(e.target.value)}
                    className="w-full bg-[#070708] border border-zinc-800 p-3 rounded-xl focus:outline-none focus:border-zinc-700 text-sm text-white transition"
                  >
                    <option value="Stored">Stored Local Bank Pool (Unlimited & Free 💸)</option>
                    <option value="Live">Live Dynamic Cloud Round (Groq Llama 3 API 🚀)</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 p-3 rounded-xl font-bold text-center tracking-wide transition shadow-lg disabled:opacity-50">
                    {loading ? 'Compiling Parameters...' : 'Launch Interview Board'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}