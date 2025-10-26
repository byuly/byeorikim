import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect } from "react";

const Hero = () => {
  const [showUpArrow, setShowUpArrow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show up arrow when scrolled past the hero section
      const heroHeight = window.innerHeight;
      setShowUpArrow(window.scrollY > heroHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="pixel-border retro-shadow bg-card p-8 md:p-12 animate-fade-in">
          {/* Profile Section */}
          <div className="mb-8 flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 pixel-border bg-primary/20 mb-4 overflow-hidden">
              <img
                src={`${import.meta.env.BASE_URL}photo.png`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg md:text-xl mb-2 text-foreground">Byeori Kim</h2>
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              <span className="pixel-border bg-secondary px-3 py-1 text-xs text-secondary-foreground">👨🏻‍💻 SOFTWARE ENGINEER</span>
              <span className="pixel-border bg-secondary px-3 py-1 text-xs text-secondary-foreground">🏢 UBC CS</span>
              <span className="pixel-border bg-secondary px-3 py-1 text-xs text-secondary-foreground">📚 STUDENT</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground max-w-md">
              i like backend. i like systems. i like data. maybe a little frontend. i'm with the trends, i can be 10x developer with AI and coffee. 1.5x developer without. coolio.
            </p>
          </div>
          
          <h1 className="text-2xl md:text-4xl lg:text-5xl mb-6 text-foreground leading-relaxed">
            PRESS START
          </h1>
          
          <p className="text-xs md:text-sm leading-relaxed mb-8 text-muted-foreground max-w-2xl mx-auto">
            welcome to my personal arcade! i'm a swe who crafts for users. explore my quests, power-ups, and experience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="pixel-border retro-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs"
              onClick={() => scrollToSection("experience")}
            >
              START
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="pixel-border retro-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs"
              onClick={() => scrollToSection("projects")}
            >
              VIEW PROJECTS
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="pixel-border retro-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-xs"
              onClick={() => scrollToSection("contact")}
            >
              VIEW CONTACTS
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Down Arrow - visible when at top */}
      {!showUpArrow && (
        <button
          onClick={() => scrollToSection("experience")}
          className="absolute bottom-8 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="w-8 h-8 text-primary" />
        </button>
      )}

      {/* Scroll Up Arrow - visible when scrolled down */}
      {showUpArrow && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 pixel-border bg-primary p-3 retro-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all animate-bounce"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6 text-primary-foreground" />
        </button>
      )}
    </section>
  );
};

export default Hero;
