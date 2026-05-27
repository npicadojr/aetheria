"use client";

import { motion } from "framer-motion";

const item = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
});

const FLOAT_CARDS = [
  {
    icon: "🎯",
    label: "Lead calificado",
    sub: "Score: 94/100 · Presupuesto: Alto",
    color: "#667eea",
    pos: "top-[18%] right-[6%]",
    delay: 0,
  },
  {
    icon: "⚡",
    label: "Proceso automatizado",
    sub: "Tiempo ahorrado: 15h/semana",
    color: "#8B5CF6",
    pos: "bottom-[22%] left-[4%]",
    delay: 0.4,
  },
  {
    icon: "📈",
    label: "Conversión aumentada",
    sub: "+40% en 30 días",
    color: "#06B6D4",
    pos: "top-[42%] left-[2%]",
    delay: 0.8,
  },
];

export function HeroSection() {
  const handleScroll = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(160deg, #060d1f 0%, #0f1535 40%, #0a0f2c 100%)" }}
    >
      {/* Animated blob mesh */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full opacity-[0.18] blur-[100px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #667eea, #764ba2)", top: "5%", left: "20%" }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0], scale: [1, 1.08, 0.97, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.14] blur-[80px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #3B82F6, #06B6D4)", bottom: "10%", right: "15%" }}
        animate={{ x: [0, -30, 15, 0], y: [0, 25, -15, 0], scale: [1, 0.95, 1.06, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full opacity-[0.12] blur-[60px] pointer-events-none"
        style={{ background: "radial-gradient(circle, #8B5CF6, #667eea)", top: "50%", right: "30%" }}
        animate={{ x: [0, 20, -25, 0], y: [0, -18, 12, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        aria-hidden="true"
      />

      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Floating cards */}
      {FLOAT_CARDS.map((card) => (
        <motion.div
          key={card.label}
          className={`absolute hidden lg:flex items-center gap-3 px-4 py-3 rounded-2xl ${card.pos}`}
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.12)",
            maxWidth: 240,
          }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            opacity: { delay: 1 + card.delay, duration: 0.5 },
            scale: { delay: 1 + card.delay, duration: 0.5 },
            y: { delay: 1 + card.delay, duration: 4, repeat: Infinity, ease: "easeInOut" },
          }}
          aria-hidden="true"
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: `${card.color}22`, border: `1px solid ${card.color}44` }}
          >
            {card.icon}
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-tight">{card.label}</p>
            <p className="text-slate-400 text-[10px] mt-0.5 leading-tight">{card.sub}</p>
          </div>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          {...item(0)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{
            background: "rgba(102,126,234,0.12)",
            border: "1px solid rgba(102,126,234,0.3)",
            color: "#c4b5fd",
            backdropFilter: "blur(8px)",
            fontFamily: "var(--font-dm-sans, sans-serif)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" aria-hidden="true" />
          🚀 AI Business Systems
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...item(0.15)}
          className="text-fluid-hero font-display text-white mb-6"
          style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800 }}
        >
          Deja de perder tiempo en{" "}
          <span className="text-gradient-primary">procesos manuales</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          {...item(0.3)}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans, sans-serif)", fontWeight: 400 }}
        >
          Sistemas de automatización inteligente que califican leads, analizan
          datos y toman decisiones—para que tu equipo se enfoque en lo
          importante.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...item(0.45)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => handleScroll("#contacto")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-semibold text-base glow-pulse"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontFamily: "var(--font-dm-sans, sans-serif)",
            }}
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Agendar Consulta
          </motion.button>
          <motion.button
            onClick={() => handleScroll("#proyectos")}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-base text-white transition-colors"
            style={{
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              fontFamily: "var(--font-dm-sans, sans-serif)",
            }}
            whileHover={{ scale: 1.03, background: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            Ver Qué Construimos →
          </motion.button>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          {...item(0.6)}
          className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
        >
          {["Sin contratos largos", "Setup en 4-6 semanas", "Soporte continuo incluido"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-violet-500" aria-hidden="true" />
              {t}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        aria-hidden="true"
      >
        <motion.div
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
        >
          <motion.div
            className="w-1 h-2 bg-white/50 rounded-full"
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
