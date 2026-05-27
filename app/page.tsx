import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { StatsBar } from "@/components/stats-bar";
import { UseCasesGrid } from "@/components/use-cases-grid";
import { ProjectsSection } from "@/components/projects-section";
import { HowItWorks } from "@/components/how-it-works";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { FloatingContactButtons } from "@/components/floating-contact-buttons";

export default function Home() {
  return (
    <>
      <Navigation />
      <main id="main-content">
        <HeroSection />
        <StatsBar />
        <UseCasesGrid />
        <ProjectsSection />
        <HowItWorks />
        <ContactForm />
      </main>
      <Footer />
      <FloatingContactButtons />
    </>
  );
}
