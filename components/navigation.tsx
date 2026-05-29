"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { MobileNav } from "./mobile-nav";
import { ThemeSwitch } from "./theme-switch";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (y) => setScrolled(y > 30));
  }, [scrollY]);

  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href.slice(1));
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "color-mix(in oklab, var(--background) 88%, transparent)"
          : "rgba(15,23,42,0.15)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid color-mix(in oklab, var(--border) 70%, rgba(102,126,234,0.28))"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.06)" : "none",
      }}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
        aria-label="Navegación principal"
      >
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-0.5"
          style={{ fontFamily: "var(--font-syne, sans-serif)", fontWeight: 800, fontSize: "1.25rem" }}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          <span className="transition-colors" style={{ color: scrolled ? "var(--foreground)" : "#fff" }}>
            Aether IA
          </span>
          <span className="text-gradient-primary"> Systems</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-2 rounded-2xl p-1" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative inline-flex overflow-hidden rounded-xl px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-200"
                  style={{
                    color: scrolled
                      ? isActive ? "#667eea" : "color-mix(in oklab, var(--foreground) 78%, transparent)"
                      : isActive ? "#c4b5fd" : "rgba(255,255,255,0.82)",
                    fontFamily: "var(--font-dm-sans, sans-serif)",
                  }}
                  aria-current={isActive ? "location" : undefined}
                >
                  {isActive && (
                    <motion.span
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: scrolled
                          ? "rgba(102,126,234,0.10)"
                          : "rgba(255,255,255,0.09)",
                        boxShadow: scrolled
                          ? "inset 0 0 0 1px rgba(102,126,234,0.18)"
                          : "inset 0 0 0 1px rgba(255,255,255,0.10)",
                      }}
                      layoutId="nav-active-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <motion.span
                    className="relative z-10"
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                  {link.label}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      className="absolute bottom-1.5 left-3.5 right-3.5 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(90deg, #667eea, #a78bfa)" }}
                      layoutId="nav-underline"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-5">
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-px"
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              boxShadow: "0 2px 12px rgba(102,126,234,0.35)",
              fontFamily: "var(--font-dm-sans, sans-serif)",
            }}
          >
            Agendar Consulta
          </a>
          <ThemeSwitch scrolled={scrolled} />
        </div>

        <MobileNav links={NAV_LINKS} scrolled={scrolled} />
      </nav>
    </motion.header>
  );
}
