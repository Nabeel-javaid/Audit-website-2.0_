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
    <section className="py-16 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6">
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
              <div className="mb-4 text-5xl font-bold text-gradient">{stat.value}</div>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
