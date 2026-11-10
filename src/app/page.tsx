"use client";

import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  Sparkles,
  ArrowUpRight,
  Copy,
  Check,
  Terminal,
  Compass,
  Code2,
  Cpu,
  Globe,
  Swords,
  Mail,
  Layers,
  ChevronRight,
  Info,
} from "lucide-react";
import {
  SITE_PROFILE,
  SKILL_ARSENAL,
  PROJECTS,
  QUEST_LOG,
  type ProjectCategory,
  type ProjectItem,
} from "@/data/portfolio";
import ArcadeMiniWidget from "@/components/ArcadeMiniWidget";
import ProjectModal from "@/components/ProjectModal";
import ProjectMediaFrame from "@/components/ProjectMediaFrame";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | ProjectCategory
  >("All");
  const [activeSkillTab, setActiveSkillTab] = useState(0);
  const [identityMode, setIdentityMode] = useState<"persona" | "studio">(
    "persona"
  );
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [localTime, setLocalTime] = useState<string>("14:08:00");
  const [showDataGuide, setShowDataGuide] = useState(false);

  // Live clock for Game HUD vibe
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setLocalTime(
        now.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Mouse spotlight tracker for Bento Cards (Vanilla CSS variables)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const cards = e.currentTarget.querySelectorAll<HTMLElement>(".bento-card");
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2200);
  };

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  const categories: ("All" | ProjectCategory)[] = [
    "All",
    "Game Dev",
    "Mobile App",
    "Web App",
    "Backend & API",
  ];

  const paletteSwatches = [
    { name: "Midnight Navy", hex: "#011427", bg: "bg-[#011427]", text: "text-[#EFEFEF]" },
    { name: "Ocean Teal", hex: "#0E7E8E", bg: "bg-[#0E7E8E]", text: "text-[#EFEFEF]" },
    { name: "Ice Aqua", hex: "#BAE5E9", bg: "bg-[#BAE5E9]", text: "text-[#011427]" },
    { name: "Crisp Off-White", hex: "#EFEFEF", bg: "bg-[#EFEFEF]", text: "text-[#011427]" },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen flex flex-col justify-between relative selection:bg-veine-aqua selection:text-veine-navy"
    >
      {/* =====================================================================
       * 🧭 FLOATING HUD NAVBAR
       * ===================================================================== */}
      <header className="sticky top-4 z-40 px-4 sm:px-8 max-w-7xl mx-auto w-full">
        <nav className="bento-card px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 border-veine-aqua/25 shadow-lg">
          {/* Brand Logo */}
          <a
            href="#bento-hub"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-veine-teal flex items-center justify-center border border-veine-aqua/50 group-hover:bg-veine-aqua group-hover:text-veine-navy transition-colors">
              <Gamepad2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold tracking-tight text-base sm:text-lg text-veine-ice">
                  VEINE<span className="text-veine-aqua">.STUDIO</span>
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-veine-teal/30 border border-veine-aqua/30 text-veine-aqua">
                  <span className="w-1.5 h-1.5 rounded-full bg-veine-aqua animate-ping" />
                  ONLINE
                </span>
              </div>
              <p className="font-mono text-[10px] text-veine-aqua/70 hidden sm:block">
                IDENTITY // GAME DEV & WEB LAB
              </p>
            </div>
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 font-mono text-xs">
            {[
              { label: "01. HUB", href: "#bento-hub" },
              { label: "02. WORKS", href: "#works" },
              { label: "03. LORE", href: "#lore" },
              { label: "04. QUESTS", href: "#quest-log" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 rounded-xl text-veine-ice/80 hover:text-veine-aqua hover:bg-veine-teal/20 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action */}
          <div className="flex items-center gap-2.5">
            <a
              href="#coop"
              className="veine-btn-primary px-4 py-2 text-xs sm:text-sm font-mono inline-flex items-center gap-1.5"
            >
              <span>CO-OP</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </nav>
      </header>

      {/* =====================================================================
       * 🍱 MAIN BENTO GRID HERO HUB
       * ===================================================================== */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 pt-8 pb-20 space-y-20">
        <section id="bento-hub" className="scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-5">
            {/* CELL 1: MAIN KINETIC HERO (8 Cols) */}
            <div className="md:col-span-8 bento-card hud-bracket p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              {/* Ambient decorative orb */}
              <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-veine-teal/25 blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Top Status & Identity Switcher */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-veine-teal/25 border border-veine-aqua/35 text-veine-aqua font-mono text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {identityMode === "persona"
                        ? "ALTER-EGO // CREATIVE DEVELOPER"
                        : "INDIE LAB // GAME & WEB STUDIO"}
                    </span>
                  </div>

                  {/* Interactive Persona vs Studio Toggle */}
                  <div className="inline-flex p-1 rounded-xl bg-veine-navy/90 border border-veine-aqua/20 font-mono text-xs">
                    <button
                      type="button"
                      onClick={() => setIdentityMode("persona")}
                      className={`px-3 py-1 rounded-lg transition-all ${identityMode === "persona"
                        ? "bg-veine-aqua text-veine-navy font-bold"
                        : "text-veine-aqua/70 hover:text-veine-ice"
                        }`}
                    >
                      PLAYER 01
                    </button>
                    <button
                      type="button"
                      onClick={() => setIdentityMode("studio")}
                      className={`px-3 py-1 rounded-lg transition-all ${identityMode === "studio"
                        ? "bg-veine-aqua text-veine-navy font-bold"
                        : "text-veine-aqua/70 hover:text-veine-ice"
                        }`}
                    >
                      STUDIO MODE
                    </button>
                  </div>
                </div>

                {/* Kinetic Display Typography */}
                <div className="space-y-1">
                  <p className="font-mono text-xs sm:text-sm text-veine-aqua tracking-widest uppercase">
                    {identityMode === "persona"
                      ? "HI, I'M THE CREATOR BEHIND VEINE STUDIO —"
                      : "WELCOME TO VEINE DIGITAL LABORATORY —"}
                  </p>
                  <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-[4.1rem] leading-[0.98] tracking-tight">
                    <span className="block text-veine-ice">CRAFTING</span>
                    <span className="block kinetic-outline cursor-default">
                      PLAYABLE WORLDS
                    </span>
                    <span className="block kinetic-gradient-text">
                      &amp; KINETIC WEB.
                    </span>
                  </h1>
                </div>

                {/* Dynamic Bio based on toggle */}
                <p className="text-veine-ice/85 text-sm sm:text-base max-w-2xl leading-relaxed">
                  {identityMode === "persona"
                    ? SITE_PROFILE.shortBio
                    : "Sebagai studio independen satu orang (solo-dev powerhouse), Veine Studio menggabungkan estetika video game, sistem interaktif, dan rekayasa web modern untuk menciptakan produk digital yang berkarakter."}
                </p>
              </div>

              {/* Hero Bottom CTA & Quick Metrics */}
              <div className="pt-8 mt-8 border-t border-veine-aqua/15 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="#works"
                    className="veine-btn-primary px-6 py-3 text-sm inline-flex items-center gap-2"
                  >
                    <Gamepad2 className="w-4 h-4" />
                    <span>Lihat Karya ({PROJECTS.length})</span>
                  </a>
                  <a
                    href="#lore"
                    className="veine-btn-secondary px-5 py-3 text-sm inline-flex items-center gap-2"
                  >
                    <Compass className="w-4 h-4 text-veine-aqua" />
                    <span>Cerita Veine</span>
                  </a>
                </div>

                <div className="flex items-center gap-4 font-mono text-xs text-veine-aqua/80">
                  <div>
                    <span className="block text-[10px] text-veine-aqua/50">
                      DEPLOY TARGET
                    </span>
                    <span className="text-veine-ice font-bold">
                      AWS AMPLIFY READY
                    </span>
                  </div>
                  <div className="h-6 w-px bg-veine-aqua/20" />
                  <div>
                    <span className="block text-[10px] text-veine-aqua/50">
                      LOCAL TIME
                    </span>
                    <span className="text-veine-aqua font-bold">{localTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CELL 2: PLAYER / IDENTITY STATS CARD (4 Cols) */}
            <div className="md:col-span-4 bento-card-teal p-6 sm:p-7 flex flex-col justify-between text-veine-ice relative overflow-hidden">
              <div className="veine-scanlines absolute inset-0 pointer-events-none opacity-30" />

              <div className="relative z-10 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded-md bg-veine-navy/60 text-veine-aqua border border-veine-aqua/30">
                    CHARACTER SHEET
                  </span>
                  <span className="font-mono text-sm font-bold text-veine-aqua">
                    {SITE_PROFILE.playerStats.level}
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">
                    VEINE // 01
                  </h2>
                  <p className="font-mono text-xs text-veine-aqua mt-0.5">
                    {SITE_PROFILE.playerStats.classType}
                  </p>
                </div>

                {/* RPG Attribute Bars */}
                <div className="space-y-2.5 bg-veine-navy/55 p-4 rounded-2xl border border-veine-aqua/25 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-veine-aqua">WEB FRONTEND &amp; UI</span>
                      <span>95%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-veine-navy overflow-hidden">
                      <div className="h-full bg-veine-ice rounded-full w-[95%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-veine-aqua">BACKEND &amp; MICROSERVICES</span>
                      <span>94%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-veine-navy overflow-hidden">
                      <div className="h-full bg-veine-aqua rounded-full w-[94%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-veine-aqua">MOBILE DEV (CROSS-PLATFORM)</span>
                      <span>90%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-veine-navy overflow-hidden">
                      <div className="h-full bg-veine-ice rounded-full w-[90%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-veine-aqua">GAME DESIGN &amp; ENGINE</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-veine-navy overflow-hidden">
                      <div className="h-full bg-veine-aqua rounded-full w-[92%]" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-5 mt-5 border-t border-veine-aqua/25 flex items-center justify-between text-xs font-mono">
                <span className="text-veine-aqua">STATUS:</span>
                <span className="px-2.5 py-1 rounded-full bg-veine-aqua text-veine-navy font-bold">
                  OPEN FOR COLLABS
                </span>
              </div>
            </div>

            {/* CELL 3: SKILL ARSENAL SWITCHER (5 Cols) */}
            <div className="md:col-span-5 bento-card hud-bracket p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-veine-aqua" />
                    <span className="font-mono text-xs uppercase tracking-wider text-veine-aqua">
                      TECH ARSENAL // LOADOUT
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-veine-aqua/60">
                    {SKILL_ARSENAL[activeSkillTab].tag}
                  </span>
                </div>

                {/* Category Tabs */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 rounded-xl bg-veine-navy border border-veine-aqua/15 mb-4 font-mono text-[11px]">
                  {SKILL_ARSENAL.map((group, idx) => (
                    <button
                      key={group.tag}
                      type="button"
                      onClick={() => setActiveSkillTab(idx)}
                      className={`py-2 px-2 rounded-lg transition-all truncate ${activeSkillTab === idx
                        ? "bg-veine-teal text-veine-ice font-bold shadow"
                        : "text-veine-aqua/70 hover:text-veine-ice"
                        }`}
                    >
                      {group.category.split(" ")[0]}
                    </button>
                  ))}
                </div>

                {/* Skill Pills */}
                <div className="grid grid-cols-2 gap-2">
                  {SKILL_ARSENAL[activeSkillTab].items.map((skill) => (
                    <div
                      key={skill}
                      className="px-3 py-2.5 rounded-xl bg-veine-navy/70 border border-veine-aqua/15 hover:border-veine-aqua/50 text-xs font-medium text-veine-ice flex items-center gap-2 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-veine-aqua shrink-0" />
                      <span className="truncate">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-4 pt-3 border-t border-veine-aqua/10 font-mono text-[11px] text-veine-aqua/70">
                ⚡ Hybrid stack: menggabungkan logic game engine dengan ekosistem web modern.
              </p>
            </div>

            {/* CELL 4: PLAYABLE MINI-ARCADE WIDGET (4 Cols) */}
            <div className="md:col-span-4">
              <ArcadeMiniWidget />
            </div>

            {/* CELL 5: COLOR PALETTE DNA & THEME CARD (3 Cols) */}
            <div className="md:col-span-3 bento-card-aqua p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-veine-navy text-veine-aqua">
                    VEINE PALETTE
                  </span>
                  <span className="font-mono text-xs font-bold text-veine-navy/70">
                    4 HEX DNA
                  </span>
                </div>
                <h3 className="font-display font-extrabold text-xl text-veine-navy leading-tight mb-1">
                  ABYSSAL AQUA THEME
                </h3>
                <p className="text-xs text-veine-navy/80 mb-4">
                  Klik warna untuk menyalin kode HEX palet resmi Veine Studio:
                </p>

                <div className="space-y-2">
                  {paletteSwatches.map((swatch) => (
                    <button
                      key={swatch.hex}
                      type="button"
                      onClick={() => handleCopy(swatch.hex, swatch.hex)}
                      className="w-full flex items-center justify-between p-2 rounded-xl bg-white/60 hover:bg-white border border-veine-navy/15 transition-all group"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`w-6 h-6 rounded-lg border border-veine-navy/20 ${swatch.bg}`}
                        />
                        <span className="font-mono text-xs font-bold text-veine-navy">
                          {swatch.hex}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-veine-teal font-semibold">
                        {copiedText === swatch.hex ? "COPIED!" : swatch.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-veine-navy/10 flex items-center justify-between font-mono text-[11px] text-veine-navy/70">
                <span>STYLE</span>
                <span className="font-bold">TAILWIND + VANILLA CSS</span>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
         * ⚡ KINETIC TYPOGRAPHY MARQUEE STRIP
         * ===================================================================== */}
        <section
          aria-label="Kinetic Typography Banner"
          className="py-4 border-y border-veine-aqua/15 marquee-mask overflow-hidden select-none"
        >
          <div className="flex w-max animate-marquee items-center gap-8">
            {Array.from({ length: 2 }).map((_, loopIdx) => (
              <div key={loopIdx} className="flex items-center gap-8 shrink-0">
                {[
                  "VEINE STUDIO",
                  "INDIE GAME DEVELOPMENT",
                  "KINETIC WEB EXPERIENCES",
                  "PLAYER 01 IDENTITY",
                  "NEXT.JS + TAILWIND + VANILLA CSS",
                  "PLAYABLE DIGITAL WORLDS",
                ].map((phrase, idx) => (
                  <div key={idx} className="flex items-center gap-8">
                    <span
                      className={`font-display font-extrabold text-2xl sm:text-4xl tracking-tight ${idx % 2 === 0
                        ? "text-veine-ice"
                        : "kinetic-outline"
                        }`}
                    >
                      {phrase}
                    </span>
                    <span className="text-veine-aqua text-xl">✦</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================================
         * 🎮 PORTFOLIO / SELECTED WORKS (BENTO SHOWCASE)
         * ===================================================================== */}
        <section id="works" className="scroll-mt-28 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-veine-aqua uppercase tracking-widest mb-2">
                <Terminal className="w-4 h-4 text-veine-teal" />
                <span>02 // SELECTED WORKS &amp; PROTOTYPES</span>
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-veine-ice tracking-tight">
                PLAYABLE &amp; INTERACTIVE{" "}
                <span className="text-veine-aqua">ARCHIVE.</span>
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                const count =
                  cat === "All"
                    ? PROJECTS.length
                    : PROJECTS.filter((p) => p.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full font-mono text-xs transition-all flex items-center gap-2 ${active
                      ? "bg-veine-aqua text-veine-navy font-bold shadow-[0_0_20px_rgba(186,229,233,0.4)]"
                      : "bg-veine-navy border border-veine-aqua/25 text-veine-aqua hover:border-veine-aqua"
                      }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`px-1.5 py-0.2 rounded-full text-[10px] ${active
                        ? "bg-veine-navy text-veine-aqua"
                        : "bg-veine-teal/30 text-veine-ice"
                        }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Self-Balancing Bento Projects Grid (Anti-Layout Break for Any Count) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {filteredProjects.map((project, idx) => {
              const isLastAndAlone =
                idx === filteredProjects.length - 1 && idx % 2 === 0;
              const rowIndex = Math.floor(idx / 2);
              const isFirstInRow = idx % 2 === 0;

              // Alternates 7+5 and 5+7 per row; full 12-col if single last card
              const colSpanClass = isLastAndAlone
                ? "md:col-span-12"
                : rowIndex % 2 === 0
                  ? isFirstInRow
                    ? "md:col-span-7"
                    : "md:col-span-5"
                  : isFirstInRow
                    ? "md:col-span-5"
                    : "md:col-span-7";

              return (
                <article
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className={`${colSpanClass} bento-card hud-bracket p-6 sm:p-8 flex flex-col justify-between cursor-pointer group`}
                >
                  <div>
                    {/* Card Top Metadata */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-veine-teal/35 border border-veine-aqua/35 text-veine-aqua">
                          {project.category}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-veine-navy/80 border border-veine-aqua/15 text-veine-ice/80">
                          {project.status}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-veine-aqua/60">
                        {project.year}
                      </span>
                    </div>

                    {/* Locked Aspect-Ratio Preview Frame (Anti-Layout Break) */}
                    <div className="mb-5">
                      <ProjectMediaFrame
                        title={project.title}
                        category={project.category}
                        imageUrl={project.imageUrl}
                        imageFit={project.imageFit}
                        accentTone={project.accentTone}
                      />
                    </div>

                    {/* Project Title & Role Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-veine-aqua mb-1">
                          ROLE // {project.role}
                        </p>
                        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-veine-ice group-hover:text-veine-aqua transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-veine-aqua/90 mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>

                      <div className="w-10 h-10 rounded-2xl bg-veine-aqua text-veine-navy flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-transform">
                        <ArrowUpRight className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-veine-ice/85 leading-relaxed mb-6">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack & Click Prompt */}
                  <div className="pt-4 border-t border-veine-aqua/15 flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-veine-navy/90 border border-veine-aqua/20 text-veine-aqua"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <span className="font-mono text-xs text-veine-aqua inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>INSPECT QUEST</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Zero-Database Workflow Info Banner for the Owner
          <div className="bento-card p-5 sm:p-6 border-dashed border-veine-aqua/35">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2.5 rounded-xl bg-veine-teal/30 text-veine-aqua shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-veine-ice">
                    Arsitektur Statis (Tanpa Database) — Siap Deploy ke AWS Amplify
                  </h4>
                  <p className="text-xs sm:text-sm text-veine-aqua/80">
                    Semua daftar project di atas diambil langsung dari file{" "}
                    <code className="px-1.5 py-0.5 rounded bg-veine-navy text-veine-aqua font-mono">
                      src/data/portfolio.ts
                    </code>
                    .
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowDataGuide(!showDataGuide)}
                className="veine-btn-secondary px-4 py-2 text-xs font-mono shrink-0 self-start sm:self-auto"
              >
                {showDataGuide ? "Tutup Panduan" : "Cara Tambah Portfolio"}
              </button>
            </div>

            {showDataGuide && (
              <div className="mt-4 pt-4 border-t border-veine-aqua/15 grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-veine-navy/80 border border-veine-aqua/20">
                  <span className="text-veine-aqua font-bold block mb-1">
                    STEP 01 // EDIT FILE
                  </span>
                  <p className="text-veine-ice/80 leading-relaxed font-sans">
                    Buka file <code>src/data/portfolio.ts</code> dan tambahkan item project baru di dalam array <code>PROJECTS</code>.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-veine-navy/80 border border-veine-aqua/20">
                  <span className="text-veine-aqua font-bold block mb-1">
                    STEP 02 // GIT PUSH
                  </span>
                  <p className="text-veine-ice/80 leading-relaxed font-sans">
                    Simpan perubahan, lalu commit dan push ke repository GitHub/GitLab yang terhubung ke AWS Amplify.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-veine-navy/80 border border-veine-aqua/20">
                  <span className="text-veine-aqua font-bold block mb-1">
                    STEP 03 // AUTO-DEPLOY
                  </span>
                  <p className="text-veine-ice/80 leading-relaxed font-sans">
                    File <code>amplify.yml</code> yang sudah disiapkan akan otomatis mem-build ulang situs statis kamu dalam ~1 menit!
                  </p>
                </div>
              </div>
            )}
          </div> */}
        </section>

        {/* =====================================================================
         * 📖 THE LORE // DUAL IDENTITY (STUDIO + PERSONA) & QUEST LOG
         * ===================================================================== */}
        <section id="lore" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: The Origin Story of Veine Studio (6 Cols) */}
          <div className="lg:col-span-6 bento-card hud-bracket p-6 sm:p-9 flex flex-col justify-between">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-veine-aqua uppercase tracking-widest">
                <Compass className="w-4 h-4 text-veine-teal" />
                <span>03 // ORIGIN STORY &amp; DUAL IDENTITY</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-veine-ice leading-tight">
                DARI IMPIAN <span className="text-veine-aqua">STUDIO GAME</span>{" "}
                MENJADI IDENTITAS DIRI.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-veine-ice/85 leading-relaxed">
                {SITE_PROFILE.storyParagraphs.map((para, index) => (
                  <p key={index}>{para}</p>
                ))}
              </div>
            </div>

            {/* Dual Pillar Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-6 mt-6 border-t border-veine-aqua/15">
              <div className="p-4 rounded-2xl bg-veine-navy/70 border border-veine-aqua/20">
                <Gamepad2 className="w-5 h-5 text-veine-aqua mb-2" />
                <h3 className="font-display font-bold text-sm text-veine-ice">
                  AS AN INDIE STUDIO
                </h3>
                <p className="text-xs text-veine-aqua/80 mt-1">
                  Meracik prototipe game, mekanik combat, world-building, dan arah seni yang imersif.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-veine-navy/70 border border-veine-aqua/20">
                <Code2 className="w-5 h-5 text-veine-aqua mb-2" />
                <h3 className="font-display font-bold text-sm text-veine-ice">
                  AS MY PERSONAL ALIAS
                </h3>
                <p className="text-xs text-veine-aqua/80 mt-1">
                  Membangun aplikasi web modern, UI kinetik, dan solusi frontend berkecepatan tinggi.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: RPG Quest Log / Experience Timeline (6 Cols) */}
          <div
            id="quest-log"
            className="lg:col-span-6 bento-card hud-bracket p-6 sm:p-9 flex flex-col justify-between scroll-mt-28"
          >
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-veine-aqua uppercase tracking-widest mb-3">
                <Swords className="w-4 h-4 text-veine-teal" />
                <span>04 // QUEST LOG &amp; MILESTONES</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-veine-ice leading-tight mb-6">
                EXPERIENCE <span className="text-veine-aqua">TIMELINE.</span>
              </h2>

              <div className="space-y-4">
                {QUEST_LOG.map((quest, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-veine-navy/75 border border-veine-aqua/20 hover:border-veine-aqua/50 transition-all"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs text-veine-aqua font-bold">
                        {quest.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-veine-teal/40 text-veine-ice border border-veine-aqua/30">
                        {quest.type}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-lg text-veine-ice">
                      {quest.title}
                    </h3>
                    <p className="font-mono text-xs text-veine-aqua/80 mb-2">
                      {quest.organization}
                    </p>
                    <p className="text-xs sm:text-sm text-veine-ice/80 leading-relaxed mb-3">
                      {quest.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {quest.skills.map((sk) => (
                        <span
                          key={sk}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-veine-navy border border-veine-aqua/20 text-veine-aqua"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
         * 🤝 CO-OP MODE // CONTACT & COLLABORATION SECTION
         * ===================================================================== */}
        <section id="coop" className="scroll-mt-28">
          <div className="bento-card-aqua p-8 sm:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-veine-navy text-veine-aqua font-mono text-xs">
                  <Globe className="w-3.5 h-3.5" />
                  <span>05 // MULTIPLAYER CO-OP MODE</span>
                </div>

                <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-veine-navy tracking-tight leading-[1.05]">
                  READY TO START A NEW QUEST TOGETHER?
                </h2>

                <p className="text-veine-navy/85 text-sm sm:text-base max-w-xl leading-relaxed">
                  Tertarik berkolaborasi untuk proyek game indie, membutuhkan website interaktif bergaya Gen Z, atau sekadar ingin ngobrol soal game dev &amp; teknologi web? Mari terhubung!
                </p>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`mailto:${SITE_PROFILE.email}`}
                    className="px-6 py-3.5 rounded-full bg-veine-navy text-veine-ice hover:bg-veine-teal font-mono text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all shadow-lg"
                  >
                    <Mail className="w-4 h-4 text-veine-aqua" />
                    <span>Kirim Email Sekarang</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopy(SITE_PROFILE.email, "email")}
                    className="px-5 py-3.5 rounded-full bg-white/75 hover:bg-white text-veine-navy border border-veine-navy/20 font-mono text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all"
                  >
                    {copiedText === "email" ? (
                      <>
                        <Check className="w-4 h-4 text-veine-teal" />
                        <span>Email Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>{SITE_PROFILE.email}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social Links Grid */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SITE_PROFILE.socials.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-2xl bg-veine-navy text-veine-ice hover:bg-veine-teal transition-all flex items-center justify-between group"
                  >
                    <div>
                      <span className="font-mono text-[10px] text-veine-aqua block">
                        {soc.label}
                      </span>
                      <span className="font-display font-bold text-sm">
                        {soc.handle}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-veine-aqua group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
       * 🏁 FOOTER
       * ===================================================================== */}
      <footer className="border-t border-veine-aqua/15 py-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-veine-aqua/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-veine-aqua" />
            <span>
              © {new Date().getFullYear()} {SITE_PROFILE.brandName}. ALL RIGHTS RESERVED.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>BUILT WITH NEXT.JS + TAILWIND + VANILLA CSS</span>
            <span>•</span>
            <span className="text-veine-ice">AWS AMPLIFY READY</span>
          </div>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  );
}

