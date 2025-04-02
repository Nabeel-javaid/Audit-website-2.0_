import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { zoomIn, fadeIn } from "@/lib/motion";
import { Home, AlertCircle } from "lucide-react";
import ParticleBackground from "@/components/particle-background";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Particle background with reduced density */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground particleDensity={30} />
      </div>
      
      {/* Animated gradient overlay */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-20"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 80%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 70% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)",
            "radial-gradient(circle at 30% 20%, rgba(168, 85, 247, 0.2) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "loop" 
        }}
      />
      
      <div className="container relative z-10 px-4">
        <motion.div
          variants={zoomIn(0.2, 0.8)}
          initial="hidden"
          animate="show"
          className="w-full max-w-xl mx-auto bg-gradient-to-br from-background/90 to-card/90 rounded-3xl overflow-hidden backdrop-blur-xl p-10 border border-white/10 shadow-lg relative"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
          
          <div className="relative z-10">
            <motion.div 
              variants={fadeIn("down", "spring", 0.3, 0.75)}
              className="flex flex-col items-center text-center mb-8"
            >
              <div className="flex items-center justify-center w-24 h-24 rounded-full bg-red-500/10 mb-6">
                <AlertCircle className="h-12 w-12 text-red-500" />
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-primary bg-clip-text text-transparent mb-4">
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">Page Not Found</h2>
              <p className="text-muted-foreground max-w-md">
                The page you're looking for doesn't exist or has been moved to another location.
              </p>
            </motion.div>
            
            <motion.div 
              variants={fadeIn("up", "spring", 0.5, 0.75)}
              className="flex justify-center"
            >
              <Link to="/">
                <Button 
                  size="lg" 
                  className="relative group overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/40 to-primary/10 group-hover:translate-x-full duration-500 transition-transform"></span>
                  <Home className="mr-2 h-4 w-4" />
                  Return Home
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
