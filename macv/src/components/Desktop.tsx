import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Wallpaper from "./Wallpaper";
import Window from "./Window";
import ActionCenter from "./ActionCenter";
import DesktopFX from "./DesktopFX";
import SpotlightSearch from "./SpotlightSearch";
import { useAppStore } from "../store/useAppStore";
import { useSystemStore } from "../store/useSystemStore";
import AboutMe from "../apps/AboutMe";
import Projects from "../apps/Projects";
import Experience from "../apps/Experience";
import Contact from "../apps/Contact";
import Terminal from "../apps/Terminal";
import type { AppID } from "../config/apps";
import type { ComponentType } from "react";
import { motion, AnimatePresence } from "framer-motion";

const appComponents: Record<AppID, ComponentType> = {
  about: AboutMe,
  projects: Projects,
  experience: Experience,
  contact: Contact,
  terminal: Terminal,
};

interface DesktopProps {
  onRestart: () => void;
}

export default function Desktop({ onRestart }: DesktopProps) {
  const { openApps } = useAppStore();
  const { sleeping, wake, darkMode } = useSystemStore();

  return (
    <div className={`h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <Wallpaper />
      <DesktopFX />
      <MenuBar onRestart={onRestart} />

      {/* Windows Area */}
      <div className="flex-1 relative overflow-hidden">
        {Array.from(openApps).map((appId) => {
          const AppComponent = appComponents[appId];
          return (
            <Window key={appId} appId={appId}>
              <AppComponent />
            </Window>
          );
        })}
      </div>

      <Dock />
      <ActionCenter />
      <SpotlightSearch />

      {/* Sleep overlay */}
      <AnimatePresence>
        {sleeping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[300] bg-black cursor-pointer"
            onClick={wake}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
