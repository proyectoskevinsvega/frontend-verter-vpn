import { motion } from "framer-motion";
import { Shield, Lock, Smartphone, Globe, QrCode, Network, Star, MonitorSmartphone } from "lucide-react";

const features = [
  {
    title: "Infraestructura Global",
    description: "Acceso a múltiples servidores distribuidos estratégicamente para garantizar baja latencia y alta disponibilidad global.",
    icon: Globe,
    className: "md:col-span-2",
  },
  {
    title: "Conexión Instantánea",
    description: "Generación automática de códigos QR para una configuración rápida y segura en cualquier dispositivo móvil.",
    icon: QrCode,
    className: "md:col-span-1",
  },
  {
    title: "Perfiles de Conexión",
    description: "Guarda tus configuraciones y servidores favoritos para un acceso rápido y personalizado en cada sesión.",
    icon: Star,
    className: "md:col-span-1",
  },
  {
    title: "Puertos & Subdominios",
    description: "Expon tus aplicaciones al mundo con subdominios personalizados y múltiples puertos públicos. Ideal para startups, empresas, devs y programadores.",
    icon: Network,
    className: "md:col-span-1",
  },
  {
    title: "Soporte Multiplataforma",
    description: "Aplicaciones nativas optimizadas para iOS, Android, Windows, macOS y Linux. Seguridad en todos tus equipos.",
    icon: MonitorSmartphone,
    className: "md:col-span-1",
  },
  {
    title: "Seguridad Zero Trust",
    description: "Autenticación mTLS de grado militar, rotación de certificados cada 30 días y revocación instantánea de accesos.",
    icon: Shield,
    className: "md:col-span-1",
  },
  {
    title: "Stealth & Anti-DPI",
    description: "Oculta tu tráfico con WSTunnel, Shadowsocks, Cloak, UDP2Raw y Obfs4 para evadir inspecciones profundas de paquetes.",
    icon: Shield,
    className: "md:col-span-2",
  },
  {
    title: "Protección Crítica",
    description: "Kill Switch endurecido a nivel de IPTables y DNS Leak Protection para garantizar anonimato total del tráfico.",
    icon: Lock,
    className: "md:col-span-1",
  },
  {
    title: "Self-Service & Mesh",
    description: "Panel de autogestión completa y red en malla privada global para interconexión segura entre tus dispositivos.",
    icon: Smartphone,
    className: "md:col-span-2",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-background/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-display font-bold tracking-tight">Tecnología de <span className="text-gradient">Alto Rendimiento</span></h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Hemos construido una plataforma robusta pensando en la privacidad y la velocidad extrema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-auto gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`p-8 rounded-3xl glass hover:border-primary/30 transition-all duration-500 group ${feature.className}`}
            >
              <div className="bg-primary/10 p-3 rounded-2xl w-fit mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
              <p className="text-foreground/60 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
