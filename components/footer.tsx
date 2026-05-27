"use client";

export function Footer() {
  const scrollTo = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href === "#") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="px-4 sm:px-6 lg:px-8" style={{ background: "#060d1f" }}>
      {/* Gradient top border */}
      <div
        className="h-px w-full mb-8"
        style={{ background: "linear-gradient(90deg, transparent, rgba(102,126,234,0.5) 30%, rgba(167,139,250,0.5) 70%, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto pb-7">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mb-8">
          {/* Col 1 */}
          <div>
            <div
              className="text-xl font-black text-white mb-3"
              style={{ fontFamily: "var(--font-syne, sans-serif)", letterSpacing: "-0.03em" }}
            >
              Aether <span className="text-gradient-primary">AI</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Construyendo sistemas inteligentes que automatizan procesos de
              negocio y entregan resultados medibles.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
              Servicios
            </h3>
            <ul className="space-y-2">
              {["Asistentes de conocimiento", "Llamadas con IA"].map((item) => (
                <li key={item}>
                  <span className="text-slate-500 text-xs hover:text-slate-300 transition-colors cursor-default">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 tracking-wide" style={{ fontFamily: "var(--font-syne, sans-serif)" }}>
              Empresa
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Sitio Principal", href: "#" },
                { label: "Casos de Uso", href: "#servicios" },
                { label: "Proceso", href: "#proceso" },
                { label: "Contacto", href: "#contacto" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} onClick={scrollTo(item.href)} className="text-slate-500 text-xs hover:text-slate-300 transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800/60 pt-5 text-center">
          <p className="text-slate-600 text-xs">© 2026 Aether AI. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
