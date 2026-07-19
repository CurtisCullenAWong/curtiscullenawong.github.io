import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Check, Eye, Download, ExternalLink, X, FileText } from "lucide-react";
import { DEEDS, TOMES } from "../../data/portfolioData";

type Tab = "lore" | "deeds" | "codex" | "quest";

export function Footer() {
  const [activeTab, setActiveTab] = useState<Tab>("lore");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [previewPdf, setPreviewPdf] = useState<{ title: string; url: string } | null>(null);
  // const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(key);
      setTimeout(() => setCopiedItem(null), 2000);
    });
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setFormStatus("sending");
  //   // Simulate network request
  //   setTimeout(() => {
  //     setFormStatus("sent");
  //   }, 1500);
  // };

  const options = [
    { id: "lore", text: `"Tell me about your professional background."`, prefix: "[Background]" },
    { id: "deeds", text: `"Where can I find your professional profiles?"`, prefix: "[Links]" },
    { id: "codex", text: `"Access your resume and documents."`, prefix: "[Resources]" },
    // { id: "quest", text: `"I would like to submit a project inquiry."`, prefix: "[Inquiry]" },
  ] as const;

  return (
    <footer id="contact" className="relative min-h-dvh lg:h-dvh py-16 md:py-20 px-6 md:px-12 flex flex-col items-center justify-center lg:snap-start lg:overflow-hidden select-none">
      {/* Night sky background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1429305336325-b84ace7eba3b?w=2000&h=1400&fit=crop&auto=format"
          alt="Night sky"
          className="w-full h-full object-cover opacity-15 grayscale-[0.6]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-[#0a0a0c]/80 to-[#0a0a0c]" />
      </div>

      {/* Stylized floating ember particles */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes floatUp {
            0% { transform: translateY(110vh) translateX(0) scale(1); opacity: 0; }
            10% { opacity: 0.55; }
            90% { opacity: 0.55; }
            100% { transform: translateY(-10vh) translateX(45px) scale(0.5); opacity: 0; }
          }
        `}} />
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-[#f97316]/30 blur-[1px]"
            style={{
              left: `${12 + i * 11 + Math.random() * 6}%`,
              bottom: 0,
              animation: `floatUp ${9 + i * 2}s linear infinite`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full text-center mb-8 md:mb-12 shrink-0">
        <h2 className="font-['Cinzel',serif] text-xl md:text-2xl text-[#e8e6e3] tracking-widest uppercase mb-2">
          Contact Portal
        </h2>
        <div className="h-[1px] w-12 bg-[#333] mx-auto mb-4"></div>
        <p className="font-['Inter',sans-serif] text-[#8b8b8b] text-[10px] md:text-xs tracking-wide uppercase">
          Connect with the developer.
        </p>
      </div>

      {/* Skyrim RPG Interface Grid */}
      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-8 items-start shrink-0 min-h-[420px]">

        {/* Left Column — Dialogue Options */}
        <div className="border border-[#252530] bg-[#0c0c0e]/85 p-6 flex flex-col gap-1.5 w-full">
          <div className="font-['Cinzel',serif] text-[10px] text-[#6e6e78] tracking-[0.25em] uppercase mb-3 pb-2 border-b border-[#1c1c22]">
            Dialogue Choices
          </div>
          <div className="flex flex-col gap-2">
            {options.map((opt) => {
              const active = activeTab === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => {
                    setActiveTab(opt.id);
                  }}
                  className="flex items-start gap-3 w-full text-left group transition-all duration-300 py-3 px-3 border border-transparent hover:border-[#22222a] hover:bg-[#121217]/50 cursor-pointer"
                >
                  <span className={`pt-1 shrink-0 transition-opacity duration-300 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}>
                    <div className="w-2.5 h-2.5 rotate-45 bg-[#e8e6e3] flex items-center justify-center">
                      <div className="w-1 h-1 bg-[#0a0a0c] rotate-45" />
                    </div>
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="font-['Cinzel',serif] text-[8px] md:text-[9px] tracking-[0.2em] text-[#5c5c66] uppercase mr-2.5">
                      {opt.prefix}
                    </span>
                    <span className={`font-['Cinzel',serif] text-xs md:text-sm tracking-wide transition-colors duration-300 block leading-tight ${active ? "text-[#e8e6e3]" : "text-[#71717a] group-hover:text-[#e8e6e3]"}`}>
                      {opt.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column — Response & Actions (Tabs) */}
        <div className="border border-[#252530] bg-[#0c0c0e]/85 p-6 w-full min-h-[380px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex-1 flex flex-col"
            >
              {/* Lore Tab */}
              {activeTab === "lore" && (
                <div className="space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#4b5563] rotate-45" />
                      <h3 className="font-['Cinzel',serif] text-[10px] tracking-[0.3em] uppercase text-[#6e6e78]">Professional Profile</h3>
                    </div>
                    <div className="border-l-2 border-[#3a3a46] pl-5 space-y-3.5">
                      <p className="font-['Inter',sans-serif] text-sm text-[#e8e6e3] leading-relaxed font-light">
                        Available for freelance contracts, part-time, and full-time roles in web and mobile development.
                      </p>
                      <p className="font-['Inter',sans-serif] text-sm text-[#8a8a93] leading-relaxed font-light">
                        Based in Parañaque, PH · Open to remote or on-site work · Responds within 24 hours.
                      </p>
                    </div>
                  </div>

                  {/* Developer Stats Card */}
                  <div className="border border-[#1e1e24] bg-[#0c0c0e]/40 p-4 mt-4 shrink-0">
                    <h4 className="font-['Cinzel',serif] text-[9px] tracking-[0.25em] text-[#5c5c66] uppercase mb-3 pb-1.5 border-b border-[#18181f]">Developer Overview</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Profession", value: "Full-Stack Dev" },
                        { label: "Base", value: "Parañaque, PH" },
                        { label: "Focus Area", value: "AI, Web & Mobile Dev" },
                        { label: "Soft skills", value: "Adaptable, Hardworking, Positive Mindset, Coachability" }
                      ].map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1">
                          <span className="font-['Inter',sans-serif] text-[8px] tracking-widest text-[#5a5a62] uppercase">{stat.label}</span>
                          <span className="font-['Cinzel',serif] text-[11px] text-[#a1a1aa] tracking-wide leading-none">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Deeds Tab (Social Links) */}
              {activeTab === "deeds" && (
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#4b5563] rotate-45" />
                      <h3 className="font-['Cinzel',serif] text-[10px] tracking-[0.3em] uppercase text-[#6e6e78]">Professional Directory</h3>
                    </div>
                    <div className="space-y-2.5">
                      {DEEDS.map((deed, i) => (
                        <div key={i} className="flex items-start gap-4 p-3 border border-[#1c1c22] bg-[#0c0c0e]/30 hover:bg-[#121217] hover:border-[#3a3a46] transition-all duration-300 group">
                          <a
                            href={deed.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-9 h-9 border border-[#222] flex items-center justify-center bg-[#111214] shrink-0 group-hover:border-[#4e4e5b] transition-colors"
                          >
                            {deed.icon}
                          </a>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between gap-2">
                              <a href={deed.url} target="_blank" rel="noopener noreferrer" className="font-['Inter',sans-serif] text-xs tracking-wider text-[#d8d6d3] group-hover:text-white transition-colors truncate hover:underline underline-offset-2">{deed.name}</a>
                              <span className="font-['Inter',sans-serif] text-[7.5px] tracking-widest text-[#5a5a62] uppercase shrink-0">{deed.role}</span>
                            </div>
                            <p className="font-['Inter',sans-serif] text-[10px] text-[#8a8a93] leading-relaxed mt-1 font-light">{deed.desc}</p>
                          </div>
                          {deed.copyValue && (
                            <button
                              onClick={() => handleCopy(deed.copyValue!, `deed-${i}`)}
                              title="Copy to clipboard"
                              className="shrink-0 w-7 h-7 border border-[#1c1c22] flex items-center justify-center bg-[#0c0c10] hover:border-[#4e4e5b] hover:bg-[#121217] transition-all duration-200 cursor-pointer"
                            >
                              {copiedItem === `deed-${i}`
                                ? <Check size={12} className="text-[#6a8a6a]" />
                                : <Copy size={12} className="text-[#5a5a62]" />}
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Codex Tab (Resume/Resources) */}
              {activeTab === "codex" && (
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-[#4b5563] rotate-45" />
                      <h3 className="font-['Cinzel',serif] text-[10px] tracking-[0.3em] uppercase text-[#6e6e78]">Resource Documents</h3>
                    </div>
                    <div className="space-y-3">
                      {TOMES.map((tome, i) => (
                        <div
                          key={i}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-[#1c1c22] bg-[#0c0c0e]/30 hover:bg-[#121217] hover:border-[#3a3a46] transition-all duration-300"
                        >
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="w-9 h-9 border border-[#222] flex items-center justify-center bg-[#111214] shrink-0">
                              {tome.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-['Cinzel',serif] text-xs tracking-wider text-[#d8d6d3] truncate">{tome.name}</h4>
                              <p className="font-['Inter',sans-serif] text-[7.5px] tracking-widest text-[#5a5a62] uppercase leading-none mt-1">{tome.type}</p>
                              <p className="font-['Inter',sans-serif] text-[10.5px] text-[#8a8a93] leading-relaxed mt-2 font-light">{tome.desc}</p>
                            </div>
                          </div>

                          {(tome as any).pdfUrl ? (
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={() => setPreviewPdf({ title: tome.name, url: (tome as any).pdfUrl })}
                                className="font-['Inter',sans-serif] text-[8.5px] tracking-[0.2em] uppercase py-2 px-3 border border-[#3a3a48] text-[#e8e6e3] hover:bg-[#e8e6e3] hover:text-[#0a0a0c] transition-colors text-center shrink-0 cursor-pointer bg-[#0c0c0e]/30 flex items-center gap-1.5"
                              >
                                <Eye size={12} />
                                Preview
                              </button>
                              <a
                                href={(tome as any).pdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-['Inter',sans-serif] text-[8.5px] tracking-[0.2em] uppercase p-2 border border-[#252530] text-[#8a8a93] hover:text-[#e8e6e3] hover:border-[#4b5563] transition-colors shrink-0 cursor-pointer bg-[#0c0c0e]/30"
                                title="Open in new tab"
                              >
                                <ExternalLink size={12} />
                              </a>
                            </div>
                          ) : (
                            <a
                              href={tome.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-['Inter',sans-serif] text-[8.5px] tracking-[0.2em] uppercase py-2 px-3.5 border border-[#333] text-[#e8e6e3] hover:bg-[#e8e6e3] hover:text-[#0a0a0c] transition-colors text-center shrink-0 cursor-pointer bg-[#0c0c0e]/30"
                            >
                              {tome.action}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Social anchors & copyright at base */}
      <div className="flex items-center gap-6 mt-12 md:mt-16 font-['Cinzel',serif] text-xs tracking-widest uppercase text-[#5a5a62] shrink-0 relative z-10">
        <a href="https://github.com/CurtisCullenAWong" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8e6e3] transition-colors duration-200 cursor-pointer">
          GitHub
        </a>
        <span className="text-[#202025]">•</span>
        <a href="https://www.linkedin.com/in/curtis-cullen-wong-3a9434367" target="_blank" rel="noopener noreferrer" className="hover:text-[#e8e6e3] transition-colors duration-200 cursor-pointer">
          LinkedIn
        </a>
        <span className="text-[#202025]">•</span>
        <a href="mailto:curtiscullenagustinwong@gmail.com" className="hover:text-[#e8e6e3] transition-colors duration-200 cursor-pointer">
          Email
        </a>
      </div>

      <div className="mt-4 text-center text-[#404046] font-['Inter',sans-serif] text-[10px] uppercase tracking-widest shrink-0 relative z-10">
        <p>&copy; {new Date().getFullYear()} Curtis C. A. Wong. All rights reserved.</p>
      </div>

      {/* PDF Inline Preview Modal */}
      <AnimatePresence>
        {previewPdf && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#0a0a0c]/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative w-full max-w-5xl h-[85vh] flex flex-col bg-[#0c0c0f] border border-[#252532] rounded-md shadow-2xl overflow-hidden"
            >
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-[#121216] border-b border-[#1e1e26] shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText size={16} className="text-[#8a8a93] shrink-0" />
                  <h3 className="font-['Cinzel',serif] text-sm md:text-base text-[#e8e6e3] tracking-wide truncate">
                    {previewPdf.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <a
                    href={previewPdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-['Inter',sans-serif] text-[11px] text-[#8a8a93] hover:text-[#e8e6e3] uppercase tracking-wider px-2.5 py-1 border border-[#252530] rounded-sm hover:border-[#3a3a48] transition-colors"
                  >
                    <ExternalLink size={12} />
                    <span className="hidden sm:inline">Open New Tab</span>
                  </a>
                  <a
                    href={previewPdf.url}
                    download
                    className="flex items-center gap-1.5 font-['Inter',sans-serif] text-[11px] text-[#8a8a93] hover:text-[#e8e6e3] uppercase tracking-wider px-2.5 py-1 border border-[#252530] rounded-sm hover:border-[#3a3a48] transition-colors"
                  >
                    <Download size={12} />
                    <span className="hidden sm:inline">Download</span>
                  </a>
                  <button
                    onClick={() => setPreviewPdf(null)}
                    className="p-1 text-[#71717a] hover:text-white transition-colors cursor-pointer ml-1"
                    title="Close Preview"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal PDF Viewport Body */}
              <div className="flex-1 w-full h-full bg-[#0a0a0c] relative">
                <iframe
                  src={previewPdf.url}
                  title={previewPdf.title}
                  className="w-full h-full border-0 bg-[#0a0a0c]"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
