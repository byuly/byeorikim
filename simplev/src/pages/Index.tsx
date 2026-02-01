import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Tech from "@/components/sections/Tech";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <Hero />
        
        <div id="about">
          <About />
        </div>
        
        <div id="tech">
          <Tech />
        </div>
        
        <div id="experience">
          <Experience />
        </div>
        
        <div id="projects">
          <Projects />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default Index;
