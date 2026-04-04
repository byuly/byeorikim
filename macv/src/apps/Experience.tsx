import { useState, useRef, useEffect } from "react";
import { useSystemStore } from "../store/useSystemStore";

interface Message {
  from: "me" | "them";
  text: string;
}

const conversations: {
  company: string;
  team: string;
  period: string;
  avatarColor: string;
  initials: string;
  logo: string;
  tags: string[];
  preview: string;
  messages: Message[];
}[] = [
  {
    company: "Activision Blizzard",
    team: "Data Platforms",
    period: "Jan. 2026 – Present",
    avatarColor: "#22c55e",
    initials: "AB",
    logo: "/activision.jpeg",
    tags: ["Spring Boot", "Flink", "Spark", "Kafka", "Kuberntes", "Kotlin", "Distributed Systems"],
    preview: "yeah we don't mess around lol",
    messages: [
      { from: "them", text: "hey! we're Activision Blizzard, Call of Duty, Warcraft, Overwatch, you know the ones.. we need a software engineer intern!" },
      { from: "me",   text: "yeah for sure, what team?" },
      { from: "them", text: "Data Platforms. basically we're the backbone, every click, match, event from millions of players flows through us!" },
      { from: "me",   text: "that's a lot of data.. which game is it?" },
      { from: "them", text: "Call of Duty. 300M+ records a day lol. we do real-time ingestion, schema management, pipeline orchestration, the whole thing" },
      { from: "me",   text: "what's the stack like?" },
      { from: "them", text: "Spring Boot for our services. in Kotlin! Some data engineering frameworks like Flink, Kafka and Spark, sounds fun?" },
      { from: "me",   text: "nice, full modern data stack" },
      { from: "them", text: "yeah we don't mess around lol" },
    ],
  },
  {
    company: "Royal Bank of Canada",
    team: "Real-Time Payments",
    period: "Sep. – Dec. 2025",
    avatarColor: "#3b82f6",
    initials: "RBC",
    logo: "/rbc.jpeg",
    tags: ["Java", "Spring Boot", "Apache Camel", "Kafka", "Functional Programming"],
    preview: "exactly, no room for error 😅",
    messages: [
      { from: "them", text: "hey! it's RBC, one of Canada's biggest banks. we got lots of money" },
      { from: "me",   text: "lol what team?" },
      { from: "them", text: "Real-Time Payments! we're building the infrastructure that processes money tranfsers between Canada and US!" },
      { from: "me",   text: "what does that look like day to day?" },
      { from: "them", text: "messaging pipelines, payment routing, state management, everything needs to be RIGHT. money can't just disappear" },
      { from: "me",   text: "yeah that makes sense lol" },
      { from: "them", text: "stack is Java + Spring Boot, Apache Camel for routing, Kafka for async messaging, IBM MQ for regulated channels. In the cloud with OpenShift." },
      { from: "me",   text: "nice, pretty serious infra" },
      { from: "them", text: "exactly, no room for error 😅" },
    ],
  },
  {
    company: "SAP",
    team: "Data Acquisition",
    period: "Jan. – Aug. 2025",
    avatarColor: "#8b5cf6",
    initials: "SAP",
    logo: "/sap.jpeg",
    tags: ["Java", "Spring Boot", "Python", "Cypress", "Jenkins", "Distributed Systems"],
    preview: "exactly, very connector-brained 😄",
    messages: [
      { from: "them", text: "SAP! SAP! we make enterprise software, ERP systems, data management, that kind of thing" },
      { from: "me",   text: "what's the team?" },
      { from: "them", text: "Data Acquisition. we build the connectors that let SAP pull data from manyyyyy data sources" },
      { from: "me",   text: "oh so like the ingestion layer?" },
      { from: "them", text: "yeah exactly. we manage credentials, JDBC drivers, job queues, all the plumbing that makes data flow into SAP products" },
      { from: "me",   text: "what do you build with?" },
      { from: "them", text: "Java + Spring Boot for the backend, some Python for tooling and automation, Cypress + Jenkins for E2E testing" },
      { from: "me",   text: "cool cool. my first internship, excitedd" },
      { from: "them", text: ":))" },
    ],
  },
];

