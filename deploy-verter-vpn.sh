#!/usr/bin/env bash

# Nombre sugerido: deploy-verter-vpn.sh
# Uso: ./deploy-verter-vpn.sh   (ejecútalo desde donde quieras, pero con permisos)

set -euo pipefail  # Sale si algún comando falla

echo ""
echo "======================================"
echo "  Desplegando verter-vpn (frontend)  "
echo "======================================"
echo ""

# 1. Cambiar al directorio del proyecto
echo "→ Cambiando al directorio /var/www/verter-vpn ..."
echo "----------------------------------------"
if cd /var/www/verter-vpn; then
    echo "✓ Directorio cambiado correctamente"
    pwd   # muestra dónde estás para confirmar
else
    echo "✗ Error: No se pudo acceder a /var/www/verter-vpn"
    echo "   → Verifica que el directorio existe y tienes permisos"
    exit 1
fi
echo ""

# 2. Git pull origin main
echo "→ Actualizando repositorio (git pull origin main)..."
echo "----------------------------------------"
if git pull origin main; then
    echo "✓ Git pull exitoso"
else
    echo "✗ Error en git pull"
    exit 1
fi
echo ""

# 3. npm run build
echo "→ Construyendo la aplicación (npm run build)..."
echo "----------------------------------------"
if npm run build; then
    echo "✓ Build completado exitosamente"
else
    echo "✗ Error durante npm run build"
    exit 1
fi
echo ""

# 4. Recargar Nginx
echo "→ Recargando Nginx para aplicar cambios..."
echo "----------------------------------------"
if sudo systemctl reload nginx; then
    echo "✓ Nginx recargado correctamente"
    echo "   → Los cambios ya deberían estar visibles en el navegador"
else
    echo "✗ Error al recargar Nginx"
    echo "   → Verifica el estado con: sudo systemctl status nginx"
    exit 1
fi
echo ""

echo "======================================"
echo "         ¡Despliegue finalizado!      "
echo "======================================"
echo ""