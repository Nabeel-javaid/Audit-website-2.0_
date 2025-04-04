import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { fadeIn } from "@/lib/motion";

// Step data with SVG icons for better performance than Lottie
const methodologySteps = [
    {
        title: "Initial Consultation",
        description: "We begin with a thorough discussion of your project's scope, technologies used, and security concerns.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2H3v16h5v4l4-4h9V2z"></path>
                <circle cx="9" cy="10" r="1"></circle>
                <circle cx="12" cy="10" r="1"></circle>
                <circle cx="15" cy="10" r="1"></circle>
            </svg>
        )
    },
    {
        title: "Project Scoping",
        description: "I thoroughly analyze your codebase architecture, identify critical components, and outline focus areas for security review.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
            </svg>
        )
    },
    {
        title: "Preliminary Report",
        description: "After comprehensive analysis, I deliver an initial report outlining discovered vulnerabilities, risk classifications, and potential attack vectors.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
        )
    },
    {
        title: "Revision Stage",
        description: "I work closely with your team to implement recommended fixes and verify that vulnerabilities have been properly addressed.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
        )
    },
    {
        title: "Final Audit Report",
        description: "The comprehensive final report details all findings, remediations, and includes a security score with recommendations for ongoing protection.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                <path d="M9 12l2 2 4-4"></path>
            </svg>
        )
    },
    {
        title: "Ongoing Support",
        description: "Security is a continuous process. I provide follow-up consultations and remain available to address future concerns or code changes.",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.85.83 6.71 2.23"></path>
                <path d="M21 3v6h-6"></path>
                <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3"></path>
            </svg>
        )
    }
];

const AuditMethodologySection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

    return (
        <section id="methodology" ref={sectionRef} className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    className="text-center mb-16"
                    variants={fadeIn("up", "spring", 0.1, 1)}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gradient">Audit</span> Methodology
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        My comprehensive approach ensures thorough security assessments and actionable remediation strategies for your smart contracts.
                    </p>
                </motion.div>

                {/* Methodology Steps Timeline */}
                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical timeline line - static version */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-1/2 z-0">
                        <div className="h-full w-full bg-gradient-to-b from-primary/80 via-primary/40 to-secondary/60 rounded-full"></div>
                    </div>

                    {methodologySteps.map((step, index) => (
                        <motion.div
                            key={index}
                            className={`flex flex-col md:flex-row gap-8 md:gap-0 items-center md:items-start relative mb-16 last:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                }`}
                            variants={fadeIn(
                                index % 2 === 0 ? "left" : "right",
                                "spring",
                                index * 0.1,
                                0.75
                            )}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.2 }}
                        >
                            {/* Animated Timeline dot */}
                            <motion.div
                                className="absolute left-0 md:left-1/2 top-12 w-6 h-6 rounded-full bg-background transform md:-translate-x-1/2 z-10 flex items-center justify-center"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                            >
                                <motion.div
                                    className="w-full h-full rounded-full border-2 border-primary"
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [1, 0.8, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        delay: index * 0.2
                                    }}
                                />
                                <motion.div
                                    className="absolute w-2 h-2 rounded-full bg-primary"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                                />
                            </motion.div>

                            {/* Animated Step number */}
                            <motion.div
                                className={`absolute left-8 md:left-auto ${index % 2 === 0 ? 'md:right-[calc(50%+2rem)]' : 'md:left-[calc(50%+2rem)]'
                                    } top-11 text-xl font-mono font-bold text-primary opacity-0`}
                                animate={{
                                    opacity: [0, 0.3, 0.6],
                                    x: index % 2 === 0 ? [10, 0] : [-10, 0]
                                }}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.4 + index * 0.1,
                                    ease: "easeOut"
                                }}
                            >
                                {(index + 1).toString().padStart(2, '0')}
                            </motion.div>

                            {/* Content - alternating sides */}
                            <div className={`w-full md:w-[calc(50%-3rem)] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                                }`}>
                                {/* Step content with CSS-only hover effects for better performance */}
                                <div
                                    className="bg-card/20 backdrop-blur-sm p-6 rounded-xl border border-white/5 transition-all duration-200 
                                    hover:border-primary/20 hover:shadow-lg hover:-translate-y-1 hover:bg-card/30"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        {/* Icon with minimal animation */}
                                        <div className="text-primary transition-transform duration-300 hover:scale-110">
                                            {step.icon}
                                        </div>

                                        <div className="relative">
                                            <h3 className="text-xl font-bold">{step.title}</h3>
                                            <motion.div
                                                className="absolute bottom-0 left-0 h-0.5 bg-primary/30 rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "100%" }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                            />
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Placeholder for the timeline */}
                            <div className="w-0 md:w-[6rem] flex-shrink-0"></div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AuditMethodologySection;