import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "@/lib/motion";

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-12 relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <motion.div 
          className="space-y-8"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div 
            variants={fadeIn("right", "spring", 0.1, 0.75)}
            className="inline-block p-1 px-3 border border-primary/30 rounded-full bg-primary/5 animate-pulse"
          >
            <p className="text-xs text-primary font-mono">Securing the blockchain future</p>
          </motion.div>
          
          <motion.h1 
            variants={fadeIn("right", "spring", 0.2, 0.75)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Smart Contract <br />
            <span className="text-gradient glow-text">Security Auditor</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeIn("right", "spring", 0.3, 0.75)}
            className="text-muted-foreground text-lg max-w-md"
          >
            Protecting blockchain innovations through comprehensive security analysis and vulnerability detection.
          </motion.p>
          
          <motion.div 
            variants={fadeIn("right", "spring", 0.4, 0.75)}
            className="flex flex-wrap gap-4"
          >
            <a 
              href="#audits" 
              className="px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-medium hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-1"
            >
              View Audits
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3 border border-white/10 hover:border-primary/30 rounded-full font-medium bg-card/50 hover:bg-card/80 transition-all transform hover:-translate-y-1"
            >
              Contact Me
            </a>
          </motion.div>
          
          <motion.div 
            variants={fadeIn("right", "spring", 0.5, 0.75)}
            className="flex items-center gap-6 pt-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-primary/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium">Certified</h4>
                <p className="text-xs text-muted-foreground">Smart Contract Auditor</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-card flex items-center justify-center border border-secondary/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium">100+</h4>
                <p className="text-xs text-muted-foreground">Audits Completed</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="relative hidden md:block">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/20 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"></div>
          
          <motion.div 
            variants={slideIn("left", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="relative z-10 max-w-md mx-auto"
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              repeatType: "loop" 
            }}
          >
            <div className="p-1 rounded-3xl bg-gradient-to-r from-primary/70 via-secondary/70 to-destructive/70">
              <div className="bg-background rounded-3xl relative overflow-hidden">
                <div className="p-8 font-mono text-sm">
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <span className="text-muted-foreground">//</span>
                      <span className="text-primary">SMART CONTRACT AUDIT</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">function <span className="text-secondary">auditContract</span>() {'{'}</p>
                      <p className="pl-4 text-foreground">const vulnerabilities = [];</p>
                      <p className="pl-4 text-foreground">const mitigations = [];</p>
                      <p className="pl-4 text-muted-foreground">// Scanning for issues</p>
                      <p className="pl-4 text-foreground">scan<span className="text-secondary">(</span>codebase<span className="text-secondary">)</span>;</p>
                      <p className="pl-4 text-foreground">analyze<span className="text-secondary">(</span>vulnerabilities<span className="text-secondary">)</span>;</p>
                      <p className="pl-4 text-foreground">report<span className="text-secondary">(</span>findings<span className="text-secondary">)</span>;</p>
                      <p className="text-muted-foreground">{'}'}</p>
                    </div>
                    <div className="relative line-glitch">
                      <p className="text-primary">// Secure. Reliable. Future-proof.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-0 opacity-20 pointer-events-none">
        <div className="absolute bottom-0 left-[10%] w-px h-[30vh] bg-gradient-to-t from-primary to-transparent"></div>
        <div className="absolute bottom-0 left-[25%] w-px h-[35vh] bg-gradient-to-t from-secondary to-transparent"></div>
        <div className="absolute bottom-0 left-[40%] w-px h-[20vh] bg-gradient-to-t from-primary to-transparent"></div>
        <div className="absolute bottom-0 left-[60%] w-px h-[40vh] bg-gradient-to-t from-secondary to-transparent"></div>
        <div className="absolute bottom-0 left-[75%] w-px h-[25vh] bg-gradient-to-t from-primary to-transparent"></div>
        <div className="absolute bottom-0 left-[90%] w-px h-[30vh] bg-gradient-to-t from-secondary to-transparent"></div>
      </div>
    </section>
  );
};

export default HeroSection;
