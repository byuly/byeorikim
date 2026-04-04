import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiViewGrid, HiViewList } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { useSystemStore } from "../store/useSystemStore";

const CATEGORIES = ["All", "Featured", "Open Source", "AI/ML", "Full-Stack", "Systems"] as const;
type Category = typeof CATEGORIES[number];

const CAT_ICONS: Record<string, string> = {
  "All":         "🗂️",
  "Featured":    "⭐",
  "Open Source": "🔗",
  "AI/ML":       "🤖",
  "Full-Stack":  "🌐",
  "Systems":     "⚙️",
};

const projects: {
  name: string;
  description: string;
  tags: string[];
  iconColor: string;
  period: string;
  categories: Category[];
  github?: string;
  prs?: { label: string; href: string }[];
}[] = [
  {
    name: "ledge",
    description: "Event-sourced observability platform for AI agents.",
    tags: ["Kotlin", "Spring Boot", "ClickHouse", "Kafka", "Redis", "Prometheus", "PostgreSQL", "Docker"],
    iconColor: "#8b5cf6",
    period: "Dec. 2025 – Present",
    categories: ["Featured", "Systems"],
    github: "https://gitfront.io/r/byuly/dC3om2jCRoEX/ledge/",
  },
  {
    name: "velo",
    description: "Social video platform with auto-generated split-screen reels.",
    tags: ["Go", "Swift", "PostgreSQL", "Redis", "AWS S3", "FFmpeg", "Docker"],
    iconColor: "#f97316",
    period: "Feb. 2026 – Present",
    categories: ["Featured", "Full-Stack"],
    github: "https://github.com/byuly/velo",
  },
  {
    name: "sbox",
    description: "Native macOS productivity app — Pomodoro, Spotify, Notes, Tasks, Calendar, Ambient Audio, and more.",
    tags: ["Rust", "Tauri", "TypeScript", "SQLite"],
    iconColor: "#f59e0b",
    period: "Feb. – Apr. 2026",
    categories: ["Featured", "Systems"],
  },
  {
    name: "lazysql",
    description: "Terminal UI client for databases.",
    tags: ["Go", "PostgreSQL", "MongoDB", "MySQL", "SQLite", "MSSQL"],
    iconColor: "#14b8a6",
    period: "Contributor",
    categories: ["Open Source", "Systems"],
    github: "https://github.com/byuly/lazysql",
    prs: [
      { label: "read-only-mode", href: "https://github.com/jorgerojas26/lazysql/pull/234" },
      { label: "mongo-support",  href: "https://github.com/jorgerojas26/lazysql/pull/249" },
    ],
  },
  {
    name: "bunnylol.rs",
    description: "Meta's internal command bar project.",
    tags: ["Rust", "Rocket", "Docker"],
    iconColor: "#06b6d4",
    period: "Contributor",
    categories: ["Open Source", "Systems"],
    github: "https://github.com/byuly/bunnylol.rs",
    prs: [
      { label: "multi-provider-stock-lookup", href: "https://github.com/facebook/bunnylol.rs/pull/34" },
    ],
  },
  {
    name: "gomoku-matched",
    description: "Competitive real-time Gomoku with human-vs-human and human-vs-AI matches.",
    tags: ["Java", "Spring Boot", "Python", "Kafka", "Redis", "PostgreSQL", "WebSocket"],
    iconColor: "#22c55e",
    period: "Jul. – Oct. 2025",
    categories: ["AI/ML", "Full-Stack"],
    github: "https://github.com/byuly/GomokuMatching",
  },
  {
    name: "urler",
    description: "URL shortener with real-time analytics dashboard.",
    tags: ["Java", "Spring Boot", "Next.js", "TypeScript", "PostgreSQL", "Docker"],
    iconColor: "#0ea5e9",
    period: "Apr. – May 2025",
    categories: ["Full-Stack"],
    github: "https://github.com/byuly/Urler",
  },
  {
    name: "dearme",
    description: "Private, offline AI companion running entirely on local LLM and speech models.",
    tags: ["Python", "FastAPI", "LangChain", "Ollama", "ChromaDB", "Docker"],
    iconColor: "#ec4899",
    period: "NWHacks 2025",
    categories: ["AI/ML"],
    github: "https://github.com/byuly/DearMe",
  },
  {
    name: "charitybite.co",
    description: "Food charity management platform.",
    tags: ["Node.js", "JavaScript", "Oracle DB", "SQL"],
    iconColor: "#84cc16",
    period: "Sep. – Dec. 2024",
    categories: ["Full-Stack"],
    github: "https://github.com/byuly/CharityBite.co",
  },
  {
    name: "sleep detector",
    description: "Real-time sleep detection using computer vision and a CNN trained on 28,709 images.",
    tags: ["Python", "TensorFlow", "Keras", "OpenCV", "Mediapipe"],
    iconColor: "#6366f1",
    period: "Jul. – Aug. 2024",
    categories: ["AI/ML"],
  },
  {
    name: "seul",
    description: "AI therapy companion with RAG architecture and AWS Bedrock.",
    tags: ["Python", "RAG", "ChromaDB", "AWS Bedrock", "LangChain"],
    iconColor: "#d946ef",
    period: "",
    categories: ["AI/ML"],
  },
  {
    name: "DALL-E clone",
    description: "Text-to-image generation app using OpenAI's DALL-E 2 API.",
    tags: ["MongoDB", "Express", "React", "Node.js", "OpenAI", "Cloudinary"],
    iconColor: "#0891b2",
    period: "Aug. – Sep. 2024",
    categories: ["AI/ML", "Full-Stack"],
  },
  {
    name: "sneaker collection",
    description: "Desktop app for organizing sneaker collections.",
    tags: ["Java", "Swing"],
    iconColor: "#fb923c",
    period: "",
    categories: ["Systems"],
  },
];

