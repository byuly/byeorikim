import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { useSystemStore } from "../store/useSystemStore";

const fields = [
  {
    label: "email",
    value: "kimlbyeori@gmail.com",
    href: "mailto:kimlbyeori@gmail.com",
    icon: <FaEnvelope size={12} />,
    iconBg: "#e8443a",
  },
  {
    label: "github",
    value: "github.com/byuly",
    href: "https://github.com/byuly",
    icon: <FaGithub size={12} />,
    iconBg: "#333",
  },
  {
    label: "linkedin",
    value: "linkedin.com/in/byeorik",
    href: "https://linkedin.com/in/byeorik",
    icon: <FaLinkedin size={12} />,
    iconBg: "#0077b5",
  },
  {
    label: "location",
    value: "Vancouver, BC",
    href: null,
    icon: <FaMapMarkerAlt size={11} />,
    iconBg: "#ff3b30",
  },
  {
    label: "university",
    value: "UBC · Computer Science",
    href: null,
    icon: <HiAcademicCap size={13} />,
    iconBg: "#0061a8",
  },
];

export default function Contact() {
  const dark = useSystemStore((s) => s.darkMode);

  const sidebarBg  = dark ? "bg-[#1c1c1e] border-[#3a3a3a]" : "bg-[#f5f5f7] border-gray-200";
  const contentBg  = dark ? "bg-[#111]" : "bg-white";
  const nameText   = dark ? "text-white" : "text-gray-900";
  const subText    = dark ? "text-gray-400" : "text-gray-500";
  const fieldLabel = dark ? "text-gray-500" : "text-gray-400";
  const fieldVal   = dark ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-500";
  const fieldValPlain = dark ? "text-gray-300" : "text-gray-700";
  const divider    = dark ? "border-[#2c2c2e]" : "border-gray-100";
  const inputBg    = dark ? "bg-white/8 text-gray-300 placeholder-gray-600" : "bg-black/6 text-gray-700 placeholder-gray-400";
  const actionBtn  = dark ? "bg-white/10 hover:bg-white/15 text-blue-400" : "bg-blue-50 hover:bg-blue-100 text-blue-600";

  return (
    <div className="flex h-full overflow-hidden" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" }}>

      {/* Sidebar — contacts list */}
      <div className={`w-44 flex flex-col border-r ${sidebarBg} shrink-0`}>
        {/* Search */}
        <div className="p-2">
          <div className={`flex items-center gap-1.5 px-2 h-7 rounded-lg text-[12px] ${inputBg}`}>
            <BsSearch size={10} className={subText} style={{ opacity: 0.6 }} />
            <input
              placeholder="Search"
              className="bg-transparent outline-none flex-1"
              readOnly
            />
          </div>
        </div>

        {/* Group header */}
        <div className={`px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${fieldLabel}`}>
          All Contacts
        </div>

        {/* Single contact row */}
        <div className={`mx-2 flex items-center gap-2.5 px-2 py-2 rounded-lg ${dark ? "bg-[#0a84ff]" : "bg-[#0b84ff]"}`}>
          <img src={`${import.meta.env.BASE_URL}me.jpg`} alt="Byeori Kim" className="w-8 h-8 rounded-full object-cover shrink-0" />
          <div className="min-w-0">
            <div className="text-[13px] font-medium text-white truncate">Byeori Kim</div>
            <div className="text-[11px] text-white/70 truncate">Software Engineer</div>
          </div>
        </div>
      </div>

      {/* Contact detail */}
      <div className={`flex-1 flex flex-col overflow-y-auto ${contentBg}`}>

        {/* Avatar + name header */}
        <div className="flex flex-col items-center pt-6 pb-4 px-6">
          <img src={`${import.meta.env.BASE_URL}me.jpg`} alt="Byeori Kim" className="w-20 h-20 rounded-full object-cover shadow-lg mb-3" />
          <h2 className={`text-xl font-semibold ${nameText}`}>Byeori Kim</h2>
          <p className={`text-[13px] ${subText} mt-0.5`}>Software Engineer</p>

          {/* Action buttons */}
          <div className="flex gap-2 mt-3">
            <a
              href="mailto:kimlbyeori@gmail.com"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[11px] font-medium transition-colors ${actionBtn}`}
            >
              <FaEnvelope size={14} />
              Email
            </a>
            <a
              href="https://linkedin.com/in/byeorik"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[11px] font-medium transition-colors ${actionBtn}`}
            >
              <FaLinkedin size={14} />
              LinkedIn
            </a>
            <a
              href="https://github.com/byuly"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl text-[11px] font-medium transition-colors ${actionBtn}`}
            >
              <FaGithub size={14} />
              GitHub
            </a>
          </div>
        </div>

        <div className={`mx-5 border-t ${divider}`} />

        {/* Fields */}
        <div className="px-5 py-3 space-y-0">
          {fields.map((f, i) => (
            <div key={f.label}>
              <div className="flex items-center gap-3 py-2.5">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-white shrink-0"
                  style={{ background: f.iconBg }}
                >
                  {f.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-[10px] uppercase tracking-wide ${fieldLabel} mb-0.5`}>{f.label}</div>
                  {f.href ? (
                    <a
                      href={f.href}
                      target={f.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`text-[13px] transition-colors ${fieldVal}`}
                    >
                      {f.value}
                    </a>
                  ) : (
                    <span className={`text-[13px] ${fieldValPlain}`}>{f.value}</span>
                  )}
                </div>
              </div>
              {i < fields.length - 1 && (
                <div className={`ml-9 border-t ${divider}`} />
              )}
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="px-5 pb-5 mt-1">
          <div className={`mx-0 border-t ${divider} mb-3`} />
          <div className={`text-[11px] ${fieldLabel} mb-1 uppercase tracking-wide`}>note</div>
          <p className={`text-[13px] ${subText} leading-relaxed`}>
            Open to new grad & internship opportunities · Canadian citizen · TN / J-1 eligible
          </p>
        </div>
      </div>
    </div>
  );
}
