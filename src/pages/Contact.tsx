import { motion } from "framer-motion";
import { Mail, MessageSquare, Shield, Send, MapPin, Phone, Globe, Twitter, Github, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { apiService } from "../lib/api";
import { toast } from "sonner";

interface ContactSection {
  id: string;
  section_type: 'header' | 'department' | 'info' | 'social';
  title: string;
  content: string;
  icon: string;
  link: string;
}

interface ContactInfo {
  header: ContactSection;
  departments: ContactSection[];
  info: ContactSection[];
  social: ContactSection[];
}

const Contact = () => {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Estados para el formulario
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Soporte Técnico',
    message: ''
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const data = await apiService.getContactInfo();
        setContact(data);
      } catch (error) {
        console.error("Error loading contact info:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiService.submitContactForm(formData);
      toast.success("¡Mensaje enviado con éxito!", {
        description: "Nos pondremos en contacto contigo pronto.",
      });
      setFormData({
        name: '',
        email: '',
        subject: 'Soporte Técnico',
        message: ''
      });
    } catch (error: any) {
      toast.error("Error al enviar el mensaje", {
        description: error.message || "Inténtalo de nuevo más tarde.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Mail': return <Mail className="w-6 h-6" />;
      case 'MessageSquare': return <MessageSquare className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'Phone': return <Phone className="w-6 h-6" />;
      case 'Twitter': return <Twitter className="w-5 h-5" />;
      case 'Github': return <Github className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Shield': return <Shield className="w-6 h-6" />;
      case 'Send': return <Send className="w-5 h-5" />;
      default: return <Mail className="w-6 h-6" />;
    }
  };

  const getDepartmentColor = (title: string) => {
    if (title.toLowerCase().includes('soporte')) return 'bg-secondary/10 text-secondary';
    return 'bg-primary/10 text-primary';
  };

  const getDepartmentLinkColor = (title: string) => {
    if (title.toLowerCase().includes('soporte')) return 'text-secondary';
    return 'text-primary';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (!contact) return null;

  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden px-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              {contact.header.icon || "Soporte VerterVpn"}
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold">
              {contact.header.title.split(' ayuda')[0]} <span className="text-gradient">ayudarte?</span>
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              {contact.header.content}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side: Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contact.departments.map((dept) => (
                <div key={dept.id} className="glass p-8 rounded-3xl border border-white/5 space-y-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${getDepartmentColor(dept.title)}`}>
                    {getIcon(dept.icon)}
                  </div>
                  <h3 className="text-xl font-bold">{dept.title}</h3>
                  <p className="text-foreground/50 text-sm">{dept.content}</p>
                  <a href={`mailto:${dept.link}`} className={`${getDepartmentLinkColor(dept.title)} font-bold text-sm hover:underline block truncate`}>
                    {dept.link}
                  </a>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl font-display font-bold">Conéctate con <span className="text-primary">Nosotros</span></h2>
              <div className="space-y-6">
                {contact.info.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-foreground/40 group-hover:text-primary transition-colors border border-white/10">
                      {getIcon(item.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-foreground/50 text-sm">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              {contact.social.map((social) => (
                <a key={social.id} href={social.link} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all border border-white/10">
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass p-10 md:p-12 rounded-[3rem] border border-white/10 relative"
          >
            <div className="mb-8 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Send className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold">Envíanos un Mensaje</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Tu nombre"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="tu@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Asunto</label>
                <select 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm appearance-none"
                >
                  <option className="bg-background">Soporte Técnico</option>
                  <option className="bg-background">Ventas y Planes</option>
                  <option className="bg-background">Reporte de Errores</option>
                  <option className="bg-background">Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Mensaje</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="¿Cómo podemos ayudarte?"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-primary/90 text-white py-5 rounded-2xl font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    Enviando...
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Enviar Mensaje
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-[0.3em]">Confían en nuestra red de soporte</p>
          <div className="flex flex-wrap justify-center gap-16 opacity-30">
            <Shield className="w-12 h-12" />
            <Globe className="w-12 h-12" />
            <Shield className="w-12 h-12" />
            <Globe className="w-12 h-12" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