function FolderIcon({ color, size = 48 }: { color: string; size?: number }) {
  const tabW = size * 0.38;
  const tabH = size * 0.15;
  const bodyH = size * 0.78;
  const r = size * 0.1;
  // darken for tab
  return (
    <div style={{ position: "relative", width: size, height: size * 0.9, flexShrink: 0 }}>
      {/* tab */}
      <div style={{
        position: "absolute", top: 0, left: size * 0.04,
        width: tabW, height: tabH + r,
        background: color,
        borderRadius: `${r}px ${r}px 0 0`,
        filter: "brightness(0.82)",
      }} />
      {/* body */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: size, height: bodyH,
        background: color,
        borderRadius: r,
      }} />
      {/* shine */}
      <div style={{
        position: "absolute", bottom: 0, left: 0,
        width: size, height: bodyH,
        borderRadius: r,
        background: "linear-gradient(150deg, rgba(255,255,255,0.22) 0%, transparent 55%)",
        pointerEvents: "none",
      }} />
    </div>
  );
}

export default function Projects() {
  const dark = useSystemStore((s) => s.darkMode);
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selected, setSelected]             = useState<string | null>(null);
  const [search, setSearch]                 = useState("");
  const [viewMode, setViewMode]             = useState<"icon" | "list">("icon");

  const filtered = projects.filter((p) => {
    const catMatch = activeCategory === "All" || p.categories.includes(activeCategory);
    const searchMatch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const selectedProject = projects.find((p) => p.name === selected) ?? null;

  // Finder color tokens
  const toolbarBg  = dark ? "bg-[#323232] border-[#3f3f3f]" : "bg-[#ebebeb] border-gray-300";
  const sidebarBg  = dark ? "bg-[#272727] border-[#3a3a3a]" : "bg-[#f0f0f0] border-gray-200";
  const contentBg  = dark ? "bg-[#1e1e1e]" : "bg-white";
  const statusBg   = dark ? "bg-[#2b2b2b] border-[#3a3a3a]" : "bg-[#ebebeb] border-gray-200";
  const sideText   = dark ? "text-gray-300" : "text-gray-600";
  const sideHdr    = dark ? "text-gray-500" : "text-gray-400";
  const itemHover  = dark ? "hover:bg-white/8" : "hover:bg-black/5";
  const itemActive = dark ? "bg-blue-600 text-white" : "bg-blue-500 text-white";
  const iconLabel  = dark ? "text-gray-200" : "text-gray-700";
  const detailBg   = dark ? "bg-[#252525] border-[#3a3a3a]" : "bg-[#f8f8f8] border-gray-200";
  const detailText = dark ? "text-gray-200" : "text-gray-700";
  const detailSub  = dark ? "text-gray-400" : "text-gray-500";
  const tagBg      = dark ? "bg-white/10 text-gray-300" : "bg-gray-200 text-gray-600";
  const inputBg    = dark ? "bg-white/8 text-gray-200 placeholder-gray-500" : "bg-black/8 text-gray-700 placeholder-gray-400";
  const divider    = dark ? "border-[#3a3a3a]" : "border-gray-200";

  return (
    <div className={`flex flex-col h-full font-[-apple-system,BlinkMacSystemFont,'SF_Pro_Text',sans-serif] text-[13px] overflow-hidden`}>

      {/* Finder toolbar */}
      <div className={`flex items-center gap-2 px-3 h-9 border-b ${toolbarBg} shrink-0`}>
        <div className="flex items-center gap-0.5">
          <button className={`w-6 h-6 flex items-center justify-center rounded ${itemHover} ${sideText} opacity-40 cursor-default`}>
            <FaChevronLeft size={10} />
          </button>
          <button className={`w-6 h-6 flex items-center justify-center rounded ${itemHover} ${sideText} opacity-40 cursor-default`}>
            <FaChevronRight size={10} />
          </button>
        </div>

        <div className="flex items-center gap-0.5 ml-1">
          <button
            onClick={() => setViewMode("icon")}
            className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${viewMode === "icon" ? (dark ? "bg-white/15 text-white" : "bg-black/12 text-gray-800") : `${sideText} ${itemHover}`}`}
          >
            <HiViewGrid size={13} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`w-6 h-6 flex items-center justify-center rounded transition-colors ${viewMode === "list" ? (dark ? "bg-white/15 text-white" : "bg-black/12 text-gray-800") : `${sideText} ${itemHover}`}`}
          >
            <HiViewList size={13} />
          </button>
        </div>

        <div className="flex-1" />

        {/* Search */}
        <div className={`flex items-center gap-1.5 px-2 h-6 rounded-md text-[11px] ${inputBg}`}>
          <BsSearch size={10} className={sideText} style={{ opacity: 0.6 }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-transparent outline-none w-28"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Sidebar + content */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className={`w-36 border-r ${sidebarBg} flex flex-col shrink-0 overflow-y-auto`}>
          <div className={`px-3 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-wider ${sideHdr}`}>
            Favorites
          </div>
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setSelected(null); }}
                className={`flex items-center gap-2 px-3 py-1 mx-1 rounded-md text-left transition-colors ${
                  isActive ? itemActive : `${sideText} ${itemHover}`
                }`}
              >
                <span className="text-[13px]">{CAT_ICONS[cat]}</span>
                <span className="text-[12px]">{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Main content + detail panel */}
        <div className="flex flex-1 overflow-hidden">

          {/* Icon/list grid */}
          <div
            className={`flex-1 overflow-auto p-3 ${contentBg}`}
            onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
          >
            {viewMode === "icon" ? (
              <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))" }}>
                {filtered.map((p) => {
                  const isSel = selected === p.name;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setSelected(isSel ? null : p.name)}
                      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors cursor-default ${
                        isSel
                          ? dark ? "bg-blue-600/30" : "bg-blue-500/15"
                          : itemHover
                      }`}
                    >
                      <FolderIcon color={p.iconColor} size={52} />
                      <span
                        className={`text-[11px] text-center leading-tight w-full truncate px-1 rounded ${iconLabel} ${
                          isSel ? (dark ? "bg-blue-500 text-white" : "bg-blue-500 text-white") : ""
                        }`}
                        style={{ maxWidth: 72 }}
                      >
                        {p.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-0">
                {/* List header */}
                <div className={`grid grid-cols-[1fr_auto_auto] gap-2 px-2 py-1 text-[11px] font-medium ${detailSub} border-b ${divider} sticky top-0 ${contentBg}`}>
                  <span>Name</span>
                  <span className="w-28 text-right">Period</span>
                  <span className="w-6" />
                </div>
                {filtered.map((p) => {
                  const isSel = selected === p.name;
                  return (
                    <button
                      key={p.name}
                      onClick={() => setSelected(isSel ? null : p.name)}
                      className={`w-full grid grid-cols-[1fr_auto_auto] gap-2 items-center px-2 py-1.5 text-left transition-colors ${
                        isSel ? itemActive : `${iconLabel} ${itemHover}`
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <FolderIcon color={p.iconColor} size={18} />
                        <span className="text-[12px] truncate">{p.name}</span>
                      </div>
                      <span className={`text-[11px] w-28 text-right ${isSel ? "text-white/70" : detailSub}`}>
                        {p.period || "—"}
                      </span>
                      {p.github ? (
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`w-6 flex justify-center ${isSel ? "text-white/70 hover:text-white" : `${detailSub} hover:text-blue-500`}`}
                        >
                          <FaGithub size={12} />
                        </a>
                      ) : <span className="w-6" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selectedProject && (
            <div className={`w-48 border-l ${detailBg} flex flex-col overflow-y-auto shrink-0`}>
              <div className="flex flex-col items-center gap-2 p-4 border-b ${divider}">
                <FolderIcon color={selectedProject.iconColor} size={64} />
                <span className={`text-[13px] font-semibold text-center ${detailText}`}>
                  {selectedProject.name}
                </span>
                {selectedProject.period && (
                  <span className={`text-[10px] ${detailSub}`}>{selectedProject.period}</span>
                )}
              </div>

              <div className="p-3 space-y-3">
                <p className={`text-[11px] leading-relaxed ${detailSub}`}>
                  {selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className={`text-[9px] px-1.5 py-0.5 rounded ${tagBg}`}>{t}</span>
                  ))}
                </div>

                {(selectedProject.github || selectedProject.prs?.length) && (
                  <div className="flex flex-col gap-1.5">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] text-blue-500 hover:underline"
                      >
                        <FaGithub size={11} /> source
                      </a>
                    )}
                    {selectedProject.prs?.map((pr) => (
                      <a
                        key={pr.label}
                        href={pr.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[11px] text-blue-500 hover:underline"
                      >
                        <FaExternalLinkAlt size={9} /> {pr.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className={`flex items-center justify-between px-4 h-6 border-t text-[11px] ${statusBg} ${detailSub} shrink-0`}>
        <span>{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
        {selected && <span className="truncate max-w-[60%] text-right">{selected}</span>}
      </div>
    </div>
  );
}
