/**
 * ============================================================================
 * 📁 PUSAT DATA PORTFOLIO - VEINE STUDIO (src/data/portfolio.ts)
 * ============================================================================
 *
 * Cara menambah atau mengubah portfolio:
 * 1. Cukup tambahkan objek baru ke dalam array `PROJECTS` di bawah ini.
 * 2. Soal Gambar (`imageUrl`):
 *    - AMAN DARI RUSAK LAYOUT: Bingkai gambar sudah dikunci ukurannya oleh
 *      komponen `ProjectMediaFrame`.
 *    - Untuk screenshot Web/Game melebar, gunakan `imageFit: "landscape"`.
 *    - Untuk screenshot aplikasi HP memanjang ke atas (9:16), gunakan
 *      `imageFit: "portrait"` — gambar akan otomatis dimasukkan ke bingkai HP
 *      dengan background blur estetik tanpa merusak tinggi kartu!
 *    - Jika `imageUrl` DIKOSONGKAN (tidak diisi), kartu otomatis menampilkan
 *      Visual Mockup interaktif sesuai kategorinya!
 */

export type ProjectCategory =
  | "Game Dev"
  | "Mobile App"
  | "Web App"
  | "Creative Lab"
  | "Backend & API";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  year: string;
  status: "Released" | "In Development" | "Prototype" | "Production";
  featured?: boolean;
  /** Ukuran card di Bento Grid: 'large' (7 kolom) atau 'normal' (5 kolom) */
  bentoSize?: "large" | "normal";
  description: string;
  longDescription: string;
  highlights: string[];
  techStack: string[];
  role: string;
  /** Warna gradien/aksen visual (menyesuaikan palet Veine) */
  accentTone: "teal" | "aqua" | "navy" | "ice";
  /**
   * Path gambar di folder public/ (contoh: "/projects/nama-gambar.png").
   * OPSIONAL: Jika dikosongkan, otomatis menampilkan mockup visual kategori!
   */
  imageUrl?: string;
  /**
   * Mode penyesuaian gambar anti-rusak layout:
   * - 'landscape': Screenshot melebar (Web / Game)
   * - 'portrait': Screenshot memanjang (Mobile App HP) -> dibungkus bingkai HP!
   * - 'blueprint': Diagram arsitektur / terminal Backend
   */
  imageFit?: "landscape" | "portrait" | "blueprint";
  links: {
    live?: string;
    repo?: string;
    play?: string;
  };
}

export interface QuestLogItem {
  year: string;
  title: string;
  organization: string;
  type: "Main Quest" | "Side Quest" | "Milestone" | "Main Job";
  description: string;
  skills: string[];
}

export const SITE_PROFILE = {
  brandName: "VEINE STUDIO",
  alias: "VEINE",
  tagline: "Game Crafter • Full-Stack Web (FE/BE) • Mobile Engineer",
  heroHeadline: ["CRAFTING", "PLAYABLE WORLDS", "& SCALABLE", "SYSTEMS."],
  shortBio:
    "Berawal dari visi membangun studio game independen, Veine Studio kini menjadi identitas kreatif sekaligus laboratorium digital saya dalam merancang Game, Aplikasi Mobile, Web Frontend interaktif, hingga arsitektur Backend yang tangguh.",
  storyParagraphs: [
    "Veine Studio lahir dari kecintaan terhadap dunia video game—membongkar bagaimana mekanik, visual, dan kode berpadu menciptakan pengalaman yang hidup.",
    "Seiring berkembangnya perjalanan karier saya di dunia rekayasa perangkat lunak, Veine Studio berevolusi menjadi identitas personal (alter-ego kreatif) yang menyatukan empat disiplin utama saya: Game Development, Mobile App Development, Web Frontend, dan Backend Engineering.",
    "Keunggulan memiliki latar belakang gabungan ini adalah cara pandang yang utuh: saya bisa merancang UI/UX sehalus frame-rate game di Web & Mobile, sekaligus membangun pondasi API, database, dan arsitektur server yang kokoh di balik layar.",
  ],
  location: "Indonesia (UTC+7)",
  availability: "Open for Full-Stack, Mobile, Game Dev & Creative Collabs",
  email: "veinestudio@gmail.com",
  playerStats: {
    level: "LVL. 25",
    classType: "Full-Stack (FE/BE) × Mobile × Game Dev",
    mana: "99% Caffeinated",
    currentFocus: "Games, Cross-Platform Mobile & Scalable Web Systems",
  },
  socials: [
    { label: "GitHub", handle: "@veinestudio", url: "https://github.com/kiokyky" },
    { label: "Itch.io", handle: "veinestudio.itch.io", url: "https://itch.io/profile/veinestudio" },
    { label: "Instagram", handle: "@veine.studio", url: "https://instagram.com/" },
    { label: "LinkedIn", handle: "Veine Studio", url: "https://www.linkedin.com/company/veine-game-studio/home/" },
  ],
};

