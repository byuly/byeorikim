import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSearch,
  FaUser,
  FaFolder,
  FaBriefcase,
  FaEnvelope,
  FaTerminal,
} from "react-icons/fa";
import { useSystemStore } from "../store/useSystemStore";
import { useAppStore } from "../store/useAppStore";
import type { AppID } from "../config/apps";

const searchableItems: {
  id: AppID;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "about",
    title: "About Me",
    subtitle: "Application",
    icon: <FaUser className="text-blue-500" />,
  },
  {
    id: "projects",
    title: "Projects",
    subtitle: "Application",
    icon: <FaFolder className="text-yellow-500" />,
  },
  {
    id: "experience",
    title: "Experience",
    subtitle: "Application",
    icon: <FaBriefcase className="text-purple-500" />,
  },
  {
    id: "contact",
    title: "Contact",
    subtitle: "Application",
    icon: <FaEnvelope className="text-red-500" />,
  },
  {
    id: "terminal",
    title: "Terminal",
    subtitle: "Application",
    icon: <FaTerminal className="text-green-500" />,
  },
];

export default function SpotlightSearch() {
  const { spotlightOpen, toggleSpotlight } = useSystemStore();
  const { openApp } = useAppStore();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query
    ? searchableItems.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
    : searchableItems;

  useEffect(() => {
    if (spotlightOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [spotlightOpen]);

  // Keyboard shortcut to toggle
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.metaKey && e.key === " ") {
        e.preventDefault();
        toggleSpotlight();
      }
      if (e.key === "Escape" && spotlightOpen) {
        toggleSpotlight();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [spotlightOpen, toggleSpotlight]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      openApp(filtered[selectedIndex].id);
      toggleSpotlight();
    }
  };

  const darkMode = useSystemStore((s) => s.darkMode);

  return (
    <AnimatePresence>
      {spotlightOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/20"
            onClick={() => toggleSpotlight()}
          />

          {/* Search box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={`fixed top-[18%] left-1/2 -translate-x-1/2 z-[160] w-[560px] rounded-xl overflow-hidden shadow-[0_12px_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl border ${
              darkMode
                ? "bg-neutral-800/80 border-white/10"
                : "bg-white/80 border-white/40"
            }`}
          >
            {/* Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-black/5 dark:border-white/5">
              <FaSearch
                className={`text-lg ${darkMode ? "text-white/40" : "text-gray-400"}`}
              />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Spotlight Search"
                className={`flex-1 bg-transparent outline-none text-lg ${
                  darkMode
                    ? "text-white placeholder-white/30"
                    : "text-gray-800 placeholder-gray-400"
                }`}
                spellCheck={false}
              />
            </div>

            {/* Results */}
            {filtered.length > 0 && (
              <div className="max-h-[320px] overflow-auto py-1">
                <div
                  className={`px-4 py-1 text-[11px] font-semibold ${darkMode ? "text-white/40" : "text-gray-400"}`}
                >
                  APPLICATIONS
                </div>
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                      i === selectedIndex
                        ? "bg-blue-500 text-white"
                        : darkMode
                          ? "text-white/80 hover:bg-white/5"
                          : "text-gray-800 hover:bg-black/5"
                    }`}
                    onClick={() => {
                      openApp(item.id);
                      toggleSpotlight();
                    }}
                    onMouseEnter={() => setSelectedIndex(i)}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-base ${
                        i === selectedIndex
                          ? "bg-white/20"
                          : darkMode
                            ? "bg-white/10"
                            : "bg-gray-100"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{item.title}</div>
                      <div
                        className={`text-[11px] ${
                          i === selectedIndex
                            ? "text-white/60"
                            : darkMode
                              ? "text-white/40"
                              : "text-gray-400"
                        }`}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {query && filtered.length === 0 && (
              <div
                className={`px-4 py-8 text-center text-sm ${darkMode ? "text-white/40" : "text-gray-400"}`}
              >
                No results for "{query}"
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
