import { motion, useInView, useAnimation } from "framer-motion";
import { fadeIn, slideIn, staggerContainer, textVariant } from "@/lib/motion";
import { expertiseCategories, technologies } from "@/data/expertise";
import { useEffect, useRef } from "react";

const ExpertiseSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const animationControls = useAnimation();
  
  useEffect(() => {
    if (isInView) {
      animationControls.start("show");
    }
  }, [isInView, animationControls]);
  
  // Glowing background effect
  const backgroundVariants = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        duration: 1
      }
    }
  };
  
  // Card hover animation
  const cardHoverVariants = {
    hover: {
      y: -12,
      boxShadow: "0 15px 30px -10px rgba(0, 223, 216, 0.2)",
      borderColor: "rgba(0, 223, 216, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  // Icon animation
  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    show: { 
      scale: 1, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2
      }
    }
  };
  
  // Skill item animation
  const skillVariants = {
    hidden: { opacity: 0, x: -10 },
    show: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.1 * i,
        duration: 0.5
      }
    })
  };
  
  return (
    <section id="expertise" className="py-24 relative bg-card/20 overflow-hidden" ref={sectionRef}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        variants={backgroundVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div 
          className="absolute top-[20%] right-[10%] w-64 h-64 rounded-full bg-primary/30 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[10%] w-96 h-96 rounded-full bg-secondary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn("up", "spring", 0.1, 1)}
          initial="hidden"
          animate={animationControls}
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            variants={textVariant(0.2)}
          >
            <motion.span 
              className="text-gradient"
              animate={{ 
                textShadow: [
                  '0 0 5px rgba(0, 223, 216, 0.3)', 
                  '0 0 15px rgba(0, 223, 216, 0.2)', 
                  '0 0 5px rgba(0, 223, 216, 0.3)'
                ] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatType: "reverse" 
              }}
            >
              Technical
            </motion.span> Expertise
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-xl mx-auto"
            variants={fadeIn("up", "spring", 0.3, 0.7)}
          >
            Specialized knowledge and skills in blockchain security and smart contract auditing.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={staggerContainer(0.05, 0.1)}
          initial="hidden"
          animate={animationControls}
          viewport={{ once: true, amount: 0.1 }}
        >
          {expertiseCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={{
                ...fadeIn("up", "spring", index * 0.1, 0.75),
                hover: cardHoverVariants.hover
              }}
              className="bg-background p-8 rounded-xl border border-white/5 transition-all group"
              whileHover="hover"
            >
              <motion.div 
                className={`w-14 h-14 rounded-xl bg-${category.iconBg} flex items-center justify-center mb-6 text-xl font-bold transform-gpu`}
                variants={iconVariants}
                animate={{
                  boxShadow: [`0 0 0px rgba(255, 255, 255, 0)`, `0 0 20px rgba(255, 255, 255, 0.2)`, `0 0 0px rgba(255, 255, 255, 0)`],
                  transition: {
                    boxShadow: {
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.3
                    }
                  }
                }}
              >
                <motion.span
                  animate={{ 
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 0.2
                  }}
                >
                  {category.iconSymbol}
                </motion.span>
              </motion.div>
              
              <motion.div>
                <motion.h3 
                  className="text-xl font-semibold mb-3"
                  variants={fadeIn("right", "spring", 0.2, 0.5)}
                >
                  {category.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground mb-4"
                  variants={fadeIn("right", "spring", 0.3, 0.5)}
                >
                  {category.description}
                </motion.p>
                <motion.div 
                  className="space-y-2 text-sm"
                  variants={staggerContainer(0.05, 0.1)}
                >
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div 
                      key={skillIndex} 
                      className="flex items-center gap-2"
                      custom={skillIndex}
                      variants={skillVariants}
                    >
                      <motion.span 
                        className={`w-1.5 h-1.5 rounded-full bg-${category.color}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + skillIndex * 0.1, duration: 0.2 }}
                      />
                      <span className="group-hover:text-primary transition-colors duration-300">{skill}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Technologies */}
        <motion.div 
          className="mt-20"
          variants={fadeIn("up", "spring", 0.5, 1)}
          initial="hidden"
          animate={animationControls}
          viewport={{ once: true, amount: 0.25 }}
        >
          <motion.h3 
            className="text-xl font-semibold text-center mb-8"
            variants={textVariant(0.3)}
          >
            Technologies & Platforms
          </motion.h3>
          <motion.div 
            className="flex flex-wrap justify-center gap-6 md:gap-8"
            variants={staggerContainer(0.03, 0.05)}
          >
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.05, 0.5)}
                className="w-24 h-24 flex flex-col items-center justify-center rounded-xl bg-background p-4 border border-white/5 hover:border-primary/20 transition-all transform-gpu"
                whileHover={{ 
                  y: -8, 
                  boxShadow: '0 10px 25px -5px rgba(0, 223, 216, 0.3)',
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  }
                }}
              >
                <motion.div 
                  className={`w-10 h-10 rounded-full bg-${tech.iconBg} flex items-center justify-center mb-2 text-${tech.iconColor} font-bold`}
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  animate={{
                    boxShadow: [
                      `0 0 0px rgba(255, 255, 255, 0)`, 
                      `0 0 15px rgba(255, 255, 255, 0.3)`, 
                      `0 0 0px rgba(255, 255, 255, 0)`
                    ],
                    transition: {
                      boxShadow: {
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: index * 0.2
                      }
                    }
                  }}
                  transition={{ rotate: { duration: 0.5 } }}
                >
                  <motion.span
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity,
                      repeatType: "reverse",
                      delay: index * 0.3
                    }}
                  >
                    {tech.iconSymbol}
                  </motion.span>
                </motion.div>
                <motion.span 
                  className="text-xs text-center opacity-80 group-hover:opacity-100 group-hover:text-primary transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  {tech.name}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
