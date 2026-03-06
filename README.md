# VerterVpn Frontend - Dashboard Premium 🚀🛡️

VerterVpn es una solución de red mesh de última generación diseñada para ofrecer privacidad total, seguridad mTLS y una experiencia de usuario excepcional. Este repositorio contiene el frontend profesional construido bajo los más altos estándares de desarrollo moderno.

## 🚀 Stack Tecnológico

- **Framework**: React 19 + Vite 7
- **Lenguaje**: TypeScript (Strict Mode)
- **Estilos**: Tailwind CSS 4 (Sistema de diseño basado en tokens)
- **Animaciones**: Framer Motion (Micro-interacciones premium)
- **Iconografía**: Lucide React
- **Ruteo**: React Router Dom v7

## ✨ Características Principales

- **Dashboard High-Tech**: Monitoreo de estado del sistema y red mesh en tiempo real.
- **Navegación Inteligente**: Enlaces absolutos con sistema de scroll suave y limpieza automática de Hash (`#`) para una URL profesional.
- **Sección de Descargas**: Instaladores dedicados para Windows, macOS, Linux y Dispositivos Móviles.
- **Centro de Soporte**: Documentación técnica detallada y Centro de Ayuda con FAQ interactivo.
- **Seguridad**: Integración nativa con políticas de Zero-Logs y cifrado de grado militar.

## 🚀 Guía de Despliegue en VPS

Sigue estos pasos para poner la aplicación en producción de manera profesional.

### 1. Preparación y Permisos

Se recomienda desplegar en `/var/www/` para seguir los estándares de Linux. Asegura que el usuario de Nginx (`www-data`) tenga acceso de lectura.

```bash
# Crear directorio y asignar permisos (reemplaza $USER por tu nombre de usuario)
sudo mkdir -p /var/www/verter-vpn
sudo chown -R $USER:www-data /var/www/verter-vpn
sudo chmod -R 775 /var/www/verter-vpn

# Clonar e instalar
cd /var/www/verter-vpn
git clone https://github.com/proyectoskevinsvega/frontend-verter-vpn.git .
bun install
bun run build
```

O si ya tienes el repositorio, simplemente aplica los permisos al directorio actual:

```bash
sudo chown -R $USER:www-data .
sudo chmod -R 755 .
```

### 2. Configuración de Nginx

Utiliza la configuración optimizada incluida en `nginx.conf`. Ejecuta el siguiente comando para crear y editar el archivo de sitio en tu VPS:

```bash
sudo nano /etc/nginx/sites-available/verter-frontend
```

**Pega el siguiente contenido y ajusta tu dominio y rutas:**

#### Contenido recomendado (Ajusta los paths):

> [!NOTE]
> No incluyas las directivas globales `user`, `http`, etc. en este archivo, ya que Nginx las gestiona en el archivo principal.

```nginx
# Rate Limiting - Anti-DoS (Opcional: puedes mover esto a /etc/nginx/nginx.conf)
limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
limit_conn_zone $binary_remote_addr zone=addr:10m;

server {
    listen 80;
    server_name vpn.tu-dominio.com; # <--- TU DOMINIO AQUÍ

    root /var/www/verter-vpn/dist; # Ruta a tu carpeta dist
    index index.html;

    # Gzip (Si no está activo globalmente)
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml;

    # Security Headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # SPA Routing
    location / {
        limit_req zone=one burst=20 nodelay;
        limit_conn addr 10;
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "no-store, no-cache, must-revalidate";
    }

    # Cache Assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|otf)$ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
        access_log off;
        log_not_found off;
    }

    # Health Check
    location /health {
        access_log off;
        return 200 "healthy\n";
    }

    # Error Pages
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

### 3. Habilitar el Sitio

```bash
sudo ln -s /etc/nginx/sites-available/verter-frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 4. Configuración SSL (Certbot)

Para un servicio profesional, es obligatorio usar HTTPS. Recomendamos **Certbot** (Let's Encrypt):

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d vpn.tu-dominio.com
```

Certbot configurará automáticamente la redirección de HTTP a HTTPS y añadirá los certificados a tu archivo de Nginx.

## 🛡️ Seguridad Proactiva (Anti-DDoS)

Si decides no usar Cloudflare para mantener máxima privacidad, debes endurecer el servidor manualmente:

### 1. Nginx Rate Limiting

Nuestra configuración incluye `limit_req`, que restringe a 10 peticiones/seg por IP con ráfagas de 20. Esto frena bots y escaneos automáticos.

### 2. Firewall del Sistema (UFW)

Solo abre los puertos estrictamente necesarios:

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp # Asegúrate de tener acceso SSH
sudo ufw enable
```

### 3. Fail2Ban

Instala `fail2ban` para banear automáticamente IPs que intenten ataques de fuerza bruta o realicen demasiadas peticiones sospechosas:

```bash
sudo apt install fail2ban
# Configurará por defecto la protección para SSH y Nginx
```

### 4. Protección de Infraestructura

Si esperas ataques masivos, elige un proveedor de VPS que ofrezca **Mitigación DDoS por Hardware** (como OVH, Hetzner o Voxility). Esto filtra el tráfico sucio antes de que siquiera llegue a tu Nginx.

---

_Desarrollado con ❤️ para el ecosistema VerterVpn_
