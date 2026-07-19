import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { SkillTrees } from "./components/SkillTrees";
import { ProjectLogs } from "./components/QuestLog";
import { Footer } from "./components/Footer";
import "../styles/fonts.css";

export default function App() {
  return (
    <div className="h-dvh w-full max-w-full bg-[#0a0a0c] text-[#e8e6e3] font-['Inter',sans-serif] selection:bg-[#333] selection:text-[#e8e6e3] scroll-smooth overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-py-0">
      <Hero />
      <About />
      <SkillTrees />
      <ProjectLogs />
      <Footer />
    </div>
  );
}
