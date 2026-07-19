import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Diamond, ShieldCheck, ExternalLink, Globe, Lock } from "lucide-react";

import { projects } from "../../data/portfolioData";

export function ProjectLogs() {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [loadedIframes, setLoadedIframes] = useState<Record<string, boolean>>({});

  const activeProject = projects[selectedIndex] ?? projects[0];

  const handleProjectClick = (url: string) => {
    if (url && url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleIframeLoad = (title: string) => {
    setLoadedIframes((prev) => ({ ...prev, [title]: true }));
  };

  // Fallback timer so loading indicator never stays stuck if browser postpones iframe onLoad
  useEffect(() => {
    if (activeProject.url && activeProject.url.startsWith("http")) {
      const timer = setTimeout(() => {
        setLoadedIframes((prev) => ({ ...prev, [activeProject.title]: true }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [activeProject.title, activeProject.url]);

  return (
    <section
      id="projects"
      className="relative min-h-dvh lg:h-dvh flex flex-col lg:overflow-hidden border-b border-[#1a1a1e] lg:snap-start"
    >

      {/* Section header */}
      <div className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 md:px-12 pt-7 pb-4 border-b border-[#141418]">
        <div className="flex items-center gap-4">
          <div className="w-3.5 h-3.5 border border-[#3a3a44] rotate-45 flex items-center justify-center shrink-0">
            <div className="w-1 h-1 bg-[#3a3a44] rotate-45" />
          </div>
          <h2 className="font-['Cinzel',serif] text-xl md:text-2xl text-[#e8e6e3] tracking-[0.18em] uppercase">
            Project Logs
          </h2>
          <span className="font-['Inter',sans-serif] text-xs text-[#5a5a65] tracking-widest uppercase">
            ({projects.length})
          </span>
        </div>

        {/* Global Confidentiality Notice */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#0e0e12] border border-[#1e1e26] rounded-sm text-[#9a9aa5]">
          <ShieldCheck size={14} className="text-[#8e8e9a] shrink-0" />
          <span className="font-['Inter',sans-serif] text-xs text-[#9a9aa5] leading-none">
            Live demos are stripped of auth & databases and hosted on GitHub Pages.
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] lg:overflow-hidden">

        {/* Left — Project list */}
        <div className="overflow-y-visible lg:overflow-y-auto scrollbar-hide border-r border-[#161618] flex flex-col">
          {projects.map((project, idx) => {
            const isSelected = selectedIndex === idx;
            const hasLiveUrl = project.url && project.url.startsWith("http");
            const isConfidential = project.status === "Confidential" || (project as any).isConfidential;

            return (
              <div
                key={idx}
                onMouseEnter={() => setSelectedIndex(idx)}
                onClick={() => handleProjectClick(project.url)}
                className={`relative group cursor-pointer border-b border-[#131316] px-6 md:px-8 py-5 transition-colors duration-200 ${
                  isSelected ? "bg-[#141418]" : "hover:bg-[#0d0d10]"
                }`}
              >
                {/* Subtle Left Accent Line */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-200 ${
                    isSelected ? "bg-[#c8c6c3] opacity-100" : "bg-[#3a3a48] opacity-0 group-hover:opacity-40"
                  }`}
                />

                <div className="flex items-start gap-3.5">
                  <div className="pt-1 shrink-0">
                    <Diamond
                      size={9}
                      className={`transition-colors duration-200 ${
                        isSelected ? "text-[#c8c6c3] fill-[#c8c6c3]" : "text-[#3a3a44] fill-none"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-['Cinzel',serif] text-base md:text-lg tracking-wide transition-colors ${
                          isSelected ? "text-white font-medium" : "text-[#d0cecb] group-hover:text-white"
                        }`}>
                          {project.title}
                        </h3>
                        {hasLiveUrl && (
                          <span className="font-['Inter',sans-serif] text-xs text-[#9a9aa5] tracking-wider uppercase">
                            · Live
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`font-['Inter',sans-serif] tracking-wider uppercase ${
                          isConfidential
                            ? "text-[#8a8a93] bg-[#14141a] border border-[#252532] px-2 py-0.5 rounded-sm flex items-center gap-1.5 font-normal text-[10px]"
                            : project.status === "In Progress"
                            ? "text-[#a1a1aa] text-xs"
                            : "text-[#6a6a75] text-xs"
                        }`}>
                          {isConfidential && <Lock size={10} className="text-[#71717a]" />}
                          {project.status}
                        </span>
                        <ArrowUpRight
                          size={14}
                          className={`transition-transform duration-200 ${
                            isSelected ? "text-[#c8c6c3] translate-x-0.5 -translate-y-0.5" : "text-[#3a3a46]"
                          }`}
                        />
                      </div>
                    </div>

                    <p className="font-['Inter',sans-serif] text-xs text-[#7a7a85] tracking-wide mb-2">
                      {project.subtitle}
                    </p>

                    <p className={`font-['Inter',sans-serif] text-xs md:text-sm text-[#9ca3af] leading-relaxed transition-all duration-300 ${
                      isSelected ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0 overflow-hidden"
                    }`}>
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-x-2.5 gap-y-1 mt-2.5 items-center">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className={`font-['Inter',sans-serif] text-xs tracking-wider uppercase transition-colors ${
                            isSelected ? "text-[#9ca3af]" : "text-[#5a5a65]"
                          }`}
                        >
                          {tIdx > 0 && <span className="mr-2.5 text-[#2a2a32]">·</span>}
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right — Sustained Live Preview Panel */}
        <div className="hidden lg:flex items-center justify-center relative overflow-hidden bg-[#080809]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.title}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 flex flex-col p-6"
            >
              {/* Subtle background glow */}
              {activeProject.preview && (
                <img
                  src={activeProject.preview}
                  alt={`${activeProject.title} background`}
                  className="absolute inset-0 w-full h-full object-cover opacity-20 filter blur-xl grayscale"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-[#080809]/80 to-[#080809]/60" />

              {/* Browser mockup window */}
              <div className="relative flex-1 flex flex-col rounded-md overflow-hidden border border-[#22222a] bg-[#0c0c0f] shadow-2xl">
                
                {/* Browser address bar */}
                <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-[#121216] border-b border-[#1e1e26] shrink-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#282830]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#282830]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#282830]" />
                  </div>

                  {/* URL Input */}
                  <div
                    onClick={() => handleProjectClick(activeProject.url)}
                    className="flex-1 h-7 bg-[#0a0a0d] border border-[#22222c] mx-2 flex items-center px-3 justify-between rounded text-xs text-[#a1a1aa] font-['Inter',sans-serif] truncate cursor-pointer hover:border-[#333342] transition-colors"
                    title={activeProject.status === "Confidential" || (activeProject as any).isConfidential ? "Confidential Project" : "Click to open page"}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {activeProject.status === "Confidential" || (activeProject as any).isConfidential ? (
                        <Lock size={12} className="text-[#71717a] shrink-0" />
                      ) : (
                        <Globe size={12} className="text-[#8e8e9a] shrink-0" />
                      )}
                      <span className="truncate">
                        {activeProject.status === "Confidential" || (activeProject as any).isConfidential
                          ? "https://internal.confidential/repository-restricted"
                          : activeProject.url && activeProject.url.startsWith("http")
                          ? activeProject.url
                          : `https://curtiscullenawong.github.io/${activeProject.title.toLowerCase().replace(/\s/g, "-")}`}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#6a6a75] uppercase tracking-wider shrink-0 ml-2">
                      {activeProject.status === "Confidential" || (activeProject as any).isConfidential
                        ? "Confidential"
                        : "GitHub Pages"}
                    </span>
                  </div>

                  {/* Action Link */}
                  {activeProject.url && activeProject.url !== "#" && (
                    <a
                      href={activeProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-['Inter',sans-serif] uppercase tracking-wider text-[#d0cecb] hover:text-white transition-colors shrink-0 px-2 py-1"
                    >
                      Visit <ArrowUpRight size={13} />
                    </a>
                  )}
                </div>

                {/* Viewport */}
                <div
                  className="flex-1 relative overflow-hidden bg-[#08080a] cursor-pointer"
                  onClick={() => handleProjectClick(activeProject.url)}
                >
                  {activeProject.url && activeProject.url.startsWith("http") ? (
                    <div className="w-full h-full relative">
                      {!loadedIframes[activeProject.title] && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0c0c0f] z-10 text-[#7a7a88] gap-3">
                          <div className="w-5 h-5 border-2 border-[#2a2a38] border-t-[#c8c6c3] rounded-full animate-spin" />
                          <span className="font-['Inter',sans-serif] text-xs tracking-wider uppercase">
                            Loading Live Preview...
                          </span>
                        </div>
                      )}
                      <iframe
                        src={activeProject.url}
                        title={`${activeProject.title} Live Preview`}
                        onLoad={() => handleIframeLoad(activeProject.title)}
                        className="w-full h-full border-0 bg-white"
                        allow="fullscreen"
                      />
                    </div>
                  ) : activeProject.preview ? (
                    <div className="w-full h-full relative">
                      <img
                        src={activeProject.preview}
                        alt={`${activeProject.title} website preview`}
                        className="w-full h-full object-cover opacity-70 grayscale-[0.1]"
                      />
                      {(activeProject.status === "Confidential" || (activeProject as any).isConfidential) && (
                        <div className="absolute top-4 right-4 bg-[#0a0a0c]/90 border border-[#252530] px-3 py-1.5 rounded flex items-center gap-2 backdrop-blur-md shadow-lg z-20">
                          <Lock size={12} className="text-[#71717a]" />
                          <span className="font-['Inter',sans-serif] text-xs text-[#8a8a93] tracking-wider uppercase">
                            Confidential Project
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0c0c0f] text-[#5a5a65] gap-2 p-4 text-center">
                      <Globe size={32} className="text-[#3a3a48]" />
                      <span className="font-['Inter',sans-serif] text-xs uppercase tracking-wider">Preview Unavailable</span>
                    </div>
                  )}

                  {/* Clean info overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#08080a] via-[#08080a]/90 to-transparent pointer-events-none z-20">
                    <div className="pointer-events-auto flex items-end justify-between gap-4">
                      <div>
                        <p className="font-['Cinzel',serif] text-xs tracking-widest text-[#7a7a88] uppercase mb-1">
                          {activeProject.subtitle}
                        </p>
                        <h3 className="font-['Cinzel',serif] text-xl text-white tracking-wide mb-2">
                          {activeProject.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {activeProject.tags.map((tag) => (
                            <span
                              key={tag}
                              className="font-['Inter',sans-serif] text-xs tracking-wider uppercase text-[#a1a1aa] border border-[#22222e] px-2.5 py-0.5 bg-[#121218]/90 rounded-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {activeProject.url && activeProject.url.startsWith("http") && (
                        <a
                          href={activeProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-['Inter',sans-serif] text-[#c8c6c3] hover:text-white hover:underline flex items-center gap-1 uppercase tracking-wider shrink-0"
                        >
                          Open Site <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export { ProjectLogs as QuestLog };




