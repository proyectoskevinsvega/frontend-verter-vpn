import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { ReactNode } from "react";
import { Shield } from "lucide-react";

interface PrivateRouteProps {
  children: ReactNode;
}

/**
 * Protege rutas que requieren autenticación.
 * - Mientras AuthContext está cargando la sesión → muestra spinner.
 * - Si no está autenticado → redirige a /login.
 * - Si está autenticado → renderiza los children.
 *
 * Esto previene que el Dashboard y otros componentes protegidos
 * realicen llamadas a la API antes de conocer el estado de autenticación.
 */
const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Esperar a que el AuthContext termine de verificar la sesión
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg shadow-primary/20 animate-pulse">
          <Shield className="w-8 h-8" />
        </div>
        <div className="flex gap-1.5">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
