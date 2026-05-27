"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STEPS = [
  {
    number: "1",
    title: "Llamada de Descubrimiento",
    description: "Consulta de 30 minutos para entender tus mayores desperdicios de tiempo y ver si IA puede ayudar",
    icon: "🔍",
  },
  {
    number: "2",
    title: "Diseño del Sistema",
    description: "Mapeamos tu workflow, definimos requerimientos y creamos un blueprint técnico",
    icon: "📐",
  },
  {
    number: "3",
    title: "Desarrollo",
    description: "Construimos el sistema con check-ins semanales. Ves progreso, no solo al final",
    icon: "⚙️",
  },
  {
    number: "4",
    title: "Despliegue y Capacitación",
    description: "Lanzamos con tu equipo, capacitamos usuarios clave, proveemos documentación y soporte continuo",
    icon: "🚀",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <section
      id="proceso"
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: "#060d1f" }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #667eea, #764ba2)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 dot-grid opacity-30 pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-violet-400 uppercase mb-3"
          >
            Proceso
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-fluid-h2 text-white mb-4"
            style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800 }}
          >
            Proceso simple y{" "}
            <span className="text-gradient-primary">transparente</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-400 text-base"
          >
            De consulta a despliegue en 4–6 semanas
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line desktop */}
          <div
            className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(102,126,234,0.3) 20%, rgba(102,126,234,0.3) 80%, transparent)",
              borderTop: "none",
            }}
            aria-hidden="true"
          >
            <div className="w-full h-px border-t-2 border-dashed" style={{ borderColor: "rgba(102,126,234,0.3)" }} />
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center text-center"
            >
              {/* Circle */}
              <div
                className="w-24 h-24 rounded-full flex flex-col items-center justify-center mb-6 relative z-10 step-glow"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
                aria-hidden="true"
              >
                <span className="text-2xl mb-0.5">{step.icon}</span>
                <span
                  className="text-white text-sm font-bold"
                  style={{ fontFamily: "var(--font-syne, sans-serif)" }}
                >
                  0{step.number}
                </span>
              </div>

              <h3
                className="text-white font-bold text-base mb-3 leading-snug"
                style={{ fontFamily: "var(--font-syne, sans-serif)" }}
              >
                {step.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="#contacto"
            onClick={(e) => { e.preventDefault(); document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-sm glow-pulse"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              fontFamily: "var(--font-dm-sans, sans-serif)",
            }}
          >
            Empezar con una llamada gratuita →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
