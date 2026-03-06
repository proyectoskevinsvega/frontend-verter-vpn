import { motion } from "framer-motion";
import { Search, Book, Shield, Zap, MessageSquare, ChevronRight, HelpCircle } from "lucide-react";

const categories = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Seguridad y Privacidad",
    desc: "Aprende sobre mTLS, cifrado punto a punto y nuestra política de zero-logs.",
    count: 12
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Configuración Rápida",
    desc: "Guías paso a paso para conectar tus dispositivos en menos de 2 minutos.",
    count: 8
  },
  {
    icon: <Book className="w-6 h-6" />,
    title: "Documentación Técnica",
    desc: "Detalles sobre la red Mesh, Headscale y protocolos de ofuscación.",
    count: 24
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Cuenta y Facturación",
    desc: "Gestiona tu suscripción, métodos de pago y facturas corporativas.",
    count: 15
  }
];

const faqs = [
  {
    q: "¿Qué hace a VerterVpn diferente de una VPN tradicional?",
    a: "A diferencia de las VPN comerciales, usamos una arquitectura de red Mesh privada basada en estándares abiertos, lo que elimina puntos centrales de fallo y garantiza que solo tú tengas las llaves de tu red."
  },
  {
    q: "¿Necesito conocimientos técnicos para usarlo?",
    a: "No. Aunque nuestra tecnología es avanzada, nuestra interfaz está diseñada para ser intuitiva. Ofrecemos instaladores de un solo clic y códigos QR para configuración instantánea."
  },
  {
    q: "¿Cuántos dispositivos puedo conectar?",
    a: "Dependiendo de tu plan, puedes crear redes de hasta 100 dispositivos conectados simultáneamente con latencia mínima."
  }
];

const HelpCenter = () => {
  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold">Resuelve tus <span className="text-gradient">Dudas</span></h1>
            <p className="text-foreground/60 text-lg">Estamos aquí para ayudarte a construir la red privada más segura.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/30 w-5 h-5" />
            <input 
              type="text" 
              placeholder="¿En qué podemos ayudarte hoy?"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="font-bold mb-3">{cat.title}</h3>
              <p className="text-foreground/50 text-sm leading-relaxed mb-4">{cat.desc}</p>
              <span className="text-xs font-bold text-primary/60 uppercase tracking-widest">{cat.count} Artículos</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular FAQs */}
      <section className="py-24 px-6 bg-white/2 border-y border-white/5">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-display font-bold">Preguntas <span className="text-primary">Frecuentes</span></h2>
            <p className="text-foreground/50">Respuestas rápidas a las consultas más comunes.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                className="glass p-6 rounded-2xl border border-white/5 space-y-3"
              >
                <div className="flex gap-4">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  <h4 className="font-bold">{faq.q}</h4>
                </div>
                <p className="text-foreground/50 text-sm pl-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto glass p-12 rounded-[3rem] border border-white/10 space-y-8">
          <h2 className="text-3xl font-bold">¿Aún necesitas ayuda?</h2>
          <p className="text-foreground/50 text-lg">Nuestro equipo técnico está disponible 24/7 para asistencia personalizada.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform flex items-center gap-2">
              Chatear con Soporte
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all">
              Enviar Ticket
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HelpCenter;
