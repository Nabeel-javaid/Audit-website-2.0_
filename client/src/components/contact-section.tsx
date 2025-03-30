import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/lib/motion";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <section id="contact" className="py-24 relative bg-card/20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          variants={fadeIn("up", "spring", 0.1, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Contact</span> Me
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Let's discuss your smart contract security needs and how I can help secure your blockchain project.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          <motion.div 
            className="lg:col-span-2 space-y-8"
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <motion.div 
              variants={fadeIn("right", "spring", 0.1, 0.75)}
              className="bg-background p-6 rounded-xl border border-white/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Email</h3>
                  <p className="text-muted-foreground text-sm mb-2">Usually respond within 24 hours</p>
                  <a href="mailto:contact@cryptoauditor.com" className="text-primary hover:underline">contact@cryptoauditor.com</a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn("right", "spring", 0.2, 0.75)}
              className="bg-background p-6 rounded-xl border border-white/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Discord</h3>
                  <p className="text-muted-foreground text-sm mb-2">Available for quick discussions</p>
                  <a href="#" className="text-secondary hover:underline">cryptoauditor#1234</a>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              variants={fadeIn("right", "spring", 0.3, 0.75)}
              className="bg-background p-6 rounded-xl border border-white/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Twitter</h3>
                  <p className="text-muted-foreground text-sm mb-2">Follow for security insights</p>
                  <a href="#" className="text-destructive hover:underline">@cryptoauditor</a>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="lg:col-span-3"
            variants={fadeIn("left", "spring", 0.3, 0.75)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <form className="bg-background p-8 rounded-xl border border-white/5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    className="bg-card/50 border-white/10 focus:border-primary/50" 
                    placeholder="Your name" 
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="bg-card/50 border-white/10 focus:border-primary/50" 
                    placeholder="your@email.com" 
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="project">Project Type</Label>
                <Select>
                  <SelectTrigger className="bg-card/50 border-white/10 focus:border-primary/50">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defi">DeFi Protocol</SelectItem>
                    <SelectItem value="nft">NFT Project</SelectItem>
                    <SelectItem value="dao">DAO or Governance</SelectItem>
                    <SelectItem value="gaming">GameFi Project</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mb-6 space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  rows={5} 
                  className="bg-card/50 border-white/10 focus:border-primary/50 resize-none" 
                  placeholder="Describe your project and security needs..." 
                  required
                />
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-lg font-medium hover:shadow-lg hover:shadow-primary/20 transition-all transform hover:-translate-y-1"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
