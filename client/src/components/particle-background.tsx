import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  speedX: number;
  speedY: number;
  color: string;
  pulseDirection: boolean;
  pulseSpeed: number;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  
  // Performance optimization - reduce particle count on smaller screens
  const getParticleCount = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) return 30;
      if (window.innerWidth <= 1024) return 50;
      return 70;
    }
    return 50;
  };
  
  const particleColors = [
    "rgba(0, 223, 216, 0.15)", 
    "rgba(145, 94, 255, 0.15)", 
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 180, 216, 0.12)"
  ];
  
  const maxDistance = 150;
  const mouseInfluenceRadius = 200;
  const mouseRepelStrength = 0.5;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { 
        x: e.clientX, 
        y: e.clientY 
      };
    };
    
    const handleMouseLeave = () => {
      mouseRef.current = null;
    };
    
    const initParticles = () => {
      const particles: Particle[] = [];
      const particleCount = getParticleCount();
      
      for (let i = 0; i < particleCount; i++) {
        const baseSize = Math.random() * 2.5 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: baseSize,
          baseSize,
          speedX: Math.random() * 0.4 - 0.2,
          speedY: Math.random() * 0.4 - 0.2,
          color: particleColors[Math.floor(Math.random() * particleColors.length)],
          pulseDirection: Math.random() > 0.5,
          pulseSpeed: Math.random() * 0.03 + 0.01
        });
      }
      
      particlesRef.current = particles;
    };
    
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      
      particles.forEach(particle => {
        // Pulse effect - make particles grow and shrink
        if (particle.pulseDirection) {
          particle.size += particle.pulseSpeed;
          if (particle.size > particle.baseSize * 1.5) {
            particle.pulseDirection = false;
          }
        } else {
          particle.size -= particle.pulseSpeed;
          if (particle.size < particle.baseSize * 0.7) {
            particle.pulseDirection = true;
          }
        }
        
        // Mouse interaction
        if (mouseRef.current) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseInfluenceRadius) {
            // Calculate repel force
            const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;
            
            // Apply repel force to particle
            particle.x += dx * force * mouseRepelStrength;
            particle.y += dy * force * mouseRepelStrength;
          }
        }
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections - optimization: only check half the particles
        for (let i = particles.indexOf(particle) + 1; i < particles.length; i++) {
          const otherParticle = particles[i];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * (1 - distance / maxDistance)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        }
      });
    };
    
    // Intersection Observer to disable animations when not visible
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    };
    
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        setIsVisible(entry.isIntersecting);
      });
    }, observerOptions);
    
    intersectionObserver.observe(canvas);
    
    // Initialize
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    animate();
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      intersectionObserver.disconnect();
    };
  }, []);
  
  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    />
  );
};

export default ParticleBackground;
