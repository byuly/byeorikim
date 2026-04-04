export type AppID =
  | "about"
  | "projects"
  | "experience"
  | "contact"
  | "terminal";

export interface AppConfig {
  id: AppID;
  title: string;
  icon: string;
  width: number;
  height: number;
  resizable: boolean;
  defaultX?: number;
  defaultY?: number;
}

export const appsConfig: AppConfig[] = [
  {
    id: "about",
    title: "About Me",
    icon: "FaUser",
    width: 820,
    height: 620,
    resizable: true,
    defaultX: 40,
    defaultY: 35,
  },
  {
    id: "projects",
    title: "Projects",
    icon: "FaFolder",
    width: 750,
    height: 520,
    resizable: true,
  },
  {
    id: "experience",
    title: "Experience",
    icon: "FaBriefcase",
    width: 680,
    height: 500,
    resizable: true,
  },
  {
    id: "contact",
    title: "Contact",
    icon: "FaEnvelope",
    width: 500,
    height: 400,
    resizable: false,
  },
  {
    id: "terminal",
    title: "Terminal",
    icon: "FaTerminal",
    width: 600,
    height: 400,
    resizable: true,
    defaultX: 600,
    defaultY: 260,
  },
];
