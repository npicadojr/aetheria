"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

interface StatItem {
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
  description: string;
}

const STATS: StatItem[] = [
  { value: 40, suffix: "%+", label: "Aumento en conversión", icon: "📈", description: "en leads calificados" },
  { value: 15, suffix: "hrs", label: "Ahorradas por semana", icon: "⏱️", description: "por equipo promedio" },
  { prefix: "<", value: 2, suffix: "min", label: "Tiempo de respuesta", icon: "⚡", description: "para calificar leads" },
  { value: 60, suffix: "%", label: "Menos trabajo manual", icon: "🤖", description: "procesos automatizados" },
];

function AnimatedCounter({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => { if (inView) motionValue.set(value); }, [inView, motionValue, value]);
  useEffect(() => spring.on("change", (v) => setDisplay(Math.round(v))), [spring]);

  return <span ref={ref}>{prefix}{display}{suffix}</span>;
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden" aria-label="Estadísticas">
      <div className="dot-grid-light absolute inset-0 pointer-events-none" aria-hidden="true" />
      <div className="max-w-5xl mx-auto relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="gradient-border-top bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="text-2xl mb-2" aria-hidden="true">{stat.icon}</div>
              <div
                className="text-4xl sm:text-5xl font-bold mb-1.5 leading-none"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "var(--font-syne, sans-serif)",
                  letterSpacing: "-0.03em",
                }}
              >
                <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-semibold text-slate-700 mb-0.5" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>{stat.label}</p>
              <p className="text-xs text-slate-400">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
