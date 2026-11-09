"use client";

import React, { useState } from "react";
import {
  Gamepad2,
  Smartphone,
  Server,
  Globe,
  Terminal,
  Activity,
  Cpu,
  Database,
  ShieldCheck,
} from "lucide-react";
import type { ProjectCategory } from "@/data/portfolio";

interface ProjectMediaFrameProps {
  title: string;
  category: ProjectCategory;
  imageUrl?: string;
  /**
   * 'landscape' cocok untuk Web / Game (16:9).
   * 'portrait' cocok untuk screenshot HP / Mobile App (9:16) agar tidak terpotong aneh!
   * 'blueprint' cocok untuk Backend / API jika tidak ada screenshot UI.
   */
  imageFit?: "landscape" | "portrait" | "blueprint";
  accentTone?: "teal" | "aqua" | "navy" | "ice";
  isModal?: boolean;
}

/**
 * Komponen Anti-Rusak Layout (Bulletproof Media Frame):
 * - Mengunci tinggi & rasio kotak gambar (fixed height + overflow-hidden).
 * - Gambar beresolusi berapa pun (landscape 16:9, kotak 1:1, atau portrait HP 9:16)
 *   otomatis menyesuaikan di dalam bingkai tanpa pernah mengubah tinggi Bento Card.
 * - Jika `imageUrl` dikosongkan atau gagal dimuat, otomatis menampilkan
 *   Visual Mockup sesuai kategori (Game HUD, Mobile Mockup, Web UI, atau Backend Nodes).
 */
