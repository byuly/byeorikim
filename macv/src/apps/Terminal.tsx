import { useState, useRef, useEffect } from "react";
import { useAppStore } from "../store/useAppStore";
import type { AppID } from "../config/apps";

interface Line {
  type: "input" | "output" | "error" | "success";
  text: string;
}

const HELP = `
commands:
  open <app>   — open an app window
  ls           — list all apps
  skills       — tech stack
  experience   — work history (quick)
  contact      — get in touch
  git log      — commit history 👀
  neofetch     — system info
  sudo hire    — most important command
  clear        — clear terminal
`.trim();

const SKILLS = `
languages    Java · Rust · Go · Python · SQL · TypeScript
backend      Spring Boot · FastAPI · Node.js · Apache Kafka
             Flink · Spark · Redis · PostgreSQL · MongoDB
             Databricks
cloud        AWS · GCP · Docker · Kubernetes · Linux
             Git · Jenkins · CI/CD
`.trim();

const EXPERIENCE = `
Jan 2026–now   SWE Intern @ Activision Blizzard
Sep–Dec 2025   SWE Intern @ Royal Bank of Canada
Jan–Aug 2025   SWE Intern @ SAP
`.trim();

const GIT_LOG = `
* 9f3a1bc  read: finished "Designing Data-Intensive Applications" 2nd ed (yes the whole thing)
* b4c2e7d  read: finished "Kafka: The Definitive Guide" 2nd ed, kafka kafka
* 7e1d4a2  learning: Flink, flinky flinky
* 3c8f902  learning: Kafka internals — kafka kafka kafka
* a1b5c3e  proficient: Java. i think in Java now
* 2d9f1b4  proficient: Python. scripting, data stuff, backend, you name it
* 8e3a7c1  learning: Rust — fighting the borrow checker daily, losing daily
* 5b2d8f3  building: Go app. pretty refreshing
* 1f2e3d4  init: hello world 🌍
`.trim();

const NEOFETCH = `
     🐸           byeori@portfolio
  .-"    "-.      ----------------
 /  .--.  \\     OS: macv 1.0.0
| (      ) |     Shell: zsh
 \\  '--'  /     University: UBC CS
  '-....-'       Currently: Activision Blizzard
                 Status: TN / J-1 eligible
                 Interests: backend · distributed · big data
`.trim();

const OPEN_APPS: Record<string, AppID> = {
  about: "about",
  me: "about",
  projects: "projects",
  experience: "experience",
  contact: "contact",
  terminal: "terminal",
};

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "👋 hey! welcome to byeori's corner of the internet." },
    { type: "output", text: "🖥️  tip: F11 (Windows) or ⌃⌘F (Mac) for full screen — much better experience" },
    { type: "output", text: "👇 click on the icons in the dock for byeori's super cool experience" },
    { type: "output", text: '💡 or type "help" to see what i can do' },
    { type: "output", text: "" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openApp = useAppStore((s) => s.openApp);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const push = (current: Line[], ...next: Line[]) =>
    [...current, ...next];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    const cmd = raw.toLowerCase();
    let next: Line[] = [...lines, { type: "input", text: `~ ${raw}` }];

    if (!cmd) {
      setInput("");
      return;
    }

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (cmd === "help") {
      next = push(next, { type: "output", text: HELP });
    } else if (cmd === "ls") {
      next = push(next,
        { type: "output", text: "apps/  →  about  projects  experience  contact  terminal" },
        { type: "output", text: 'tip: run "open <name>" to launch one' }
      );
    } else if (cmd === "skills") {
      next = push(next, { type: "output", text: SKILLS });
    } else if (cmd === "experience") {
      next = push(next, { type: "output", text: EXPERIENCE });
    } else if (cmd === "contact") {
      openApp("contact");
      next = push(next, { type: "success", text: "📬 opening Contact..." });
    } else if (cmd === "git log") {
      next = push(next, { type: "output", text: GIT_LOG });
    } else if (cmd === "neofetch") {
      next = push(next, { type: "output", text: NEOFETCH });
    } else if (cmd === "sudo hire" || cmd === "sudo hire byeori") {
      next = push(next,
        { type: "success", text: "✅ great choice. executing hire --candidate=byeori..." },
        { type: "success", text: "📨 check your inbox. (just kidding, open Contact 😄)" }
      );
    } else if (cmd.startsWith("sudo")) {
      next = push(next, { type: "error", text: "nice try. try: sudo hire" });
    } else if (cmd.startsWith("open ")) {
      const target = cmd.slice(5).trim();
      const appId = OPEN_APPS[target];
      if (appId) {
        openApp(appId);
        next = push(next, { type: "success", text: `🚀 opening ${target}...` });
      } else {
        next = push(next, { type: "error", text: `open: no app named "${target}". run "ls" to see options` });
      }
    } else if (cmd === "whoami") {
      next = push(next, { type: "output", text: "visitor@byeorikim.dev" });
    } else if (cmd === "pwd") {
      next = push(next, { type: "output", text: "/home/visitor/byeorikim.dev" });
    } else if (cmd === "date") {
      next = push(next, { type: "output", text: new Date().toLocaleString() });
    } else if (cmd === "exit" || cmd === "quit") {
      next = push(next, { type: "output", text: "there is no escape 🐸" });
    } else {
      next = push(next, { type: "error", text: `zsh: command not found: ${raw}` });
    }

    setLines(next);
    setInput("");
  };

  return (
    <div
      className="h-full bg-[#1e1e1e] font-mono text-sm p-3 flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 overflow-auto space-y-0.5">
        {lines.map((line, i) => (
          <pre
            key={i}
            className={`whitespace-pre-wrap font-mono leading-relaxed ${
              line.type === "input"   ? "text-white" :
              line.type === "error"  ? "text-red-400/90" :
              line.type === "success"? "text-emerald-400" :
              "text-green-400/80"
            }`}
          >
            {line.text}
          </pre>
        ))}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1 border-t border-white/5 pt-2">
        <span className="text-blue-400 shrink-0">~</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-white caret-green-400"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </div>
  );
}
