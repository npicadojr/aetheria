import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aether AI | Automatización Inteligente para Empresas",
  description:
    "Sistemas de IA que analizan datos, automatizan procesos y reducen trabajo manual. Ahorra 15+ horas semanales con flujos inteligentes.",
  keywords:
    "IA empresarial, automatización, asistentes de conocimiento, llamadas con IA, Panama",
  openGraph: {
    title: "Aether AI | Automatización Inteligente para Empresas",
    description:
      "Sistemas de IA que analizan datos, automatizan procesos y reducen trabajo manual.",
    type: "website",
    locale: "es_PA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aether AI | Automatización Inteligente para Empresas",
    description:
      "Sistemas de IA que analizan datos, automatizan procesos y reducen trabajo manual.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Aether AI",
  description:
    "Sistemas de automatización inteligente para empresas en Panamá y Latinoamérica",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Panamá",
    addressCountry: "PA",
  },
  offers: [
    { "@type": "Offer", name: "Asistente de conocimiento empresarial" },
    { "@type": "Offer", name: "Sistema de llamadas con IA" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-dm-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded"
        >
          Saltar al contenido principal
        </a>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
