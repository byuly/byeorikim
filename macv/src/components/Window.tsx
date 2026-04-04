import { useRef, useCallback } from "react";
import { Rnd } from "react-rnd";
import { motion } from "framer-motion";
import type { AppID } from "../config/apps";
import { appsConfig } from "../config/apps";
import { useAppStore } from "../store/useAppStore";
import { useSystemStore } from "../store/useSystemStore";
import TrafficLights from "./TrafficLights";

interface WindowProps {
  appId: AppID;
  children: React.ReactNode;
}

export default function Window({ appId, children }: WindowProps) {
  const { activeApp, zIndices, minimizedApps, maximizedApps, focusApp } =
    useAppStore();
  const darkMode = useSystemStore((s) => s.darkMode);

  const config = appsConfig.find((a) => a.id === appId)!;
  const isActive = activeApp === appId;
  const isMinimized = minimizedApps.has(appId);
  const isMaximized = maximizedApps.has(appId);
  const zIndex = zIndices[appId] ?? 0;
  const rndRef = useRef<Rnd>(null);

  const handleFocus = useCallback(() => {
    focusApp(appId);
  }, [appId, focusApp]);

  const defaultX = config.defaultX ?? Math.max(
    50,
    (window.innerWidth - config.width) / 2 + (Math.random() - 0.5) * 100
  );
  const defaultY = config.defaultY ?? Math.max(
    40,
    (window.innerHeight - config.height) / 2 + (Math.random() - 0.5) * 80
  );

  const toolbarBg = darkMode
    ? "bg-[#3a3a3a] border-white/5"
    : "bg-[#e8e8e8] border-black/5";
  const titleColor = darkMode ? "text-gray-300" : "text-gray-700";
  const contentBg = darkMode ? "bg-[#2a2a2a]" : "bg-[#f6f6f6]";

  if (isMinimized) return null;

  if (isMaximized) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="fixed inset-0 top-7 flex flex-col"
        style={{ zIndex: zIndex + 50 }}
        onMouseDown={handleFocus}
      >
        <div className={`flex flex-col h-full ${contentBg} overflow-hidden`}>
          <div
            className={`flex items-center h-[28px] ${toolbarBg} border-b shrink-0`}
          >
            <TrafficLights appId={appId} />
            <span className={`flex-1 text-center text-sm font-medium ${titleColor} pr-16`}>
              {config.title}
            </span>
          </div>
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </motion.div>
    );
  }

  return (
    <Rnd
      ref={rndRef}
      default={{
        x: defaultX,
        y: defaultY,
        width: config.width,
        height: config.height,
      }}
      minWidth={300}
      minHeight={200}
      dragHandleClassName="window-drag-handle"
      enableResizing={config.resizable}
      bounds="parent"
      style={{ zIndex }}
      onMouseDown={handleFocus}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className={`flex flex-col h-full rounded-xl overflow-hidden ${
          isActive
            ? "shadow-[0_8px_30px_rgba(0,0,0,0.28),0_0_0_0.5px_rgba(0,0,0,0.1)]"
            : "shadow-[0_4px_16px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.06)]"
        }`}
      >
        <div
          className={`window-drag-handle flex items-center h-[28px] ${toolbarBg} border-b cursor-default shrink-0`}
        >
          <TrafficLights appId={appId} />
          <span className={`flex-1 text-center text-sm font-medium ${titleColor} pr-16`}>
            {config.title}
          </span>
        </div>

        <div className={`flex-1 ${contentBg} overflow-auto`}>{children}</div>
      </motion.div>
    </Rnd>
  );
}
