import { useState } from "react";
import type { AppID } from "../config/apps";
import { useAppStore } from "../store/useAppStore";

interface TrafficLightsProps {
  appId: AppID;
}

export default function TrafficLights({ appId }: TrafficLightsProps) {
  const [hovered, setHovered] = useState(false);
  const { closeApp, minimizeApp, toggleMaximize } = useAppStore();

  return (
    <div
      className="flex items-center gap-2 px-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          closeApp(appId);
        }}
        className="w-3 h-3 rounded-full bg-traffic-red border border-traffic-red-border flex items-center justify-center transition-transform hover:scale-110"
      >
        {hovered && (
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
            <path
              d="M1 1L5 5M5 1L1 5"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          minimizeApp(appId);
        }}
        className="w-3 h-3 rounded-full bg-traffic-yellow border border-traffic-yellow-border flex items-center justify-center transition-transform hover:scale-110"
      >
        {hovered && (
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
            <path
              d="M1 3H5"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleMaximize(appId);
        }}
        className="w-3 h-3 rounded-full bg-traffic-green border border-traffic-green-border flex items-center justify-center transition-transform hover:scale-110"
      >
        {hovered && (
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none">
            <path
              d="M1 1.5L1 5H4.5M5 4.5V1H1.5"
              stroke="rgba(0,0,0,0.5)"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
