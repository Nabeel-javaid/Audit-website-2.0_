import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Github, ExternalLink } from 'lucide-react';
import { fadeIn } from '@/lib/motion';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ParticleBackground from '@/components/particle-background';

// Custom styles to make the markdown report more visually appealing
const markdownStyles = `
  .audit-report-markdown {
    color: #fff;
    line-height: 1.7;
  }
  
  .audit-report-markdown h1 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, rgba(168, 85, 247, 1), rgba(217, 70, 239, 0.8));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    display: inline-block;
    font-weight: 700;
  }
  
  .audit-report-markdown h2 {
    font-size: 1.75rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: rgba(168, 85, 247, 0.9);
    font-weight: 600;
    border-bottom: 1px solid rgba(168, 85, 247, 0.2);
    padding-bottom: 0.5rem;
  }
  
  .audit-report-markdown h3 {
    font-size: 1.35rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: rgba(217, 70, 239, 0.9);
    font-weight: 600;
  }
  
  .audit-report-markdown h4 {
    font-size: 1.15rem;
    margin-top: 1.25rem;
    margin-bottom: 0.5rem;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }
  
  .audit-report-markdown p {
    margin-bottom: 1rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .audit-report-markdown a {
    color: rgba(168, 85, 247, 1);
    text-decoration: none;
    transition: all 0.2s ease;
  }
  
  .audit-report-markdown a:hover {
    color: rgba(217, 70, 239, 1);
    text-decoration: underline;
  }
  
  .audit-report-markdown code {
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0.2rem 0.4rem;
    border-radius: 0.25rem;
    font-family: monospace;
    font-size: 0.9em;
    color: rgba(168, 85, 247, 0.9);
  }
  
  .audit-report-markdown pre {
    background-color: rgba(0, 0, 0, 0.4);
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    border: 1px solid rgba(168, 85, 247, 0.2);
  }
  
  .audit-report-markdown pre code {
    background-color: transparent;
    padding: 0;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .audit-report-markdown ul, .audit-report-markdown ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
    color: rgba(255, 255, 255, 0.8);
  }
  
  .audit-report-markdown li {
    margin-bottom: 0.5rem;
  }
  
  .audit-report-markdown blockquote {
    border-left: 4px solid rgba(168, 85, 247, 0.5);
    padding-left: 1rem;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: rgba(255, 255, 255, 0.7);
  }
  
  .audit-report-markdown hr {
    border: 0;
    height: 1px;
    background: linear-gradient(to right, rgba(168, 85, 247, 0.2), rgba(217, 70, 239, 0.2), rgba(168, 85, 247, 0.2));
    margin: 2rem 0;
  }
  
  .audit-report-markdown table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 1.5rem 0;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .audit-report-markdown th {
    background-color: rgba(0, 0, 0, 0.5);
    color: rgba(168, 85, 247, 1);
    font-weight: 600;
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .audit-report-markdown td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    background-color: rgba(0, 0, 0, 0.2);
  }
  
  .audit-report-markdown tr:last-child td {
    border-bottom: none;
  }
  
  .audit-report-markdown tr:nth-child(odd) td {
    background-color: rgba(0, 0, 0, 0.3);
  }
  
  /* Severity colors for security reports */
  .audit-report-markdown td:first-child:contains("Critical") {
    color: #ff4d4d;
    font-weight: 600;
  }
  
  .audit-report-markdown td:first-child:contains("High") {
    color: #ffaa00;
    font-weight: 600;
  }
  
  .audit-report-markdown td:first-child:contains("Medium") {
    color: #ffff00;
    font-weight: 600;
  }
  
  .audit-report-markdown td:first-child:contains("Low") {
    color: #00cc88;
    font-weight: 600;
  }
`;

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
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-background relative z-10">
      {/* Add a particle background with reduced density for better readability */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground particleDensity={40} />
      </div>
      
      <Header />
      
      <main className="flex-grow container max-w-5xl mx-auto px-6 py-12 relative z-10">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn("up", "spring", 0.1, 0.75)}
        >
          <Link to="/#audits">
            <motion.button 
              className="group flex items-center gap-2 mb-8 text-muted-foreground hover:text-primary transition-colors bg-background/50 backdrop-blur-sm px-4 py-2 rounded-full"
              whileHover={{ x: -4, backgroundColor: "rgba(0,0,0,0.5)" }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft size={16} className="group-hover:animate-pulse" />
              <span>Back to Audits</span>
            </motion.button>
          </Link>
        </motion.div>
        
        <motion.div
          className="bg-gradient-to-br from-background/90 to-card/90 backdrop-blur-sm rounded-xl p-6 md:p-10 border border-white/10 shadow-xl relative z-10"
          variants={fadeIn("up", "spring", 0.2, 0.75)}
          initial="hidden"
          animate="show"
        >
          {/* Glow effect for the card */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-20"></div>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 relative z-10">
              <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin"></div>
              <p className="mt-4 text-primary/80 font-medium">Loading audit report...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 relative z-10">
              <h3 className="text-xl font-semibold text-destructive mb-2">Error</h3>
              <p className="text-muted-foreground">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-4 py-2 bg-destructive/20 text-destructive hover:bg-destructive/30 rounded-md transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <article className="prose prose-invert max-w-none audit-report-markdown relative z-10">
              <style>{markdownStyles}</style>
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