"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingContactButtons() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -10]);
  const scale = useTransform(scrollY, [0, 260], [1, 1.02]);

  return (
    <motion.div
      className="fixed right-4 bottom-4 z-40 flex items-center sm:right-6 sm:bottom-6"
      style={{ y, scale }}
      aria-label="Acciones rápidas de contacto"
    >
      <motion.a
        href="https://wa.me/50761346051"
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold text-white shadow-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:h-13 sm:px-5"
        style={{
          background: "linear-gradient(135deg, #16A34A 0%, #22C55E 48%, #10B981 100%)",
          boxShadow: "0 16px 34px rgba(16,185,129,0.28), 0 0 0 1px rgba(255,255,255,0.22) inset",
          fontFamily: "var(--font-dm-sans, sans-serif)",
        }}
        whileHover={{ y: -3, scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        <MessageCircle size={18} strokeWidth={2.2} aria-hidden="true" />
        <span className="hidden sm:inline">WhatsApp</span>
      </motion.a>
    </motion.div>
  );
}
