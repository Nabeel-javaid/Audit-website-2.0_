import { motion, useInView } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Audits Completed" },
  { value: 1, suffix: "B+", prefix: "$", label: "Value Secured" },
  { value: 250, suffix: "+", label: "Vulnerabilities Found" },
  { value: 5, suffix: "+", label: "Years Experience" }
];

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

// Counter animation component
const AnimatedCounter = ({ value, prefix = "", suffix = "", delay = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  useEffect(() => {
    if (!isInView) return;
    
    // Reset count
    setCount(0);
    
    // Only start counting after delay
    const startTimeout = setTimeout(() => {
      let startTime: number | undefined;
      let animationFrameId: number | undefined;
      
      // Animation duration in ms (slightly randomized)
      const duration = 2000 + (Math.random() * 1000);
      
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / duration;
        
        if (progress < 1) {
          // Easing function for more natural counting
          const easedProgress = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(easedProgress * value));
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setCount(value);
        }
      };
      
      animationFrameId = requestAnimationFrame(updateCount);
      
      return () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        clearTimeout(startTimeout);
      };
    }, delay);
    
    return () => clearTimeout(startTimeout);
  }, [isInView, value, delay]);
  
  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-card/20">
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop" as const
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-background/90 to-card/90 rounded-3xl overflow-hidden backdrop-blur-xl p-8 border border-white/10 shadow-lg relative">
          {/* Glow effect for the card */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-secondary/5 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-20"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="p-6"
                variants={fadeIn("up", "spring", index * 0.1, 0.75)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
              >
                <motion.div 
                  className="mb-4 text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                  animate={{ 
                    textShadow: [
                      '0 0 5px rgba(168, 85, 247, 0.3)', 
                      '0 0 15px rgba(168, 85, 247, 0.2)', 
                      '0 0 5px rgba(168, 85, 247, 0.3)'
                    ] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse" as const,
                    delay: index * 0.2
                  }}
                >
                  <AnimatedCounter 
                    value={stat.value} 
                    prefix={stat.prefix || ""}
                    suffix={stat.suffix || ""} 
                    delay={index * 200}
                  />
                </motion.div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
