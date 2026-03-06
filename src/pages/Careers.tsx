import { motion } from "framer-motion";
import { Rocket, Heart, Globe, Zap, ArrowRight, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const positions = [
  {
    title: "Senior Rust Engineer",
    department: "Core Network",
    location: "Remoto / Europa",
    type: "Tiempo Completo",
  },
  {
    title: "Cibersecurity Analyst",
    department: "Security Operations",
    location: "Madrid, ES / Híbrido",
    type: "Tiempo Completo",
  },
  {
    title: "Fullstack Developer (React/Go)",
    department: "Product & Dashboard",
    location: "Remoto (Global)",
    type: "Tiempo Completo",
  },
  {
    title: "UX/UI Designer",
    department: "Brand Experience",
    location: "CDMX, MX / Remoto",
    type: "Contratista",
  },
];

const perks = [
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Remoto Primero",
    desc: "Creemos en el talento, no en las fronteras. Trabaja desde donde seas más feliz.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Equipamiento Pro",
    desc: "Te proporcionamos el hardware y software de última generación que necesites.",
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Bienestar Total",
    desc: "Seguro médico premium, días de salud mental y presupuesto para fitness.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Stock Options",
    desc: "Sé dueño de una parte de la red de privacidad más grande del mundo.",
  },
];

const Careers = () => {
  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden px-6">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-primary/30 blur-[150px] rounded-full animate-pulse" />
          <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-secondary/30 blur-[150px] rounded-full animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              Únete al Equipo
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold">
              Construye el futuro de la <span className="text-gradient">Privacidad</span>
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              En VerterVpn estamos redefiniendo cómo el mundo se conecta de forma segura. Buscamos mentes brillantes apasionadas por los estándares abiertos y la libertad digital.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 px-6 bg-white/2 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  {perk.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{perk.title}</h3>
                <p className="text-foreground/50 text-sm leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-bold">Vacantes <span className="text-primary">Abiertas</span></h2>
              <p className="text-foreground/50">Explora nuestras oportunidades actuales y encuentra tu lugar.</p>
            </div>
            <div className="flex gap-4">
              <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest">Todos los Departamentos</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {positions.map((pos, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col md:flex-row items-start md:items-center justify-between p-8 glass border border-white/5 rounded-4xl hover:border-primary/30 hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-foreground/40 group-hover:text-primary transition-colors">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{pos.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-xs text-foreground/40 font-bold uppercase tracking-widest">
                      <span>{pos.department}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20 my-auto" />
                      <span>{pos.location}</span>
                      <span className="w-1 h-1 rounded-full bg-white/20 my-auto" />
                      <span className="text-primary/60">{pos.type}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 flex items-center gap-4">
                  <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-foreground/30 group-hover:text-foreground/60 transition-colors">Ver Detalles</span>
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all group-hover:translate-x-1">
                    <ArrowRight className="w-5 h-5 text-foreground/40 group-hover:text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 glass p-12 rounded-[3rem] border border-dashed border-white/10 text-center space-y-6">
            <h3 className="text-2xl font-bold">¿No encuentras el rol perfecto?</h3>
            <p className="text-foreground/50 max-w-xl mx-auto">
              Siempre estamos buscando talento excepcional. Envíanos tu propuesta abierta y cuéntanos cómo puedes ayudar a VerterVpn a escalar.
            </p>
            <button className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
              Enviar Propuesta Abierta
            </button>
          </div>
        </div>
      </section>

      {/* Footer-like CTA */}
      <section className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary">
            <Rocket className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold">Lleva tu carrera al <span className="text-gradient">siguiente nivel</span></h2>
          <p className="text-foreground/50 text-lg">
            Impacta en la vida de millones de personas asegurando su libertad digital. VerterVpn es el lugar donde la innovación no tiene límites.
          </p>
          <div className="pt-4">
            <Link to="/" className="text-primary font-bold inline-flex items-center gap-2 group">
              Volver a la Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
