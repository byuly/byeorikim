import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t-4 border-border">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-6">
          <div className="pixel-border bg-card p-6 inline-block retro-shadow">
            <p className="text-xs md:text-sm mb-4">GAME OVER? NOT YET!</p>
            <p className="text-xs text-muted-foreground mb-4">
              Insert coin to continue...
            </p>
            
            <div className="flex justify-center gap-4">
              <Button 
                size="icon" 
                variant="secondary"
                className="pixel-border retro-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                asChild
              >
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="icon" 
                variant="secondary"
                className="pixel-border retro-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                asChild
              >
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button 
                size="icon" 
                variant="secondary"
                className="pixel-border retro-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                asChild
              >
                <a href="mailto:hello@example.com" aria-label="Email">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <span>CRAFTED WITH</span>
            <Heart className="w-3 h-3 fill-primary text-primary" />
            <span>IN RETRO MODE</span>
          </div>

          <p className="text-xs text-muted-foreground">
            © 2025 PLAYER ONE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
