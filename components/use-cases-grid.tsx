"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChartNoAxesCombined, Workflow } from "lucide-react";
import { UseCaseCard } from "./use-case-card";

const USE_CASES = [
  {
    icon: ChartNoAxesCombined,
    gradient: "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)",
    glowColor: "#3B82F6",
    borderColor: "#3B82F6",
    title: "¿Necesitas insights, no solo datos?",
    problem:
      "Tus datos están en spreadsheets, bases de datos y PDFs. Obtener respuestas requiere horas de análisis manual. Las decisiones esperan mientras procesas números.",
    solution:
      "Haz preguntas en lenguaje natural, obtén insights instantáneos de tus datos",
  },
  {
    icon: Workflow,
    gradient: "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)",
    glowColor: "#06B6D4",
    borderColor: "#06B6D4",
    title: "¿Procesos manuales matando productividad?",
    problem:
      "Tu equipo copia datos entre sistemas, responde las mismas preguntas diariamente, y pasa horas en tareas que una máquina podría hacer en segundos.",
    solution:
      "Automatiza workflows, integra sistemas, elimina trabajo repetitivo",
  },
];

export function UseCasesGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section id="servicios" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-violet-500 uppercase mb-3"
            style={{ fontFamily: "var(--font-dm-sans, sans-serif)" }}
          >
            Casos de uso
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-fluid-h2 text-slate-900 dark:text-white mb-5"
            style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800 }}
          >
            Construido para problemas{" "}
            <span className="text-gradient-primary">reales de negocio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base leading-relaxed"
          >
            Sistemas de IA que resuelven los problemas tediosos y que consumen
            tiempo de tu equipo
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {USE_CASES.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <UseCaseCard {...useCase} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
