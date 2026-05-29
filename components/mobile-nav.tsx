"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeSwitch } from "./theme-switch";

interface MobileNavProps {
  links: { label: string; href: string }[];
  scrolled: boolean;
}

export function MobileNav({ links, scrolled }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setOpen(false);
    setTimeout(() => {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="flex items-center gap-2 md:hidden">
      <ThemeSwitch scrolled={scrolled} />
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg transition-colors"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
      >
        {open ? (
          <X
            size={24}
            className={scrolled ? "text-foreground" : "text-white"}
          />
        ) : (
          <Menu
            size={24}
            className={scrolled ? "text-foreground" : "text-white"}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-72 bg-white dark:bg-slate-950 z-50 shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <span className="font-bold text-xl text-slate-900 dark:text-white">
                  Aether IA <span className="text-gradient-primary">Systems</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-900 transition-colors"
                  aria-label="Cerrar menú"
                >
                  <X size={20} className="text-gray-600 dark:text-slate-300" />
                </button>
              </div>

              <nav className="flex-1 p-6" aria-label="Menú móvil">
                <ul className="space-y-1" role="list">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-slate-200 font-medium hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-violet-500/10 dark:hover:text-violet-200 transition-colors"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                <a
                  href="#contacto"
                  onClick={(e) => handleNavClick(e, "#contacto")}
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg text-white font-semibold"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  Agendar Consulta
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
