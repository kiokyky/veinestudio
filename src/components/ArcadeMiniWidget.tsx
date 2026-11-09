"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Gamepad2, Sparkles, RotateCcw, Zap } from "lucide-react";

/**
 * Mini-game / Interactive Bento Toy: "SONAR PULSE // REFLEX NODE"
 * Memberikan sentuhan khas Game Developer langsung di halaman utama.
 */
export default function ArcadeMiniWidget() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [activeCell, setActiveCell] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [comboText, setComboText] = useState("READY PLAYER 01");

  const spawnNextNode = useCallback((current: number) => {
    let next = Math.floor(Math.random() * 9);
    if (next === current) {
      next = (next + 1) % 9;
    }
    setActiveCell(next);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    if (timeLeft <= 0) {
      setIsPlaying(false);
      setComboText("QUEST COMPLETE!");
      if (score > highScore) {
        setHighScore(score);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score, highScore]);

  const startGame = () => {
    setScore(0);
    setTimeLeft(15);
    setIsPlaying(true);
    setComboText("HIT THE AQUA NODES!");
    spawnNextNode(activeCell);
  };

  const handleCellClick = (index: number) => {
    if (!isPlaying) {
      startGame();
      return;
    }

    if (index === activeCell) {
      const nextScore = score + 10;
      setScore(nextScore);
      if (nextScore >= 120) setComboText("GODLIKE REFLEX! ⚡");
      else if (nextScore >= 70) setComboText("OVERDRIVE COMBO! 🔥");
      else setComboText("+10 XP PULSE!");
      spawnNextNode(index);
    } else {
      setScore((prev) => Math.max(0, prev - 5));
      setComboText("MISS! -5 XP");
    }
  };

  return (
    <div className="bento-card hud-bracket p-5 flex flex-col justify-between h-full relative z-10">
      {/* Header HUD */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-veine-teal/30 border border-veine-aqua/40 text-veine-aqua">
            <Gamepad2 className="w-4 h-4" />
          </span>
          <div>
            <p className="font-mono text-[10px] tracking-widest uppercase text-veine-aqua/80">
              MINI-ARCADE // BENTO.EXE
            </p>
            <h3 className="font-display font-bold text-sm text-veine-ice">
              SONAR REFLEX TEST
            </h3>
          </div>
        </div>

        <div className="text-right font-mono">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-veine-navy border border-veine-aqua/30 text-veine-aqua">
            {isPlaying ? `${timeLeft}s` : `HI: ${highScore} XP`}
          </span>
        </div>
      </div>

      {/* 3x3 Interactive Sonar Matrix */}
      <div className="grid grid-cols-3 gap-2 my-2">
        {Array.from({ length: 9 }).map((_, idx) => {
          const isTarget = idx === activeCell;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleCellClick(idx)}
              aria-label={`Arcade node ${idx + 1}`}
              className={`h-11 rounded-xl font-mono text-xs transition-all duration-150 flex items-center justify-center border ${
                isTarget
                  ? "bg-veine-aqua text-veine-navy border-veine-ice shadow-[0_0_16px_rgba(186,229,233,0.75)] scale-[1.03] font-bold"
                  : "bg-veine-navy/70 border-veine-aqua/15 text-veine-aqua/40 hover:border-veine-teal hover:bg-veine-teal/20"
              }`}
            >
              {isTarget ? (
                <Zap className="w-4 h-4 fill-veine-navy animate-bounce" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-veine-teal/50" />
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Status Bar */}
      <div className="mt-3 pt-2.5 border-t border-veine-aqua/15 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-1.5 text-veine-aqua truncate">
          <Sparkles className="w-3.5 h-3.5 shrink-0 text-veine-teal" />
          <span className="truncate text-[11px]">{comboText}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-veine-ice font-bold">{score} XP</span>
          <button
            type="button"
            onClick={startGame}
            className="p-1.5 rounded-lg bg-veine-teal/30 hover:bg-veine-aqua hover:text-veine-navy text-veine-aqua transition-colors"
            title="Restart Mini-Game"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

