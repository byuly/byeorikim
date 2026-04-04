import { create } from "zustand";
import type { AppID } from "../config/apps";

interface AppState {
  openApps: Set<AppID>;
  activeApp: AppID | null;
  zIndices: Record<string, number>;
  nextZIndex: number;
  minimizedApps: Set<AppID>;
  maximizedApps: Set<AppID>;

  openApp: (id: AppID) => void;
  closeApp: (id: AppID) => void;
  focusApp: (id: AppID) => void;
  minimizeApp: (id: AppID) => void;
  toggleMaximize: (id: AppID) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  openApps: new Set<AppID>(),
  activeApp: null,
  zIndices: {},
  nextZIndex: 1,
  minimizedApps: new Set<AppID>(),
  maximizedApps: new Set<AppID>(),

  openApp: (id) => {
    const state = get();
    const openApps = new Set(state.openApps);
    openApps.add(id);
    const minimizedApps = new Set(state.minimizedApps);
    minimizedApps.delete(id);
    set({
      openApps,
      activeApp: id,
      minimizedApps,
      zIndices: { ...state.zIndices, [id]: state.nextZIndex },
      nextZIndex: state.nextZIndex + 1,
    });
  },

  closeApp: (id) => {
    const state = get();
    const openApps = new Set(state.openApps);
    openApps.delete(id);
    const maximizedApps = new Set(state.maximizedApps);
    maximizedApps.delete(id);
    const minimizedApps = new Set(state.minimizedApps);
    minimizedApps.delete(id);
    set({
      openApps,
      maximizedApps,
      minimizedApps,
      activeApp: state.activeApp === id ? null : state.activeApp,
    });
  },

  focusApp: (id) => {
    const state = get();
    if (state.activeApp === id) return;
    set({
      activeApp: id,
      zIndices: { ...state.zIndices, [id]: state.nextZIndex },
      nextZIndex: state.nextZIndex + 1,
    });
  },

  minimizeApp: (id) => {
    const state = get();
    const minimizedApps = new Set(state.minimizedApps);
    minimizedApps.add(id);
    set({
      minimizedApps,
      activeApp: state.activeApp === id ? null : state.activeApp,
    });
  },

  toggleMaximize: (id) => {
    const state = get();
    const maximizedApps = new Set(state.maximizedApps);
    if (maximizedApps.has(id)) {
      maximizedApps.delete(id);
    } else {
      maximizedApps.add(id);
    }
    set({ maximizedApps });
  },
}));
