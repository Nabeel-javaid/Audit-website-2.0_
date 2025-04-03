import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { audits, AuditCategory } from "@/data/audits";

const AuditsSection = () => {
  const [activeFilter, setActiveFilter] = useState<AuditCategory | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const auditsPerPage = 6; // Show 6 audits per page as requested
  
  // Filter audits by category
  const filterAudits = () => {
    if (activeFilter === "all") {
      return audits;
    }
    return audits.filter(audit => audit.category === activeFilter);
  };

  const filteredAudits = filterAudits();
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredAudits.length / auditsPerPage);
  const indexOfLastAudit = currentPage * auditsPerPage;
  const indexOfFirstAudit = indexOfLastAudit - auditsPerPage;
  const currentAudits = filteredAudits.slice(indexOfFirstAudit, indexOfLastAudit);
  
  // Reset to first page when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);
  
  // Handle page change
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to the top of the audits section
    document.getElementById('audits')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer(0.05, 0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          key={`audits-page-${currentPage}-${activeFilter}`} // Force re-render when page or category changes
        >
          {currentAudits.map((audit, index) => (
            <motion.div 
              key={audit.id}
              variants={fadeIn("up", "spring", index * 0.05, 0.75)}
              className="h-full"
            >
              <Link href={audit.reportFile ? `/audit/${audit.reportFile}` : '#'}>
                <div
                  className={`audit-card rounded-xl overflow-hidden p-6 relative group cursor-pointer backdrop-blur-sm h-full
                    bg-gradient-to-br from-card/80 to-background/80 border border-white/5
                    ${!audit.reportFile ? 'pointer-events-none opacity-70' : ''} 
                    hover:border-primary/20 transition-all duration-300`}
                >
                  {/* Simplified background */}
                  <div 
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at top right, ${audit.categoryColor}40, transparent 60%)`
                    }}
                  />
                  
                  {/* Category tag with simplified effect */}
                  <div 
                    className={`absolute top-0 right-0 bg-${audit.categoryColor}/20 text-${audit.categoryColor} text-xs font-mono px-3 py-1 rounded-bl-lg z-10 hover:bg-${audit.categoryColor}/30 transition-colors duration-300`}
                  >
                    {audit.category.charAt(0).toUpperCase() + audit.category.slice(1)}
                  </div>
                  
                  <div className="mb-4 relative z-10">
                    <div 
                      className={`w-12 h-12 rounded-lg bg-${audit.iconBg} flex items-center justify-center mb-4 text-xl font-bold shadow-md`}
                    >
                      <span>
                        {audit.iconSymbol}
                      </span>
                    </div>
                    
                    <h3 
                      className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors relative inline-block"
                    >
                      {audit.title}
                      {/* Simplified underline */}
                      <span 
                        className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" 
                      />
                    </h3>
                    
                    <p className="text-muted-foreground text-sm group-hover:text-gray-200 transition-colors duration-300">
                      {audit.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm font-mono relative z-10">
                    <div className="flex items-center space-x-2">
                      <span className={`w-2 h-2 rounded-full bg-${audit.statusColor}-400`} />
                      <span className={`text-${audit.statusColor}-400`}>{audit.status}</span>
                    </div>
                    <div className="text-muted-foreground">{audit.date}</div>
                  </div>
                  
                  {audit.reportFile && (
                    <div 
                      className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                    />
                  )}
                  
                  {/* Arrow icon removed from here */}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="flex justify-center mt-12 gap-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Previous Page Button */}
            <button
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentPage === 1 
                  ? "opacity-50 cursor-not-allowed bg-card/50" 
                  : "bg-card/50 hover:bg-card/80 hover:text-primary"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={`page-${i + 1}`}
                onClick={() => goToPage(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-card/50 hover:bg-card/80 hover:text-primary"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            {/* Next Page Button */}
            <button
              onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentPage === totalPages 
                  ? "opacity-50 cursor-not-allowed bg-card/50" 
                  : "bg-card/50 hover:bg-card/80 hover:text-primary"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AuditsSection;