import { FaReact, FaNodeJs, FaUsers } from "react-icons/fa";
import { SiExpress, SiNextdotjs, SiMongodb } from "react-icons/si";

export default function Tech(){

    const techList = [
        {
            title: "HR Round",
            desc: "Master behavioral questions, situational analysis, and core communication skills.",
            icon: <FaUsers className="w-6 h-6 text-pink-400 group-hover:text-pink-300 transition-colors" />
        },
        {
            title: "React",
            desc: "Deep dive into Hooks, state management, virtual DOM, and component lifecycles.",
            icon: <FaReact className="w-6 h-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
        },
        {
            title: "Node.js",
            desc: "Test your event loop understanding, streams, file handling, and async patterns.",
            icon: <FaNodeJs className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
        },
        {
            title: "Express",
            desc: "Ace REST APIs development, middleware optimization, and robust routing structures.",
            icon: <SiExpress className="w-6 h-6 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
        },
        {
            title: "Next.js",
            desc: "Prepare for SSR, SSG, Server Actions, App Router mechanics, and SEO optimization.",
            icon: <SiNextdotjs className="w-6 h-6 text-white group-hover:text-zinc-300 transition-colors" />
        },
        {
            title: "MERN Stack",
            desc: "Full-stack architecture flow from Database connectivity to frontend integration.",
            icon: <SiMongodb className="w-6 h-6 text-green-400 group-hover:text-green-300 transition-colors" />
        }
    ];

    return(
        <section id="technologies" className="w-full font-sans scroll-mt-24">
            
            {/* PART 1: HEADING BLOCK (Pure Jet Black) */}
            {/* Invalid -pt-20 ko hatakar perfect vertical placement ke liye padding adjust ki hai */}
            <div className="w-full bg-[#070708] pt-24 pb-12 px-4 md:px-12 text-center">
                <div className="max-w-7xl mx-auto">
                    {/* text-black hata kar smooth premium white text gradient diya hai */}
                    <h2 className="font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 text-3xl md:text-5xl tracking-tight max-w-3xl mx-auto leading-[1.15]">
                        Supported Technologies
                    </h2>
                </div>
            </div>

            {/* PART 2: BOXES BLOCK (Premium Charcoal Dark - bg-[#0d0d12]) */}
            {/* Border-t aur matching container background diya hai taaki layers maintain rahein */}
            <div className="w-full bg-[#0d0d12] pb-32 px-4 md:px-12 relative z-10 border-t border-zinc-900/60">
                <div className="max-w-7xl mx-auto">

                    {/* 6 Boxes Layout: "lg:grid-cols-3" se ye 3-3 ki do rows me symmetrical dikhega */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
                        {techList.map((item, index) => (
                            <div
                                key={index}
                                // Inner cards background bg-[#111116] kiya hai matching glow borders ke sath
                                className="p-8 rounded-2xl border border-zinc-800/50 bg-[#111116] hover:border-zinc-700/80 transition-all duration-300 shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 flex flex-col items-center text-center group"
                            >
                                {/* Technology Icon Box */}
                                <div className="w-12 h-12 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-lg font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                                    {item.title}
                                </h3>

                                {/* Description (Khali desc ko rich description se fill kiya hai taaki boxes empty na lagein) */}
                                <p className="text-zinc-400 text-sm leading-relaxed font-normal">
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
