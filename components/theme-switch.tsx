"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeSwitch({ scrolled = false }: { scrolled?: boolean }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-9 w-[4.25rem] shrink-0 items-center rounded-full border p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      style={{
        background: isDark
          ? "rgba(15,23,42,0.86)"
          : scrolled
            ? "rgba(248,250,252,0.92)"
            : "rgba(255,255,255,0.12)",
        borderColor: isDark
          ? "rgba(167,139,250,0.35)"
          : scrolled
            ? "rgba(102,126,234,0.24)"
            : "rgba(255,255,255,0.22)",
        boxShadow: isDark
          ? "0 0 20px rgba(102,126,234,0.25)"
          : "0 8px 22px rgba(15,23,42,0.08)",
      }}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      aria-pressed={isDark}
    >
      <span
        className="absolute left-2 text-[0px]"
        aria-hidden="true"
      >
        <Sun
          size={14}
          className={isDark ? "text-slate-500" : scrolled ? "text-violet-600" : "text-white"}
        />
      </span>
      <span className="absolute right-2" aria-hidden="true">
        <Moon
          size={14}
          className={isDark ? "text-violet-200" : scrolled ? "text-slate-400" : "text-white/55"}
        />
      </span>
      <motion.span
        className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white shadow-sm"
        animate={{ x: isDark ? 31 : 0 }}
        transition={{ type: "spring", stiffness: 520, damping: 34 }}
      >
        {isDark ? (
          <Moon size={14} className="text-violet-600" aria-hidden="true" />
        ) : (
          <Sun size={14} className="text-amber-500" aria-hidden="true" />
        )}
      </motion.span>
    </button>
  );
}
