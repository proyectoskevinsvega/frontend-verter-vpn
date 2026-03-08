import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, KeyRound, ArrowRight, Loader2 } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { api } from "../lib/axios";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  // Extract email from navigation state if available
  const email = location.state?.email || "tu correo";

  useEffect(() => {
    // Auto-focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedCode = value.slice(0, 6).split("");
      const newCode = [...code];
      pastedCode.forEach((char, i) => {
        if (index + i < 6) newCode[index + i] = char;
      });
      setCode(newCode);
      
      // Focus last filled input or next empty
      const nextIndex = Math.min(index + pastedCode.length, 5);
      inputRefs.current[nextIndex]?.focus();
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-advance
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (code[index] === "" && index > 0) {
        // Move back on backspace if current is empty
        inputRefs.current[index - 1]?.focus();
        const newCode = [...code];
        newCode[index - 1] = "";
        setCode(newCode);
      } else {
        // Clear current
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join("");
    
    if (fullCode.length !== 6) {
      toast.error("Por favor, ingresa el código completo de 6 dígitos.");
      return;
    }

    setLoading(true);

    try {
      // tenant_id will be automatically injected by the Axios interceptor
      await api.post("/auth/verify-email", {
        code: fullCode,
      });
      
      toast.success("¡Correo verificado con éxito! Ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Código inválido o expirado");
      // Clear code on error
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
        setLoading(true);
        toast.info("Enviando nuevo código de verificación...");
        
        await api.post("/auth/resend-verification", {
          email: email,
        });

        toast.success("Si el correo está registrado, recibirás un nuevo código pronto.");
    } catch (error: any) {
        if (error.response?.status === 429) {
           toast.error("Has excedido el límite de reenvíos. Intenta más tarde.");
        } else {
           toast.error(error.response?.data?.error || "Error al reenviar el código");
        }
    } finally {
        setLoading(false);
    }
  };

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
              Verter<span className="text-primary">Cloud</span>
            </span>
          </Link>
          
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <KeyRound className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="text-3xl font-display font-bold text-foreground">Verifica tu Correo</h2>
          <p className="mt-4 text-sm text-foreground/70 max-w-sm mx-auto">
            Hemos enviado un código de seguridad de 6 dígitos a <span className="font-bold text-primary">{email}</span>. Ingresa el código abajo para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="flex justify-center gap-2 sm:gap-4">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-white/5 border border-white/10 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                disabled={loading}
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || code.join("").length !== 6}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Confirmar Identidad
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-foreground/50">
            ¿No recibiste el código?{" "}
            <button 
              onClick={handleResend}
              type="button" 
              className="font-medium text-primary hover:text-primary/80 transition-colors bg-transparent border-none p-0 cursor-pointer"
            >
              Reenviar código
            </button>
          </p>
          <div className="mt-6">
             <Link to="/login" className="text-sm font-medium text-foreground/50 hover:text-foreground transition-colors">
                Volver al Login
              </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
