import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, ArrowLeft, RefreshCcw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Mover al siguiente input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otp = code.join("");
    console.log("Verificando código:", otp);
    // Aquí iría la llamada a la API
    if (otp.length === 6) {
      // Simulación de éxito
      alert("¡Cuenta verificada con éxito!");
      navigate("/login");
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
              VerterV<span className="text-primary">pn</span>
            </span>
          </Link>
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground">Verifica tu Correo</h2>
          <p className="mt-2 text-sm text-foreground/50">
            Hemos enviado un código de 6 dígitos a tu email. <br />
            Ingrésalo a continuación para activar tu cuenta.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          <div className="flex justify-between gap-2 md:gap-4">
            {code.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputs.current[idx] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-16 md:w-16 md:h-20 text-center text-2xl font-bold bg-white/5 border border-white/10 rounded-2xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
                placeholder="•"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={code.some(d => !d)}
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-2xl text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/25"
          >
            Verificar Cuenta
          </button>

          <div className="text-center space-y-4">
            <p className="text-sm text-foreground/50">
              ¿No recibiste el código?{" "}
              <button type="button" className="text-primary font-bold hover:underline transition-all inline-flex items-center gap-1">
                <RefreshCcw className="w-3 h-3" /> Reenviar código
              </button>
            </p>
            <Link to="/register" className="text-foreground/40 text-xs hover:text-foreground transition-all inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Volver al registro
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
