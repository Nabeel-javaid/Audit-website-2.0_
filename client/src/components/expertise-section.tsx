import { motion } from "framer-motion";
import { fadeIn, slideIn, staggerContainer } from "@/lib/motion";
import { expertiseCategories, technologies } from "@/data/expertise";

const ExpertiseSection = () => {
  return (
    <section id="expertise" className="py-24 relative bg-card/20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn("up", "spring", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Technical</span> Expertise
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Specialized knowledge and skills in blockchain security and smart contract auditing.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {expertiseCategories.map((category, index) => (
            <motion.div
              key={index}
              variants={fadeIn("up", "spring", index * 0.1, 0.75)}
              className="bg-background p-8 rounded-xl border border-white/5 hover:border-primary/20 transition-all hover:transform hover:-translate-y-2 group"
              whileHover={{ y: -8 }}
            >
              <div className={`w-14 h-14 rounded-xl bg-${category.iconBg} flex items-center justify-center mb-6 group-hover:bg-${category.color}/20 transition-all text-xl font-bold`}>
                {category.iconSymbol}
              </div>
              <h3 className="text-xl font-semibold mb-3">{category.title}</h3>
              <p className="text-muted-foreground mb-4">
                {category.description}
              </p>
              <div className="space-y-2 text-sm">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center gap-2">
                    <span className={`w-1.5 h-1.5 rounded-full bg-${category.color}`}></span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Technologies */}
        <motion.div 
          className="mt-16"
          variants={fadeIn("up", "spring", 0.5, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h3 className="text-xl font-semibold text-center mb-8">Technologies & Platforms</h3>
          <div className="flex flex-wrap justify-center gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.05, 0.5)}
                className="w-24 h-24 flex flex-col items-center justify-center rounded-xl bg-background p-4 border border-white/5 hover:border-primary/20 transition-all"
                whileHover={{ y: -5, boxShadow: '0 5px 15px rgba(0, 223, 216, 0.2)' }}
              >
                <div className={`w-10 h-10 rounded-full bg-${tech.iconBg} flex items-center justify-center mb-2 text-${tech.iconColor} font-bold`}>
                  {tech.iconSymbol}
                </div>
                <span className="text-xs text-center">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
