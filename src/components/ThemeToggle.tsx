import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Determine if the current effective theme is dark
    if (theme === "system") {
      const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemIsDark);
    } else {
      setIsDark(theme === "dark");
    }
  }, [theme]);

  const handleToggle = () => {
    // When toggled, switch between light and dark (not system)
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-6 right-6 z-50 opacity-60 hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 w-5 h-5 text-muted-foreground transition-all duration-300 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
        <Moon
          className={`absolute inset-0 w-5 h-5 text-muted-foreground transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
