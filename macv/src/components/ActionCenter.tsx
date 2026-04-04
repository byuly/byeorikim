import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaWifi,
  FaBluetooth,
  FaMoon,
  FaSun,
  FaVolumeUp,
} from "react-icons/fa";
import { BsAirplaneFill, BsDisplayFill } from "react-icons/bs";
import { useSystemStore, wallpapers, type WallpaperID } from "../store/useSystemStore";

export default function ActionCenter() {
  const {
    actionCenterOpen,
    closeActionCenter,
    darkMode,
    toggleDarkMode,
    wifiOn,
    toggleWifi,
    bluetoothOn,
    toggleBluetooth,
    wallpaper,
    setWallpaper,
  } = useSystemStore();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeActionCenter();
      }
    };
    if (actionCenterOpen) {
      // Delay to avoid closing on the toggle click itself
      setTimeout(() => document.addEventListener("mousedown", handler), 0);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [actionCenterOpen, closeActionCenter]);

  const tileBase =
    "rounded-xl p-3 flex items-center gap-3 cursor-default transition-colors text-[13px] font-medium";
  const tileOn = darkMode
    ? "bg-blue-500/80 text-white"
    : "bg-white/90 text-gray-800 shadow-sm";
  const tileOff = darkMode
    ? "bg-white/10 text-white/60"
    : "bg-black/5 text-gray-500";

  return (
    <AnimatePresence>
      {actionCenterOpen && (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -8, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={`absolute top-8 right-2 w-80 z-[200] rounded-2xl p-3 space-y-3 backdrop-blur-2xl border shadow-[0_8px_40px_rgba(0,0,0,0.2)] ${
            darkMode
              ? "bg-neutral-800/70 border-white/10"
              : "bg-white/60 border-white/40"
          }`}
        >
          {/* Toggle tiles */}
          <div className="grid grid-cols-2 gap-2">
            <button
              className={`${tileBase} ${wifiOn ? tileOn : tileOff}`}
              onClick={toggleWifi}
            >
              <FaWifi className="text-lg" />
              <div className="text-left">
                <div>Wi-Fi</div>
                <div className="text-[10px] opacity-60">
                  {wifiOn ? "Home Network" : "Off"}
                </div>
              </div>
            </button>

            <button
              className={`${tileBase} ${bluetoothOn ? tileOn : tileOff}`}
              onClick={toggleBluetooth}
            >
              <FaBluetooth className="text-lg" />
              <div className="text-left">
                <div>Bluetooth</div>
                <div className="text-[10px] opacity-60">
                  {bluetoothOn ? "On" : "Off"}
                </div>
              </div>
            </button>

            <button className={`${tileBase} ${tileOff}`}>
              <BsAirplaneFill className="text-lg" />
              <span>AirDrop</span>
            </button>

            <button
              className={`${tileBase} ${darkMode ? tileOn : "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200"}`}
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <FaMoon className="text-lg" />
              ) : (
                <FaSun className="text-lg" />
              )}
              <span>{darkMode ? "Dark" : "Light"}</span>
            </button>
          </div>

          {/* Display brightness slider */}
          <div
            className={`rounded-xl p-3 ${darkMode ? "bg-white/10" : "bg-black/5"}`}
          >
            <div
              className={`flex items-center gap-2 text-[12px] mb-2 ${darkMode ? "text-white/60" : "text-gray-500"}`}
            >
              <BsDisplayFill />
              <span>Display</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={80}
              className="w-full h-1 rounded-full appearance-none bg-gray-300 dark:bg-white/20 accent-blue-500"
            />
          </div>

          {/* Volume slider */}
          <div
            className={`rounded-xl p-3 ${darkMode ? "bg-white/10" : "bg-black/5"}`}
          >
            <div
              className={`flex items-center gap-2 text-[12px] mb-2 ${darkMode ? "text-white/60" : "text-gray-500"}`}
            >
              <FaVolumeUp />
              <span>Sound</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              defaultValue={60}
              className="w-full h-1 rounded-full appearance-none bg-gray-300 dark:bg-white/20 accent-blue-500"
            />
          </div>

          {/* Wallpaper picker */}
          <div className={`rounded-xl p-3 ${darkMode ? "bg-white/10" : "bg-black/5"}`}>
            <div className={`text-[12px] mb-2 ${darkMode ? "text-white/60" : "text-gray-500"}`}>
              Wallpaper
            </div>
            <div className="flex gap-2">
              {(Object.keys(wallpapers) as WallpaperID[]).map((id) => (
                <button
                  key={id}
                  onClick={() => setWallpaper(id)}
                  title={wallpapers[id].name}
                  className={`w-12 h-12 rounded-lg border-2 transition-all overflow-hidden ${
                    wallpaper === id ? "border-blue-500 scale-110" : "border-transparent hover:border-white/40"
                  }`}
                  style={{
                    backgroundImage: `url(${wallpapers[id].image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              ))}
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
