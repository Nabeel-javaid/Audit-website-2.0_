import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

const stats = [
  { value: "100+", label: "Audits Completed" },
  { value: "$1B+", label: "Value Secured" },
  { value: "250+", label: "Vulnerabilities Found" },
  { value: "5+", label: "Years Experience" }
];

const StatsSection = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-card/20">
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 30% 20%, rgba(0, 223, 216, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, rgba(0, 223, 216, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 80%, rgba(0, 223, 216, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 20%, rgba(0, 223, 216, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 20%, rgba(0, 223, 216, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop" as const
        }}
      />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[rgba(21,16,48,0.9)] to-[rgba(5,8,22,0.8)] rounded-3xl overflow-hidden backdrop-blur-xl p-8 border border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
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
                      '0 0 5px rgba(0, 223, 216, 0.3)', 
                      '0 0 15px rgba(0, 223, 216, 0.2)', 
                      '0 0 5px rgba(0, 223, 216, 0.3)'
                    ] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "reverse" as const,
                    delay: index * 0.2
                  }}
                >
                  {stat.value}
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
