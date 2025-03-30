import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AuditsSection from "@/components/audits-section";
import ExpertiseSection from "@/components/expertise-section";
import StatsSection from "@/components/stats-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import ParticleBackground from "@/components/particle-background";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <ParticleBackground />
      <Header />
      <main>
        <HeroSection />
        <AuditsSection />
        <ExpertiseSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
