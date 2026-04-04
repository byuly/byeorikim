import { useState, useRef } from "react";
import { VscChevronDown, VscChevronRight, VscFile } from "react-icons/vsc";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const C = {
  bg:        "#1e1e1e",
  sidebar:   "#252526",
  tabBar:    "#2d2d2d",
  activeTab: "#1e1e1e",
  border:    "#3c3c3c",
  statusBar: "#007acc",
  lineNum:   "#5a5a5a",
  plain:     "#d4d4d4",
  muted:     "#858585",
};

const FONT = "'Cascadia Code', 'Fira Code', 'Courier New', monospace";

/** Lightweight single-pass syntax highlighter (VS Code Dark+ palette) */
function highlight(code: string): string {
  const esc = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return esc.replace(
    /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')|(\b(?:const|let|var|true|false|null|undefined)\b)|(\b\d+\.?\d*\b)|([a-zA-Z_$][\w$]*(?=\s*:))/g,
    (_, comment, str, kw, num, key) => {
      if (comment) return `<span style="color:#6a9955">${comment}</span>`;
      if (str)     return `<span style="color:#ce9178">${str}</span>`;
      if (kw)      return `<span style="color:#569cd6">${kw}</span>`;
      if (num)     return `<span style="color:#b5cea8">${num}</span>`;
      if (key)     return `<span style="color:#9cdcfe">${key}</span>`;
      return _;
    }
  );
}

const DEFAULT_CODE = `const byeori = {

  // i like backend. i like systems. i like big data.

  name:     "Byeori Kim",
  role:     "Software Engineer",
  location: "Vancouver, BC",

  currently: {
    studying:  "CS @ UBC",
    interning: "Activision Blizzard · Data Platform team - Software/Data Engineer Intern",
  },

  previously: [
    "RBC · Real-Time Payments team - Software Engineer Intern",
    "SAP · Data Acquisition team - Software Engineer Intern",
  ],

  skills: [
    "Java", "Kotlin", "Go", "Rust", "Python", "can learn super fast",
    "Spring Boot", "Apache Kafka", "Apache Flink", "Apache Spark",
    "Postgres", "Redis", "Docker", "K8s", "AWS/GCP"
  ],

  links: {
    github:   "github.com/byuly",
    linkedin: "linkedin.com/in/byeorik",
    email:    "kimlbyeori@gmail.com",
  },

  approach:    "scalable backend design + big-data systems",
  outsideWork: ["music", "running"],

  // 10x dev with AI and coffee :)))))))))))))))))))
  funFact: true,

};`;

export default function AboutMe() {
  const [treeOpen, setTreeOpen] = useState(true);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const textareaRef  = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const lines = code.split("\n");

  const handleSelect = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    const before = ta.value.slice(0, ta.selectionStart);
    const line = before.split("\n").length;
    const col  = before.split("\n").pop()!.length + 1;
    setCursor({ line, col });
  };

  const handleScroll = () => {
    const ta = textareaRef.current;
    const hl = highlightRef.current;
    if (ta && hl) hl.scrollTop = ta.scrollTop;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta    = textareaRef.current!;
      const start = ta.selectionStart;
      const end   = ta.selectionEnd;
      const next  = code.slice(0, start) + "  " + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
  };

  const editorPadding = "8px 16px 8px 0";
  const editorStyle: React.CSSProperties = {
    position: "absolute", top: 0, left: 0,
    width: "100%", height: "100%",
    fontFamily: FONT, fontSize: 12, lineHeight: "20px",
    padding: editorPadding,
    whiteSpace: "pre-wrap", wordBreak: "break-all",
    margin: 0,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: C.bg, fontFamily: FONT, fontSize: 12 }}>

      {/* Tab bar */}
      <div style={{ display: "flex", background: C.tabBar, borderBottom: `1px solid ${C.border}`, height: 35, flexShrink: 0 }}>
        <div style={{
          height: "100%", padding: "0 16px", display: "flex", alignItems: "center", gap: 6,
          background: C.activeTab, color: C.plain,
          borderRight: `1px solid ${C.border}`, borderTop: `1px solid ${C.statusBar}`,
        }}>
          <VscFile style={{ color: "#519aba", fontSize: 13 }} />
          about.ts
        </div>
      </div>

      {/* Sidebar + editor */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Sidebar */}
        <div style={{ width: 180, background: C.sidebar, borderRight: `1px solid ${C.border}`, overflowY: "auto", flexShrink: 0 }}>
          <div
            style={{ padding: "6px 8px", color: C.muted, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "default", display: "flex", alignItems: "center", gap: 4 }}
            onClick={() => setTreeOpen(!treeOpen)}
          >
            {treeOpen ? <VscChevronDown /> : <VscChevronRight />}
            Explorer
          </div>
          {treeOpen && (
            <div>
              <div style={{ padding: "2px 8px 2px 16px", color: C.muted, fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                <VscChevronDown style={{ fontSize: 11 }} /> BYEORI
              </div>
              <div style={{ padding: "3px 8px 3px 32px", display: "flex", alignItems: "center", gap: 6, color: C.plain, background: "rgba(255,255,255,0.07)", fontSize: 12 }}>
                <VscFile style={{ color: "#519aba", fontSize: 13, flexShrink: 0 }} />
                about.ts
              </div>
            </div>
          )}
        </div>

        {/* Editor: line numbers + editor area */}
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

          {/* Line numbers */}
          <div style={{
            width: 44, background: C.bg, color: C.lineNum, textAlign: "right",
            paddingTop: 8, paddingRight: 12, overflowY: "hidden", flexShrink: 0,
            lineHeight: "20px", fontSize: 12, userSelect: "none", pointerEvents: "none",
          }}>
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Highlight + textarea overlay */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>

            {/* Highlight layer (non-interactive) */}
            <div
              ref={highlightRef}
              style={{
                ...editorStyle,
                color: C.plain,
                overflowY: "hidden",
                pointerEvents: "none",
                zIndex: 0,
              }}
              dangerouslySetInnerHTML={{ __html: highlight(code) }}
            />

            {/* Editable textarea (transparent text, visible caret) */}
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onSelect={handleSelect}
              onClick={handleSelect}
              onKeyDown={handleKeyDown}
              onScroll={handleScroll}
              spellCheck={false}
              style={{
                ...editorStyle,
                background: "transparent",
                color: "transparent",
                caretColor: "#aeafad",
                border: "none",
                outline: "none",
                resize: "none",
                overflowY: "auto",
                zIndex: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div style={{
        height: 22, background: C.statusBar, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 10px", flexShrink: 0,
        fontSize: 11, color: "rgba(255,255,255,0.85)",
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <span>TypeScript</span>
          <span style={{ opacity: 0.6 }}>Ln {cursor.line}, Col {cursor.col}</span>
          <span style={{ opacity: 0.6 }}>UTF-8</span>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <a href="https://github.com/byuly" target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
            <FaGithub /> byuly
          </a>
          <a href="https://linkedin.com/in/byeorik" target="_blank" rel="noopener noreferrer"
            style={{ color: "rgba(255,255,255,0.85)", display: "flex", alignItems: "center", gap: 4, textDecoration: "none" }}>
            <FaLinkedin /> byeorik
          </a>
        </div>
      </div>
    </div>
  );
}
