"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const BADGE_STYLES: Record<string, {
  bg: string; text: string; border: string; calloutBg: string; glow: string;
}> = {
  yellow: { bg: "#FEF9C3", text: "#92400E", border: "#FCD34D", calloutBg: "#FFFBEB", glow: "rgba(234,179,8,0.2)" },
  blue:   { bg: "#DBEAFE", text: "#1E40AF", border: "#60A5FA", calloutBg: "#EFF6FF", glow: "rgba(59,130,246,0.2)" },
  green:  { bg: "#DCFCE7", text: "#166534", border: "#4ADE80", calloutBg: "#F0FDF4", glow: "rgba(34,197,94,0.2)" },
  purple: { bg: "#F3E8FF", text: "#6B21A8", border: "#C084FC", calloutBg: "#FAF5FF", glow: "rgba(192,132,252,0.2)" },
};

interface ProjectCardProps {
  number: string;
  title: string;
  description: string;
  badge: string;
  badgeColor: "yellow" | "blue" | "green" | "purple";
  techStack: string[];
  features: string[];
  metrics?: { value: string; label: string }[];
  callout: string;
  calloutIcon: string;
  calloutTitle: string;
}

export function ProjectCard({
  number, title, description, badge, badgeColor,
  techStack, features, metrics, callout, calloutIcon, calloutTitle,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const s = BADGE_STYLES[badgeColor];

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="bg-white rounded-2xl p-8 relative overflow-hidden h-full flex flex-col"
      style={{
        border: `1px solid ${hovered ? s.border : "#f1f5f9"}`,
        boxShadow: hovered
          ? `0 24px 64px ${s.glow}, 0 0 0 1px ${s.border}60`
          : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "border-color 0.25s, box-shadow 0.25s",
      }}
    >
      {/* Subtle glow bg on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(ellipse at 15% 10%, ${s.glow} 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      {/* Badge */}
      <div className="absolute top-5 right-5 z-10">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
          style={{ background: s.bg, color: s.text }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: s.text }} aria-hidden="true" />
          {badge}
        </span>
      </div>

      {/* Number */}
      <div
        className="text-8xl font-black leading-none mb-3 select-none"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          opacity: 0.1,
          fontFamily: "var(--font-syne, sans-serif)",
          letterSpacing: "-0.06em",
        }}
        aria-hidden="true"
      >
        {number}
      </div>

      <h3
        className="text-xl font-bold text-slate-900 mb-3 pr-20 leading-snug"
        style={{ fontFamily: "var(--font-syne, sans-serif)", letterSpacing: "-0.025em" }}
      >
        {title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed mb-6">{description}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Stack tecnológico">
        {techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-lg text-xs font-medium transition-colors"
            style={{
              background: hovered ? `${s.bg}` : "#f8fafc",
              color: hovered ? s.text : "#64748B",
              border: `1px solid ${hovered ? s.border + "60" : "#e2e8f0"}`,
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Metrics */}
      {metrics && (
        <div className="grid grid-cols-3 gap-3 mb-6 py-4 border-y" style={{ borderColor: "#f1f5f9" }}>
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div
                className="text-xl font-bold leading-tight"
                style={{
                  background: "linear-gradient(135deg, #667eea, #a78bfa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "var(--font-syne, sans-serif)",
                }}
              >
                {m.value}
              </div>
              <div className="text-xs text-slate-400 mt-0.5 leading-tight">{m.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Features */}
      <ul className="space-y-2 mb-6 flex-1" aria-label="Características">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-slate-600">
            <span
              className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: s.border }}
              aria-hidden="true"
            />
            {f}
          </li>
        ))}
      </ul>

      {/* Callout */}
      <div
        className="rounded-xl p-4 border-l-4 text-sm mt-auto"
        style={{ background: s.calloutBg, borderLeftColor: s.border }}
      >
        <span className="font-semibold" style={{ color: s.text }}>{calloutIcon} {calloutTitle}</span>{" "}
        <span className="text-slate-600">{callout}</span>
      </div>
    </motion.div>
  );
}
