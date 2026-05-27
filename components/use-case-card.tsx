"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface UseCaseCardProps {
  icon: LucideIcon;
  gradient: string;
  glowColor: string;
  borderColor: string;
  title: string;
  problem: string;
  solution: string;
}

export function UseCaseCard({ icon, gradient, glowColor, borderColor, title, problem, solution }: UseCaseCardProps) {
  const [hovered, setHovered] = useState(false);
  const Icon = icon;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="bg-white dark:bg-slate-900/80 rounded-2xl p-8 relative overflow-hidden"
      style={{
        border: `1px solid ${hovered ? borderColor : "color-mix(in oklab, var(--border) 65%, transparent)"}`,
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.08), 0 0 0 1px ${borderColor}40`
          : "0 1px 3px rgba(0,0,0,0.05)",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Glow bg on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 20% 20%, ${glowColor}08 0%, transparent 70%)`,
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 relative"
        style={{
          background: gradient,
          boxShadow: hovered ? `0 8px 24px ${glowColor}40` : "none",
          transition: "box-shadow 0.3s",
        }}
        aria-hidden="true"
      >
        <Icon size={27} className="text-white" strokeWidth={2.1} />
      </div>

      <h3
        className="text-lg font-bold text-slate-900 dark:text-white mb-3 leading-snug"
        style={{ fontFamily: "var(--font-syne, sans-serif)", letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>

      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-5">{problem}</p>

      {/* Separator */}
      <div
        className="h-px mb-4 rounded-full"
        style={{ background: `linear-gradient(90deg, ${glowColor}40, transparent)` }}
        aria-hidden="true"
      />

      <div className="flex items-start gap-2 text-sm font-semibold" style={{ color: glowColor }}>
        <span className="text-base leading-tight mt-px">→</span>
        <span className="leading-snug">{solution}</span>
      </div>
    </motion.div>
  );
}
