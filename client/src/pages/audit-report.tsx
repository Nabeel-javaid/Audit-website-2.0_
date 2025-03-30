import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { fadeIn } from '@/lib/motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ParticleBackground from '@/components/particle-background';

const AuditReport = () => {
  const [location] = useLocation();
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Extract the filename from the URL
  const filename = location.split('/').pop();
  
  useEffect(() => {
    const fetchReport = async () => {
      try {
        if (!filename) {
          setError('Report filename is missing');
          setLoading(false);
          return;
        }
        
        const response = await fetch(`/src/data/audit-reports/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to load report: ${response.statusText}`);
        }
        
        const text = await response.text();
        setReport(text);
        setLoading(false);
      } catch (err) {
        console.error('Error loading audit report:', err);
        setError('Failed to load the audit report. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchReport();
  }, [filename]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background">
      <ParticleBackground />
      <Header />
      
      <main className="flex-grow container mx-auto px-6 py-12">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn("up", "spring", 0.1, 0.75)}
        >
          <Link to="/#audits">
            <motion.button 
              className="group flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors"
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft size={16} className="group-hover:animate-pulse" />
              <span>Back to Audits</span>
            </motion.button>
          </Link>
        </motion.div>
        
        <motion.div
          className="bg-card/20 backdrop-blur-sm rounded-xl p-6 md:p-10 border border-white/5"
          variants={fadeIn("up", "spring", 0.2, 0.75)}
          initial="hidden"
          animate="show"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
              <p className="mt-4 text-muted-foreground">Loading report...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <h3 className="text-xl font-semibold text-destructive mb-2">Error</h3>
              <p className="text-muted-foreground">{error}</p>
            </div>
          ) : (
            <article className="prose prose-invert prose-headings:text-primary prose-a:text-primary hover:prose-a:text-primary/80 prose-blockquote:border-primary prose-strong:text-white prose-code:text-secondary max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {report || ''}
              </ReactMarkdown>
            </article>
          )}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AuditReport;