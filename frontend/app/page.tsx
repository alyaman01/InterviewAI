import Register from "./register/page"
import Navbar from "@/app/components/landing/Navbar"
import Hero from "@/app/components/landing/Hero"
import Card from "@/app/components/landing/AiCard"
import Feature from "@/app/components/landing/Features"
import Tech from "@/app/components/landing/TechGrid"
import Work from "@/app/components/landing/HowItWorks"
import Choose from "@/app/components/landing/WhyChooseUs"
import Footer from "@/app/components/landing/Footer"
export default function Home() {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Card/>
      <Choose/>
      <Feature/>
      <Tech/>
      <Work/>     
      <Footer/>
    </div>
  
  );
}