export default function ProjectMediaFrame({
  title,
  category,
  imageUrl,
  imageFit = "landscape",
  accentTone = "teal",
  isModal = false,
}: ProjectMediaFrameProps) {
  const [imgError, setImgError] = useState(false);
  const hasValidImage = Boolean(imageUrl && !imgError);

  const toneGradient =
    accentTone === "aqua"
      ? "from-[#042240] via-[#0E7E8E]/45 to-[#BAE5E9]/25"
      : accentTone === "ice"
      ? "from-[#011427] via-[#0E7E8E]/35 to-[#EFEFEF]/15"
      : accentTone === "navy"
      ? "from-[#011427] via-[#05294a] to-[#0E7E8E]/30"
      : "from-[#011427] via-[#0E7E8E]/40 to-[#011427]";

  return (
    <div
      className={`relative w-full ${
        isModal ? "h-60 sm:h-72" : "h-48 sm:h-52"
      } rounded-2xl overflow-hidden border border-veine-aqua/25 bg-gradient-to-br ${toneGradient} select-none group/media`}
    >
      {/* Subtle Grid & Scanline Overlay */}
      <div className="veine-scanlines absolute inset-0 opacity-25 pointer-events-none z-20" />

      {/* Top Window / Device Status Bar */}
      <div className="absolute top-0 inset-x-0 h-7 px-3 bg-veine-navy/85 backdrop-blur-md border-b border-veine-aqua/15 flex items-center justify-between z-30 font-mono text-[10px] text-veine-aqua/80">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-veine-teal" />
          <span className="w-2 h-2 rounded-full bg-veine-aqua/60" />
          <span className="w-2 h-2 rounded-full bg-veine-ice/40" />
          <span className="ml-1.5 truncate max-w-[160px] text-veine-ice/70">
            {category.toUpperCase()} // PREVIEW
          </span>
        </div>
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-veine-teal/25 text-veine-aqua">
          {imageFit === "portrait"
            ? "9:16 MOBILE SAFE"
            : imageFit === "blueprint"
            ? "ARCH DIAGRAM"
            : "16:9 LOCKED"}
        </span>
      </div>

      {/* ===================================================================
       * CASE 1: USER MEMASUKKAN GAMBAR (`imageUrl`)
       * =================================================================== */}
      {hasValidImage ? (
        <div className="w-full h-full pt-7 relative flex items-center justify-center overflow-hidden bg-veine-navy/60">
          {imageFit === "portrait" ? (
            <>
              {/* Blurred Ambient Background so portrait mobile screenshots never leave ugly blank bars */}
              <img
                src={imageUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 pointer-events-none"
              />
              {/* Centered Mobile Phone Frame */}
              <div className="relative z-10 h-[88%] aspect-[9/16] rounded-xl border-2 border-veine-aqua/50 bg-veine-navy shadow-2xl overflow-hidden group-hover/media:scale-105 transition-transform duration-500">
                <img
                  src={imageUrl}
                  alt={title}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </>
          ) : (
            /* Standard Landscape 16:9 Locked Crop */
            <img
              src={imageUrl}
              alt={title}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center group-hover/media:scale-105 transition-transform duration-500"
            />
          )}

          {/* Bottom Gradient Protection so text/badges remain crisp */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-veine-navy/90 to-transparent pointer-events-none z-10" />
        </div>
      ) : (
        /* ===================================================================
         * CASE 2: FALLBACK / PROCEDURAL VISUAL MOCKUP (JIKA TANPA GAMBAR)
         * =================================================================== */
        <div className="w-full h-full pt-7 relative flex items-center justify-center p-4">
          {category === "Mobile App" || imageFit === "portrait" ? (
            /* 📱 MOBILE APP VISUAL MOCKUP */
            <div className="flex items-center justify-center gap-4 w-full h-full">
              {/* Phone Frame 1 */}
              <div className="w-24 sm:w-28 h-[92%] rounded-2xl bg-veine-navy/95 border-2 border-veine-aqua/45 shadow-[0_0_25px_rgba(14,126,142,0.4)] p-2 flex flex-col justify-between group-hover/media:-translate-y-1 transition-transform duration-300">
                <div className="w-8 h-1 rounded-full bg-veine-aqua/30 mx-auto" />
                <div className="space-y-1.5 my-auto">
                  <div className="h-7 rounded-lg bg-gradient-to-r from-veine-teal to-veine-aqua/70 p-1.5 flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-veine-navy shrink-0" />
                    <div className="w-full h-1.5 rounded bg-veine-navy/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="h-9 rounded-lg bg-veine-teal/25 border border-veine-aqua/20" />
                    <div className="h-9 rounded-lg bg-veine-aqua/20 border border-veine-aqua/30" />
                  </div>
                  <div className="h-3 rounded bg-veine-aqua/15 w-3/4" />
                </div>
                <div className="w-10 h-1 rounded-full bg-veine-aqua/40 mx-auto" />
              </div>

              {/* Floating Mobile Telemetry Pill */}
              <div className="hidden sm:flex flex-col gap-2 font-mono text-[10px]">
                <div className="px-3 py-2 rounded-xl bg-veine-navy/85 border border-veine-aqua/30 text-veine-aqua flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-veine-teal" />
                  <span>60 FPS NATIVE UI</span>
                </div>
                <div className="px-3 py-2 rounded-xl bg-veine-navy/85 border border-veine-aqua/20 text-veine-ice/80 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-veine-aqua" />
                  <span>OFFLINE-FIRST SYNC</span>
                </div>
              </div>
            </div>
          ) : category === "Backend & API" || imageFit === "blueprint" ? (
            /* 🖥️ BACKEND & SYSTEM ARCHITECTURE MOCKUP */
            <div className="w-full h-full flex items-center justify-between gap-3 px-2 font-mono text-[10px]">
              <div className="flex-1 bg-veine-navy/90 border border-veine-aqua/30 rounded-xl p-3 space-y-2 shadow-inner">
                <div className="flex items-center justify-between text-veine-aqua border-b border-veine-aqua/15 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    CLUSTER // NODE-01
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-veine-aqua text-veine-navy font-bold">
                    99.98% SLA
                  </span>
                </div>
                <div className="space-y-1 text-veine-ice/80">
                  <div className="flex justify-between">
                    <span className="text-veine-aqua/70">POST /v1/auth/token</span>
                    <span className="text-veine-aqua">200 OK (12ms)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-veine-aqua/70">GET /v1/state/sync</span>
                    <span className="text-veine-aqua">200 OK (8ms)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-veine-aqua/70">QUEUE // WORKER_POOL</span>
                    <span className="text-veine-ice">ACTIVE [16]</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex flex-col gap-2 shrink-0">
                <div className="p-2.5 rounded-xl bg-veine-teal/30 border border-veine-aqua/35 text-veine-aqua flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  <span>API GATEWAY</span>
                </div>
                <div className="p-2.5 rounded-xl bg-veine-navy/85 border border-veine-aqua/25 text-veine-ice flex items-center gap-2">
                  <Database className="w-4 h-4 text-veine-aqua" />
                  <span>REPLICA DB</span>
                </div>
              </div>
            </div>
          ) : category === "Game Dev" ? (
            /* 🎮 GAME ENGINE VIEWPORT MOCKUP */
            <div className="w-full h-full flex flex-col justify-between p-2 relative">
              {/* Radar & FPS HUD */}
              <div className="flex items-center justify-between font-mono text-[10px]">
                <div className="px-2.5 py-1 rounded-lg bg-veine-navy/85 border border-veine-aqua/30 text-veine-aqua flex items-center gap-1.5">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>ENGINE VIEWPORT</span>
                </div>
                <div className="px-2 py-0.5 rounded bg-veine-aqua/20 text-veine-aqua border border-veine-aqua/30">
                  120 FPS // SHADER ON
                </div>
              </div>

              {/* Center Interactive Reticle / Sonar Wave */}
              <div className="my-auto flex items-center justify-center relative">
                <div className="w-20 h-20 rounded-full border border-veine-aqua/30 flex items-center justify-center animate-pulse">
                  <div className="w-12 h-12 rounded-full border-2 border-veine-aqua/60 flex items-center justify-center group-hover/media:scale-125 transition-transform duration-500">
                    <div className="w-3 h-3 rotate-45 bg-veine-aqua shadow-[0_0_15px_#BAE5E9]" />
                  </div>
                </div>
              </div>

              {/* Bottom HP / Stamina Bar */}
              <div className="flex items-center gap-2 bg-veine-navy/80 px-3 py-1.5 rounded-lg border border-veine-aqua/20">
                <span className="font-mono text-[9px] text-veine-aqua">SYNC</span>
                <div className="flex-1 h-1.5 rounded-full bg-veine-navy overflow-hidden">
                  <div className="w-4/5 h-full bg-gradient-to-r from-veine-teal to-veine-aqua" />
                </div>
                <span className="font-mono text-[9px] text-veine-ice">LV.01</span>
              </div>
            </div>
          ) : (
            /* 🌐 WEB FRONTEND & FULL-STACK MOCKUP */
            <div className="w-full h-full flex flex-col justify-between p-2">
              <div className="grid grid-cols-12 gap-2 h-full items-center">
                <div className="col-span-7 bg-veine-navy/90 border border-veine-aqua/30 rounded-xl p-3 space-y-2 h-[88%] flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-veine-aqua font-mono text-[10px]">
                    <Globe className="w-3.5 h-3.5" />
                    <span>WEB APP // UI</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="w-3/4 h-2.5 rounded bg-veine-aqua/80" />
                    <div className="w-1/2 h-2 rounded bg-veine-teal" />
                  </div>
                  <div className="flex gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-veine-aqua text-veine-navy font-mono text-[9px] font-bold">
                      SSR / ISR
                    </span>
                    <span className="px-2 py-0.5 rounded bg-veine-teal/30 text-veine-aqua font-mono text-[9px]">
                      100 LIGHTHOUSE
                    </span>
                  </div>
                </div>

                <div className="col-span-5 space-y-2 h-[88%] flex flex-col justify-between">
                  <div className="flex-1 rounded-xl bg-veine-teal/25 border border-veine-aqua/25 p-2.5 flex flex-col justify-center">
                    <Cpu className="w-4 h-4 text-veine-aqua mb-1" />
                    <div className="w-full h-1.5 rounded bg-veine-aqua/40" />
                  </div>
                  <div className="flex-1 rounded-xl bg-veine-navy/85 border border-veine-aqua/20 p-2.5 flex items-center justify-between font-mono text-[10px] text-veine-aqua">
                    <span>API</span>
                    <span className="px-1.5 py-0.5 rounded bg-veine-aqua/20 text-veine-ice">
                      CONNECTED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

