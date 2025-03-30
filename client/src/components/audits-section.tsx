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
                <motion.div
                  className={`audit-card rounded-xl overflow-hidden p-6 relative group cursor-pointer backdrop-blur-sm h-full
                    bg-gradient-to-br from-card/80 to-background/80 border border-white/5
                    ${!audit.reportFile ? 'pointer-events-none opacity-70' : ''}`}
                  whileHover={{ 
                    y: -5,
                    boxShadow: [
                      "0 10px 30px -10px rgba(0, 0, 0, 0.3)", 
                      `0 15px 30px -10px rgba(0, 0, 0, 0.3), 0 5px 15px -5px ${audit.categoryColor}30`
                    ],
                    borderColor: `${audit.categoryColor}40`,
                    scale: 1.02
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 15
                  }}
                >
                  {/* Animated background gradient */}
                  <motion.div 
                    className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20"
                    initial={false}
                    whileHover={{ 
                      opacity: 0.2,
                      background: `radial-gradient(circle at top right, ${audit.categoryColor}40, transparent 60%)`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  
                  {/* Category tag with glow effect */}
                  <motion.div 
                    className={`absolute top-0 right-0 bg-${audit.categoryColor}/20 text-${audit.categoryColor} text-xs font-mono px-3 py-1 rounded-bl-lg z-10`}
                    whileHover={{ 
                      boxShadow: `0 0 8px ${audit.categoryColor}50`,
                      backgroundColor: `${audit.categoryColor}30`
                    }}
                  >
                    {audit.category.charAt(0).toUpperCase() + audit.category.slice(1)}
                  </motion.div>
                  
                  <div className="mb-4 relative z-10">
                    <motion.div 
                      className={`w-12 h-12 rounded-lg bg-${audit.iconBg} flex items-center justify-center mb-4 text-xl font-bold shadow-md`}
                      whileHover={{ 
                        scale: 1.1, 
                        boxShadow: `0 0 15px ${audit.iconBg}80` 
                      }}
                      transition={{ 
                        scale: { type: "spring", stiffness: 400, damping: 10 }
                      }}
                    >
                      <motion.span
                        animate={{ 
                          textShadow: [
                            '0 0 0px rgba(255, 255, 255, 0)', 
                            '0 0 5px rgba(255, 255, 255, 0.5)', 
                            '0 0 0px rgba(255, 255, 255, 0)'
                          ] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatType: "reverse" as const
                        }}
                      >
                        {audit.iconSymbol}
                      </motion.span>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors relative inline-block"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 500, damping: 17 }}
                    >
                      {audit.title}
                      {/* Animated underline */}
                      <motion.span 
                        className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary" 
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    </motion.h3>
                    
                    <p className="text-muted-foreground text-sm group-hover:text-gray-200 transition-colors duration-300">
                      {audit.description}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-sm font-mono relative z-10">
                    <motion.div 
                      className="flex items-center space-x-2"
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 700, damping: 20 }}
                    >
                      <motion.span 
                        className={`w-2 h-2 rounded-full bg-${audit.statusColor}-400`}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatType: "loop" as const
                        }}
                      />
                      <span className={`text-${audit.statusColor}-400`}>{audit.status}</span>
                    </motion.div>
                    <div className="text-muted-foreground">{audit.date}</div>
                  </div>
                  
                  {audit.reportFile && (
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  {audit.reportFile && (
                    <motion.div 
                      className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100"
                      initial={{ opacity: 0, y: 10 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.div 
                        className="text-primary bg-primary/10 rounded-full p-2 backdrop-blur-md"
                        whileHover={{ 
                          scale: 1.2, 
                          boxShadow: "0 0 10px rgba(0, 223, 216, 0.5)"
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400, 
                          damping: 10 
                        }}
                      >
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            duration: 1, 
                            repeat: Infinity, 
                            repeatDelay: 1 
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </motion.div>
                    </motion.div>
                  )}
                  
                  {/* Shine effect on hover */}
                  <motion.div 
                    className="absolute inset-0 z-20 opacity-0 overflow-hidden pointer-events-none"
                    initial={false}
                    whileHover={{ opacity: 1 }}
                  >
                    <motion.div 
                      className="w-full h-full opacity-0 group-hover:opacity-1"
                      initial={{ left: "-100%", top: "-100%" }}
                      whileHover={{ 
                        left: ["0%", "100%"],
                        top: ["0%", "100%"]
                      }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{
                        position: "absolute",
                        width: "50px",
                        height: "200%",
                        transform: "rotate(25deg)",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
                        zIndex: 20,
                      }}
                    />
                  </motion.div>
                </motion.div>
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
            <motion.button
              onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentPage === 1 
                  ? "opacity-50 cursor-not-allowed bg-card/50" 
                  : "bg-card/50 hover:bg-card/80 hover:text-primary"
              }`}
              whileHover={currentPage !== 1 ? { scale: 1.1, boxShadow: "0 0 10px rgba(0, 223, 216, 0.2)" } : {}}
              whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={`page-${i + 1}`}
                onClick={() => goToPage(i + 1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all ${
                  currentPage === i + 1
                    ? "bg-primary text-primary-foreground font-medium"
                    : "bg-card/50 hover:bg-card/80 hover:text-primary"
                }`}
                whileHover={currentPage !== i + 1 ? { scale: 1.1, backgroundColor: "rgba(0, 223, 216, 0.1)" } : {}}
                whileTap={currentPage !== i + 1 ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                {i + 1}
              </motion.button>
            ))}
            
            {/* Next Page Button */}
            <motion.button
              onClick={() => currentPage < totalPages && goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                currentPage === totalPages 
                  ? "opacity-50 cursor-not-allowed bg-card/50" 
                  : "bg-card/50 hover:bg-card/80 hover:text-primary"
              }`}
              whileHover={currentPage !== totalPages ? { scale: 1.1, boxShadow: "0 0 10px rgba(0, 223, 216, 0.2)" } : {}}
              whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </motion.div>
        )}
        
        {/* View All Button */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <motion.a 
            href="#" 
            className="relative inline-flex items-center gap-2 px-7 py-3 border border-white/10 rounded-full font-medium bg-card/50 overflow-hidden group hover:border-primary/20"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 25px -10px rgba(0, 0, 0, 0.3), 0 5px 15px -5px rgba(0, 223, 216, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {/* Animated background gradient */}
            <motion.div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 z-0"
              initial={false}
              whileHover={{ 
                background: `linear-gradient(135deg, rgba(0,223,216,0.15) 0%, rgba(0,0,0,0) 50%, rgba(145,94,255,0.15) 100%)`,
                backgroundSize: ['100% 100%', '200% 200%'],
                backgroundPosition: ['0% 0%', '100% 100%']
              }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 z-0 group-hover:opacity-100"
              initial={false}
              whileHover={{ 
                boxShadow: "inset 0 0 20px rgba(0, 223, 216, 0.3)",
                opacity: [0, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            
            {/* Button content */}
            <motion.span 
              className="relative z-10 pr-1"
              whileHover={{ x: -3 }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              View All Audits
            </motion.span>
            
            <motion.div 
              className="relative z-10 bg-primary/10 rounded-full p-1"
              whileHover={{ 
                x: 3,
                backgroundColor: "rgba(0, 223, 216, 0.2)"
              }}
              transition={{ type: "spring", stiffness: 700, damping: 30 }}
            >
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 text-primary" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ x: [0, 4, 0] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatDelay: 1 
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </motion.svg>
            </motion.div>
            
            {/* Particle effect on hover */}
            <AnimatePresence>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 rounded-full bg-primary/80 z-10"
                  initial={{ 
                    opacity: 0, 
                    scale: 0,
                    x: "70%",
                    y: "50%"
                  }}
                  whileHover={{ 
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                    x: ["70%", `${85 + i * 10}%`],
                    y: ["50%", `${40 - i * 10}%`]
                  }}
                  transition={{ 
                    duration: 1 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: i * 0.2
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default AuditsSection;
