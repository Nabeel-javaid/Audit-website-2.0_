import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { fadeIn, slideIn, staggerContainer, textVariant } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import React from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, speed = 40 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return (
    <span>{displayedText}<span className="animate-pulse">|</span></span>
  );
};

interface FuturisticButtonProps {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}

const FuturisticButton: React.FC<FuturisticButtonProps> = ({ href, primary = false, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className={`relative px-6 py-3 rounded-full font-medium overflow-hidden transition-all transform hover:-translate-y-1 z-10
        ${primary ? "text-white" : "border border-white/10 hover:border-primary/30 bg-card/50 hover:bg-card/80"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {primary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary z-[-1]"
          initial={{ opacity: 1 }}
          animate={{
            opacity: isHovered ? [1, 0.8, 1] : 1,
            scale: isHovered ? [1, 1.05, 1] : 1
          }}
          transition={{
            opacity: { duration: 1, repeat: isHovered ? Infinity : 0 },
            scale: { duration: 1.5, repeat: isHovered ? Infinity : 0 }
          }}
        />
      )}

      {/* Glow effect when hovered */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={`absolute inset-0 rounded-full ${primary ? "bg-primary" : "bg-primary/30"} z-[-2] blur-xl`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1.2 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>

      {/* Particle effect on hover */}
      <AnimatePresence>
        {isHovered && (
          <>
            {[...Array(5)].map((_, idx) => (
              <motion.div
                key={idx}
                className={`absolute w-1 h-1 rounded-full ${primary ? "bg-white/80" : "bg-primary/80"}`}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  x: [0, (idx % 2 === 0 ? -20 : 20) * (1 + idx / 5)],
                  y: [0, -30 * (1 + idx / 5)],
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  duration: 1 + idx * 0.2,
                  repeat: Infinity,
                  repeatDelay: idx * 0.5
                }}
                style={{
                  left: `${20 + idx * 15}%`,
                  top: "50%",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {children}
    </motion.a>
  );
};

const HeroSection = () => {
  const codeContainerRef = useRef<HTMLDivElement>(null);
  const isCodeInView = useInView(codeContainerRef, { once: false, amount: 0.3 });
  const codeAnimation = useAnimation();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Start animations only after initial load
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isCodeInView) {
      codeAnimation.start({
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          duration: 1.2,
          bounce: 0.3
        }
      });
    } else {
      codeAnimation.start({
        opacity: 0.5,
        y: 20
      });
    }
  }, [isCodeInView, codeAnimation]);

  // Animated background lines
  const lineVariants = {
    initial: (i: number) => ({
      height: 0,
      transition: {
        delay: i * 0.2
      }
    }),
    animate: (i: number) => ({
      height: ["20vh", "40vh", "30vh"] as string[],
      transition: {
        delay: i * 0.2,
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    })
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      <div className="container mx-auto px-6 py-12 relative z-10 grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          className="space-y-8"
          variants={staggerContainer(0.1, 0.2)}
          initial="hidden"
          animate={isLoaded ? "show" : "hidden"}
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.div
            variants={fadeIn("right", "spring", 0.1, 0.75)}
            className="inline-block p-1 px-3 border border-primary/30 rounded-full bg-primary/5 relative group"
          >
            {/* Animated border effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            />
            <p className="text-xs text-primary font-mono relative z-10">Securing the blockchain future</p>
          </motion.div>

          <motion.h1
            variants={textVariant(0.3)}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Smart Contract <br />
            <motion.span
              className="text-gradient"
              animate={{
                textShadow: [
                  '0 0 5px rgba(168, 85, 247, 0.5)',
                  '0 0 15px rgba(168, 85, 247, 0.3)',
                  '0 0 5px rgba(168, 85, 247, 0.5)'
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse" as const
              }}
            >
              Security Auditor
            </motion.span>
          </motion.h1>

          <motion.p
            variants={fadeIn("right", "spring", 0.4, 0.75)}
            className="text-muted-foreground text-lg max-w-md"
          >
            Protecting blockchain innovations through comprehensive security analysis and vulnerability detection.
          </motion.p>

          <motion.div
            variants={fadeIn("right", "spring", 0.5, 0.75)}
            className="flex flex-wrap gap-4"
          >
            <FuturisticButton href="#audits" primary>
              View Audits
            </FuturisticButton>
            <FuturisticButton href="#contact">
              Contact Me
            </FuturisticButton>
          </motion.div>

          {/* Stats section removed as requested */}
        </motion.div>

        <div className="relative hidden md:block">
          {/* Animated glow effects */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-primary/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse" as const
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse" as const,
              delay: 1
            }}
          />

          <motion.div
            ref={codeContainerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={codeAnimation}
            className="relative z-10 max-w-md mx-auto"
          >
            {/* Floating animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 0.5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse" as const,
                ease: "easeInOut"
              }}
            >
              {/* Animated border gradient */}
              <motion.div
                className="p-1 rounded-3xl bg-gradient-to-r from-primary/70 via-secondary/70 to-destructive/70"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '300% 100%'
                }}
              >
                <div className="bg-background rounded-3xl relative overflow-hidden">
                  {/* Code scanning effect */}
                  <motion.div
                    className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10"
                    animate={{
                      top: ["0%", "100%", "0%"]
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "linear",
                      repeatType: "loop" as const
                    }}
                  />

                  {/* Digital particles */}
                  {[...Array(15)].map((_, idx) => (
                    <motion.div
                      key={`particle-${idx}`}
                      className="absolute w-1 h-1 bg-primary/80 rounded-full z-20"
                      initial={{
                        opacity: 0,
                        x: Math.random() * 300,
                        y: Math.random() * 400
                      }}
                      animate={{
                        opacity: [0, 0.5, 0],
                        y: [null, (Math.random() > 0.5 ? "-=" : "+=") + (20 + Math.random() * 50)],
                        x: [null, (Math.random() > 0.5 ? "-=" : "+=") + (20 + Math.random() * 50)]
                      }}
                      transition={{
                        duration: 3 + Math.random() * 3,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                        repeatType: "loop" as const
                      }}
                    />
                  ))}

                  <div className="p-8 font-mono text-sm">
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        <span className="text-muted-foreground">//</span>
                        <motion.span
                          className="text-primary"
                          animate={{ opacity: [1, 0.7, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          SMART CONTRACT AUDIT
                        </motion.span>
                      </div>
                      <div className="space-y-2">
                        <p className="text-muted-foreground">function <span className="text-secondary">auditContract</span>() {'{'}</p>
                        <motion.p
                          className="pl-4 text-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          const vulnerabilities = [];
                        </motion.p>
                        <motion.p
                          className="pl-4 text-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.9, duration: 0.5 }}
                        >
                          const mitigations = [];
                        </motion.p>
                        <motion.p
                          className="pl-4 text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2, duration: 0.5 }}
                        >
                          // Scanning for issues
                        </motion.p>
                        <motion.p
                          className="pl-4 text-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.5, duration: 0.5 }}
                        >
                          scan<span className="text-secondary">(</span>codebase<span className="text-secondary">)</span>;
                        </motion.p>
                        <motion.p
                          className="pl-4 text-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.8, duration: 0.5 }}
                        >
                          analyze<span className="text-secondary">(</span>vulnerabilities<span className="text-secondary">)</span>;
                        </motion.p>
                        <motion.p
                          className="pl-4 text-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.1, duration: 0.5 }}
                        >
                          report<span className="text-secondary">(</span>findings<span className="text-secondary">)</span>;
                        </motion.p>
                        <motion.p
                          className="text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.4, duration: 0.5 }}
                        >
                          {'}'}
                        </motion.p>
                      </div>
                      <div className="relative">
                        <motion.p
                          className="text-primary"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 2.7, duration: 0.5 }}
                        >
                          // <TypewriterText text="Secure. Reliable. Future-proof." speed={50} />
                        </motion.p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated background elements */}
      {/* <div className="absolute bottom-0 left-0 w-full h-1/2 z-0 opacity-20 pointer-events-none">
        {[10, 25, 40, 60, 75, 90].map((position, i) => (
          <motion.div
            key={i}
            className={`absolute bottom-0 left-[${position}%] w-px bg-gradient-to-t ${i % 2 === 0 ? 'from-primary' : 'from-secondary'} to-transparent`}
            custom={i}
            initial="initial"
            animate="animate"
            variants={lineVariants}
          />
        ))}
      </div> */}
    </section>
  );
};

export default HeroSection;
