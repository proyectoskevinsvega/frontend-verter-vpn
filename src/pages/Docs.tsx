import { motion } from "framer-motion";
import { Terminal, Code, ChevronRight } from "lucide-react";

const sections = [
  {
    title: "Introducción",
    items: ["¿Qué es VerterVpn?", "Conceptos de Red Mesh", "Guía de Inicio Rápido"]
  },
  {
    title: "Seguridad Avanzada",
    items: ["Autenticación mTLS", "Gestión de Certificados", "Protocolos de Ofuscación"]
  },
  {
    title: "Despliegue",
    items: ["Instalación en Linux", "Configuración para Equipos", "API de Administración"]
  }
];

const Docs = () => {
  return (
    <div className="pt-24 min-h-screen bg-background flex">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:block w-80 border-r border-white/5 p-8 h-[calc(100vh-6rem)] sticky top-24 overflow-y-auto">
        <div className="space-y-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/30">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <a href="#" className="text-sm text-foreground/60 hover:text-primary transition-colors flex items-center gap-2">
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100" />
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 py-12 px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto space-y-16">
          <header className="space-y-6">
            <h1 className="text-5xl font-display font-bold">Documentación <span className="text-primary">Técnica</span></h1>
            <p className="text-foreground/50 text-xl leading-relaxed">
              Explora las guías detalladas para implementar VerterVpn en tu infraestructura. Desde los conceptos básicos hasta configuraciones avanzadas de seguridad.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border border-white/5 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <Terminal className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Quick Start</h3>
              <p className="text-foreground/50 text-sm">Levanta tu primer nodo seguro en menos de 5 minutos usando nuestra CLI.</p>
              <button className="text-primary font-bold text-sm flex items-center gap-2">
                Leer Guía <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-3xl border border-white/5 space-y-4 group"
            >
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">API Reference</h3>
              <p className="text-foreground/50 text-sm">Automatiza la gestión de tu red utilizando nuestra API REST documentada.</p>
              <button className="text-secondary font-bold text-sm flex items-center gap-2">
                Ver Endpoints <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>

          {/* Content Placeholder */}
          <article className="prose prose-invert max-w-none space-y-8">
            <h2 className="text-3xl font-bold">¿Por qué VerterVpn?</h2>
            <p className="text-foreground/70">
              La arquitectura de VerterVpn se basa en el principio de <strong>Zero Trust</strong>. Cada dispositivo es validado mediante certificados mutuos (mTLS) antes de permitir cualquier tipo de tráfico.
            </p>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10 font-mono text-sm text-primary">
              <p>$ verter-cli login</p>
              <p className="text-foreground/40 mt-1"># Inicializando autenticación segura...</p>
              <p>$ verter-cli connect --mesh my-company-network</p>
            </div>
            <p className="text-foreground/70">
              Nuestra red Mesh permite que tus servidores, portátiles y dispositivos móviles actúen como una sola red local privada, sin importar dónde se encuentren físicamente.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
};

export default Docs;
