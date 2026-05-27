"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { MobileNav } from "./mobile-nav";

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
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(255,255,255,0.88)"
          : "rgba(15,23,42,0.15)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: scrolled
          ? "1px solid rgba(102,126,234,0.18)"
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
          <span style={{ color: scrolled ? "#0F172A" : "#fff", transition: "color 0.3s" }}>
            Aether
          </span>
          <span className="text-gradient-primary"> AI</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8" role="list">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative text-sm font-medium tracking-wide transition-colors duration-200"
                  style={{
                    color: scrolled
                      ? isActive ? "#667eea" : "#374151"
                      : isActive ? "#c4b5fd" : "rgba(255,255,255,0.82)",
                    fontFamily: "var(--font-dm-sans, sans-serif)",
                  }}
                  aria-current={isActive ? "location" : undefined}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                      style={{ background: "linear-gradient(90deg, #667eea, #a78bfa)" }}
                      layoutId="nav-underline"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href="#contacto"
          onClick={(e) => handleNavClick(e, "#contacto")}
          className="hidden md:inline-flex items-center px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 hover:-translate-y-px"
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            boxShadow: "0 2px 12px rgba(102,126,234,0.35)",
            fontFamily: "var(--font-dm-sans, sans-serif)",
          }}
        >
          Agendar Consulta
        </a>

        <MobileNav links={NAV_LINKS} scrolled={scrolled} />
      </nav>
    </motion.header>
  );
}
