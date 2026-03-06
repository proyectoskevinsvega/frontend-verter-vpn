import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Clock, User, ArrowRight, Search, ChevronRight, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const allPosts = [
  {
    id: 1,
    title: "Por qué WireGuard es el futuro de la privacidad",
    excerpt: "Analizamos las ventajas técnicas de WireGuard frente a protocolos tradicionales como OpenVPN y IKEv2.",
    author: "Ing. Kevin S.",
    date: "24 Feb, 2026",
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Cómo evadir la censura DPI con ofuscación",
    excerpt: "Exploramos el uso de WSTunnel y Cloak para mantenerte conectado incluso en redes altamente restringidas.",
    author: "Ciberseguridad Team",
    date: "20 Feb, 2026",
    category: "Seguridad",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2069&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Introducción a las redes Mesh privadas",
    excerpt: "Aprende cómo conectar todos tus dispositivos en una red segura sin depender de servidores centralizados.",
    author: "Redes Verter",
    date: "15 Feb, 2026",
    category: "Redes",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Seguridad en el IoT: Protegiendo tu hogar inteligente",
    excerpt: "Guía paso a paso para asegurar tus dispositivos inteligentes utilizando la infraestructura de VerterVpn.",
    author: "Domótica Segura",
    date: "10 Feb, 2026",
    category: "IoT",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Optimización de latencia para Gaming y Streaming",
    excerpt: "Cómo configurar tus túneles para obtener el mejor rendimiento en juegos competitivos y streaming 4K.",
    author: "Gamer Core",
    date: "05 Feb, 2026",
    category: "Rendimiento",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "El fin de las cookies de terceros y tu privacidad",
    excerpt: "Qué significa el nuevo estándar web para el rastreo y cómo una VPN ayuda a mitigar estos problemas.",
    author: "Privacidad Web",
    date: "01 Feb, 2026",
    category: "Privacidad",
    image: "https://images.unsplash.com/photo-1557591954-469a9979776b?q=80&w=2070&auto=format&fit=crop",
  },
];

const Blog = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);

  const loadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisiblePosts((prev: number) => prev + 3);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="pt-24 min-h-screen bg-background">
      {/* Blog Hero */}
      <section className="py-20 relative overflow-hidden px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/30 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <span className="text-primary font-bold uppercase tracking-widest text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              Noticias y Guías
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold">
              Verter<span className="text-gradient">Blog</span>
            </h1>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Descubre las últimas tendencias en ciberseguridad, privacidad digital y optimización de redes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 max-w-md mx-auto relative"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Buscar artículos..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {allPosts.slice(0, visiblePosts).map((post, idx) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (idx % 3) * 0.1 }}
                  className="glass rounded-3xl border border-white/5 overflow-hidden group hover:border-primary/20 transition-all flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent" />
                    <span className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg backdrop-blur-md">
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/40 uppercase tracking-widest mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" /> {post.author}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                      {post.title}
                    </h3>
                    
                    <p className="text-foreground/50 text-sm leading-relaxed mb-6 flex-1">
                      {post.excerpt}
                    </p>
                    
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-primary text-sm font-bold group/link"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
          
          {visiblePosts < allPosts.length && (
            <div className="mt-16 text-center">
              <button 
                onClick={loadMore}
                disabled={isLoading}
                className="glass border border-white/10 px-8 py-4 rounded-2xl hover:bg-white/5 transition-all font-bold inline-flex items-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <RefreshCcw className="w-4 h-4 animate-spin" />
                    Cargando...
                  </>
                ) : (
                  <>
                    Ver todos los artículos
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto glass p-12 md:p-20 rounded-[3rem] border border-white/10 relative z-10 text-center space-y-8">
          <div className="inline-flex p-4 rounded-3xl bg-primary/10 text-primary mb-4">
            <Shield className="w-10 h-10" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold max-w-2xl mx-auto">
            Mantente a la vanguardia de la <span className="text-gradient">privacidad</span>
          </h2>
          <p className="text-foreground/50 text-lg max-w-xl mx-auto">
            Suscríbete a nuestra newsletter y recibe guías exclusivas y actualizaciones del sistema VerterVpn directamente en tu correo.
          </p>
          
          <form className="max-w-md mx-auto mt-10 relative group">
            <input
              type="email"
              placeholder="tu@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 px-6 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all pr-40"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-primary hover:bg-primary/90 text-white px-8 rounded-xl font-bold transition-all"
            >
              Suscribirse
            </button>
          </form>
          <p className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest">
            Prometemos 0% spam. Solo conocimiento puro.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;
