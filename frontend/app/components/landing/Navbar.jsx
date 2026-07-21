import Link from 'next/link';
import Image from 'next/image';
import { LuLogIn, LuUserPlus } from 'react-icons/lu';

export default function Navbar() {
    return (
        // bg-gray-900 hatakar bg-transparent/backdrop-blur aur layered classes jodi hain
        <nav className='fixed top-0 left-0 w-full bg-transparent backdrop-blur-md border-b border-white/5 text-white p-4 z-50 transition-all duration-300'>
            <div className='max-w-6xl mx-auto grid grid-cols-3 items-center w-full'>
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
                <ul className='flex space-x-8'>
                    <li>
                        <Link href="/#features" className='text-zinc-300 hover:text-white transition-colors text-sm font-medium'>
                            Features
                        </Link>
                    </li>
                    <li>
                        <Link href="/#technologies" className='text-zinc-300 hover:text-white transition-colors text-sm font-medium'>
                            Technologies
                        </Link>
                    </li>
                    <li>
                        <Link href="/#how-it-works" className='text-zinc-300 hover:text-white transition-colors text-sm font-medium'>
                            How it Works
                        </Link>
                    </li>
                    
                </ul>

                <div className='flex items-center space-x-4 justify-self-end'>
                <Link href="/login" className='flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-white/5'>
                <LuLogIn className='w-4 h-4'/>
                <span>Login</span>
                </Link>
                <Link href="/register" className='flex items-center gap-1.5 bg-white text-black font-semibold text-sm px-4 py-2 rounded-full hover:bg-zinc-200 transition-all shadow-sm active:scale-[0.98]'>
                <LuUserPlus className='w-4 h-4'/>
                <span>Register</span>
                </Link>
                </div>
            </div>
        </nav>
    )
}
