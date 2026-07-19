import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";

import { ATTRIBUTES, VITALS, TIMELINE } from "../../data/portfolioData";
import informalMeImg from "../../../assets/informal-me.jpg";

function AnimatedCounter({ value, inView }: { value: number; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      setDisplayValue(0);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value, inView]);

  return <>{displayValue}</>;
}

import { animate } from "motion/react";

function StatBar({
  label,
  value,
  glyph,
  delay,
  onHover,
  isHovered
}: {
  label: string;
  value: number;
  glyph: string;
  delay: number;
  onHover: (hovered: boolean) => void;
  isHovered: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="space-y-1.5 2xl:space-y-2.5 cursor-pointer group"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3 2xl:gap-4">
          <span className={`font-['Cinzel',serif] text-[8px] sm:text-[9px] xl:text-xs 2xl:text-sm tracking-widest w-4 xl:w-5 2xl:w-6 text-right transition-colors duration-200 ${isHovered ? "text-[#e8e6e3]" : "text-[#4b5563]"}`}>{glyph}</span>
          <span className={`font-['Inter',sans-serif] text-[10px] md:text-xs xl:text-sm 2xl:text-base 3xl:text-lg tracking-[0.2em] uppercase transition-colors duration-200 ${isHovered ? "text-[#e8e6e3]" : "text-[#8a8a93]"}`}>{label}</span>
        </div>
        <span className={`font-['Cinzel',serif] text-[10px] md:text-xs xl:text-sm 2xl:text-base 3xl:text-lg tracking-wider transition-colors duration-200 ${isHovered ? "text-[#e8e6e3]" : "text-[#a1a1aa]"}`}>
          <AnimatedCounter value={value} inView={inView} />
        </span>
      </div>
      <div className={`h-px xl:h-[2px] 2xl:h-[3px] relative overflow-hidden transition-colors duration-300 ${isHovered ? "bg-[#252530]" : "bg-[#16161a]"}`}>
        <motion.div
          className={`absolute inset-y-0 left-0 h-full bg-gradient-to-r ${isHovered ? "from-[#56565e] via-[#e8e6e3]/50 to-[#8a8a92]" : "from-[#3a3a46] via-[#e8e6e3]/20 to-[#56565e]"} bg-[length:200%_100%]`}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{
            animation: "sweep 3s linear infinite",
          }}
        />
        {/* Tick marks every 25% */}
        {[25, 50, 75].map((pct) => (
          <div key={pct} className="absolute top-0 bottom-0 w-px bg-[#1e1e22]" style={{ left: `${pct}%` }} />
        ))}
      </div>
    </div>
  );
}

