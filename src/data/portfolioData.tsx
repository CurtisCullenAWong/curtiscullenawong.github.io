import { Github, Linkedin, Mail, Phone, FileText } from "lucide-react";

// ==========================================
// ABOUT COMPONENT DATA
// ==========================================

export const ATTRIBUTES = [
  { label: "Frontend Mastery", value: 92, glyph: "I" },
  { label: "Backend Design", value: 78, glyph: "II" },
  { label: "Mobile Craft", value: 72, glyph: "III" },
  { label: "UI / UX Sensibility", value: 86, glyph: "IV" },
  { label: "Agentic AI", value: 68, glyph: "V" },
];

export const VITALS = [
  { label: "Years Active", value: "5+" },
  { label: "Projects Shipped", value: "8+" },
  { label: "Technologies", value: "20+" },
  { label: "Origin", value: "Parañaque" },
];

export const TIMELINE = [
  {
    year: "2026",
    title: "Full-Stack Developer Intern",
    org: "Boss Cargo Express Freight Services Inc.",
    note: "Las Piñas, Philippines",
  },
  {
    year: "2022 — 2026",
    title: "BS Information Technology",
    org: "National University – Mall of Asia",
    note: "Mobile & Web Applications · Magna Cum Laude · Dean's Lister",
  },
  {
    year: "2016 — 2022",
    title: "Secondary Education",
    org: "Camarines Norte Chung Hua High School",
    note: "Daet, Camarines Norte",
  },
  {
    year: "2010 — 2016",
    title: "Primary Education",
    org: "Pasay Chung Hua Academy",
    note: "Pasay City, Philippines",
  },
];

// ==========================================
// PROJECTS COMPONENT DATA
// ==========================================

export const PROJECTS_CONFIDENTIALITY_NOTICE =
  "All project live demos attached are static builds stripped of authentication and backend databases, and are deployed via GitHub Pages for confidentiality.";

export const projects = [
  {
    title: "Vista AIMS",
    subtitle: "Asset & Inventory Management System",
    description: "Developed a cross-platform app for real-time inventory management of assets and consumables, built during the Boss Cargo Express internship.",
    tags: ["React Native", "Expo", "Supabase"],
    status: "Shipped",
    url: "https://curtiscullenawong.github.io/asset-consumable-inventory/",
    liveUrl: "https://curtiscullenawong.github.io/asset-consumable-inventory/",
    preview: "https://images.unsplash.com/photo-1597407068889-782ba11fb621?w=1200&h=800&fit=crop&auto=format",
  },
  {
    title: "Rate Matrix",
    subtitle: "Logistics Pricing Platform",
    description: "Developed an audit-ready logistics platform for managing complex shipping rates and client metrics, enabling structured rate management across carriers.",
    tags: ["React.js", "Laravel"],
    status: "Shipped",
    url: "#",
    preview: "https://images.unsplash.com/photo-1780764818910-80526d8aeb6d?w=1200&h=800&fit=crop&auto=format",
  },
  {
    title: "BCE Corporate Website",
    subtitle: "Full-Stack Web App & ATS",
    description: "Engineered a real-time corporate web app and ATS featuring interactive map components, traffic analytics, and a trained AI chatbot with LLM/cloud fallback and custom TTS voice integration.",
    tags: ["Next.js", "Supabase", "Ollama", "Kokoro TTS"],
    status: "Shipped",
    url: "#",
    preview: "https://images.unsplash.com/photo-1475139441338-693e7dbe20b6?w=1200&h=800&fit=crop&auto=format",
  },
  {
    title: "EasyTrack",
    subtitle: "Real-Time Delivery & Booking App",
    description: "Led development of a mobile and web application for real-time messaging, delivery tracking, luggage booking, and AI analytics — built for EGC-GHE and AirAsia as a thesis project.",
    tags: ["React Native", "Flutter", "Supabase", "Google Cloud"],
    status: "Shipped",
    url: "#",
    preview: "https://images.unsplash.com/photo-1429305336325-b84ace7eba3b?w=1200&h=800&fit=crop&auto=format",
  },
  {
    title: "Still Cafè POS",
    subtitle: "Point-of-Sale & Inventory App",
    description: "Built a reliable and practical point-of-sale and inventory management application designed specifically for boutique coffee shops and small cafes.",
    tags: ["React Native", "Expo", "SQLite"],
    status: "Shipped",
    url: "#",
    preview: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=800&fit=crop&auto=format",
  },
  {
    title: "GeoDetect",
    subtitle: "AI Geographical Analysis App",
    description: "Developed a cross-platform mobile application providing in-depth, structured AI analysis of a user's current geographical coordinates.",
    tags: ["Flutter", "Google Maps API"],
    status: "Shipped",
    url: "#",
    preview: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=800&fit=crop&auto=format",
  },
  {
    title: "Detailed Spotify Playlists",
    subtitle: "Power-User Music Library Manager",
    description: "A personal, power-user workspace to organize, sort, group, and clean up your Spotify music library. Analyzes song metadata and audio features to help users restructure their library.",
    tags: ["React", "Spotify Web API"],
    status: "In Progress",
    url: "#",
    preview: "https://images.unsplash.com/photo-1655058402270-de7dd5838ed5?w=1200&h=800&fit=crop&auto=format",
  },
  {
    title: "Computer Toolkit",
    subtitle: "Windows Utility Desktop App",
    description: "Orchestrated a desktop app meant to simplify useful system tasks and provide tools for Windows.",
    tags: ["React", "Tauri", "Rust"],
    status: "In Progress",
    url: "#",
    preview: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=1200&h=800&fit=crop&auto=format",
  },
];

