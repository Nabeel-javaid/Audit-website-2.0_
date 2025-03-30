import { motion, useInView, useAnimation } from "framer-motion";
import { fadeIn, staggerContainer, textVariant } from "@/lib/motion";
import { technologies } from "@/data/expertise";
import { useEffect, useRef } from "react";

const TechnologiesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const animationControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      animationControls.start("show");
    }
  }, [isInView, animationControls]);
  
  return (
    <section id="technologies" className="py-16 relative bg-card/10 overflow-hidden" ref={sectionRef}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 z-0"
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1 }
        }}
        initial="hidden"
        animate={animationControls}
      >
        {/* Static grid lines */}
        <div className="absolute inset-0 grid grid-cols-12 gap-4 opacity-10">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i}
              className="h-full w-px bg-primary/30 justify-self-center"
            />
          ))}
          {[...Array(12)].map((_, i) => (
            <div 
              key={`h-${i}`}
              className="w-full h-px bg-primary/20 col-span-12"
              style={{ top: `${(i + 1) * 8}%` }}
            />
          ))}
        </div>

        {/* Static orbs */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={`orb-${i}`}
            className="absolute rounded-full blur-3xl opacity-[0.03]"
            style={{
              width: 100 + Math.random() * 200,
              height: 100 + Math.random() * 200,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `rgba(${Math.random() * 100}, ${150 + Math.random() * 100}, ${200 + Math.random() * 55}, 0.1)`,
            }}
          />
        ))}
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={fadeIn("up", "spring", 0.1, 1)}
          initial="hidden"
          animate={animationControls}
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={textVariant(0.2)}
          >
            <span className="text-gradient">
              Technologies
            </span> & Platforms
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-xl mx-auto"
            variants={fadeIn("up", "spring", 0.3, 0.7)}
          >
            Expert in auditing smart contracts across these blockchain platforms and technologies
          </motion.p>
        </motion.div>
        
        {/* Technologies Grid */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 md:gap-8"
          variants={staggerContainer(0.03, 0.05)}
          initial="hidden"
          animate={animationControls}
          viewport={{ once: true, amount: 0.1 }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.05, 0.5)}
              className="w-24 h-24 flex flex-col items-center justify-center rounded-xl bg-background p-4 border border-white/5 hover:border-primary/20 transition-all transform-gpu"
              whileHover={{ 
                boxShadow: '0 0 25px -5px rgba(0, 223, 216, 0.3)',
                transition: {
                  duration: 0.3
                }
              }}
            >
              <div 
                className={`w-10 h-10 rounded-full bg-${tech.iconBg} flex items-center justify-center mb-2 text-${tech.iconColor} font-bold`}
              >
                <span>
                  {tech.iconSymbol}
                </span>
              </div>
              <span 
                className="text-xs text-center opacity-80 hover:opacity-100 hover:text-primary transition-all duration-300"
              >
                {tech.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologiesSection;