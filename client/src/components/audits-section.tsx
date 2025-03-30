import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { audits, AuditCategory } from "@/data/audits";

const AuditsSection = () => {
  const [activeFilter, setActiveFilter] = useState<AuditCategory | "all">("all");
  
  const filterAudits = () => {
    if (activeFilter === "all") {
      return audits;
    }
    return audits.filter(audit => audit.category === activeFilter);
  };

  const filteredAudits = filterAudits();

  return (
    <section id="audits" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn("up", "spring", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Featured</span> Audits
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore my comprehensive smart contract security assessments across various blockchain platforms.
          </p>
        </motion.div>
        
        {/* Filter Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              activeFilter === "all" 
                ? "bg-primary/10 border border-primary/20 text-primary" 
                : "bg-card/50 border border-white/5 text-white hover:bg-card/80"
            } transition-all`}
            onClick={() => setActiveFilter("all")}
          >
            All Audits
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              activeFilter === "defi" 
                ? "bg-primary/10 border border-primary/20 text-primary" 
                : "bg-card/50 border border-white/5 text-white hover:bg-card/80"
            } transition-all`}
            onClick={() => setActiveFilter("defi")}
          >
            DeFi
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              activeFilter === "nft" 
                ? "bg-primary/10 border border-primary/20 text-primary" 
                : "bg-card/50 border border-white/5 text-white hover:bg-card/80"
            } transition-all`}
            onClick={() => setActiveFilter("nft")}
          >
            NFT
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              activeFilter === "dao" 
                ? "bg-primary/10 border border-primary/20 text-primary" 
                : "bg-card/50 border border-white/5 text-white hover:bg-card/80"
            } transition-all`}
            onClick={() => setActiveFilter("dao")}
          >
            DAO
          </button>
          <button 
            className={`px-5 py-2 rounded-full text-sm font-medium ${
              activeFilter === "gaming" 
                ? "bg-primary/10 border border-primary/20 text-primary" 
                : "bg-card/50 border border-white/5 text-white hover:bg-card/80"
            } transition-all`}
            onClick={() => setActiveFilter("gaming")}
          >
            Gaming
          </button>
        </div>
        
        {/* Audit Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAudits.map((audit, index) => (
            <Link key={audit.id} href={audit.reportFile ? `/audit/${audit.reportFile}` : '#'}>
              <div
                className={`audit-card rounded-xl overflow-hidden p-6 relative group cursor-pointer ${!audit.reportFile ? 'pointer-events-none' : ''}`}
              >
                <div className={`absolute top-0 right-0 bg-${audit.categoryColor}/20 text-${audit.categoryColor} text-xs font-mono px-3 py-1 rounded-bl-lg`}>
                  {audit.category.charAt(0).toUpperCase() + audit.category.slice(1)}
                </div>
                <div className="mb-4">
                  <div 
                    className={`w-12 h-12 rounded-lg bg-${audit.iconBg} flex items-center justify-center mb-4 text-xl font-bold`}
                  >
                    {audit.iconSymbol}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{audit.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {audit.description}
                  </p>
                </div>
                <div className="flex justify-between items-center text-sm font-mono">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full bg-${audit.statusColor}-400`}></span>
                    <span className={`text-${audit.statusColor}-400`}>{audit.status}</span>
                  </div>
                  <div className="text-muted-foreground">{audit.date}</div>
                </div>
                
                {audit.reportFile && (
                  <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"></div>
                )}
                
                {audit.reportFile && (
                  <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-primary bg-primary/10 rounded-full p-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="relative inline-flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full font-medium bg-card/50 overflow-hidden group hover:border-primary/20"
          >
            {/* Background hover effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 z-0 transition-opacity duration-300"></div>
            
            {/* Button content */}
            <span className="relative z-10">View All Audits</span>
            <div className="relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default AuditsSection;
