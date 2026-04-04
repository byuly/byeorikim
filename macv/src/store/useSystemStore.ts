import { create } from "zustand";

export type WallpaperID = "froggy" | "luffy" | "ay";

export const wallpapers: Record<WallpaperID, { name: string; css: string; image?: string }> = {
  froggy: {
    name: "Froggy",
    css: "center / cover no-repeat",
    image: `${import.meta.env.BASE_URL}froggy.jpeg`,
  },
  luffy: {
    name: "Luffy",
    css: "center / cover no-repeat",
    image: `${import.meta.env.BASE_URL}luffy.gif`,
  },
  ay: {
    name: "Ay",
    css: "center / cover no-repeat",
    image: `${import.meta.env.BASE_URL}ay.jpeg`,
  },
};

interface SystemState {
  darkMode: boolean;
  wallpaper: WallpaperID;
  sleeping: boolean;
  spotlightOpen: boolean;
  actionCenterOpen: boolean;
  wifiOn: boolean;
  bluetoothOn: boolean;

  toggleDarkMode: () => void;
  setWallpaper: (id: WallpaperID) => void;
  sleep: () => void;
  wake: () => void;
  toggleSpotlight: () => void;
  toggleActionCenter: () => void;
  closeActionCenter: () => void;
  toggleWifi: () => void;
  toggleBluetooth: () => void;
}

export const useSystemStore = create<SystemState>((set, get) => ({
  darkMode: false,
  wallpaper: "froggy",
  sleeping: false,
  spotlightOpen: false,
  actionCenterOpen: false,
  wifiOn: true,
  bluetoothOn: true,

  toggleDarkMode: () => set({ darkMode: !get().darkMode }),
  setWallpaper: (id) => set({ wallpaper: id }),
  sleep: () => set({ sleeping: true }),
  wake: () => set({ sleeping: false }),
  toggleSpotlight: () =>
    set({ spotlightOpen: !get().spotlightOpen, actionCenterOpen: false }),
  toggleActionCenter: () =>
    set({ actionCenterOpen: !get().actionCenterOpen, spotlightOpen: false }),
  closeActionCenter: () => set({ actionCenterOpen: false }),
  toggleWifi: () => set({ wifiOn: !get().wifiOn }),
  toggleBluetooth: () => set({ bluetoothOn: !get().bluetoothOn }),
}));
