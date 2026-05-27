import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
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
    "Sistemas de IA que califican leads, analizan datos y automatizan procesos. Aumenta conversión 40% y ahorra 15+ horas semanales.",
  keywords:
    "IA empresarial, automatización, lead qualification, ERP con IA, Panama",
  openGraph: {
    title: "Aether AI | Automatización Inteligente para Empresas",
    description:
      "Sistemas de IA que califican leads, analizan datos y automatizan procesos.",
    type: "website",
    locale: "es_PA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aether AI | Automatización Inteligente para Empresas",
    description:
      "Sistemas de IA que califican leads, analizan datos y automatizan procesos.",
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
  contactPoint: {
    "@type": "ContactPoint",
    email: "developernpicado@gmail.com",
    telephone: "+507-6134-6051",
    contactType: "customer service",
  },
  offers: [
    { "@type": "Offer", name: "AI Lead Qualification System" },
    { "@type": "Offer", name: "Smart ERP con IA" },
    { "@type": "Offer", name: "Business Knowledge Assistant" },
    { "@type": "Offer", name: "AI Voice Calling System" },
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
        {children}
      </body>
    </html>
  );
}
