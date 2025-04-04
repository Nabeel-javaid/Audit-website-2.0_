import { motion, useInView } from "framer-motion";
import { fadeIn } from "@/lib/motion";
import { useRef } from "react";

// Simplified stats with direct string values to avoid formatting issues
const stats = [
  { displayValue: "100+", label: "Audits Completed" },
  { displayValue: "$750M", label: "Value Secured", addSpace: true },
  { displayValue: "250+", label: "Vulnerabilities Found" },
  { displayValue: "5+", label: "Years Experience" }
];

const StatsSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.2 });

  // Simplified title animation
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

  return (
    <div className="w-full relative" style={{
      background: 'transparent',
      boxShadow: 'none',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <section
        id="stats"
        ref={statsRef}
        className="py-16 relative overflow-hidden"
        style={{
          background: 'transparent',
          boxShadow: 'none',
          borderTop: 'none',
          WebkitBoxShadow: 'none',
          MozBoxShadow: 'none',
          filter: 'none'
        }}
      >
        {/* Simple static stars background - only using absolute positioning to avoid layering issues */}
        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
          <div className="absolute h-2 w-2 rounded-full bg-primary/60 top-[15%] left-[10%]" />
          <div className="absolute h-1 w-1 rounded-full bg-primary/40 top-[25%] left-[30%]" />
          <div className="absolute h-1.5 w-1.5 rounded-full bg-secondary/50 top-[10%] left-[45%]" />
          <div className="absolute h-1 w-1 rounded-full bg-primary/30 top-[55%] left-[20%]" />
          <div className="absolute h-2 w-2 rounded-full bg-secondary/40 top-[35%] right-[15%]" />
          <div className="absolute h-1 w-1 rounded-full bg-primary/50 top-[65%] right-[30%]" />
        </div>

        <div
          className="container mx-auto px-4"
          style={{ background: 'transparent', boxShadow: 'none' }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center mb-16 pt-8"
            variants={titleVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
          >
            Impact By The Numbers
          </motion.h2>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 max-w-5xl mx-auto text-center"
            style={{ background: 'transparent', boxShadow: 'none' }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`p-6 ${stat.addSpace ? 'lg:mr-6' : ''} ${index === 2 ? 'lg:ml-6' : ''}`}
                variants={fadeIn("up", "spring", index * 0.1, 0.6)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                style={{
                  background: 'transparent',
                  boxShadow: 'none',
                  WebkitBoxShadow: 'none',
                  MozBoxShadow: 'none',
                  border: 'none'
                }}
              >
                <motion.div
                  className="mb-4 text-6xl font-bold"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ textShadow: 'none' }}
                >
                  <span
                    className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                    style={{ filter: 'none' }}
                  >
                    {stat.displayValue}
                  </span>
                </motion.div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default StatsSection;
