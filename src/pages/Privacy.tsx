import { motion } from "framer-motion";
import { Shield, Lock, Key, EyeOff, Globe, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { apiService } from "../lib/api";

interface PrivacySection {
  id: string;
  section_type: 'header' | 'benefit' | 'article' | 'footer';
  title: string;
  content: string;
  icon: string;
}

interface PrivacyPolicy {
  header: PrivacySection;
  benefits: PrivacySection[];
  articles: PrivacySection[];
  footer: PrivacySection;
}

const Privacy = () => {
  const [policy, setPolicy] = useState<PrivacyPolicy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const data = await apiService.getPrivacyPolicy();
        setPolicy(data);
      } catch (error) {
        console.error("Error fetching privacy policy:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrivacy();
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield': return <Shield className="w-8 h-8 text-primary" />;
      case 'Lock': return <Lock className="w-8 h-8 text-primary" />;
      case 'Key': return <Key className="w-8 h-8 text-primary" />;
      case 'EyeOff': return <EyeOff className="w-8 h-8 text-primary" />;
      case 'Globe': return <Globe className="w-5 h-5 text-primary" />;
      case 'FileText': return <FileText className="w-5 h-5 text-primary" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!policy) return null;

  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight">
                {policy.header.title.split(' ')[0]} <span className="text-gradient">{policy.header.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="mt-6 text-foreground/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                {policy.header.content}
              </p>
            </motion.div>
          </header>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policy.benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-8 rounded-3xl border border-white/5 space-y-4 hover:border-primary/20 transition-colors"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {getIcon(benefit.icon)}
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-foreground/60 leading-relaxed italic">
                  "{benefit.content}"
                </p>
              </motion.div>
            ))}
          </div>

          {/* Policy Content */}
          <article className="prose prose-invert max-w-none space-y-12">
            {policy.articles.map((article) => (
              <div key={article.id} className="space-y-4">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  {getIcon(article.icon)}
                  {article.title}
                </h2>
                <p className="text-foreground/60 leading-relaxed">
                  {article.content}
                </p>
              </div>
            ))}

            {/* Support Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 glass rounded-3xl border border-dashed border-white/10 text-center space-y-4"
            >
              <h3 className="font-bold">{policy.footer.title}</h3>
              <p className="text-sm text-foreground/50">
                {policy.footer.content}
              </p>
              <button className="text-primary font-bold hover:underline">
                {policy.footer.icon}
              </button>
            </motion.div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
