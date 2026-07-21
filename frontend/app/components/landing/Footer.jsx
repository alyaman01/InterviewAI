import Link from 'next/link';
import Image from 'next/image';
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { LuArrowRight } from "react-icons/lu";

export default function Footer() {
    return (
        // Border aur dark floor style
        <footer className="w-full bg-[#070708] text-zinc-400 font-sans border-t border-zinc-900 pt-16 pb-8 px-4 md:px-12 relative z-10">
            <div className="max-w-7xl mx-auto">
                
                {/* -------------------------------------------------- */}
                {/* ADDED CTA BANNER: Ready to Crack Your Dream Interview? */}
                <div className="w-full bg-[#0d0d12] border border-zinc-800/80 rounded-2xl p-8 md:p-12 text-center mb-16 shadow-[0_15px_40px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                    {/* Background glow shadow effect inside box */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-72 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

                    <h3 className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 tracking-tight mb-2">
                        Ready to Crack Your Dream Interview?
                    </h3>
                    <p className="text-zinc-400 text-sm md:text-base font-normal mb-6">
                        Practice with AI today.
                    </p>

                    <Link href="/dashboard">
                        {/* Premium dynamic white-button custom design */}
                        <button className="inline-flex items-center gap-2 bg-white text-black font-semibold px-6 py-3 rounded-full hover:bg-zinc-200 transition-all text-sm group-hover:scale-[1.02] shadow-md duration-300">
                            Start Free Interview
                            <LuArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                        </button>
                    </Link>
                </div>
                {/* -------------------------------------------------- */}

                {/* Bottom Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    
                    {/* Column 1: Brand Info */}
                    <div className="flex flex-col space-y-4">
                        <Link href="/" className='flex items-center gap-2.5 transition-opacity hover:opacity-90'>
                    <Image 
                        src="/gemini-svg.svg" 
                        alt="InterviewAI Logo" 
                        width={32} 
                        height={32} 
                        className="w-8 h-8 rounded-lg"
                    />
                    <span className='text-xl font-bold tracking-tight bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent'>
                        InterviewAI
                    </span>
                </Link>
                        <p className="text-sm leading-relaxed text-zinc-400 max-w-[260px]">
                            Practice technical interviews with AI-powered mock sessions, real interview questions, and personalized feedback.
                        </p>
                    </div>

                    {/* Column 2: Platform Links */}
                    <div>
                        <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
                            </li>
                            <li>
                                <Link href="/#technologies" className="hover:text-white transition-colors">Technologies</Link>
                            </li>
                            <li>
                                <Link href="/#how-it-works" className="hover:text-white transition-colors">How It Works</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Legal Stuff */}
                    <div>
                        <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Social Handles */}
                    <div>
                        <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Connect</h4>
                        <p className="text-sm text-zinc-400 mb-4">Stay updated with product rollouts.</p>
                        <div className="flex space-x-4">
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                                <FaLinkedin className="w-4 h-4" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                                <FaGithub className="w-4 h-4" />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
                                <FaTwitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                </div>

                {/* Copyright Segment */}
                <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
                    <p>&copy; {new Date().getFullYear()} My Logo. All rights reserved.</p>
                    <p className="text-zinc-600">Built with Next.js and Tailwind CSS</p>
                </div>

            </div>
        </footer>
    );
}
