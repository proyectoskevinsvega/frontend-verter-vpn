import { motion } from "framer-motion";
import { CheckCircle2, Activity } from "lucide-react";

const services = [
  { name: "Control Plane", status: "Operational", uptime: "99.99%", latency: "24ms" },
  { name: "Global Mesh Network", status: "Operational", uptime: "100%", latency: "15ms" },
  { name: "SSL/TLS Cerificates", status: "Operational", uptime: "100%", latency: "Valid" },
  { name: "API Gateway", status: "Operational", uptime: "99.95%", latency: "12ms" },
  { name: "Authentication Service", status: "Operational", uptime: "100%", latency: "8ms" },
];

const Status = () => {
  return (
    <section id="status" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Estado del <span className="text-gradient">Sistema</span>
          </h2>
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Monitoreo en tiempo real de nuestra infraestructura global y servicios críticos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {service.status}
                </span>
              </div>
              <h4 className="font-bold text-lg mb-1">{service.name}</h4>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                <div>
                  <p className="text-[10px] text-foreground/40 font-bold uppercase">Uptime</p>
                  <p className="text-sm font-mono text-foreground/80">{service.uptime}</p>
                </div>
                <div>
                  <p className="text-[10px] text-foreground/40 font-bold uppercase">Latencia</p>
                  <p className="text-sm font-mono text-primary">{service.latency}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Incident History Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-8 rounded-3xl glass border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Activity className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Todo en orden</h3>
              <p className="text-foreground/50 text-sm">No se han reportado incidentes en las últimas 24 horas.</p>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-foreground/40">
                    {i === 4 ? "+12" : "•"}
                  </div>
                ))}
             </div>
             <p className="text-sm text-foreground/40 self-center">Monitoreando 48 nodos globales</p>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blur */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary/10 blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Status;
