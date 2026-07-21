import Link from 'next/link';

export default function() {
    return (
        <div className="min-h-screen bg-[#070708] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-slate-100 flex flex-col items-center justify-center p-6 font-sans">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

            {/* Exact Image-Styled Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-center max-w-5xl leading-[1.1] mb-6 bg-gradient-to-b from-[#FFFFFF] to-[#A3A3A3] bg-clip-text text-transparent">
                Ace Your Technical Interviews with AI
            </h1>

            {/* Subtitle */}
            <p className="text-center max-w-2xl text-zinc-400 text-lg md:text-xl font-normal leading-relaxed mb-8">
                Practice React, Node.js, MERN, Express and HR interviews with an AI interviewer.
                <br className="hidden md:inline" />
                Get instant feedback, timed interviews, and real interview experience.             
            </p>

            {/* Button */}
            <Link href="/login">
                <button className="bg-white text-black px-6 py-3 font-semibold rounded-md hover:bg-zinc-200 transition-colors shadow-sm text-sm">
                    Get Started
                </button>
            </Link>
            
        </div>
    );
}
