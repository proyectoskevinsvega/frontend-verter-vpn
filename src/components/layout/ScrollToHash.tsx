import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToHash = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Si no hay hash, subimos al top de la página (comportamiento estándar de navegación)
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Si hay un hash, esperamos un poco a que el DOM se renderice (especialmente útil al cambiar de página)
    const id = hash.replace("#", "");
    const element = document.getElementById(id);

    if (element) {
      // Ajuste de scroll considerando el alto del Navbar (aprox 80px)
      const yOffset = -80; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });

      // Limpiamos el hash de la URL para que se vea profesional y limpia
      // Usamos un pequeño delay para que el navegador no ignore el scroll
      setTimeout(() => {
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }, 500); 
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToHash;
