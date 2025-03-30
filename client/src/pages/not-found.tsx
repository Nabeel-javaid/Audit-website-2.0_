import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import ParticleBackground from "@/components/particle-background";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background relative z-10">
      {/* Add a particle background with reduced density for better readability */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground particleDensity={50} />
      </div>
      
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-12 px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full"
        >
          <Card className="w-full bg-black/40 backdrop-blur-sm border border-purple-500/20 shadow-[0_0_25px_rgba(168,85,247,0.15)]">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center mb-6">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut" 
                  }}
                >
                  <AlertCircle className="h-20 w-20 text-primary mb-4" />
                </motion.div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  404 Error
                </h1>
                <p className="mt-2 text-xl text-white/80">Page Not Found</p>
                <p className="mt-4 text-white/60">
                  The page you're looking for doesn't exist or has been moved.
                </p>
                
                <Link to="/">
                  <motion.button 
                    className="mt-8 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full hover:from-purple-700 hover:to-pink-700 transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.7)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Return Home
                  </motion.button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
