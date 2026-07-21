'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function FeedbackPage() {
  const { id: interviewId } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Central Dynamic API Base URL
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://interviewai-bkxb.onrender.com';

  useEffect(() => {
    const fetchFeedback = async () => {
      const token = localStorage.getItem('token');
      try {
        // 🚀 FIXED: Dynamic Render URL with Fallback
        const res = await fetch(`${API_BASE_URL}/api/interviews/list`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          const currentInterview = data.find(item => item._id === interviewId);
          setReport(currentInterview);
        }
      } catch (err) {
        console.error('Error fetching feedback:', err.message);
      } finally {
        setLoading(false);
      }
    };
    if (interviewId) fetchFeedback();
  }, [interviewId, API_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col items-center justify-center font-sans">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
          <div className="absolute text-xl">⚡</div>
        </div>
        <p className="mt-6 text-xs font-mono font-semibold tracking-widest text-purple-400 uppercase animate-pulse">
          Compiling Final Performance Analytics...
        </p>
      </div>
    );
  }

  const score = report?.finalScore || 0;
  const getScoreColor = () => {
    if (score >= 70) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10 shadow-[0_0_30px_rgba(16,185,129,0.2)]';
    if (score >= 40) return 'text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_30px_rgba(245,158,11,0.2)]';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10 shadow-[0_0_30px_rgba(244,63,94,0.2)]';
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 p-6 md:p-12 font-sans relative overflow-hidden selection:bg-purple-500/30 selection:text-purple-200">
      
      {/* Background Decorative Radial Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-purple-950/20 via-indigo-950/10 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 -left-40 w-[400px] h-[400px] bg-blue-900/10 blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header Navigation */}
        <div className="flex justify-between items-center border-b border-white/[0.08] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wider">
                Evaluation Complete
              </span>
            </div>
            <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400 tracking-tight">
              AI Assessment Scorecard
            </h1>
            <p className="text-slate-400 text-xs font-mono mt-1 flex items-center gap-3">
              <span>Tech Track: <strong className="text-slate-200">{report?.technology || 'General'}</strong></span>
              <span>•</span>
              <span>Mode: <strong className="text-purple-400">{report?.interviewMode || 'Stored'}</strong></span>
            </p>
          </div>

          <button 
            onClick={() => router.push('/dashboard')}
            className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-slate-200 font-semibold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all duration-200 backdrop-blur-md shadow-lg"
          >
            ← Dashboard
          </button>
        </div>

        {/* Hero Score Gauge Card */}
        <div className="bg-[#0a0a0f]/80 border border-white/[0.08] backdrop-blur-xl p-8 md:p-10 rounded-2xl flex flex-col items-center justify-center text-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden group">
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          
          <span className="text-slate-400 font-mono font-bold tracking-widest uppercase text-[10px] mb-3">
            Overall Engineering Rating Benchmark
          </span>

          <div className={`my-2 px-8 py-4 rounded-2xl border ${getScoreColor()} flex items-baseline gap-1 transition-all duration-300`}>
            <span className="text-6xl md:text-7xl font-black tracking-tight">{score}</span>
            <span className="text-xl text-slate-500 font-normal font-mono">/100</span>
          </div>

          <p className="text-xs md:text-sm text-slate-300 mt-5 max-w-lg leading-relaxed">
            {score >= 70 
              ? '🔥 Excellent theoretical foundation and architecture syntax accuracy! Ready for high-stakes engineering interviews.' 
              : score >= 40 
              ? '⚡ Good framework execution logic, but requires deeper conceptual clarity and core debugging practice.' 
              : '🎯 Needs focused logical preparation. Review the weak areas and study roadmap generated below.'}
          </p>
        </div>

        {/* Strengths & Weaknesses Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Highlighted Strengths */}
          <div className="bg-[#0a0a0f]/80 border border-white/[0.08] backdrop-blur-xl p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-emerald-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
              <span>🟢</span> Highlighted Strengths
            </h3>

            {!report?.aiFeedback?.strengths || report.aiFeedback.strengths.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No specific strengths captured in session logs.</p>
            ) : (
              <ul className="space-y-3 text-xs text-slate-300">
                {report.aiFeedback.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Technical Weaknesses */}
          <div className="bg-[#0a0a0f]/80 border border-white/[0.08] backdrop-blur-xl p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[2px] bg-rose-500" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-rose-400 mb-4 flex items-center gap-2">
              <span>🔴</span> Technical Gaps & Mistakes
            </h3>

            {!report?.aiFeedback?.weakness || report.aiFeedback.weakness.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No critical technical errors flagged during evaluation.</p>
            ) : (
              <ul className="space-y-3 text-xs text-slate-300">
                {report.aiFeedback.weakness.map((weak, idx) => (
                  <li key={idx} className="flex items-start gap-2 leading-relaxed bg-white/[0.02] border border-white/[0.04] p-3 rounded-xl">
                    <span className="text-rose-400 font-bold">✕</span>
                    <span>{weak}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>

        {/* Personalized Study Roadmap */}
        <div className="bg-[#0a0a0f]/80 border border-white/[0.08] backdrop-blur-xl p-6 md:p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-purple-400 mb-4 flex items-center gap-2">
            <span>🗺️</span> Recommended Growth Roadmap
          </h3>
          
          <div className="bg-[#050508] border border-white/[0.06] p-5 rounded-xl text-xs md:text-sm text-slate-300 leading-relaxed whitespace-pre-line tracking-wide font-mono">
            {report?.aiFeedback?.roadmap || 'Review previously executed conversation logs to analyze system parameters and edge cases.'}
          </div>
        </div>

      </div>
    </div>
  );
}