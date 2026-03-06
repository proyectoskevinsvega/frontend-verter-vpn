import { motion } from "framer-motion";
import { Monitor, Smartphone, Apple, Download, Shield, Zap, Globe, Cpu } from "lucide-react";
import { Button } from "../components/ui/Button";

const platforms = [
  {
    icon: <Monitor className="w-8 h-8" />,
    name: "Windows",
    version: "v2.4.1",
    size: "64.2 MB",
    description: "Soporte completo para Windows 10/11 con integración nativa de WireGuard.",
    color: "primary"
  },
  {
    icon: <Apple className="w-8 h-8" />,
    name: "macOS",
    version: "v2.4.0",
    size: "58.1 MB",
    description: "Optimizado para Apple Silicon (M1/M2/M3) y procesadores Intel.",
    color: "accent"
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    name: "Linux",
    version: "v2.3.8",
    size: "12.5 MB",
    description: "Paquetes DEB, RPM y binarios estáticos para cualquier distribución.",
    color: "secondary"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    name: "Mobile",
    version: "v2.1.5",
    size: "42.0 MB",
    description: "Disponible en App Store y Google Play con soporte para códigos QR.",
    color: "primary"
  }
];

const Downloads = () => {
  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20 px-6 relative overflow-hidden text-center">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold">
              Descarga <span className="text-gradient">VerterVpn</span>
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Lleva la red mesh más segura a todos tus dispositivos. Conexión instantánea, cifrado mTLS y privacidad total donde quiera que estés.
            </p>
          </motion.div>
        </div>
        
        {/* Background Aurora */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-primary/40 blur-[150px] rounded-full" />
        </div>
      </section>

      {/* Platforms Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {platforms.map((platform, idx) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-8 rounded-4xl border border-white/5 hover:border-primary/20 transition-all group flex flex-col"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${platform.color}/10 flex items-center justify-center text-${platform.color} mb-8 group-hover:scale-110 transition-transform`}>
                {platform.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{platform.name}</h3>
              <div className="flex items-center gap-3 mb-4 text-xs font-bold uppercase tracking-widest text-foreground/40">
                <span>{platform.version}</span>
                <span className="w-1 h-1 bg-white/20 rounded-full" />
                <span>{platform.size}</span>
              </div>
              <p className="text-foreground/50 text-sm leading-relaxed mb-8 flex-1">
                {platform.description}
              </p>
              <Button variant={idx === 0 ? "gradient" : "glass"} className="w-full gap-2 group/btn">
                <Download className="w-4 h-4 group-hover/btn:translate-y-1 transition-transform" />
                Descargar
              </Button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">Instalación Segura</h4>
              <p className="text-foreground/50 text-sm leading-relaxed"> Binarios firmados digitalmente y verificados mediante checksums SHA-256 para garantizar la integridad.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                <Zap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">Setup en un Clic</h4>
              <p className="text-foreground/50 text-sm leading-relaxed">Configuración automática de drivers WireGuard y reglas de firewall sin intervención manual.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold">Soporte Multicuenta</h4>
              <p className="text-foreground/50 text-sm leading-relaxed">Cambia entre perfiles personales y corporativos de forma instantánea desde la barra de tareas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Alternative Installers */}
      <section className="py-24 px-6 bg-white/2">
        <div className="max-w-3xl mx-auto glass p-12 rounded-[3rem] border border-white/10 text-center space-y-8">
          <h2 className="text-3xl font-bold italic">¿Eres un usuario avanzado?</h2>
          <p className="text-foreground/60 leading-relaxed">
            También ofrecemos scripts para Docker, configuraciones CLI personalizadas y perfiles nativos de WireGuard para routers compatibles.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="text-primary font-bold hover:underline">Ver guías avanzadas</button>
            <span className="text-white/20">|</span>
            <button className="text-primary font-bold hover:underline">Ver código en GitHub</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Downloads;
