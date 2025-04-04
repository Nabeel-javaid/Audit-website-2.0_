import { motion } from "framer-motion";
import { fadeIn } from "@/lib/motion";
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

        <motion.div
          className="max-w-2xl mx-auto"
          variants={fadeIn("up", "spring", 0.3, 0.75)}
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
    </section>
  );
};

export default ContactSection;
