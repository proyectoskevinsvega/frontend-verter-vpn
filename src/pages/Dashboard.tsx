import { useAuth } from "../contexts/AuthContext";
import { LogOut, Shield, ShieldCheck } from "lucide-react";
import { Link, Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        {/* Header */}
        <header className="glass p-6 rounded-4xl border border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 transition-transform">
                <Shield className="w-7 h-7" />
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">
                VerterV<span className="text-primary">pn</span>
              </span>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground/90">{user?.name || 'Usuario'}</p>
              <p className="text-xs text-foreground/50">{user?.email}</p>
            </div>
            <button
              onClick={() => logout()}
              className="px-4 py-2 border border-white/10 rounded-xl text-sm font-medium text-foreground hover:bg-white/5 hover:border-white/20 transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4 text-primary" />
              Cerrar Sesión
            </button>
          </div>
        </header>

        {/* Panel Content */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-8 rounded-4xl border border-white/5 md:col-span-2 space-y-6">
            <h2 className="text-2xl font-display font-bold text-foreground flexItems-center gap-2">
              <ShieldCheck className="w-6 h-6 text-primary inline-block mr-2" />
              Bienvenido al Panel de Control
            </h2>
            <p className="text-foreground/70 leading-relaxed">
              Has iniciado sesión correctamente. Desde aquí podrás gestionar tus accesos, conexiones a la red mesh y configuraciones de cuenta.
            </p>
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Información de Seguridad</h3>
              <ul className="space-y-3 text-sm text-foreground/70">
                <li className="flex items-center justify-between">
                  <span>Estado de la Cuenta:</span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg font-medium">Activa</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Autenticación de Dos Factores:</span>
                  <span className="px-3 py-1 bg-white/5 text-foreground/50 border border-white/10 rounded-lg">Desactivada</span>
                </li>
              </ul>
            </div>
            
          </div>
          
          <div className="glass p-8 rounded-4xl border border-white/5 space-y-6 flex flex-col items-center justify-center text-center">
             <div className="w-24 h-24 rounded-full bg-primary/10 flex flex-col items-center justify-center text-primary border border-primary/20">
               <span className="text-3xl font-bold font-display cursor-default">0</span>
             </div>
             <p className="text-foreground/70 font-medium">Dispositivos Conectados</p>
             <button className="w-full py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/25">
               Añadir Dispositivo
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
