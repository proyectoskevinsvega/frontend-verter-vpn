import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertTriangle, ShieldCheck, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { apiService } from "../lib/api";

interface TermsSection {
  id: string;
  section_type: 'header' | 'section' | 'footer';
  title: string;
  content: string;
  icon: string;
  updated_at: string;
}

interface TermsOfService {
  header: TermsSection;
  sections: TermsSection[];
  footer: TermsSection;
}

const Terms = () => {
  const [terms, setTerms] = useState<TermsOfService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const data = await apiService.getTermsOfService();
        setTerms(data);
      } catch (error) {
        console.error("Error fetching terms of service:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTerms();
  }, []);

  const getIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      case 'AlertTriangle': return <AlertTriangle className={className} />;
      case 'FileText': return <FileText className={className} />;
      default: return <FileText className={className} />;
    }
  };

  const getIconColor = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return 'text-primary';
      case 'CheckCircle2': return 'text-secondary';
      case 'AlertTriangle': return 'text-yellow-500';
      default: return 'text-primary';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!terms) return null;

  return (
    <div className="pt-24 min-h-screen bg-background">
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-display font-bold">
                {terms.header.title.split(' ')[0]} {terms.header.title.split(' ')[1]} <span className="text-gradient">{terms.header.title.split(' ').slice(2).join(' ')}</span>
              </h1>
              <p className="mt-6 text-foreground/50 text-lg max-w-2xl mx-auto">
                {terms.header.content}
              </p>
              <p className="mt-4 text-xs text-foreground/30 font-bold uppercase tracking-widest">
                Última actualización: {formatDate(terms.header.updated_at)}
              </p>
            </motion.div>
          </header>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/2 border border-white/5 rounded-4xl p-6 md:p-10 space-y-12"
          >
            {terms.sections.map((section) => (
              <div key={section.id} className="space-y-6">
                <div className={`flex items-center gap-4 ${getIconColor(section.icon)}`}>
                  {getIcon(section.icon)}
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <p className="text-foreground/60 leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </motion.div>

          {terms.footer && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center space-y-6"
            >
              <div className="inline-flex items-center gap-2 p-3 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-foreground/40 uppercase tracking-widest">
                {getIcon(terms.footer.icon, "w-4 h-4")}
                {terms.footer.title}
              </div>
              <p className="text-foreground/30 text-sm max-w-2xl mx-auto leading-relaxed">
                {terms.footer.content}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Terms;