export default function Experience() {
  const dark = useSystemStore((s) => s.darkMode);
  const [selected, setSelected] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const convo = conversations[selected];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected]);

  // Messages color tokens
  const sidebarBg   = dark ? "bg-[#1c1c1e]" : "bg-[#f5f5f7]";
  const sidebarBdr  = dark ? "border-[#3a3a3a]" : "border-gray-200";
  const chatBg      = dark ? "bg-black" : "bg-white";
  const headerBg    = dark ? "bg-[#1c1c1e] border-[#3a3a3a]" : "bg-[#f5f5f7] border-gray-200";
  const activeRow   = dark ? "bg-[#0a84ff]" : "bg-[#0b84ff]";
  const hoverRow    = dark ? "hover:bg-white/6" : "hover:bg-black/5";
  const nameText    = dark ? "text-white" : "text-gray-900";
  const subText     = dark ? "text-gray-400" : "text-gray-500";
  const previewText = dark ? "text-gray-400" : "text-gray-500";
  const myBubble    = "bg-[#0b84ff] text-white";
  const theirBubble = dark ? "bg-[#2c2c2e] text-white" : "bg-[#e8e8ed] text-gray-900";
  const tagBg       = dark ? "bg-white/10 text-gray-300" : "bg-gray-200 text-gray-600";

  return (
    <div className="flex h-full overflow-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>

      {/* Conversation list */}
      <div className={`w-52 flex flex-col border-r ${sidebarBg} ${sidebarBdr} shrink-0`}>
        <div className={`px-4 py-3 text-[15px] font-semibold ${nameText} border-b ${sidebarBdr}`}>
          Messages
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((c, i) => {
            const isActive = i === selected;
            return (
              <button
                key={c.company}
                onClick={() => setSelected(i)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                  isActive ? activeRow : hoverRow
                }`}
              >
                {/* Avatar */}
                <img
                  src={c.logo}
                  alt={c.company}
                  className="w-10 h-10 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline gap-1">
                    <span className={`text-[13px] font-semibold truncate ${isActive ? "text-white" : nameText}`}>
                      {c.company}
                    </span>
                    <span className={`text-[10px] shrink-0 ${isActive ? "text-white/70" : subText}`}>
                      {c.period.split("–")[0].trim()}
                    </span>
                  </div>
                  <p className={`text-[12px] truncate ${isActive ? "text-white/80" : previewText}`}>
                    {c.preview}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat panel */}
      <div className={`flex flex-col flex-1 overflow-hidden ${chatBg}`}>

        {/* Chat header */}
        <div className={`flex flex-col items-center py-3 border-b ${headerBg} shrink-0`}>
          <img
            src={convo.logo}
            alt={convo.company}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className={`text-[13px] font-semibold mt-1 ${nameText}`}>{convo.company}</span>
          <span className={`text-[11px] ${subText}`}>{convo.team} · {convo.period}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
          {convo.messages.map((msg, i) => {
            const isMe = msg.from === "me";
            return (
              <div key={i} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[68%] px-3 py-1.5 rounded-2xl text-[13px] leading-relaxed ${
                    isMe ? myBubble : theirBubble
                  } ${isMe ? "rounded-br-sm" : "rounded-bl-sm"}`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
          {/* Delivered */}
          <div className={`text-right text-[10px] ${subText} pr-1`}>Delivered</div>
          <div ref={bottomRef} />
        </div>

        {/* Tags footer */}
        <div className={`px-4 py-2.5 border-t ${dark ? "border-[#2c2c2e]" : "border-gray-100"} flex flex-wrap gap-1`}>
          {convo.tags.map((t) => (
            <span key={t} className={`text-[10px] px-1.5 py-0.5 rounded ${tagBg}`}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
