import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-display font-bold">Nuestra <span className="text-gradient">Misión</span></h2>
          <p className="text-foreground/70 text-lg leading-relaxed">
            En VerterVpn, lideramos la evolución de la conectividad segura mediante arquitecturas de confianza cero (**Zero Trust**). Nuestra misión es proporcionar una infraestructura de red mesh de alto rendimiento que garantice la integridad de los datos y la privacidad absoluta para empresas y usuarios exigentes.
          </p>
          <p className="text-foreground/70 text-lg leading-relaxed">
            Impulsados por la excelencia técnica, hemos desplegado una red global basada en estándares de seguridad militar y protocolos de ofuscación de última generación. VerterVpn es el estandarte de la conectividad segura en la era de la información distribuida.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-8">
            <div className="space-y-1">
              <p className="text-3xl font-bold text-primary">50k+</p>
              <p className="text-sm text-foreground/50">Usuarios Activos</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl font-bold text-secondary">99.9%</p>
              <p className="text-sm text-foreground/50">Uptime Garantizado</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="aspect-square rounded-3xl bg-linear-to-br from-primary/10 to-secondary/10 border border-white/5 overflow-hidden relative group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center grayscale mix-blend-overlay opacity-20 group-hover:opacity-40 transition-opacity duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/20 blur-3xl animate-pulse" />
            </div>
          </div>
          <div className="absolute -bottom-8 -left-8 glass p-6 rounded-2xl shadow-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-primary mb-1">Fundada en 2024</p>
            <p className="text-xs text-foreground/60">Tecnología Made in NYC</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
