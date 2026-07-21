import { LuSparkles, LuLaptop, LuRotateCw, LuZap, LuMic } from "react-icons/lu";

export default function Choose(){
     const chooseList = [
        {
            title: "AI Powered",
            desc: "Smart algorithms analyze your technical skills, responses, and depth of knowledge instantly",
            icon: <LuSparkles className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors"/>
        },
        {
            title: "Real Interview Experience",
            desc: "Simulates high-pressure live coding and behavioral rounds exactly like real tech company loops",
            icon: <LuLaptop className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors"/> // Yahan LuLaptop kar diya hai
        },
        {
            title: "Unlimited Practice",
            desc: "Zero restrictions or session caps, allowing you to train repetitively until you feel fully confident",
            icon: <LuRotateCw className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors"/>
        },
        {
            title: "Instant Feedback",
            desc: "Get immediate detailed evaluation reports highlighting exact mistakes and bulleted improvement tips",
            icon: <LuZap className="w-6 h-6 text-amber-400 group-hover:text-amber-300 transition-colors"/>
        },
        {
            title: "Voice Support",
            desc: "Speak naturally using audio inputs to simulate true verbal conversations with the interviewer",
            icon: <LuMic className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors"/>
        }
     ];


     return(
        <section className="w-full font-sans">
            <div className="w-full bg-[#070708] pt-24 pb-12 px-4 md:px-12 text-center -mt-40">
            <div className="max-w-7xl mx-auto">
                <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 text-3xl md:text-5xl tracking-tight max-w-3xl mx-auto leading-[1.15] mb-4">
                        Why Choose Us
                </h2>
            </div>
            </div>

            <div className="w-full bg-[#0d0d12] pb-32 px-4 md:px-12 relative z-10 border-t border-zinc-900/60">
            <div className="max-w-7xl max-auto">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-16">
            {chooseList.map((item,index) => (
                <div 
                key={index}
                className="flex flex-col items-center text-center group px-4">
                <div className="w-14 h-14 rounded-full bg-zinc-900/50 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner group-hover:border-zinc-700 group-hover:scale-105 transition-all duration-300">
                        {item.icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                            {item.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed font-normal max-w-[250px]">
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