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
  glowIntensity: number;
  glowDirection: boolean;
  glowSpeed: number;
  orbitAngle?: number;
  orbitSpeed?: number;
  orbitRadius?: number;
  orbitCenter?: {x: number, y: number};
}

interface ParticleBackgroundProps {
  particleDensity?: number; // Control density of particles (default: 70)
}

const ParticleBackground = ({ particleDensity }: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const animationFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(true);
  
  // Performance optimization - adjust particle count based on screen size and density prop
  const getParticleCount = () => {
    // Use the provided density or default values
    const baseDensity = particleDensity !== undefined ? particleDensity : 70;
    const densityRatio = baseDensity / 70; // Calculate ratio compared to default density
    
    if (typeof window !== 'undefined') {
      if (window.innerWidth <= 768) return Math.round(30 * densityRatio);
      if (window.innerWidth <= 1024) return Math.round(50 * densityRatio);
      return Math.round(baseDensity);
    }
    return Math.round(baseDensity * 0.7); // Fallback
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
      
      // Create orbital clusters
      const orbitClusters = 3; // Number of orbital clusters
      const orbitPoints = [];
      
      // Generate random orbit centers
      for (let i = 0; i < orbitClusters; i++) {
        orbitPoints.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          particleCount: Math.floor(particleCount * 0.2) // 20% of particles in orbits
        });
      }
      
      // Regular free-moving particles (60% of total)
      const freeParticleCount = Math.floor(particleCount * 0.6);
      for (let i = 0; i < freeParticleCount; i++) {
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
          pulseSpeed: Math.random() * 0.03 + 0.01,
          glowIntensity: Math.random() * 0.5,
          glowDirection: Math.random() > 0.5,
          glowSpeed: Math.random() * 0.02 + 0.005
        });
      }
      
      // Orbital particles (40% of total)
      let orbitParticlesAdded = 0;
      orbitPoints.forEach(orbitCenter => {
        for (let i = 0; i < orbitCenter.particleCount; i++) {
          const baseSize = Math.random() * 2 + 0.8;
          const orbitRadius = 20 + Math.random() * 80;
          const orbitAngle = Math.random() * Math.PI * 2;
          const orbitSpeed = (Math.random() * 0.01 + 0.003) * (Math.random() > 0.5 ? 1 : -1);
          
          particles.push({
            x: orbitCenter.x + Math.cos(orbitAngle) * orbitRadius,
            y: orbitCenter.y + Math.sin(orbitAngle) * orbitRadius,
            size: baseSize,
            baseSize,
            speedX: Math.random() * 0.2 - 0.1,
            speedY: Math.random() * 0.2 - 0.1,
            color: particleColors[Math.floor(Math.random() * particleColors.length)],
            pulseDirection: Math.random() > 0.5,
            pulseSpeed: Math.random() * 0.03 + 0.01,
            glowIntensity: Math.random() * 0.7 + 0.3,
            glowDirection: Math.random() > 0.5,
            glowSpeed: Math.random() * 0.02 + 0.005,
            orbitAngle,
            orbitSpeed,
            orbitRadius,
            orbitCenter: { x: orbitCenter.x, y: orbitCenter.y }
          });
          
          orbitParticlesAdded++;
        }
      });
      
      // Add remaining particles as free particles
      const remainingParticles = particleCount - freeParticleCount - orbitParticlesAdded;
      for (let i = 0; i < remainingParticles; i++) {
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
          pulseSpeed: Math.random() * 0.03 + 0.01,
          glowIntensity: Math.random() * 0.5,
          glowDirection: Math.random() > 0.5,
          glowSpeed: Math.random() * 0.02 + 0.005
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
        
        // Glow effect animation
        if (particle.glowDirection) {
          particle.glowIntensity += particle.glowSpeed;
          if (particle.glowIntensity > 0.8) {
            particle.glowDirection = false;
          }
        } else {
          particle.glowIntensity -= particle.glowSpeed;
          if (particle.glowIntensity < 0.2) {
            particle.glowDirection = true;
          }
        }
        
        // Orbital movement if particle has orbit properties
        if (particle.orbitCenter && particle.orbitAngle !== undefined && particle.orbitSpeed !== undefined && particle.orbitRadius !== undefined) {
          // Update orbit angle
          particle.orbitAngle += particle.orbitSpeed;
          
          // Calculate new position based on orbit
          particle.x = particle.orbitCenter.x + Math.cos(particle.orbitAngle) * particle.orbitRadius;
          particle.y = particle.orbitCenter.y + Math.sin(particle.orbitAngle) * particle.orbitRadius;
          
          // Add slight random movement
          particle.x += (Math.random() - 0.5) * 0.5;
          particle.y += (Math.random() - 0.5) * 0.5;
        } else {
          // Regular particle movement
          
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
        }
        
        // Draw glow effect
        if (particle.glowIntensity > 0) {
          const glow = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.size * 3
          );
          
          // Extract color values for glow
          let color = particle.color;
          if (color.startsWith('rgba(')) {
            // Parse rgba values
            const values = color.replace('rgba(', '').replace(')', '').split(',');
            const r = values[0].trim();
            const g = values[1].trim();
            const b = values[2].trim();
            
            glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${particle.glowIntensity * 0.5})`);
            glow.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
          } else {
            // Default glow color if parsing fails
            glow.addColorStop(0, `rgba(0, 223, 216, ${particle.glowIntensity * 0.3})`);
            glow.addColorStop(1, `rgba(0, 223, 216, 0)`);
          }
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
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
            // Create a gradient connection between particles based on their colors
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            
            const opacity = 0.05 * (1 - distance / maxDistance);
            const defaultColor = `rgba(255, 255, 255, ${opacity})`;
            
            gradient.addColorStop(0, particle.color.replace(/[^,]+(?=\))/, opacity.toString()));
            gradient.addColorStop(1, otherParticle.color.replace(/[^,]+(?=\))/, opacity.toString()));
            
            ctx.beginPath();
            ctx.strokeStyle = distance < maxDistance / 2 ? gradient : defaultColor;
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
  }, [particleDensity]);
  
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
