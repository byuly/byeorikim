import { useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { AppID } from "../config/apps";
import { useAppStore } from "../store/useAppStore";

interface DockItemProps {
  appId: AppID;
  icon: React.ReactNode;
  title: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
}

export default function DockItem({
  appId,
  icon,
  title,
  mouseX,
}: DockItemProps) {
  const { openApps, openApp, focusApp, minimizedApps } = useAppStore();
  const isOpen = openApps.has(appId);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 200;
    return val - rect.x - rect.width / 2;
  });

  const size = useSpring(
    useTransform(distance, [-150, 0, 150], [48, 72, 48]),
    { mass: 0.1, stiffness: 150, damping: 12 }
  );

  const handleClick = () => {
    if (isOpen) {
      if (minimizedApps.has(appId)) {
        openApp(appId);
      } else {
        focusApp(appId);
      }
    } else {
      openApp(appId);
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-col items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-9 whitespace-nowrap bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm"
        >
          {title}
        </motion.div>
      )}

      {/* Icon */}
      <motion.div
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-xl bg-white/90 shadow-md cursor-pointer text-2xl text-gray-700 border border-white/50"
      >
        {icon}
      </motion.div>

      {/* Open indicator dot */}
      {isOpen && (
        <div className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-black/50" />
      )}
    </motion.div>
  );
}
