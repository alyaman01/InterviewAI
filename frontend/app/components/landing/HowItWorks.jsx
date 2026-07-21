import { UserPlus, Laptop, Mic, BarChart3 } from "lucide-react";

export default function Work(){

    // Aapke bataye gaye 4 naye steps icons aur unique descriptions ke sath
    const workList = [
        {
            title: "Register",
            desc: "Create your profile and setup your target job roles or technical tech stack.",
            icon: <UserPlus className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
        },
        {
            title: "Choose Interview",
            desc: "Select from HR round, React, Node.js, MERN or custom timed mock sessions.",
            icon: <Laptop className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
        },
        {
            title: "Answer Questions",
            desc: "Respond to AI interviewer via audio or text under simulated pressure.",
            icon: <Mic className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
        },
        {
            title: "Get AI Feedback",
            desc: "Instantly analyze strengths, weaknesses, and a comprehensive breakdown score.",
            icon: <BarChart3 className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors" />
        }
    ];

    return(
        <section id="how-it-works" className="w-full font-sans scroll-mt-24">
            
            {/* PART 1: HEADING BLOCK (Pure Jet Black) */}
            {/* -pt-20 aur text-black ko hatakar sahi padding aur responsive alignment set ki hai */}
            <div className="w-full bg-[#070708] pt-24 pb-12 px-4 md:px-12 text-center">
                <div className="max-w-7xl mx-auto">
                    {/* Main Title with soft gradient */}
                    <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 text-3xl md:text-5xl tracking-tight max-w-3xl mx-auto leading-[1.15] mb-4">
                        How It Works
                    </h2>
                    {/* Screenshot jaisa thin subtitle text */}
                    <p className="text-zinc-400 max-w-xl mx-auto text-sm md:text-base font-normal">
                        Four simple steps to accelerate your career growth
                    </p>
                </div>
            </div>

            {/* PART 2: STEPS BLOCK (Premium Charcoal Dark - bg-[#0d0d12]) */}
            {/* bg-white ko hata kar humne dark floor layout diya hai bina borders ke, jaisa screenshot me hai */}
            <div className="w-full bg-[#0d0d12] pb-32 px-4 md:px-12 relative z-10 border-t border-zinc-900/60">
                <div className="max-w-7xl mx-auto">

                    {/* 4 Items Column Layout (Grid style matching the image) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-16">
                        {workList.map((item, index) => (
                            <div
                                key={index}
                                // Note: background boxes aur heavy borders hata diye hain taaki text aur icon seedhe chamkein (Minimal Look)
                                className="flex flex-col items-center text-center group px-4"
                            >
                                {/* Circular Icon Wrapper - Jaisa image me thin gray outline ke sath hai */}
                                <div className="w-14 h-14 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner group-hover:border-zinc-700 group-hover:scale-105 transition-all duration-300">
                                    {item.icon}
                                </div>

                                {/* Step Title (Pure White) */}
                                <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                                    {item.title}
                                </h3>

                                {/* Step Description (Soft grey text for readability) */}
                                <p className="text-zinc-400 text-sm leading-relaxed font-normal max-w-[250px]">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            
        </section>
    );
}
