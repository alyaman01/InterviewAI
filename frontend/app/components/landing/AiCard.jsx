export default function Card(){
    return(
        <div className="min-h-screen bg-[#070708] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] text-slate-100 flex flex-col items-center justify-center p-6 font-sans">


     
        // Yahan par maine "-mt-24 md:-mt-40" lagaya hai jo image ko upar khinch lega
        <div className="w-full max-w-7xl mx-auto px-4 md:px-12 mb-10 -mt-34 md:-mt-60 relative z-10 font-sans">
        
            {/* Image Wrapper Box */}
            <div className="w-full aspect-[16/9] md:aspect-[21/10] relative rounded-xl md:rounded-2xl overflow-hidden border border-zinc-800 bg-[#0a0a0a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)]">
                
                {/* Image */}
                <img 
                    src="image3.jpeg" 
                    alt="preview" 
                    className="h-full w-full object-cover object-top"
                />
                
            </div>
        </div>
           </div>
    )
}
