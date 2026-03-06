import { useState, useEffect } from "react";
import { Menu, X, Shield } from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../lib/utils";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Características", path: "/", hash: "#features" },
    { name: "Planes", path: "/", hash: "#pricing" },
    { name: "Blog", path: "/blog", hash: "" },
    { name: "Sobre Nosotros", path: "/", hash: "#about" },
    { name: "Servidores", path: "/", hash: "#servers" },
    { name: "Status", path: "/", hash: "#status" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
        isScrolled ? "py-3 backdrop-blur-md bg-background/80 border-b border-white/5" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight">
            VerterV<span className="text-primary">pn</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center bg-white/5 rounded-full px-6 py-2 border border-white/5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={{ pathname: link.path, hash: link.hash }}
              className="px-4 py-1 text-sm text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" size="sm">Iniciar Sesión</Button>
          </Link>
          <Link to="/register">
            <Button variant="gradient" size="sm">Empezar Ahora</Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-white/5 p-6 space-y-4 md:hidden animate-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={{ pathname: link.path, hash: link.hash }}
              className="block text-lg font-medium text-foreground/80 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <Link to="/login" className="w-full">
              <Button variant="outline" className="w-full">Iniciar Sesión</Button>
            </Link>
            <Button variant="gradient" className="w-full">Empezar Ahora</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
