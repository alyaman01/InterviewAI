'use client';
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuLock, LuMail, LuUser } from "react-icons/lu";

export default function Register() {    
    const [formData, setformData] = useState({ name: '', email: '', password: '' });
    const [error, seterror] = useState(''); 
    const [loading, setloading] = useState(false);
    const router = useRouter();

    // Central Dynamic API Base URL
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://interviewai-bkxb.onrender.com';

    const handleSubmit = async (e) => {
        e.preventDefault();
        seterror('');
        setloading(true);

        try {
            // 🚀 FIXED: Dynamic Render URL
            const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }        
            router.push('/login');
        } catch (err) {
            seterror(err.message);
        } finally {
            setloading(false);
        }
    };

    return (
        // BACKGROUND UPGRADE: Soft purple mesh radial backdrop with pure dark floor background
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#070708] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))] px-4 font-sans relative overflow-hidden">
            
            {/* Back to Home Button */}
            <Link href="/" className="absolute top-6 left-6 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                <LuArrowLeft className="w-4 h-4" />
                <span>Back to home</span>
            </Link>

            {/* CARD CONTAINER: Premium slate-charcoal black frame matching your login flow */}
            <div className="w-full max-w-md bg-[#0d0d12] p-8 md:p-10 rounded-2xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border border-zinc-800/80 relative z-10">
                
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 tracking-tight mb-2">
                        Create Account
                    </h2>
                    <p className="text-sm text-zinc-400">Join today to jumpstart your interview practice</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400 rounded-xl text-center mb-6 font-medium">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name Input with User Icon */}
                    <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500 group-focus-within:text-blue-400 transition-colors">
                            <LuUser className="w-4 h-4" />
                        </span>
                        <input 
                            type="text"
                            placeholder="Full Name"
                            required
                            value={formData.name}
                            onChange={(e) => setformData({ ...formData, name: e.target.value })}
                            className="text-white block pl-11 pr-4 py-3 w-full bg-[#070708] rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-700 placeholder-zinc-600 text-sm transition"
                        />    
                    </div>

                    {/* Email Input with Mail Icon */}
                    <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500 group-focus-within:text-blue-400 transition-colors">
                            <LuMail className="w-4 h-4" />
                        </span>
                        <input 
                            type="email"
                            placeholder="Email Address"
                            required
                            value={formData.email}
                            onChange={(e) => setformData({ ...formData, email: e.target.value })}
                            className="text-white block pl-11 pr-4 py-3 w-full bg-[#070708] rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-700 placeholder-zinc-600 text-sm transition"
                        />   
                    </div>

                    {/* Password Input with Lock Icon */}
                    <div className="relative group">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-zinc-500 group-focus-within:text-blue-400 transition-colors">
                            <LuLock className="w-4 h-4" />
                        </span>
                        <input 
                            type="password"
                            placeholder="Create Password"
                            required
                            value={formData.password}
                            onChange={(e) => setformData({ ...formData, password: e.target.value })}
                            className="text-white block pl-11 pr-4 py-3 w-full bg-[#070708] rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-700 placeholder-zinc-600 text-sm transition"
                        />     
                    </div>

                    {/* Premium White Solid Button */}
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-50 py-3 mt-4 rounded-xl font-bold text-sm tracking-wide transition shadow-md active:scale-[0.99] duration-200"
                    >
                        {loading ? 'Processing...' : 'Sign Up'}
                    </button>  
                </form>

                {/* Bottom Redirection Link with Clean ESLint Escape Sequence */}
                <p className="text-center text-xs text-zinc-500 mt-6 font-normal">
                    Already have an account?{" "}
                    <Link 
                        href="/login"
                        className="text-zinc-300 hover:text-white font-medium transition-colors underline underline-offset-4"
                    >
                        Login here
                    </Link>
                </p>

            </div>
        </div>
    );
}