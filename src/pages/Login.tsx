import { motion } from "framer-motion";
import { Shield, Lock, Github } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full space-y-8 glass p-10 md:p-12 rounded-4xl border border-white/10 relative z-10"
      >
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group cursor-pointer">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
              <Shield className="w-7 h-7" />
            </div>
            <span className="text-3xl font-display font-bold tracking-tight">
              VerterV<span className="text-primary">pn</span>
            </span>
          </Link>
          <h2 className="text-3xl font-display font-bold text-foreground">Acceso de Usuario</h2>
          <p className="mt-2 text-sm text-foreground/50">
            Gestiona tu red segura desde un solo lugar.
          </p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="grid md:grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2 ml-1">Email o Usuario</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  className="block w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-foreground placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="usuario@email.com o username"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/70 mb-2 ml-1">Contraseña</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  className="block w-full px-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-foreground placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary/50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-foreground/50">
                Mantener sesión
              </label>
            </div>
            <div className="text-sm">
              <Link to="/contact" className="font-medium text-primary hover:text-primary/80 transition-colors">
                Recuperar acceso
              </Link>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/25"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-primary-foreground/50 group-hover:text-primary-foreground transition-colors" aria-hidden="true" />
            </span>
            Entrar a mi Cuenta
          </button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-foreground/40 uppercase tracking-widest font-bold text-[10px]">O accede con</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-foreground hover:bg-white/10 transition-all font-medium"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-3 py-4 px-4 bg-white/5 border border-white/10 rounded-2xl text-foreground hover:bg-white/10 transition-all font-medium"
            >
              <Github className="w-5 h-5" />
              GitHub
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/50">
          ¿Nuevo en VerterVpn?{" "}
          <Link to="/register" className="font-bold text-primary hover:text-primary/80 transition-colors underline decoration-primary/30 underline-offset-4">
            Crea una cuenta
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
