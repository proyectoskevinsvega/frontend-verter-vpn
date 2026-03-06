import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Zap, Shield, Activity, X } from "lucide-react";

const locations = [
  { city: "New York", country: "USA", latency: "12ms", load: "24%", status: "online" },
  { city: "London", country: "UK", latency: "18ms", load: "31%", status: "online" },
  { city: "Tokyo", country: "Japan", latency: "45ms", load: "15%", status: "online" },
  { city: "Frankfurt", country: "Germany", latency: "22ms", load: "42%", status: "online" },
  { city: "Madrid", country: "Spain", latency: "25ms", load: "18%", status: "online" },
  { city: "Singapore", country: "Singapore", latency: "38ms", load: "28%", status: "online" },
];

const Servers = () => {
  const [showMap, setShowMap] = useState(false);

  return (
    <section id="servers" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                Infraestructura <span className="text-gradient">Edge Global</span>
              </h2>
              <p className="text-foreground/60 text-lg leading-relaxed max-w-xl">
                Nuestra red de servidores está diseñada para ofrecer el máximo rendimiento y la mínima latencia. Con nodos distribuidos estratégicamente, garantizamos una conexión estable sin importar dónde te encuentres.
              </p>
            </div>

            <div className="grid gap-6">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-primary/30 transition-colors">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Optimización WireGuard</h4>
                  <p className="text-sm text-foreground/50">Ruteo inteligente que selecciona automáticamente el servidor más rápido.</p>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-secondary/30 transition-colors">
                <div className="p-3 rounded-xl bg-secondary/10 text-secondary">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Privacidad por Diseño</h4>
                  <p className="text-sm text-foreground/50">Servidores RAM-Only que no almacenan logs ni datos de sesión.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 border border-white/10"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary animate-pulse" />
                <h3 className="font-bold uppercase tracking-wider text-sm opacity-50">Estado de la Red</h3>
              </div>
              <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
                99.9% Uptime
              </div>
            </div>

            <div className="space-y-4">
              {locations.map((loc) => (
                <div key={loc.city} className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <div>
                      <p className="font-bold">{loc.city}</p>
                      <p className="text-xs text-foreground/40">{loc.country}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-xs text-foreground/40 uppercase font-bold tracking-tighter">Latencia</p>
                      <p className="text-primary font-mono text-sm">{loc.latency}</p>
                    </div>
                    <div className="text-right w-16">
                      <p className="text-xs text-foreground/40 uppercase font-bold tracking-tighter">Carga</p>
                      <p className="font-mono text-sm">{loc.load}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-foreground/40">
                <Globe className="w-4 h-4" />
                <span>+45 Nodos Disponibles</span>
              </div>
              <button 
                onClick={() => setShowMap(true)}
                className="text-primary hover:underline font-bold transition-all"
              >
                Ver Mapa Completo
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Modal */}
      <AnimatePresence>
        {showMap && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-background/80 backdrop-blur-xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl aspect-video glass rounded-4xl border border-white/10 overflow-hidden flex flex-col"
            >
              <div className="p-8 flex items-center justify-between border-b border-white/5">
                <div>
                  <h3 className="text-2xl font-display font-bold">Red Global VerterVpn</h3>
                  <p className="text-foreground/40 text-sm">Visualización en tiempo real de nodos activos</p>
                </div>
                <button 
                  onClick={() => setShowMap(false)}
                  className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex-1 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=2066')] bg-cover bg-center grayscale mix-blend-screen opacity-30 flex items-center justify-center p-12">
                <div className="relative w-full h-full">
                  {/* Decorative Map Points */}
                  {[
                    { t: "20%", l: "25%" }, { t: "35%", l: "75%" }, { t: "60%", l: "50%" },
                    { t: "15%", l: "85%" }, { t: "70%", l: "15%" }, { t: "45%", l: "35%" }
                  ].map((pos, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="absolute w-4 h-4 rounded-full bg-primary/40 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                      style={{ top: pos.t, left: pos.l }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                    </motion.div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center text-center">
                    <div className="p-6 rounded-2xl bg-background/50 backdrop-blur-md border border-white/5 max-w-xs">
                      <Globe className="w-12 h-12 text-primary mx-auto mb-4 animate-spin-slow" />
                      <h4 className="font-bold mb-2">Despliegue Multi-Cloud</h4>
                      <p className="text-xs text-foreground/60 leading-relaxed">
                        Nuestra red utiliza infraestructura híbrida para garantizar 0% de interrupciones de servicio.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-primary/10 blur-[100px] pointer-events-none" />
    </section>
  );
};

export default Servers;