// ==========================================
// SKILLS COMPONENT DATA
// ==========================================

export type Perk = {
  name: string;
  desc: string;
  x: number;
  y: number;
  major?: boolean;
  icon: string;
};

export type Constellation = {
  category: string;
  subtitle: string;
  perks: Perk[];
  edges: [number, number][];
};

export const constellations: Constellation[] = [
  {
    category: "The Architect",
    subtitle: "Frameworks",
    perks: [
      { name: "React.js", desc: "A component-based JavaScript library for building interactive user interfaces.", x: 50, y: 50, major: true, icon: "simple-icons:react" },
      { name: "Next.js", desc: "A production-ready React framework for server-side rendering and edge routing.", x: 50, y: 8, icon: "simple-icons:nextdotjs" },
      { name: "React Native", desc: "A cross-platform mobile framework for building native applications using React.", x: 84, y: 29, icon: "simple-icons:react" },
      { name: "Flutter", desc: "Google's open-source UI toolkit for building natively compiled multi-platform applications.", x: 84, y: 71, icon: "simple-icons:flutter" },
      { name: "Tauri", desc: "A framework for building lightweight, secure desktop apps using web tech and Rust.", x: 50, y: 92, icon: "simple-icons:tauri" },
      { name: "Tailwind CSS", desc: "A utility-first CSS framework designed for rapid and customizable user interface styling.", x: 16, y: 71, icon: "simple-icons:tailwindcss" },
      { name: "Laravel", desc: "A PHP web application framework with expressive, elegant MVC-based architecture.", x: 16, y: 29, icon: "simple-icons:laravel" },
    ],
    edges: [
      [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1],
      [0, 1], [0, 3], [0, 5],
    ],
  },
  {
    category: "The Scholar",
    subtitle: "Languages",
    perks: [
      { name: "JavaScript", desc: "The core dynamic scripting language of the web powering client and server development.", x: 18, y: 22, icon: "simple-icons:javascript" },
      { name: "HTML5", desc: "The standard markup language specifying the structure and layout of web pages.", x: 6, y: 50, major: true, icon: "simple-icons:html5" },
      { name: "CSS3", desc: "The design language used to style layouts and build responsive visual interfaces.", x: 18, y: 78, icon: "simple-icons:css" },
      { name: "TypeScript", desc: "A strongly typed superset of JavaScript adding compile-time safety and structure.", x: 38, y: 82, icon: "simple-icons:typescript" },
      { name: "Dart", desc: "A client-optimized, object-oriented language optimized for fast multi-platform Flutter apps.", x: 62, y: 18, icon: "simple-icons:dart" },
      { name: "SQL", desc: "The standard domain-specific language for managing and querying relational databases.", x: 82, y: 22, icon: "simple-icons:sqlite" },
      { name: "PHP", desc: "A versatile server-side scripting language popular for web backends and templating.", x: 94, y: 50, major: true, icon: "simple-icons:php" },
      { name: "Python", desc: "A general-purpose programming language popular for clean syntax, automation, and AI.", x: 82, y: 78, icon: "simple-icons:python" },
      { name: "Java", desc: "A robust, object-oriented programming language designed for platform-independent applications.", x: 42, y: 50, icon: "ri:java-fill" },
      { name: "Rust", desc: "A modern systems programming language focused on memory safety, concurrency, and performance.", x: 58, y: 50, icon: "simple-icons:rust" },
    ],
    edges: [
      [0, 1], [1, 2],
      [3, 4],
      [5, 6], [6, 7],
      [2, 3], [4, 5],
      [1, 8], [8, 9], [9, 6],
    ],
  },
  {
    category: "The Sentinel",
    subtitle: "Cloud & Databases",
    perks: [
      { name: "Firebase", desc: "A backend platform providing realtime databases, user authentication, and hosting solutions.", x: 50, y: 10, major: true, icon: "simple-icons:firebase" },
      { name: "MongoDB", desc: "A popular schema-free NoSQL document database optimized for scalability and flexibility.", x: 22, y: 26, icon: "simple-icons:mongodb" },
      { name: "MySQL", desc: "An open-source relational database management system using structured query language.", x: 78, y: 26, icon: "simple-icons:mysql" },
      { name: "Docker", desc: "A platform used to deploy, configure, and isolate web applications inside lightweight containers.", x: 12, y: 54, icon: "simple-icons:docker" },
      { name: "Google Cloud", desc: "A suite of modular cloud computing, hosting, container registry, and data analytics services.", x: 88, y: 54, icon: "simple-icons:googlecloud" },
      { name: "Supabase", desc: "An open-source Firebase alternative providing a postgres database, auth, and auto-generated APIs.", x: 30, y: 78, icon: "simple-icons:supabase" },
      { name: "Vercel", desc: "A cloud platform optimized for deploying modern frontend applications and serverless endpoints.", x: 70, y: 78, icon: "simple-icons:vercel" },
    ],
    edges: [
      [0, 1], [0, 2],
      [1, 3], [2, 4],
      [3, 5], [4, 6],
      [5, 6],
      [1, 2],
    ],
  },
  {
    category: "The Artificer",
    subtitle: "Developer Tools",
    perks: [
      { name: "Git / GitHub", desc: "The standard distributed version control workflow and web-based code collaboration platform.", x: 50, y: 8, major: true, icon: "simple-icons:github" },
      { name: "VS Code", desc: "A lightweight, powerful, and highly extensible code editor developed by Microsoft.", x: 82, y: 20, icon: "simple-icons:visualstudiocode" },
      { name: "Android Studio", desc: "The official Integrated Development Environment specifically tailored for Android development.", x: 92, y: 50, icon: "simple-icons:androidstudio" },
      { name: "NetBeans", desc: "An open-source extensible development framework and IDE primarily built for Java application suites.", x: 82, y: 80, icon: "simple-icons:apachenetbeanside" },
      { name: "XAMPP", desc: "An easy-to-install local server distribution combining Apache, MariaDB, PHP, and Perl packages.", x: 50, y: 92, icon: "simple-icons:xampp" },
      { name: "Agentic AI Workflows", desc: "The design of autonomous, goal-oriented AI agent systems using large language models.", x: 18, y: 80, icon: "simple-icons:openai" },
      { name: "Figma", desc: "A collaborative web-based prototyping and interface design application for UX/UI designers.", x: 8, y: 50, icon: "simple-icons:figma" },
      { name: "Adobe Suite", desc: "A suite of professional creative software for graphic design, asset editing, and animation workflows.", x: 18, y: 20, icon: "simple-icons:adobe" },
    ],
    edges: [
      [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
      [0, 2], [2, 4], [4, 6], [6, 0],
    ],
  },
];

// ==========================================
// FOOTER COMPONENT DATA
// ==========================================

export const DEEDS = [
  {
    name: "GitHub Profile",
    role: "Repositories",
    desc: "Examine code repositories containing open-source contributions, tools, and components.",
    url: "https://github.com/CurtisCullenAWong",
    icon: <Github size={18} className="text-[#9a9aa8]" />,
    copyValue: null,
  },
  {
    name: "LinkedIn Profile",
    role: "Network",
    desc: "Connect with the developer to collaborate on projects or discuss employment opportunities.",
    url: "https://www.linkedin.com/in/curtis-cullen-wong-3a9434367",
    icon: <Linkedin size={18} className="text-[#9a9aa8]" />,
    copyValue: null,
  },
  {
    name: "curtiscullenagustinwong@gmail.com",
    role: "Email Direct",
    desc: "Send a direct email inquiry regarding business partnerships or hiring questions.",
    url: "mailto:curtiscullenagustinwong@gmail.com",
    icon: <Mail size={18} className="text-[#9a9aa8]" />,
    copyValue: "curtiscullenagustinwong@gmail.com",
  },
  {
    name: "+63 999-488-5479",
    role: "Phone / Mobile",
    desc: "Reach out via mobile for time-sensitive inquiries or direct conversation.",
    url: "tel:+639994885479",
    icon: <Phone size={18} className="text-[#9a9aa8]" />,
    copyValue: "+639994885479",
  },
];

export const TOMES = [
  {
    name: "Professional Resume",
    type: "Curriculum Vitae",
    desc: "A comprehensive document outlining work history, technical stack, and education details.",
    url: "#",
    icon: <FileText size={18} className="text-[#9a9aa8]" />,
    action: "Open Resume (PDF)"
  },
  {
    name: "Portfolio Source Code",
    type: "Repository",
    desc: "Inspect the layout files, styling configurations, and animations that constitute this portfolio website.",
    url: "https://github.com/CurtisCullenAWong/curtiscullenawong.github.io",
    icon: <Github size={18} className="text-[#9a9aa8]" />,
    action: "View on GitHub"
  }
];
