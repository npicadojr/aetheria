"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ProjectCard } from "./project-card";

const PROJECTS = [
  {
    number: "01",
    badge: "Beta Program Open",
    badgeColor: "yellow" as const,
    title: "Sistema de Calificación Inteligente de Leads",
    description:
      "Analiza, puntúa y responde automáticamente a cada lead que llega por tu sitio web. Los leads calientes reciben atención inmediata, los fríos obtienen nutrición automatizada, y tu equipo de ventas solo habla con prospectos calificados.",
    techStack: ["Python", "Claude API", "FastAPI", "Webhooks", "CRM Integration", "Calendar API"],
    metrics: [
      { value: "<2min", label: "Tiempo de respuesta" },
      { value: "40%", label: "Aumento en conversión" },
      { value: "60%", label: "Menos carga en ventas" },
    ],
    features: [
      "Analiza formularios y extrae información clave",
      "Asigna puntajes basados en presupuesto, tamaño de empresa, urgencia, pain point",
      "Genera respuestas personalizadas automáticamente",
      "Agenda citas en calendario para leads de alto valor",
      "Crea entradas en CRM con contexto completo e insights",
      "Notifica al equipo de ventas vía Slack/email solo para leads calientes",
    ],
    calloutIcon: "🎯",
    calloutTitle: "Perfecto para:",
    callout: "Empresas SaaS, agencias, consultorías, servicios B2B — cualquiera que reciba 30+ leads al mes",
  },
  {
    number: "02",
    badge: "En Desarrollo",
    badgeColor: "blue" as const,
    title: "ERP Inteligente con Consultas en Lenguaje Natural",
    description:
      "Sistema de gestión empresarial ligero con superpoderes de IA. Administra inventario, rastrea ventas, analiza clientes—luego haz preguntas en español simple y obtén insights instantáneos sin tocar una hoja de cálculo.",
    techStack: ["Next.js", "PostgreSQL", "Claude API", "Analytics", "React", "shadcn/ui"],
    features: [
      "Gestión de Inventario: Rastrea stock, alertas de bajo inventario, predicción de reabastecimiento",
      "Seguimiento de Ventas: Órdenes, facturas, analítica de ingresos con análisis de tendencias",
      "Inteligencia de Clientes: Perfiles, historial de compras, predicciones de valor de vida",
      "Consultas en Lenguaje Natural sobre tus datos con respuesta instantánea",
      "Insights Automatizados: Resúmenes diarios, detección de anomalías, pronósticos",
    ],
    calloutIcon: "💡",
    calloutTitle: "Perfecto para:",
    callout: "Pequeñas manufactureras, mayoristas, negocios retail — empresas que superaron las hojas de cálculo pero no están listas para SAP",
  },
  {
    number: "03",
    badge: "Q3 2026",
    badgeColor: "green" as const,
    title: "Asistente de Conocimiento Empresarial",
    description:
      "Los documentos, políticas y conocimiento tribal de tu empresa—buscables en segundos. Sube contratos, manuales, reportes y docs internos, luego haz preguntas como si hablaras con un experto que leyó todo.",
    techStack: ["Python", "RAG", "Vector Database", "Claude API", "Document Processing"],
    features: [
      "Sube PDFs, Word docs, presentaciones, contratos, manuales",
      "Búsqueda semántica en todos los documentos simultáneamente",
      "Respuestas con citas de fuente y referencias de página",
      "Maneja consultas complejas que abarcan múltiples documentos",
      "Se actualiza automáticamente cuando se agregan nuevos documentos",
    ],
    calloutIcon: "📚",
    calloutTitle: "Perfecto para:",
    callout: "Firmas legales, agencias consultoras, departamentos de HR — equipos con documentación extensa que necesita ser instantáneamente accesible",
  },
  {
    number: "04",
    badge: "Nuevo Servicio",
    badgeColor: "purple" as const,
    title: "Sistema de Llamadas por Voz con IA",
    description:
      "Llamadas telefónicas automatizadas impulsadas por IA que califican leads, agendan citas, conducen encuestas o brindan soporte al cliente—sin intervención humana. Conversaciones naturales que se sienten reales, disponibles 24/7 en múltiples idiomas.",
    techStack: ["Twilio Voice API", "Claude API", "ElevenLabs Voice", "Speech-to-Text", "Real-time Processing"],
    features: [
      "Calificación de leads por teléfono con análisis conversacional",
      "Agendamiento de citas con integración de calendario",
      "Encuestas de satisfacción del cliente y recopilación de feedback",
      "Soporte al cliente de nivel 1 y respuesta a FAQs",
      "Seguimiento de ventas y recuperación de carritos abandonados",
      "Transcripción y análisis post-llamada automáticos",
    ],
    calloutIcon: "📞",
    calloutTitle: "Perfecto para:",
    callout: "Call centers, equipos de ventas B2B, clínicas médicas, e-commerce — cualquiera que necesite escalar comunicación por voz sin contratar masivamente",
  },
];

export function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section id="proyectos" ref={ref} className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
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
            className="text-fluid-h2 text-slate-900 mb-5"
            style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800 }}
          >
            Qué estamos{" "}
            <span className="text-gradient-primary">construyendo</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed"
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
