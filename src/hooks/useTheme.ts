import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, default to system
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored || "system";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  useEffect(() => {
    // Listen for system theme changes when in system mode
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (theme === "system") {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");
        const systemTheme = mediaQuery.matches ? "dark" : "light";
        root.classList.add(systemTheme);
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const setAndStoreTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return { theme, setTheme: setAndStoreTheme };
};
