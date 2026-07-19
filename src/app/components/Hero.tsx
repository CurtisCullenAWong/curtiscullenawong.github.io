import { motion } from "motion/react";
import { useMemo } from "react";
import { UniverseParallax } from "./UniverseParallax";
import meImg from "../../../assets/me.jpg";


const STARS = [
  { x: -140, y: -88, r: 0.8, o: 0.9 }, { x: 82, y: -155, r: 1.2, o: 0.7 },
  { x: 155, y: 40, r: 0.7, o: 0.8 }, { x: -60, y: 148, r: 1.0, o: 0.6 },
  { x: 120, y: 110, r: 0.9, o: 0.85 }, { x: -170, y: 30, r: 0.6, o: 0.5 },
  { x: 50, y: -170, r: 1.1, o: 0.75 }, { x: -110, y: 130, r: 0.8, o: 0.65 },
  { x: 165, y: -75, r: 0.7, o: 0.9 }, { x: -30, y: -165, r: 1.3, o: 0.55 },
  { x: -150, y: -50, r: 0.6, o: 0.8 }, { x: 95, y: 158, r: 0.9, o: 0.7 },
  { x: -88, y: -148, r: 1.0, o: 0.6 }, { x: 145, y: -110, r: 0.8, o: 0.75 },
  { x: -178, y: 80, r: 0.7, o: 0.5 }, { x: 48, y: 175, r: 1.1, o: 0.65 },
  { x: -125, y: 95, r: 0.6, o: 0.85 }, { x: 180, y: 15, r: 0.9, o: 0.7 },
  { x: 25, y: -178, r: 0.8, o: 0.55 }, { x: -165, y: -110, r: 1.0, o: 0.6 },
  { x: -55, y: -72, r: 0.7, o: 0.5 }, { x: 78, y: -45, r: 0.6, o: 0.6 },
  { x: 62, y: 80, r: 0.8, o: 0.45 }, { x: -80, y: 55, r: 0.7, o: 0.55 },
  { x: -35, y: 90, r: 0.5, o: 0.4 }, { x: 88, y: 30, r: 0.6, o: 0.5 },
];