function AlchemicalCircle({ hoveredAttr }: { hoveredAttr: number | null }) {
  const nodes = [
    { name: "AQUA", rune: "ᛟ", color: "#38bdf8", label: "Frontend", x: 100, y: 32, lx: 100, ly: 14, anchor: "middle" },
    { name: "IGNIS", rune: "ᚠ", color: "#f97316", label: "Backend", x: 164.67, y: 79.0, lx: 184, ly: 76, anchor: "start" },
    { name: "TERRA", rune: "ᛗ", color: "#10b981", label: "Mobile", x: 139.97, y: 155.0, lx: 156, ly: 174, anchor: "start" },
    { name: "AER", rune: "ᚷ", color: "#a855f7", label: "UI / UX", x: 60.03, y: 155.0, lx: 44, ly: 174, anchor: "end" },
    { name: "AETHER", rune: "ᛃ", color: "#eab308", label: "Agentic AI", x: 35.33, y: 79.0, lx: 16, ly: 76, anchor: "end" },
  ];

  const activeColor = hoveredAttr !== null ? nodes[hoveredAttr].color : "#3a3a46";

  return (
    <svg viewBox="-100 -50 400 300" className="w-[90vmin] sm:w-[80vmin] lg:w-[70vmin] xl:w-[65vmin] 2xl:w-[60vmin] max-w-[560px] lg:max-w-[750px] xl:max-w-[950px] 2xl:max-w-[1200px] 3xl:max-w-[1400px] aspect-[400/300] overflow-visible" aria-hidden>
      <defs>
        <radialGradient id="center-glow-about" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={activeColor} stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
        </radialGradient>
        <filter id="glow-filter-about" filterUnits="userSpaceOnUse" x="-100" y="-50" width="400" height="300">
          <feGaussianBlur stdDeviation="1.8" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Central glow */}
      <circle cx="100" cy="100" r="95" fill="url(#center-glow-about)" className="transition-all duration-700" />

      {/* Outer rotating rune ring */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        style={{ originX: "100px", originY: "100px" }}
      >
        <circle cx="100" cy="100" r="96" fill="none" stroke="#252530" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="89" fill="none" stroke="#252530" strokeWidth="0.5" />

        <path id="circlePathAbout" d="M 100, 100 m -92.5, 0 a 92.5,92.5 0 1,1 185,0 a 92.5,92.5 0 1,1 -185,0" fill="none" />
        <text fill="#4b5563" fontSize="5.2" letterSpacing="3.5px" className="font-['Cinzel',serif] select-none transition-colors duration-300">
          <textPath href="#circlePathAbout" startOffset="0%">
            ᚠ ARTIFICER ᚦ SCHOLAR ᚲ ARCHITECT ᛉ SENTINEL ᛟ AETHER ᚠ ARTIFICER ᚦ SCHOLAR ᚲ ARCHITECT ᛉ SENTINEL ᛟ AETHER
          </textPath>
        </text>
      </motion.g>

      {/* Middle counter-rotating ring with tick marks */}
      <motion.g
        animate={{ rotate: -360 }}
        transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        style={{ originX: "100px", originY: "100px" }}
      >
        <circle cx="100" cy="100" r="81" fill="none" stroke="#2a2a35" strokeWidth="0.8" />
        {/* Tick marks every 15 degrees */}
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i * 15 * Math.PI) / 180;
          const r1 = 81;
          const r2 = i % 2 === 0 ? 75 : 78;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * r1}
              y1={100 + Math.sin(a) * r1}
              x2={100 + Math.cos(a) * r2}
              y2={100 + Math.sin(a) * r2}
              stroke="#2e2e38"
              strokeWidth="0.5"
            />
          );
        })}
      </motion.g>

      {/* Intersecting Triangles (Hexagram) - static/slow rotation */}
      <motion.g
        animate={{ rotate: 180 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        style={{ originX: "100px", originY: "100px" }}
      >
        <polygon points="100,20 169.28,140 30.72,140" fill="none" stroke="#22222a" strokeWidth="0.6" />
        <polygon points="100,180 30.72,60 169.28,60" fill="none" stroke="#22222a" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#22222a" strokeWidth="0.5" strokeDasharray="3, 3" />
      </motion.g>

      {/* Inner geometric layers */}
      <circle cx="100" cy="100" r="52" fill="none" stroke="#252532" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="48" fill="none" stroke="#252532" strokeWidth="0.4" />
      <circle cx="100" cy="100" r="22" fill="none" stroke="#252532" strokeWidth="0.8" />

      {/* Pentagram lines connecting the 5 nodes */}
      <polygon
        points="100,32 139.97,155.0 35.33,79.0 164.67,79.0 60.03,155.0"
        fill="none"
        stroke="#22222c"
        strokeWidth="0.6"
      />

      {/* Spokes and glowing highlights */}
      {nodes.map((node, i) => {
        const isHovered = hoveredAttr === i;
        return (
          <g key={node.name}>
            {/* Connection line */}
            <line
              x1="100"
              y1="100"
              x2={node.x}
              y2={node.y}
              stroke={isHovered ? node.color : "#252532"}
              strokeWidth={isHovered ? 1.5 : 0.6}
              className="transition-all duration-300"
              filter={isHovered ? "url(#glow-filter-about)" : undefined}
            />

            {/* Outer node circle */}
            <circle
              cx={node.x}
              cy={node.y}
              r={isHovered ? 7 : 4.8}
              fill="#0a0a0c"
              stroke={isHovered ? node.color : "#3f3f4e"}
              strokeWidth={isHovered ? 1.5 : 0.9}
              className="transition-all duration-300"
              filter={isHovered ? "url(#glow-filter-about)" : undefined}
            />

            {/* Rune character in node */}
            <text
              x={node.x}
              y={node.y + 1.5}
              textAnchor="middle"
              fill={isHovered ? node.color : "#64748b"}
              fontSize="4.5"
              className="font-mono transition-colors duration-300 select-none"
            >
              {node.rune}
            </text>
          </g>
        );
      })}

      {/* Node Labels - ALWAYS visible with soft ambient glow, brightened when active */}
      {nodes.map((node, i) => {
        const isHovered = hoveredAttr === i;
        const opacity = isHovered ? 1 : 0.75;
        const fillColor = isHovered ? node.color : "#94a3b8";
        return (
          <g key={`label-${node.name}`}>
            <text
              x={node.lx}
              y={node.ly}
              textAnchor={node.anchor as any}
              fill={fillColor}
              fontSize="5.5"
              fontWeight={isHovered ? "bold" : "600"}
              className="font-['Cinzel',serif] tracking-[0.2em] select-none transition-all duration-300"
              filter={isHovered ? "url(#glow-filter-about)" : undefined}
              opacity={opacity}
            >
              {node.label.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* Center Jewel */}
      <circle
        cx="100"
        cy="100"
        r="7.5"
        fill={hoveredAttr !== null ? nodes[hoveredAttr].color : "#1a1a24"}
        stroke="#3a3a48"
        strokeWidth="0.8"
        className="transition-colors duration-500"
      />
      <circle cx="100" cy="100" r="2.5" fill="#0a0a0c" />
    </svg>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [hoveredAttr, setHoveredAttr] = useState<number | null>(null);
  const [portraitHovered, setPortraitHovered] = useState(false);

  // Mouse tilt logic
  const tiltX = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });
  const tiltY = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 });

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-py * 12);
    tiltY.set(px * 16);
  };

  const handlePointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const portraitRotateX = useTransform(tiltX, v => v * 0.55);
  const portraitRotateY = useTransform(tiltY, v => v * 0.55);

  const circleRotateX = useTransform(tiltX, v => v * 0.7);
  const circleRotateY = useTransform(tiltY, v => v * 0.7);

  return (
    <section
      id="about"
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative min-h-dvh flex flex-col justify-center border-b border-[#1a1a1e] lg:snap-start py-10 md:py-12 lg:py-6 xl:py-10 2xl:py-16 overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes sweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}} />

      {/* Foggy mountain background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1486184885347-1464b5f10296?w=2400&h=1600&fit=crop&auto=format"
          alt="Misty mountain vista"
          className="w-full h-full object-cover opacity-20 grayscale-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c] via-[#0a0a0c]/70 to-[#0a0a0c]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c]/80 via-transparent to-[#0a0a0c]/80" />
      </div>

      {/* Dynamic interactive alchemical circle watermark */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center lg:justify-end px-4 lg:pl-0 lg:pr-8 xl:pr-16 2xl:pr-24 pointer-events-none transition-opacity duration-300 overflow-visible"
        style={{
          opacity: hoveredAttr !== null ? 0.55 : 0.32,
          rotateX: circleRotateX,
          rotateY: circleRotateY,
          transformPerspective: 1200
        }}
      >
        <AlchemicalCircle hoveredAttr={hoveredAttr} />
      </motion.div>

      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-24 3xl:px-32 grid grid-cols-1 lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] 2xl:grid-cols-[360px_1fr] 3xl:grid-cols-[420px_1fr] gap-6 md:gap-8 lg:gap-10 xl:gap-14 2xl:gap-20 items-center py-4 lg:py-2">

        {/* Left — Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full flex flex-col items-center lg:items-start gap-4 lg:gap-5 xl:gap-6"
        >
          {/* Portrait frame with 3D tilt and expandable corners on hover */}
          <motion.div
            className="relative w-full max-w-[220px] sm:max-w-[250px] lg:max-w-[260px] xl:max-w-[300px] 2xl:max-w-[360px] 3xl:max-w-[420px]"
            onMouseEnter={() => setPortraitHovered(true)}
            onMouseLeave={() => setPortraitHovered(false)}
            style={{
              rotateX: portraitRotateX,
              rotateY: portraitRotateY,
              transformPerspective: 1000
            }}
          >
            {/* Rune border corners */}
            {[
              { pos: "top-0 left-0", cls: "border-t border-l", x: -4, y: -4 },
              { pos: "top-0 right-0", cls: "border-t border-r", x: 4, y: -4 },
              { pos: "bottom-0 left-0", cls: "border-b border-l", x: -4, y: 4 },
              { pos: "bottom-0 right-0", cls: "border-b border-r", x: 4, y: 4 }
            ].map((corner, i) => (
              <motion.div
                key={i}
                className={`absolute ${corner.pos} w-4 h-4 2xl:w-5 2xl:h-5 border-[#3a3a46] ${corner.cls} z-10`}
                animate={{ x: portraitHovered ? corner.x : 0, y: portraitHovered ? corner.y : 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            ))}

            {/* Image */}
            <div className="aspect-[3/4] overflow-hidden bg-[#0e0e12] relative">
              <img
                src={informalMeImg}
                alt="Curtis Cullen A. Wong — Character Portrait"
                className="w-full h-full object-cover object-top opacity-85 hover:opacity-100 transition-opacity duration-300 scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c]/90 via-[#0a0a0c]/15 to-transparent pointer-events-none" />
            </div>

            {/* Portrait overlay label */}
            <div className="absolute bottom-3 left-3 right-3 2xl:bottom-4 2xl:left-4 2xl:right-4 z-10 pointer-events-none">
              <p className="font-['Cinzel',serif] text-[8px] sm:text-[9px] 2xl:text-[11px] tracking-[0.4em] text-[#a1a1aa] uppercase drop-shadow">
                Character Portrait
              </p>
            </div>
          </motion.div>

          {/* Vitals grid */}
          <div className="grid grid-cols-2 gap-2 sm:gap-2.5 2xl:gap-3.5 w-full max-w-[220px] sm:max-w-[250px] lg:max-w-[260px] xl:max-w-[300px] 2xl:max-w-[360px] 3xl:max-w-[420px]">
            {VITALS.map(({ label, value }) => (
              <div key={label} className="border border-[#1a1a20] p-2 sm:p-2.5 xl:p-3 2xl:p-4 bg-[#0c0c0e]/70 hover:bg-[#121217] hover:border-[#2a2a35] transition-all duration-300">
                <p className="font-['Cinzel',serif] text-sm sm:text-base xl:text-lg 2xl:text-xl text-[#e8e6e3] leading-none mb-1">{value}</p>
                <p className="font-['Inter',sans-serif] text-[8.5px] sm:text-[9px] xl:text-[10px] 2xl:text-xs tracking-[0.18em] text-[#71717a] uppercase truncate">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Character sheet */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut", delay: 0.15 }}
          className="w-full flex flex-col space-y-4 lg:space-y-4 xl:space-y-6 2xl:space-y-8"
        >
          {/* Header */}
          <div className="space-y-1 sm:space-y-1.5 2xl:space-y-2">
            <p className="font-['Inter',sans-serif] text-[9px] sm:text-[10px] md:text-xs xl:text-sm 2xl:text-base tracking-[0.45em] uppercase text-[#646473]">Full-Stack Developer & Project Manager</p>
            <h2 className="font-['Cinzel',serif] text-[clamp(1.6rem,3.2vw,4rem)] 2xl:text-5xl 3xl:text-6xl text-[#e8e6e3] tracking-wide leading-tight">The Artificer</h2>
            <div className="h-px w-16 2xl:w-24 bg-[#252530]" />
          </div>

          {/* Lore bio */}
          <div className="space-y-2 2xl:space-y-3 border-l border-[#22222a] pl-3.5 sm:pl-4 xl:pl-6 2xl:pl-8">
            <p className="font-['Inter',sans-serif] text-xs md:text-sm 2xl:text-base text-[#9a9aa5] leading-relaxed font-light">
              Magna Cum Laude IT graduate specializing in full-stack architecture, cross-platform mobile engineering, and autonomous AI systems. Dedicated to delivering production-ready digital products with high performance and clean design.
            </p>
            <p className="font-['Inter',sans-serif] text-xs sm:text-sm md:text-base xl:text-lg 2xl:text-xl text-[#8a8a93] leading-relaxed">Committed to delivering clean code and scalable architectures through disciplined problem solving and technical mastery across web, mobile, and AI platforms.</p>
          </div>

          {/* Attributes */}
          <div className="space-y-2.5 sm:space-y-3 xl:space-y-4 2xl:space-y-5">
            <div className="flex items-center gap-4">
              <p className="font-['Cinzel',serif] tracking-[0.4em] uppercase text-[10.5px] sm:text-[11px] md:text-xs xl:text-sm 2xl:text-base text-[#71717a]">Attributes</p>
              <div className="flex-1 h-px bg-[#1e1e24]" />
            </div>
            <div className="space-y-2 sm:space-y-2.5 xl:space-y-3.5 2xl:space-y-4">
              {ATTRIBUTES.map((attr, i) => (
                <StatBar
                  key={attr.label}
                  {...attr}
                  delay={0.3 + i * 0.1}
                  isHovered={hoveredAttr === i}
                  onHover={(hovered) => setHoveredAttr(hovered ? i : null)}
                />
              ))}
            </div>
          </div>

          {/* Education & Experience — Responsive Timeline */}
          <div className="space-y-2.5 sm:space-y-3 xl:space-y-4 2xl:space-y-5 pt-1">
            <div className="flex items-center gap-4">
              <p className="font-['Cinzel',serif] tracking-[0.4em] uppercase text-[10px] sm:text-[10.5px] md:text-xs xl:text-sm 2xl:text-base text-[#71717a]">Experience & Education</p>
              <div className="flex-1 h-px bg-[#1e1e24]" />
            </div>

            <div className="relative pt-1 px-1 pb-1">
              {/* Horizontal connector line — visible on sm and up */}
              <div className="hidden sm:block absolute top-[14px] xl:top-[16px] 2xl:top-[20px] left-3 right-3 h-px bg-[#22222a] z-0" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-3 xl:gap-5 2xl:gap-8 relative z-10">
                {TIMELINE.map((entry, idx) => (
                  <div key={idx} className="group border-l border-[#22222a] sm:border-l-0 pl-3 sm:pl-0 sm:pt-0.5">
                    {/* Diamond node on line — visible on sm and up */}
                    <div className="hidden sm:flex items-center mb-2 xl:mb-3 2xl:mb-4 pl-0.5">
                      <div className="w-[8px] h-[8px] xl:w-[10px] xl:h-[10px] 2xl:w-[12px] 2xl:h-[12px] rotate-45 border border-[#4a4a58] bg-[#0a0a0c] group-hover:border-[#a1a1aa] group-hover:bg-[#16161c] transition-all duration-200 z-10 shadow-[0_0_8px_rgba(0,0,0,0.8)]" />
                    </div>
                    {/* Entry details */}
                    <div className="space-y-0.5 xl:space-y-1">
                      <p className="font-['Inter',sans-serif] text-[8.5px] sm:text-[9px] xl:text-[10.5px] 2xl:text-xs tracking-[0.18em] text-[#8a8a93] uppercase">{entry.year}</p>
                      <h4 className="font-['Cinzel',serif] text-[10.5px] sm:text-[11.5px] xl:text-sm 2xl:text-base tracking-wide text-[#e8e6e3] group-hover:text-white transition-colors duration-200 leading-snug font-medium">{entry.title}</h4>
                      <p className="font-['Inter',sans-serif] text-[10px] sm:text-[11px] xl:text-xs 2xl:text-sm text-[#a1a1aa] leading-snug">{entry.org}</p>
                      <p className="font-['Inter',sans-serif] text-[8.5px] sm:text-[9px] xl:text-[10px] 2xl:text-xs tracking-wide text-[#71717a] italic leading-relaxed">{entry.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
