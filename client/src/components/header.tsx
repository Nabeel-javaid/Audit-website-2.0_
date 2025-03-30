import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const NavItem = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a 
      href={href} 
      className="relative overflow-hidden text-muted-foreground hover:text-foreground transition-colors"
      onClick={closeMobileMenu}
    >
      <span className="nav-item relative">
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
      </span>
    </a>
  );

  return (
    <motion.header 
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-background/70 border-b border-muted-foreground/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="font-bold text-background">CA</span>
            </div>
            <h1 className="text-xl font-bold tracking-tight">
              <span className="text-gradient">Crypto</span>Auditor
            </h1>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavItem href="#home">Home</NavItem>
            <NavItem href="#audits">Audits</NavItem>
            <NavItem href="#expertise">Expertise</NavItem>
            <NavItem href="#contact">Contact</NavItem>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-muted-foreground hover:text-foreground focus:outline-none" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'h-auto' : 'h-0'}`}
        >
          <nav className="flex flex-col space-y-4 py-4">
            <NavItem href="#home">Home</NavItem>
            <NavItem href="#audits">Audits</NavItem>
            <NavItem href="#expertise">Expertise</NavItem>
            <NavItem href="#contact">Contact</NavItem>
          </nav>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