function CosmicRune({ className }: { className?: string }) {
  const outerTicks = useMemo(() =>
    Array.from({ length: 48 }, (_, i) => {
      const a = (i * 7.5 * Math.PI) / 180;
      const major = i % 6 === 0;
      const minor = i % 3 === 0;
      const r1 = 192;
      const r2 = major ? 178 : minor ? 184 : 187;
      return { x1: Math.cos(a) * r1, y1: Math.sin(a) * r1, x2: Math.cos(a) * r2, y2: Math.sin(a) * r2, major };
    }), []);

  const midTicks = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => {
      const a = (i * 15 * Math.PI) / 180;
      const r1 = 138;
      const r2 = i % 3 === 0 ? 128 : 133;
      return { x1: Math.cos(a) * r1, y1: Math.sin(a) * r1, x2: Math.cos(a) * r2, y2: Math.sin(a) * r2 };
    }), []);

  const spokes = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg viewBox="-220 -220 440 440" className={className} aria-hidden>
      <defs>
        <radialGradient id="h-nebula-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1240" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#0d0d1a" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="h-nebula-teal" cx="70%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#0a2030" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="h-nebula-violet" cx="25%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#1a0d2e" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
        </radialGradient>
        <filter id="h-glow">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>

        {/* Clip path for embedded central portrait medallion (Large Scale) */}
        <clipPath id="hero-avatar-clip">
          <circle cx="0" cy="0" r="115" />
        </clipPath>
      </defs>

      <circle r="215" fill="url(#h-nebula-core)" />
      <circle r="215" fill="url(#h-nebula-teal)" />
      <circle r="215" fill="url(#h-nebula-violet)" />

      {STARS.map((s, i) => (
        <circle key={i} cx={s.x * 1.1} cy={s.y * 1.1} r={s.r} fill="#e8e6e3" opacity={s.o} filter="url(#h-glow)" />
      ))}

      {/* Outer ring — slow CW */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 90, repeat: Infinity, ease: "linear" }}>
        <circle r="192" fill="none" stroke="#252530" strokeWidth="0.6" />
        {outerTicks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
            stroke={t.major ? "#3a3a48" : "#252530"} strokeWidth={t.major ? 1 : 0.5} />
        ))}
        {[0, 90, 180, 270].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const cx = Math.cos(a) * 192, cy = Math.sin(a) * 192;
          return <polygon key={deg} points={`${cx},${cy - 4} ${cx + 3},${cy} ${cx},${cy + 4} ${cx - 3},${cy}`} fill="#3a3a48" />;
        })}
      </motion.g>

      {/* Mid ring — slow CCW */}
      <motion.g animate={{ rotate: -360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
        <circle r="138" fill="none" stroke="#20202a" strokeWidth="0.5" />
        {midTicks.map((t, i) => (
          <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} stroke="#2e2e3a" strokeWidth="0.5" />
        ))}
        {[45, 135, 225, 315].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const cx = Math.cos(a) * 138, cy = Math.sin(a) * 138;
          return <rect key={deg} x={cx - 2} y={cy - 2} width="4" height="4" fill="#282838" transform={`rotate(45 ${cx} ${cy})`} />;
        })}
      </motion.g>

      {/* Spokes — radiating cleanly from medallion */}
      {spokes.map((deg) => {
        const a = (deg * Math.PI) / 180;
        return <line key={deg} x1={Math.cos(a) * 118} y1={Math.sin(a) * 118} x2={Math.cos(a) * 192} y2={Math.sin(a) * 192} stroke="#1c1c26" strokeWidth="0.5" />;
      })}

      {/* Inner compass rose — very slow CW */}
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }}>
        {[0, 90, 180, 270].map((deg) => {
          const a = (deg * Math.PI) / 180;
          const tip = 135, base = 118, hw = 4;
          const tx = Math.cos(a) * tip, ty = Math.sin(a) * tip;
          const lx = Math.cos(a - Math.PI / 2) * hw, ly = Math.sin(a - Math.PI / 2) * hw;
          const rx = -lx, ry = -ly;
          const bx = Math.cos(a) * base, by = Math.sin(a) * base;
          return <path key={deg}
            d={`M ${lx} ${ly} Q ${bx + lx * 0.4} ${by + ly * 0.4} ${tx} ${ty} Q ${bx + rx * 0.4} ${by + ry * 0.4} ${rx} ${ry} Z`}
            fill="none" stroke="#30304030" strokeWidth="0.7" />;
        })}
      </motion.g>

      {/* Embedded Central Portrait Medallion (Large Scale) */}
      <g>
        <circle r="118" fill="#0a0a0c" stroke="#3a3a4a" strokeWidth="1.5" />
        <image
          href={meImg}
          x="-115"
          y="-115"
          width="230"
          height="230"
          clipPath="url(#hero-avatar-clip)"
          preserveAspectRatio="xMidYMin slice"
          opacity="0.94"
        />
        {/* Dark metallic vignette overlay */}
        <circle r="115" fill="url(#h-nebula-core)" opacity="0.1" />
        <circle r="115" fill="none" stroke="#5a5a6c" strokeWidth="1.2" opacity="0.85" />
        <circle r="118" fill="none" stroke="#2a2a38" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section id="hero" className="relative min-h-dvh lg:h-dvh flex flex-col items-center justify-center overflow-hidden border-b border-[#1a1a1e] lg:snap-start">
      {/* Milky Way background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <UniverseParallax />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0c]/75 via-[#0a0a0c]/45 to-[#0a0a0c] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-transparent to-[#0a0a0c]/55 pointer-events-none" />
      </div>

      {/* Content grid */}
      <div className="relative z-10 w-full max-w-[1700px] mx-auto px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-[1fr_auto_1.1fr] items-center h-full py-12 md:py-20 lg:py-8 gap-8 lg:gap-0">

        {/* Left — Identity */}
        <div className="flex flex-col justify-center space-y-4 md:space-y-6 lg:pr-12">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-['Inter',sans-serif] text-[10px] md:text-xs text-[#71717a] tracking-[0.5em] uppercase"
          >
            Portfolio — MMXXVI
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          >
            <h1 className="font-['Cinzel',serif] leading-[1.05]">
              <span className="block text-[clamp(2.2rem,7vw,7.5rem)] text-[#e8e6e3] tracking-[0.1em]">CURTIS</span>
              <span className="block text-[clamp(0.95rem,2.4vw,2.8rem)] text-[#8a8a93] tracking-[0.4em] my-1">CULLEN A.</span>
              <span className="block text-[clamp(2.2rem,7vw,7.5rem)] text-[#e8e6e3] tracking-[0.1em]">WONG</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-px w-24 bg-gradient-to-r from-[#3a3a44] to-transparent origin-left"
          />

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65 }}
            className="space-y-4 max-w-sm"
          >
            <p className="font-['Inter',sans-serif] text-[clamp(0.85rem,1.4vh,1.05rem)] text-[#9ca3af] leading-relaxed font-light">
              Full-Stack Developer focused on building intuitive user interfaces and reliable backend systems that power scalable, efficient digital applications.
            </p>

            <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-['Inter',sans-serif] text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-[#6e6e78]">
              {["Frontend", "Backend", "Mobile", "Cloud"].map((s) => (
                <span key={s} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 rotate-45 bg-[#4b5563] inline-block" />
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="flex items-center gap-5 pt-2"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-5 group border border-[#2e2e38] px-7 py-3 text-[#8a8a93] hover:text-[#e8e6e3] hover:border-[#4b5563] transition-all duration-300 bg-[#0a0a0c]/60"
            >
              <span className="font-['Inter',sans-serif] text-[10px] md:text-xs tracking-[0.35em] uppercase">
                Project Logs
              </span>
              <div className="w-5 h-px bg-[#2e2e38] group-hover:w-8 group-hover:bg-[#4b5563] transition-all duration-300" />
            </a>
            <a
              href="#skills"
              className="font-['Inter',sans-serif] text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#8a8a93] hover:text-[#e8e6e3] transition-colors duration-300"
            >
              Skill Trees
            </a>
          </motion.div>
        </div>

        {/* Vertical divider */}
        <div className="hidden lg:block w-px h-2/3 self-center bg-gradient-to-b from-transparent via-[#1e1e24] to-transparent mx-6" />

        {/* Right — Cosmic Emblem with Central Medallion */}
        <div className="flex items-center justify-center h-full py-4 lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.4 }}
            className="relative w-[85vw] max-w-[400px] sm:max-w-[460px] lg:w-[500px] lg:max-w-[540px] xl:w-[580px] xl:max-w-[620px] aspect-square flex items-center justify-center shrink-0"
          >
            <CosmicRune className="w-full h-full" />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
