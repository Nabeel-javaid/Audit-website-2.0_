import { motion, useInView } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useEffect, useRef, useState, useCallback } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Audits Completed" },
  { value: 750, suffix: "M+", prefix: "$", label: "Value Secured" },
  { value: 250, suffix: "+", label: "Vulnerabilities Found" },
  { value: 5, suffix: "+", label: "Years Experience" }
];

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

// Optimized counter animation component
const AnimatedCounter = ({ value, prefix = "", suffix = "", delay = 0 }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const animationRef = useRef<number>();

  // Memoize the animation function to prevent unnecessary re-renders
  const animateCounter = useCallback(() => {
    if (!isInView) return;

    // Reset count
    setCount(0);

    // Cancel any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Only start counting after delay
    const startTimeout = setTimeout(() => {
      let startTime: number | undefined;

      // Shorter animation duration
      const duration = 1500 + (Math.random() * 500);

      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);

        if (progress < 1) {
          // Simplified easing function for better performance
          const easedProgress = 1 - Math.pow(1 - progress, 2);
          setCount(Math.floor(easedProgress * value));
          animationRef.current = requestAnimationFrame(updateCount);
        } else {
          setCount(value); // Ensure we end at exact value
        }
      };

      animationRef.current = requestAnimationFrame(updateCount);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isInView, value, delay]);

  useEffect(() => {
    const cleanup = animateCounter();
    return cleanup;
  }, [animateCounter]);

  return (
    <span ref={ref}>{prefix}{count}{suffix}</span>
  );
};

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  // Use CSS-based gradients instead of animated text shadows where possible
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Simplified glow animation - reduced number of keyframes
  const glowAnimation = {
    textShadow: [
      '0 0 5px rgba(168, 85, 247, 0.3)',
      '0 0 10px rgba(168, 85, 247, 0.2)',
      '0 0 5px rgba(168, 85, 247, 0.3)'
    ],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  };

  return (
    <section id="stats" ref={statsRef} className="py-16 relative bg-card/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
        >
          Impact By The Numbers
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="p-6"
              variants={fadeIn("up", "spring", index * 0.1, 0.6)} // Reduced duration
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
            >
              <motion.div
                className="mb-4 text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                animate={glowAnimation} // Simplified animation
                style={{
                  willChange: 'text-shadow' // Hint for browser optimization
                }}
              >
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix || ""}
                  suffix={stat.suffix || ""}
                  delay={index * 120} // Reduced delay
                />
              </motion.div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
