import { useAuth } from "../contexts/AuthContext";
import { LogOut, Shield, ShieldCheck, CreditCard, Laptop, RefreshCcw, Trash2 } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userService, subscriptionService } from "../lib/dashboardApi";
import type { Session, SubscriptionSummary, Plan } from "../types/dashboard";
import { toast } from "sonner";
import { VpnDevices } from "../components/dashboard/VpnDevices";

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  
  const [sessions, setSessions] = useState<Session[]>([]);
  const [subscription, setSubscription] = useState<SubscriptionSummary | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'vpn'>('overview');

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData();
    }
  }, [isAuthenticated]);

  const loadDashboardData = async () => {
    setLoadingData(true);
    try {
      const [sessionsData, subData, planData] = await Promise.all([
        userService.getSessions(),
        subscriptionService.getSummary().catch(() => null),
        subscriptionService.getMyPlan().catch(() => null)
      ]);
      setSessions(sessionsData);
      setSubscription(subData);
      setPlan(planData);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
      toast.error("Error al cargar la información del panel");
    } finally {
      setLoadingData(false);
    }
  };

  const handleRevokeSession = async (sessionId: string) => {
    try {
      await userService.revokeSession(sessionId);
      toast.success("Sesión revocada exitosamente");
      setSessions(sessions.filter(s => s.id !== sessionId));
    } catch (error) {
      toast.error("No se pudo revocar la sesión");
    }
  };

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

        <div className="flex border-b border-white/10 mb-6 space-x-8">
          <button 
             onClick={() => setActiveTab('overview')} 
             className={`pb-4 font-semibold text-sm transition-colors relative ${activeTab === 'overview' ? 'text-primary' : 'text-foreground/50 hover:text-foreground'}`}
          >
             Resumen del Servicio
             {activeTab === 'overview' && <div className="absolute -bottom-px left-0 w-full h-0.5 bg-primary"></div>}
          </button>
          <button 
             onClick={() => setActiveTab('vpn')} 
             className={`pb-4 font-semibold text-sm transition-colors relative ${activeTab === 'vpn' ? 'text-primary' : 'text-foreground/50 hover:text-foreground'}`}
          >
             Mis Dispositivos (VPN)
             {activeTab === 'vpn' && <div className="absolute -bottom-px left-0 w-full h-0.5 bg-primary"></div>}
          </button>
        </div>

        {/* Panel Content */}
        {activeTab === 'overview' ? (
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
                  <span className={`px-3 py-1 border rounded-lg ${user?.two_factor_enabled ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-white/5 text-foreground/50 border-white/10'}`}>
                    {user?.two_factor_enabled ? 'Activada' : 'Desactivada'}
                  </span>
                </li>
              </ul>
            </div>
            
            {/* Suscripción Activa */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                   <CreditCard className="w-5 h-5 text-primary" />
                   Suscripción Actual
                 </h3>
                 <button onClick={loadDashboardData} className="p-2 hover:bg-white/10 rounded-lg transition-colors text-foreground/50 hover:text-foreground">
                   <RefreshCcw className={`w-4 h-4 ${loadingData ? 'animate-spin' : ''}`} />
                 </button>
              </div>
              
              {loadingData ? (
                <div className="animate-pulse space-y-3">
                  <div className="h-4 bg-white/10 rounded w-1/3"></div>
                  <div className="h-4 bg-white/10 rounded w-1/4"></div>
                </div>
              ) : subscription && plan ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{plan.name}</p>
                      <p className="text-sm text-foreground/50">
                        {subscription.status === 'active' ? 'Activa' : 
                         subscription.status === 'trial' ? 'Prueba' :
                         subscription.status === 'expired' ? 'Expirada' :
                         subscription.status === 'cancelled' ? 'Cancelada' :
                         subscription.status}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">${plan.price_monthly}</p>
                      <p className="text-xs text-foreground/50">/ mes</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-sm text-foreground/70">
                    <div>
                      <p className="font-semibold mb-1">Renovación:</p>
                      <p>
                        {subscription.subscription?.end_date 
                          ? new Date(subscription.subscription.end_date).toLocaleDateString() 
                          : 'Sin vencimiento'}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">Dispositivos Límite:</p>
                      <p>{plan.max_devices} equipos</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-foreground/50 mb-4">No tienes una suscripción activa</p>
                  <Link to="/#pricing" className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary/90 transition-all inline-block">
                    Ver Planes
                  </Link>
                </div>
              )}
            </div>

            {/* Dispositivos / Sesiones */}
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-primary" />
                Dispositivos Conectados
              </h3>
              
              {loadingData ? (
                 <div className="flex justify-center py-4"><RefreshCcw className="w-6 h-6 animate-spin text-primary" /></div>
              ) : sessions.length > 0 ? (
                <div className="space-y-3">
                  {sessions.map(session => (
                    <div key={session.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                       <div>
                         <p className="text-sm font-medium text-foreground flex items-center gap-2">
                           {session.ip_address}
                           {session.is_active && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                         </p>
                         <p className="text-xs text-foreground/50 truncate max-w-[200px] md:max-w-xs" title={session.user_agent}>
                           {session.user_agent}
                         </p>
                       </div>
                       <button 
                         onClick={() => handleRevokeSession(session.id)}
                         className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                         title="Revocar acceso"
                       >
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-foreground/50 text-center py-4">No hay sesiones activas</p>
              )}
            </div>
          </div>
          
          <div className="glass p-8 rounded-4xl border border-white/5 space-y-6 flex flex-col items-center justify-start text-center h-fit sticky top-6">
             <div className="w-24 h-24 rounded-full bg-primary/10 flex flex-col items-center justify-center text-primary border border-primary/20">
               <span className="text-3xl font-bold font-display cursor-default">{sessions.length}</span>
             </div>
             <div>
               <p className="text-foreground/70 font-medium">Dispositivos / Sesiones Activas</p>
               <p className="text-xs text-foreground/40 mt-1">Límite según tu plan: {plan?.max_devices || 0}</p>
             </div>
             
             <hr className="w-full border-white/10" />
             
             <div className="w-full space-y-3">
               <button onClick={() => setActiveTab('vpn')} className="w-full py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/25">
                 Gestionar VPN
               </button>
               <button className="w-full py-3 px-4 border border-white/10 text-sm font-semibold rounded-xl text-foreground hover:bg-white/5 transition-all">
                 Cambiar Contraseña
               </button>
             </div>
          </div>
        </div>
        ) : (
           <VpnDevices planLimit={plan?.max_devices || 0} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
