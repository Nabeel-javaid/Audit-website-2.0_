import React, { Suspense, lazy } from 'react';
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ParticleBackground from "@/components/particle-background";
import StatsSection from "@/components/stats-section";
import AuditMethodologySection from "@/components/audit-methodology-section";

// Lazy load less critical components
const AuditsSection = lazy(() => import("@/components/audits-section"));
const TechnologiesSection = lazy(() => import("@/components/technologies-section"));
const ContactSection = lazy(() => import("@/components/contact-section"));
const Footer = lazy(() => import("@/components/footer"));

// Simple loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-20">
    <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
  </div>
);

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <ParticleBackground />
      <Header />
      <main>
        <HeroSection />

        <StatsSection />

        <AuditMethodologySection />

        <Suspense fallback={<LoadingFallback />}>
          <AuditsSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <TechnologiesSection />
        </Suspense>

        <Suspense fallback={<LoadingFallback />}>
          <ContactSection />
        </Suspense>
      </main>

      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
