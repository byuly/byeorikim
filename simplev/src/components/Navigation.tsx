import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { name: "about", href: "#about" },
  { name: "tech", href: "#tech" },
  { name: "experience", href: "#experience" },
  { name: "projects", href: "#projects" },
  { name: "contact", href: "#contact" },
];

const Navigation = () => {
  const [activeSection, setActiveSection] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => ({
        id: item.href.slice(1),
        element: document.querySelector(item.href),
      }));

      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element) {
          const offsetTop = (section.element as HTMLElement).offsetTop;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section.id);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="fixed right-6 md:right-8 top-6 md:top-8 z-50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col items-end gap-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.slice(1);
          return (
            <button
              key={item.name}
              onClick={(e) => scrollToSection(e, item.href)}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0, 
                  x: isHovered ? 0 : 10 
                }}
                transition={{ duration: 0.2 }}
                className={`text-xs font-light lowercase transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground"
                } group-hover:text-foreground`}
              >
                {item.name}
              </motion.span>
              <motion.div
                className={`rounded-full transition-all duration-200 ${
                  isActive 
                    ? "w-2.5 h-2.5 bg-foreground" 
                    : "w-1.5 h-1.5 bg-muted-foreground/50 group-hover:bg-foreground/70"
                }`}
                whileHover={{ scale: 1.2 }}
              />
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navigation;
