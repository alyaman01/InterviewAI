import { BiBriefcase } from "react-icons/bi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoTimerOutline } from "react-icons/io5";
import { VscFeedback } from "react-icons/vsc";

export default function Card(){

    const featureList = [
        {
            title: "AI Live Interview",
            desc: "Real-time audio or text-based interview simulation tailored to your specific role.",
            icon: <BiBriefcase className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
        },
        {
            title: "Question Bank",
            desc: "Practice unlimited stored interview questions and build core confidence.",
            icon: <HiOutlineLightBulb className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
        },
        {
            title: "Timed Interviews",
            desc: "90-second timer per question to simulate real under-pressure interviews.",
            icon: <IoTimerOutline className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
        },
        {
            title: "AI Feedback",
            desc: "Get extensive strengths, weaknesses and instant improvement suggestions.",
            icon: <VscFeedback className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
        }
    ];

    return(
        <section id ="features" className="w-full font-sans scroll-mt-24">
           
           {/* PART 1: HEADING BLOCK (Pure Jet Black) */}
           {/* BADLAV: yahan -mt-16 md:-mt-24 lagaya hai jo section ko upar khinchega, aur pt-28 ko kam karke pt-12 kiya hai */}
           <div className="w-full bg-[#070708] -mt-16 md:-mt-24 pt-12 pb-12 px-4 md:px-12 text-center relative z-10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 text-3xl md:text-5xl tracking-tight max-w-3xl mx-auto leading-[1.15]">
                        Powerful Features for Your Career Growth
                    </h2>
                </div>
           </div>

           {/* PART 2: BOXES BLOCK (Premium Charcoal Dark - bg-[#0d0d12]) */}
           {/* BADLAV: pt-12 ko pt-6 kiya hai taaki boxes heading ke thoda aur paas aa jayein */}
           <div className="w-full bg-[#0d0d12] pb-32 px-4 md:px-12 relative z-10 border-t border-zinc-900/60">
                <div className="max-w-7xl mx-auto">

                    {/* 4 Boxes Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                        {featureList.map((item, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-2xl border border-zinc-800/50 bg-[#111116] hover:border-zinc-700/80 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 flex flex-col items-center text-center group"
                            >
                                {/* Icon Border Box */}
                                <div className="w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                                    {item.title}
                                </h3>

                                {/* Description */}
                                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
           </div>

        </section>
    )
}
