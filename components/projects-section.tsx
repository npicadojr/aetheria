"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpenText, PhoneCall } from "lucide-react";
import { ProjectCard } from "./project-card";

const PROJECTS = [
  {
    number: "01",
    badgeColor: "green" as const,
    title: "Asistente de Conocimiento Empresarial",
    description:
      "Los documentos, políticas y conocimiento tribal de tu empresa—buscables en segundos. Sube contratos, manuales, reportes y docs internos, luego haz preguntas como si hablaras con un experto que leyó todo.",
    features: [
      "Sube PDFs, Word docs, presentaciones, contratos, manuales",
      "Búsqueda semántica en todos los documentos simultáneamente",
      "Respuestas con citas de fuente y referencias de página",
      "Maneja consultas complejas que abarcan múltiples documentos",
      "Se actualiza automáticamente cuando se agregan nuevos documentos",
    ],
    calloutIcon: BookOpenText,
    calloutTitle: "Perfecto para:",
    callout: "Firmas legales, agencias consultoras, departamentos de HR — equipos con documentación extensa que necesita ser instantáneamente accesible",
  },
  {
    number: "02",
    badgeColor: "purple" as const,
    title: "Sistema de Llamadas por Voz con IA",
    description:
      "Llamadas telefónicas automatizadas impulsadas por IA que agendan citas, conducen encuestas o brindan soporte al cliente—sin intervención humana. Conversaciones naturales que se sienten reales, disponibles 24/7 en múltiples idiomas.",
    features: [
      "Agendamiento de citas con integración de calendario",
      "Encuestas de satisfacción del cliente y recopilación de feedback",
      "Soporte al cliente de nivel 1 y respuesta a FAQs",
      "Seguimiento de ventas y recuperación de carritos abandonados",
      "Transcripción y análisis post-llamada automáticos",
    ],
    calloutIcon: PhoneCall,
    calloutTitle: "Perfecto para:",
    callout: "Call centers, equipos de ventas B2B, clínicas médicas, e-commerce — cualquiera que necesite escalar comunicación por voz sin contratar masivamente",
  },
];

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section id="proyectos" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold tracking-widest text-violet-500 uppercase mb-3"
          >
            Proyectos
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-fluid-h2 text-slate-900 dark:text-white mb-5"
            style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800 }}
          >
            Qué estamos{" "}
            <span className="text-gradient-primary">construyendo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-base leading-relaxed"
          >
            Sistemas de IA especializados diseñados para resolver problemas de
            negocio específicos y de alto valor
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
