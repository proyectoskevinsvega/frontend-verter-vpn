import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Crown, Globe, AlertCircle } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { apiService } from "../../lib/api";
import type { Plan } from "../../types/plan";
import { Link } from "react-router-dom";

const Pricing = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await apiService.getPlans();
        setPlans(data);
      } catch (err) {
        setError("No se pudieron cargar los planes. Por favor, intenta de nuevo más tarde.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const getPlanIcon = (type: string) => {
    switch (type) {
      case "free": return Shield;
      case "basic": return Zap;
      case "pro": return Crown;
      case "enterprise": return Globe;
      default: return Shield;
    }
  };

  const getPlanColor = (type: string) => {
    switch (type) {
      case "pro": return "primary";
      case "enterprise": return "accent";
      default: return "secondary";
    }
  };

  const formatFeatures = (plan: Plan): string[] => {
    const features: string[] = [];
    
    // Límites básicos
    features.push(`${plan.max_devices === -1 ? "Dispositivos ilimitados" : `${plan.max_devices} Dispositivo(s)`}`);
    
    if (plan.speed_limit === -1) {
      features.push("Velocidad ilimitada");
    } else {
      features.push(`Velocidad hasta ${plan.speed_limit} Mbps`);
    }

    if (plan.bandwidth_limit === -1) {
      features.push("Ancho de banda ilimitado");
    } else {
      const gbValue = (plan.bandwidth_limit / (1024 * 1024 * 1024)).toFixed(0);
      features.push(`Tráfico de ${gbValue} GB/mes`);
    }

    // Características booleanas (solo las más importantes)
    if (plan.features.kill_switch) features.push("Kill Switch automático");
    if (plan.features.p2p_servers) features.push("Soporte P2P / Torrent");
    if (plan.features.stealth_mode) features.push("Modo Stealth (Anti-detección)");
    if (plan.max_subdomains > 0) features.push(`${plan.max_subdomains} Subdominio(s) personalizado(s)`);
    if (plan.features.priority_support) features.push("Soporte prioritario 24/7");

    return features;
  };

  if (isLoading) {
    return (
      <section id="pricing" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse space-y-8">
            <div className="h-10 w-48 bg-white/5 mx-auto rounded-full" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-white/5 rounded-3xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="p-8 glass rounded-3xl border-red-500/20 inline-block">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Error de conexión</h3>
            <p className="text-foreground/60 mb-6">{error}</p>
            <Button onClick={() => window.location.reload()}>Reintentar</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-display font-bold tracking-tight">Planes <span className="text-gradient">Flexibles</span></h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            Elige el plan que mejor se adapte a tus necesidades. Generamos datos reales desde nuestro sistema para tu seguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => {
            const Icon = getPlanIcon(plan.type);
            const color = getPlanColor(plan.type);
            const planFeatures = formatFeatures(plan);
            const isPopular = plan.slug === "pro";

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={cn(
                  "relative flex flex-col p-6 rounded-3xl border transition-all duration-300 group",
                  isPopular 
                    ? "bg-primary/5 border-primary/20 scale-105 z-10 shadow-2xl shadow-primary/10" 
                    : "bg-white/5 border-white/5 hover:border-white/10"
                )}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                    Recomendado
                  </div>
                )}

                <div className="space-y-6 flex-1">
                  <div className="flex items-center gap-3">
                    <div className={cn("p-2 rounded-xl", `bg-${color}/10 text-${color}`)}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">$</span>
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price_monthly === 0 ? "0" : plan.price_monthly}
                    </span>
                    <span className="text-foreground/40 text-xs font-medium">/mes</span>
                  </div>

                  <p className="text-xs text-foreground/60 leading-relaxed h-10 line-clamp-2">
                    {plan.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-white/5 text-[13px]">
                    {planFeatures.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="rounded-full p-0.5 bg-green-500/20 text-green-500 shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4">
                  <Link to="/register" className="w-full">
                    <Button 
                      variant={isPopular ? "gradient" : "glass"} 
                      className="w-full text-sm"
                      size="md"
                    >
                      {plan.price_monthly === 0 ? "Comenzar Gratis" : "Adquirir Plan"}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
