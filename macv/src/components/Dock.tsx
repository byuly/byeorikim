import { useMotionValue } from "framer-motion";
import {
  FaUser,
  FaFolder,
  FaBriefcase,
  FaEnvelope,
  FaTerminal,
} from "react-icons/fa";
import DockItem from "./DockItem";
import type { AppID } from "../config/apps";

const dockApps: { id: AppID; icon: React.ReactNode; title: string }[] = [
  { id: "about", icon: <FaUser />, title: "About Me" },
  { id: "projects", icon: <FaFolder />, title: "Projects" },
  { id: "experience", icon: <FaBriefcase />, title: "Experience" },
  { id: "contact", icon: <FaEnvelope />, title: "Contact" },
  { id: "terminal", icon: <FaTerminal />, title: "Terminal" },
];

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-[80]">
      <div
        className="flex items-end gap-1 px-3 py-1.5 bg-[var(--color-dock-bg)] backdrop-blur-xl rounded-2xl border border-white/30 shadow-[0_0_0_0.5px_rgba(0,0,0,0.08),0_8px_40px_rgba(0,0,0,0.12)]"
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockApps.map((app) => (
          <DockItem
            key={app.id}
            appId={app.id}
            icon={app.icon}
            title={app.title}
            mouseX={mouseX}
          />
        ))}
      </div>
    </div>
  );
}
