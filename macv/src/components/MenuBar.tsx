import { useState, useEffect, useRef, useCallback } from "react";
import {
  FaApple,
  FaWifi,
  FaBluetooth,
  FaBatteryFull,
  FaSearch,
} from "react-icons/fa";
import { BsToggles } from "react-icons/bs";
import { useAppStore } from "../store/useAppStore";
import { useSystemStore } from "../store/useSystemStore";
import { appsConfig } from "../config/apps";
import MenuDropdown from "./MenuDropdown";
import type { MenuItem } from "./MenuDropdown";

type MenuID =
  | "apple"
  | "app"
  | "file"
  | "edit"
  | "view"
  | "window"
  | "help"
  | null;

interface MenuBarProps {
  onRestart: () => void;
}

export default function MenuBar({ onRestart }: MenuBarProps) {
  const [time, setTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<MenuID>(null);
  const menuBarRef = useRef<HTMLElement>(null);

  const {
    activeApp,
    openApps,
    openApp,
    closeApp,
    minimizeApp,
    toggleMaximize,
  } = useAppStore();
  const {
    darkMode,
    toggleDarkMode,
    sleep,
    toggleSpotlight,
    toggleActionCenter,
    wifiOn,
    bluetoothOn,
  } = useSystemStore();

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(e.target as Node)
      ) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const closeMenu = useCallback(() => setActiveMenu(null), []);

  const activeTitle =
    appsConfig.find((a) => a.id === activeApp)?.title ?? "Finder";

  const formattedDate = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  const handleMenuClick = (id: MenuID) => {
    setActiveMenu(activeMenu === id ? null : id);
  };
  const handleMenuHover = (id: MenuID) => {
    if (activeMenu !== null) setActiveMenu(id);
  };

  // --- Menu definitions ---

  const appleMenu: MenuItem[] = [
    {
      label: "About This Mac",
      action: () => openApp("about"),
    },
    { label: "", disabled: true, breakAfter: true },
    {
      label: "System Preferences...",
      action: () => toggleActionCenter(),
      breakAfter: true,
    },
    {
      label: "App Store...",
      action: () => openApp("projects"),
    },
    { label: "", disabled: true, breakAfter: true },
    { label: "Recent Items", disabled: true, breakAfter: true },
    {
      label: "Force Quit...",
      shortcut: "⌥⌘Q",
      action: () => {
        Array.from(openApps).forEach((id) => closeApp(id));
      },
    },
    { label: "", disabled: true, breakAfter: true },
    {
      label: "Sleep",
      action: () => sleep(),
    },
    {
      label: "Restart...",
      action: () => onRestart(),
    },
    {
      label: "Shut Down...",
      action: () => sleep(),
    },
    { label: "", disabled: true, breakAfter: true },
    { label: "Lock Screen", shortcut: "⌃⌘Q", action: () => sleep() },
    { label: "Log Out Byeori...", shortcut: "���⌘Q", action: () => sleep() },
  ];

  const appMenu: MenuItem[] = [
    {
      label: `About ${activeTitle}`,
      action: () => {
        if (activeApp) openApp(activeApp);
      },
      breakAfter: true,
    },
    {
      label: "Preferences...",
      shortcut: "⌘,",
      disabled: true,
      breakAfter: true,
    },
    {
      label: `Hide ${activeTitle}`,
      shortcut: "⌘H",
      action: () => {
        if (activeApp) minimizeApp(activeApp);
      },
    },
    { label: "Hide Others", shortcut: "⌥⌘H", disabled: true },
    { label: "Show All", disabled: true, breakAfter: true },
    {
      label: `Quit ${activeTitle}`,
      shortcut: "⌘Q",
      action: () => {
        if (activeApp) closeApp(activeApp);
      },
    },
  ];

  const fileMenu: MenuItem[] = [
    {
      label: "New Window",
      shortcut: "⌘N",
      disabled: true,
    },
    {
      label: "New Tab",
      shortcut: "⌘T",
      disabled: true,
      breakAfter: true,
    },
    {
      label: "Open...",
      shortcut: "⌘O",
      action: () => openApp("terminal"),
    },
    { label: "Open Recent", disabled: true, breakAfter: true },
    {
      label: "Close Window",
      shortcut: "⌘W",
      action: () => {
        if (activeApp) closeApp(activeApp);
      },
    },
    { label: "Save", shortcut: "⌘S", disabled: true },
    { label: "Save As...", shortcut: "⇧⌘S", disabled: true, breakAfter: true },
    { label: "Print...", shortcut: "⌘P", disabled: true },
  ];

  const editMenu: MenuItem[] = [
    { label: "Undo", shortcut: "⌘Z", disabled: true },
    { label: "Redo", shortcut: "���⌘Z", disabled: true, breakAfter: true },
    { label: "Cut", shortcut: "⌘X", disabled: true },
    {
      label: "Copy",
      shortcut: "⌘C",
      action: () => {
        navigator.clipboard.writeText(
          "Thanks for checking out my portfolio! 🎉"
        );
      },
    },
    { label: "Paste", shortcut: "⌘V", disabled: true },
    {
      label: "Select All",
      shortcut: "⌘A",
      disabled: true,
      breakAfter: true,
    },
    {
      label: "Emoji & Symbols",
      shortcut: "⌃⌘Space",
      action: () => {
        // Fun: just open the about page with the emoji-laden bio
        openApp("contact");
      },
    },
  ];

  const viewMenu: MenuItem[] = [
    {
      label: darkMode ? "Light Mode" : "Dark Mode",
      action: () => toggleDarkMode(),
      breakAfter: true,
    },
    {
      label: "Enter Full Screen",
      shortcut: "⌃⌘F",
      action: () => {
        if (activeApp) toggleMaximize(activeApp);
      },
      breakAfter: true,
    },
    {
      label: "Show Toolbar",
      disabled: true,
    },
    {
      label: "Show Sidebar",
      disabled: true,
    },
    {
      label: "Show Tab Bar",
      disabled: true,
      breakAfter: true,
    },
    {
      label: "Show Path Bar",
      disabled: true,
    },
    {
      label: "Show Status Bar",
      disabled: true,
    },
  ];

  const windowMenu: MenuItem[] = [
    {
      label: "Minimize",
      shortcut: "⌘M",
      action: () => {
        if (activeApp) minimizeApp(activeApp);
      },
    },
    {
      label: "Zoom",
      action: () => {
        if (activeApp) toggleMaximize(activeApp);
      },
      breakAfter: true,
    },
    {
      label: "Tile Window to Left of Screen",
      disabled: true,
    },
    {
      label: "Tile Window to Right of Screen",
      disabled: true,
      breakAfter: true,
    },
    ...Array.from(openApps).map((id) => ({
      label: appsConfig.find((a) => a.id === id)?.title ?? id,
      checked: id === activeApp,
      action: () => useAppStore.getState().focusApp(id),
    })),
    ...(openApps.size > 0
      ? [{ label: "", disabled: true, breakAfter: true } as MenuItem]
      : []),
    {
      label: "Bring All to Front",
      action: () => {
        Array.from(openApps).forEach((id) =>
          useAppStore.getState().focusApp(id)
        );
      },
    },
  ];

  const helpMenu: MenuItem[] = [
    {
      label: "Search",
      disabled: true,
      breakAfter: true,
    },
    {
      label: "Byeori's Portfolio Help",
      action: () => openApp("about"),
    },
    {
      label: "View Source Code",
      action: () => openApp("terminal"),
      breakAfter: true,
    },
    {
      label: "Send Feedback",
      action: () => openApp("contact"),
    },
  ];

  const menus: { id: MenuID; label: React.ReactNode; items: MenuItem[] }[] = [
    {
      id: "apple",
      label: <FaApple className="text-[15px]" />,
      items: appleMenu,
    },
    { id: "app", label: activeTitle, items: appMenu },
    { id: "file", label: "File", items: fileMenu },
    { id: "edit", label: "Edit", items: editMenu },
    { id: "view", label: "View", items: viewMenu },
    { id: "window", label: "Window", items: windowMenu },
    { id: "help", label: "Help", items: helpMenu },
  ];

  const textColor = darkMode
    ? "text-white/85"
    : "text-black/80";
  const textColorDim = darkMode
    ? "text-white/55"
    : "text-black/60";
  const hoverBg = darkMode
    ? "hover:bg-white/10"
    : "hover:bg-black/5";
  const menuBg = darkMode
    ? "bg-[rgba(30,30,30,0.3)]"
    : "bg-[var(--color-menubar-bg)]";

  return (
    <header
      ref={menuBarRef}
      className={`h-7 flex items-center justify-between px-1 ${menuBg} backdrop-blur-2xl border-b border-white/10 text-[13px] ${textColor} z-50 shrink-0 relative`}
    >
      {/* Left: Menus */}
      <div className="flex items-center h-full">
        {menus.map((menu) => (
          <div key={menu.id} className="relative h-full">
            <button
              className={`h-full px-2.5 rounded-[4px] transition-colors duration-75 ${
                menu.id === "app" ? "font-semibold ml-1" : ""
              } ${
                menu.id === "apple" ? "px-3" : ""
              } ${
                activeMenu === menu.id
                  ? darkMode
                    ? "bg-white/15"
                    : "bg-black/10"
                  : hoverBg
              } ${
                menu.id !== "apple" && menu.id !== "app"
                  ? textColorDim
                  : ""
              }`}
              onClick={() => handleMenuClick(menu.id)}
              onMouseEnter={() => handleMenuHover(menu.id)}
            >
              {menu.label}
            </button>
            <MenuDropdown
              items={menu.items}
              isOpen={activeMenu === menu.id}
              onClose={closeMenu}
            />
          </div>
        ))}
      </div>

      {/* Right: Status icons */}
      <div className="flex items-center h-full gap-0.5">
        <StatusButton
          onClick={() => useSystemStore.getState().toggleBluetooth()}
          hoverBg={hoverBg}
        >
          <FaBluetooth
            className={`text-[12px] ${bluetoothOn ? "" : "opacity-30"}`}
          />
        </StatusButton>

        <StatusButton
          onClick={() => useSystemStore.getState().toggleWifi()}
          hoverBg={hoverBg}
        >
          <FaWifi
            className={`text-[12px] ${wifiOn ? "" : "opacity-30"}`}
          />
        </StatusButton>

        <StatusButton hoverBg={hoverBg}>
          <FaBatteryFull className="text-[14px]" />
          <span className="text-[11px] ml-0.5">100%</span>
        </StatusButton>

        <StatusButton
          onClick={() => toggleSpotlight()}
          hoverBg={hoverBg}
        >
          <FaSearch className="text-[11px]" />
        </StatusButton>

        <StatusButton
          onClick={() => toggleActionCenter()}
          hoverBg={hoverBg}
        >
          <BsToggles className="text-[13px]" />
        </StatusButton>

        <button
          className={`h-full px-2 rounded-[4px] text-[12px] ${hoverBg}`}
          onClick={() => toggleActionCenter()}
        >
          {formattedDate} {formattedTime}
        </button>
      </div>
    </header>
  );
}

function StatusButton({
  children,
  onClick,
  hoverBg,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  hoverBg: string;
}) {
  return (
    <button
      className={`h-full px-1.5 rounded-[4px] flex items-center gap-0.5 ${hoverBg}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
