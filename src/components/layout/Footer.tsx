import { Shield, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <span className="text-2xl font-display font-bold tracking-tight">
                VerterV<span className="text-primary">pn</span>
              </span>
            </div>
            <p className="text-foreground/50 text-sm leading-relaxed">
              La Red Mesh más rápida y privada del mundo. Basada en estándares abiertos y transparencia total.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-colors text-foreground/60 hover:text-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-colors text-foreground/60 hover:text-primary">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-primary/20 transition-colors text-foreground/60 hover:text-primary">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-foreground/40">Producto</h4>
            <ul className="space-y-4 text-sm text-foreground/60">
              <li><Link to="/#features" className="hover:text-primary transition-colors">Características</Link></li>
              <li><Link to="/#pricing" className="hover:text-primary transition-colors">Planes</Link></li>
              <li><Link to="/downloads" className="hover:text-primary transition-colors">Descargas</Link></li>
              <li><Link to="/#servers" className="hover:text-primary transition-colors">Servidores</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-foreground/40">Compañía</h4>
            <ul className="space-y-4 text-sm text-foreground/60">
              <li><Link to="/#about" className="hover:text-primary transition-colors">Sobre Nosotros</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/careers" className="hover:text-primary transition-colors">Carreras</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="font-bold uppercase tracking-widest text-xs text-foreground/40">Soporte</h4>
            <ul className="space-y-4 text-sm text-foreground/60">
              <li><Link to="/help" className="hover:text-primary transition-colors">Centro de Ayuda</Link></li>
              <li><Link to="/docs" className="hover:text-primary transition-colors">Documentación</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacidad</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Términos</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-foreground/40 text-center">
          <p>© 2024 VerterVpn. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            <span>contacto@vertervpn.online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
