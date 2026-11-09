"use client";

import React, { useEffect } from "react";
import {
  X,
  ExternalLink,
  Code2,
  Gamepad2,
  CheckCircle2,
  Layers,
  Calendar,
  UserCheck,
} from "lucide-react";
import type { ProjectItem } from "@/data/portfolio";
import ProjectMediaFrame from "./ProjectMediaFrame";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-veine-navy/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="max-w-2xl w-full max-h-[88vh] flex flex-col rounded-3xl bg-[#031c36]/95 border border-veine-aqua/40 relative shadow-[0_0_50px_rgba(14,126,142,0.45)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Fixed Top HUD Bar (Selalu terlihat saat di-scroll) */}
        <div className="shrink-0 flex items-center justify-between gap-4 px-6 sm:px-8 py-4 border-b border-veine-aqua/15 bg-veine-navy/90 backdrop-blur-md z-20">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-veine-teal text-veine-ice">
              {project.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono border border-veine-aqua/30 text-veine-aqua">
              {project.status}
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-veine-aqua/70">
              <Calendar className="w-3.5 h-3.5" />
              {project.year}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-veine-navy border border-veine-aqua/30 text-veine-aqua hover:bg-veine-aqua hover:text-veine-navy transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 space-y-6">
          {/* Title Header */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-veine-aqua mb-1">
              PROJECT ARCHIVE // {project.id.toUpperCase()}
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-veine-ice tracking-tight">
              {project.title}
            </h2>
            <p className="text-veine-aqua font-medium mt-0.5 text-sm sm:text-base">
              {project.subtitle}
            </p>
          </div>

          {/* Locked Media Preview Frame */}
          <div>
            <ProjectMediaFrame
              title={project.title}
              category={project.category}
              imageUrl={project.imageUrl}
              imageFit={project.imageFit}
              accentTone={project.accentTone}
              isModal={true}
            />
          </div>

          {/* Role Badge */}
          <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-veine-aqua bg-veine-teal/15 border border-veine-teal/40 px-4 py-2.5 rounded-xl">
            <UserCheck className="w-4 h-4 text-veine-aqua shrink-0" />
            <span>
              ROLE: <strong className="text-veine-ice">{project.role}</strong>
            </span>
          </div>

          {/* Overview */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-veine-aqua/80 mb-2">
              // OVERVIEW &amp; ARCHITECTURE
            </h4>
            <p className="text-veine-ice/90 leading-relaxed text-sm sm:text-base">
              {project.longDescription}
            </p>
          </div>

          {/* Key Highlights */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-veine-aqua/80 mb-3">
              // KEY HIGHLIGHTS &amp; FEATURES
            </h4>
            <ul className="space-y-2.5">
              {project.highlights.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 text-sm text-veine-ice/90 bg-veine-navy/60 border border-veine-aqua/10 p-3 rounded-xl"
                >
                  <CheckCircle2 className="w-4 h-4 text-veine-aqua shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-wider text-veine-aqua/80 mb-3 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              TECH STACK &amp; TOOLS
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-veine-navy border border-veine-aqua/25 text-veine-aqua"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="pt-4 border-t border-veine-aqua/15 flex flex-wrap items-center gap-3">
            {project.links.play && (
              <a
                href={project.links.play}
                target="_blank"
                rel="noopener noreferrer"
                className="veine-btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2"
              >
                <Gamepad2 className="w-4 h-4" />
                Play / Itch.io
              </a>
            )}
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="veine-btn-primary px-5 py-2.5 text-sm inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="veine-btn-secondary px-5 py-2.5 text-sm inline-flex items-center gap-2"
              >
                <Code2 className="w-4 h-4" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