export const SKILL_ARSENAL = [
  {
    category: "Web Frontend",
    tag: "FRONTEND_UI",
    items: [
      "Next.js & React",
      "TypeScript / JavaScript",
      "Tailwind & Vanilla CSS",
      "State Management",
      "Interactive Motion UI",
      "Responsive Bento UI",
    ],
  },
  {
    category: "Backend & Cloud",
    tag: "BACKEND_API",
    items: [
      "Go (Golang) / Gin",
      "Node.js / Express / NestJS",
      "C++ & Python (High Perf)",
      "PostgreSQL / MySQL / Redis",
      "Docker & Microservices",
      "AWS (Amplify & EC2)",
    ],
  },
  {
    category: "Mobile Dev",
    tag: "MOBILE_APP",
    items: [
      "React Native / Expo",
      "Flutter / Dart",
      "Android & iOS Deployment",
      "Offline-First Sync",
      "Push Notifications",
      "Mobile UI/UX Animations",
    ],
  },
  {
    category: "Game Dev",
    tag: "GAME_ENGINE",
    items: [
      "Unity / C#",
      "Godot Engine / GDScript",
      "Gameplay & Combat Systems",
      "2D/3D Level Design",
      "Custom Shaders & VFX",
      "Game Feel & Balancing",
    ],
  },
];

/**
 * DAFTAR PROJECT PORTFOLIO
 * Perhatikan bagaimana `imageUrl` dan `imageFit` bekerja:
 * - Project 1 memakai gambar `landscape` (/projects/abyssal-echo-preview.svg)
 * - Project 2 memakai gambar `portrait` HP (/projects/pulsefit-mobile-preview.svg) -> otomatis masuk bingkai HP!
 * - Project 3 & 4 dikosongkan `imageUrl`-nya -> otomatis merender Blueprint / UI Mockup tanpa merusak layout!
 */
