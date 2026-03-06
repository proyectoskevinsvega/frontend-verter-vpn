import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { ArrowRight, ShieldCheck, Zap, Lock, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden aurora-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Nueva Generación de VPN Mesh
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight max-w-4xl mx-auto leading-[1.1]"
          >
            Privacidad Total en una <span className="text-gradient">Red Mesh Global</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed"
          >
            Conéctate de forma segura a cualquier dispositivo, en cualquier lugar. VerterVpn utiliza tecnología WireGuard con ruteo inteligente y subdominios personalizados.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/register">
              <Button variant="gradient" size="lg" className="group">
                Pruébalo Gratis <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/#pricing">
              <Button variant="glass" size="lg">Ver Planes</Button>
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <ShieldCheck className="w-5 h-5" /> Cifrado Grado Militar
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Zap className="w-5 h-5" /> WireGuard Nativo
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Lock className="w-5 h-5" /> No-Log Policy
            </div>
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Globe className="w-5 h-5" /> Red Mundial
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-primary/30 blur-[120px] rounded-full animate-pulse" />
      </div>
    </section>
  );
};

export default Hero;