export const PROJECTS: ProjectItem[] = [
  {
    id: "go-cuan",
    title: "GO CUAN // MONEY MANAGEMENT",
    subtitle: "Simple Expense & Income Tracker",
    category: "Web App",
    year: "2026",
    status: "Released",
    featured: true,
    bentoSize: "large",
    accentTone: "aqua",
    imageUrl: "/projects/gocuan.png",
    imageFit: "landscape",
    role: "Fullstack Developer",
    description:
      "Aplikasi pencatat keuangan personal berbasis web dengan sentuhan modern untuk anak muda anti boncos.",
    longDescription:
      "Go Cuan didesain untuk anak muda yang ingin melek finansial tanpa ribet. Dibangun dengan arsitektur full-stack modern, frontend ReactJS memberikan pengalaman UI/UX yang super smooth dan responsif, sementara backend Go (Golang) di dalam Docker mengamankan performa tinggi dengan latensi super rendah di AWS EC2.",
    highlights: [
      "Performa backend Go berkecepatan tinggi dengan manajemen state frontend berbasis React yang reaktif",
      "Sistem keamanan andal menggunakan JWT authentication dan proteksi data finansial yang aman",
      "Infrastruktur cloud mandiri di AWS (Amplify + EC2 VPS) dengan custom domain profesional veinestudio.my.id",
    ],
    techStack: ["Go/Gin", "TypeScript", "PostgreSQL", "Docker", "AWS", "React"],
    links: {
      live: "https://gocuan.veinestudio.my.id/",
      repo: "https://github.com/kiokyky/MnyMngmnt-React",
    },
  },
  {
    id: "abyssal-echo",
    title: "ABYSSAL ECHO // 01",
    subtitle: "Atmospheric Sci-Fi Action Roguelite",
    category: "Game Dev",
    year: "2026",
    status: "In Development",
    featured: true,
    bentoSize: "large",
    accentTone: "aqua",
    imageUrl: "/projects/abyssal-echo-preview.svg",
    imageFit: "landscape",
    role: "Solo Game Developer & Designer",
    description:
      "Game action-roguelite berlatar palung samudra sibernetik dengan mekanik sonar-combat dan pencahayaan bioluminescent dinamis.",
    longDescription:
      "Abyssal Echo adalah proyek game unggulan Veine Studio yang menggabungkan atmosfer misterius bawah laut dengan pertarungan cepat ala roguelite modern. Pemain mengendalikan unit penyelam otonom yang menggunakan gelombang akustik (sonar) untuk memetakan ruangan gelap sekaligus memantulkan serangan musuh.",
    highlights: [
      "Sistem pencahayaan 2D/2.5D custom shader dengan palet bioluminescent (#011427 ke #BAE5E9)",
      "Procedural dungeon generation dengan lebih dari 40 variasi ruangan modular",
      "Sistem combat berbasis ritme sonar & dash-canceling yang responsif (60+ FPS)",
    ],
    techStack: ["Godot 4", "GDScript", "Custom Shaders", "Aseprite", "FMOD Audio"],
    links: {
      play: "https://itch.io",
      repo: "https://github.com",
    },
  },
  {
    id: "veine-pay-mobile",
    title: "VEINE PULSE // MOBILE",
    subtitle: "Offline-First Fintech & Go Cuan Mobile Companion",
    category: "Mobile App",
    year: "2026",
    status: "In Development",
    featured: true,
    bentoSize: "normal",
    accentTone: "teal",
    imageUrl: "/projects/pulsefit-mobile-preview.svg",
    imageFit: "portrait",
    role: "Mobile & Full-Stack Engineer",
    description:
      "Aplikasi mobile pendamping ekosistem Go Cuan berbasis React Native (Expo) dengan arsitektur Offline-First SQLite, Biometric Vault, dan sinkronisasi cepat ke backend Go/Gin.",
    longDescription:
      "Veine Pulse adalah evolusi mobile dari ekosistem manajemen keuangan Go Cuan. Dirancang dengan pendekatan Offline-First menggunakan SQLite lokal sehingga pengguna tetap bisa mencatat pemasukan & pengeluaran secara instan meski tanpa sinyal internet, lalu otomatis melakukan sinkronisasi antrean (queue sync) ke server Go/Gin di AWS EC2 saat kembali online.",
    highlights: [
      "Offline-First Sync Engine dengan SQLite lokal & antrean sinkronisasi otomatis ke REST API Go/Gin",
      "Keamanan Biometric Vault (FaceID / Fingerprint via Expo LocalAuthentication) & penyimpanan JWT terenkripsi",
      "Indikator visual 'Financial Pulse HUD' 60 FPS dengan palet warna khas Veine Studio",
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Go/Gin API", "SQLite Sync", "Biometric Auth"],
    links: {
      repo: "https://github.com/kiokyky",
    },
  },
  {
    id: "nexus-core-backend",
    title: "NEXUS CORE // ENGINE API",
    subtitle: "High-Throughput Backend & Realtime Sync Server",
    category: "Backend & API",
    year: "2025",
    status: "Production",
    featured: true,
    bentoSize: "normal",
    accentTone: "navy",
    imageFit: "blueprint",
    role: "Backend & Systems Architect",
    description:
      "Layanan backend microservice dan API Gateway berkapasitas tinggi untuk menangani autentikasi, webhook, dan sinkronisasi state real-time.",
    longDescription:
      "Tidak semua proyek backend memiliki screenshot halaman web—karena itu proyek ini mendemonstrasikan fitur Auto-Blueprint Mockup pada portfolio Veine Studio. Di balik layar, Nexus Core menangani ribuan request per detik dengan caching terdistribusi.",
    highlights: [
      "Rata-rata latensi respons di bawah 15ms menggunakan strategi caching Redis berlapis",
      "Sistem Rate-Limiting, RBAC (Role-Based Access Control), dan rotasi JWT otomatis",
      "Terintegrasi penuh dengan pipeline CI/CD dan containerization Docker",
    ],
    techStack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Docker", "AWS"],
    links: {
      repo: "https://github.com",
    },
  },
  {
    id: "veine-os-web",
    title: "VEINE // NEXUS HUB",
    subtitle: "Interactive Bento Identity & Studio Portal",
    category: "Web App",
    year: "2026",
    status: "Released",
    featured: true,
    bentoSize: "large",
    accentTone: "ice",
    imageFit: "landscape",
    imageUrl: "/projects/nexushub.png",
    role: "Frontend Architect & Creative Dev",
    description:
      "Website portfolio berkonsep Gen Z Bento Grid & Kinetic Typography yang memadukan identitas Full-Stack, Mobile, dan Game Studio.",
    longDescription:
      "Dirancang khusus dengan arsitektur Static Export di Next.js agar super ringan dan siap di-deploy ke AWS Amplify. Dilengkapi sistem bingkai media anti-rusak (Aspect-Ratio Locked Frame) sehingga aman untuk gambar landscape, portrait HP, maupun tanpa gambar.",
    highlights: [
      "Komponen ProjectMediaFrame pintar yang mengunci proporsi gambar agar layout selalu rapi",
      "Kombinasi Tailwind CSS dan Vanilla CSS untuk efek glassmorphism & mouse spotlight",
      "Mini-game arcade interaktif langsung di dalam Bento Grid",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vanilla CSS", "AWS Amplify"],
    links: {
      live: "#",
      repo: "https://github.com/kiokyky/veinestudio",
    },
  },
];

export const QUEST_LOG: QuestLogItem[] = [
  {
    year: "2025 — PRESENT",
    title: "Founder & Multi-Disciplinary Creator @ Veine Studio",
    organization: "Personal Identity & Indie Lab",
    type: "Main Quest",
    description:
      "Menyatukan keahlian Game Development, Mobile App, Web Frontend, dan Backend Engineering di bawah satu identitas kreatif 'Veine Studio'.",
    skills: ["Game Dev", "Mobile App", "Full-Stack Web", "System Architecture"],
  },
  {
    year: "2025 - PRESENT",
    title: "Software Engineer",
    organization: "PT Talangmas Anugerah Semesta",
    type: "Main Job",
    description:
      "Seorang Software Engineer berpengalaman di PT Talangmas Anugerah Semesta yang berfokus pada pengembangan aplikasi lintas platform (mobile dan web). Memiliki keahlian mendalam dalam membangun arsitektur backend & microservice. Membangun high scalability dan high performance dengan c++, redis, postgresql, docker untuk kebutuhan live monitoring FACE RECOGNITION",
    skills: ["C++", "Python", "Docker", "PostgreSQL", "Redis"],
  },
  {
    year: "2024 — 2025",
    title: "Indie Game Crafter & Gameplay Programmer",
    organization: "Insys Lab",
    type: "Side Quest",
    description:
      "Merancang mekanik gameplay, shader visual, dan sistem fisika pada game bernama `Stranded: Acrhipelago Myths` di Unity yang menjadi cikal bakal lahirnya nama Veine Studio.",
    skills: ["Unity", "C#", "Interactive Design", "2D", "Pixel Art"],
  },
];
