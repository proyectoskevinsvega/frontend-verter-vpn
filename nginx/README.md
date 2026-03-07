# Nginx Configuration — verter-vpn Frontend

Configuración de Nginx para servir la SPA (React/Vite) con **zero-downtime deployments**, máxima seguridad, y caché agresivo de assets estáticos.

Tuneado para: **4 vCPU · 8 GB RAM · 75 GB NVMe · 200 Mbit/s** · Cloudflare CDN delante.

---

## Estructura de archivos

```
nginx/
├── nginx.conf                    # Virtual host — va a /etc/nginx/sites-available/
└── etc/
    └── nginx/
        ├── nginx.conf            # Config principal — va a /etc/nginx/nginx.conf
        └── conf.d/
            ├── ssl.conf          # TLS compartido (cert + ciphers + sesión) — va a /etc/nginx/conf.d/
            └── security.conf     # Headers de seguridad globales — va a /etc/nginx/conf.d/
```

> El folder `nginx/` replica la estructura del servidor para que sea clara la ubicación destino de cada archivo.

---

## Arquitectura de tráfico

```
Usuario
  │
  ▼
Cloudflare CDN  ←── Cachea assets estáticos (js/css/img)
  │                  La mayoría de requests nunca llegan al VPS
  ▼
Este Nginx (VPS)
  ├── GET /            → Sirve index.html  (no-cache, siempre fresco)
  ├── GET /assets/*.js → Sirve .gz pre-comprimido (caché 1 año)
  └── POST /api/*      → El browser va DIRECTO al Load Balancer
                         (no pasa por este Nginx)
```

---

## Archivos

### `nginx.conf` — Virtual Host

Archivo de configuración del sitio `vertervpn.bravexcolombia.com`. Se copia a `/etc/nginx/sites-available/` y se activa con un symlink.

| Bloque                  | Qué hace                                                             |
| ----------------------- | -------------------------------------------------------------------- |
| `server { listen 80 }`  | Redirige todo el HTTP → HTTPS (301)                                  |
| `server { listen 443 }` | Servidor HTTPS principal                                             |
| TLS                     | Heredado de `conf.d/ssl.conf` — no se repite aquí                    |
| `location /`            | Sirve `index.html`, `Cache-Control: no-store` para la SPA            |
| `location ~* static`    | Assets con `gzip_static on` + `Cache-Control: public, immutable, 1y` |
| `location ~ /\.`        | Bloquea `.git`, `.env`, `.htaccess`, archivos sensibles              |
| `error_page 429/50x`    | Páginas de error personalizadas                                      |

**Decisiones de diseño:**

- `root` apunta a `/var/www/verter-vpn/current/dist` — el `current` es un **symlink** que se actualiza atómicamente en cada deploy. Garantiza zero-downtime.
- `gzip_static on` — Nginx sirve `main.js.gz` pre-generado en el build. Elimina el ~80% del CPU de compresión runtime.
- SSL no se define en el virtual host — se hereda de `conf.d/ssl.conf` para evitar duplicación (compartido con `landing-page`).

---

### `etc/nginx/nginx.conf` — Configuración principal

Config global del proceso Nginx. Se copia a `/etc/nginx/nginx.conf`.

#### Workers (tuneado para 4 vCPU)

| Directiva              | Valor  | Razonamiento                                                                        |
| ---------------------- | ------ | ----------------------------------------------------------------------------------- |
| `worker_processes`     | `4`    | 1 por vCPU, sin hyperthreading overhead                                             |
| `worker_connections`   | `4096` | 4×4096=16384 total. Con 200Mbit/s el cuello de botella es la red, no las conexiones |
| `worker_rlimit_nofile` | `8192` | File descriptors por worker = worker_connections                                    |
| `use epoll`            | —      | Mejor I/O multiplexer en Linux (>= 2.6)                                             |

#### Keepalive

| Directiva            | Valor  | Razonamiento                                        |
| -------------------- | ------ | --------------------------------------------------- |
| `keepalive_timeout`  | `65s`  | Más tiempo = menos SSL handshakes (costosos en CPU) |
| `keepalive_requests` | `1000` | Balance entre reutilización y liberación de memoria |

#### File Cache (NVMe aware)

```nginx
open_file_cache max=50000 inactive=30s;
```

Con NVMe (latencia ~0.1ms), 50k entradas es suficiente. Cachear 200k como en configs genéricas desperdiciaría ~40MB de RAM innecesariamente.

#### Gzip (runtime)

`gzip_comp_level 4` — los assets ya vienen pre-comprimidos al nivel 9 por el deploy script. El gzip runtime solo aplica al `index.html` y respuestas dinámicas. Nivel 4 es el punto óptimo CPU/ratio para respuestas pequeñas en 4 vCPU.

#### Rate Limiting

Solo 2 zonas (esta instancia solo sirve la SPA, la API va al Load Balancer):

| Zona         | Memoria | Rate         | Propósito                         |
| ------------ | ------- | ------------ | --------------------------------- |
| `general`    | 10m     | 200 req/s/IP | Frena scrapers y bots             |
| `conn_limit` | 10m     | —            | Límite conexiones TCP simultáneas |

---

### `etc/nginx/conf.d/security.conf` — Headers de seguridad globales

Se copia a `/etc/nginx/conf.d/`. Se aplica a **todos** los virtual hosts.

| Header                      | Valor                                          | Propósito                     |
| --------------------------- | ---------------------------------------------- | ----------------------------- |
| `X-Content-Type-Options`    | `nosniff`                                      | Evita MIME sniffing           |
| `X-Frame-Options`           | `SAMEORIGIN`                                   | Anti-clickjacking             |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | HSTS 2 años                   |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`              | Control de referrer           |
| `Permissions-Policy`        | Desactiva geo, mic, cámara, USB, etc.          | Hardening de APIs del browser |
| `Content-Security-Policy`   | `default-src 'self'` + CDNs explícitos         | Anti-XSS nivel enterprise     |
| `Cross-Origin-*`            | `same-origin` / `require-corp`                 | Post-Spectre isolation        |

> **Nota sobre Cache-Control:** El `security.conf` no define `Cache-Control` globalmente. Cada `location {}` del virtual host lo gestiona: `no-store` para HTML, `public, immutable` para assets.

---

### `etc/nginx/conf.d/ssl.conf` — TLS compartido

Se copia a `/etc/nginx/conf.d/`. Se aplica a **todos** los virtual hosts con SSL del VPS.

> Este archivo existe porque el VPS aloja 2 sitios (`verter-vpn` y `vertercloud landing-page`) que comparten el mismo **Cloudflare Origin Certificate**. Centraliza la config una sola vez en lugar de repetirla en cada virtual host.

| Directiva           | Valor                   | Propósito                                                       |
| ------------------- | ----------------------- | --------------------------------------------------------------- |
| `ssl_certificate`   | `cloudflare-origin.crt` | Canal TLS entre Cloudflare y el VPS                             |
| `ssl_session_cache` | `shared:SSL:50m`        | Una sola zona compartida entre los 4 workers y todos los vhosts |
| `ssl_protocols`     | `TLSv1.2 TLSv1.3`       | Solo protocolos modernos                                        |
| `ssl_stapling`      | `off`                   | Cloudflare Origin CA no tiene OCSP público                      |

---

## Instalación en el VPS

Los archivos de configuración ya están listos en `frontend/nginx/`. El proceso es: abrir cada archivo en el repo → copiar su contenido → pegarlo en el VPS con `nano`.

```bash
# ── 1. Crear estructura de directorios ───────────────────────────────────────
sudo mkdir -p /var/www/verter-vpn/{releases,errors}
sudo mkdir -p /etc/nginx/{conf.d,ssl}
sudo chown -R $USER:$USER /var/www/verter-vpn

# ── 2. Pegar configuración principal de Nginx ────────────────────────────────
# Contenido: nginx/etc/nginx/nginx.conf del repositorio
sudo nano /etc/nginx/nginx.conf

# ── 3. Pegar TLS compartido ──────────────────────────────────────────────────
# Contenido: nginx/etc/nginx/conf.d/ssl.conf del repositorio
sudo nano /etc/nginx/conf.d/ssl.conf

# ── 4. Pegar headers de seguridad globales ───────────────────────────────────
# Contenido: nginx/etc/nginx/conf.d/security.conf del repositorio
sudo nano /etc/nginx/conf.d/security.conf

# ── 5. Crear y activar el virtual host ──────────────────────────────────────
# Contenido: nginx/nginx.conf del repositorio
sudo nano /etc/nginx/sites-available/verter-vpn.conf

sudo ln -sfn /etc/nginx/sites-available/verter-vpn.conf \
             /etc/nginx/sites-enabled/verter-vpn.conf

# ── 6. Eliminar el default de Nginx si existe ────────────────────────────────
sudo rm -f /etc/nginx/sites-enabled/default

# ── 7. Certificados Cloudflare Origin ───────────────────────────────────────
# Pegar el contenido del certificado y la clave desde Cloudflare Dashboard
sudo nano /etc/nginx/ssl/cloudflare-origin.crt
sudo nano /etc/nginx/ssl/cloudflare-origin.key
sudo chmod 600 /etc/nginx/ssl/cloudflare-origin.key

# ── 8. Crear páginas de error personalizadas ─────────────────────────────────
echo '<html><body><h1>429 Too Many Requests</h1></body></html>' | \
    sudo tee /var/www/verter-vpn/errors/429.html > /dev/null
echo '<html><body><h1>500 Internal Server Error</h1></body></html>' | \
    sudo tee /var/www/verter-vpn/errors/50x.html > /dev/null

# ── 9. Aplicar kernel tuning (sysctl) ───────────────────────────────────────
# Contenido: nginx/etc/sysctl.conf del repositorio
sudo nano /etc/sysctl.conf
sudo sysctl -p

# ── 10. Verificar configuración y recargar ───────────────────────────────────
sudo nginx -t && sudo systemctl reload nginx

# ── 11. Verificar que está activo ────────────────────────────────────────────
sudo systemctl status nginx
curl -I https://vertervpn.bravexcolombia.com
```

---

## Rollback instantáneo

```bash
# Ver releases disponibles
ls -dt /var/www/verter-vpn/releases/*

# Apuntar al release anterior (1 segundo de downtime = 0)
ln -sfn /var/www/verter-vpn/releases/[TIMESTAMP] /var/www/verter-vpn/current
sudo systemctl reload nginx
```

---

## Monitoreo

```bash
# Estado de Nginx
sudo systemctl status nginx

# Logs de acceso en tiempo real
tail -f /var/log/nginx/access.log

# Errores
tail -f /var/log/nginx/error.log

# Log de deploys
tail -f /var/www/verter-vpn/deploy.log

# Conexiones activas
ss -s
```

---

## Notas de seguridad SSL

- El certificado **Cloudflare Origin** (`cloudflare-origin.crt`) es el canal seguro entre Cloudflare y el VPS. Los usuarios no lo ven directamente.
- El certificado que ven los usuarios es el de **Cloudflare Edge** (gestionado automáticamente por Cloudflare).
- **OCSP Stapling** está deshabilitado porque la CA de Cloudflare Origin no tiene un responder OCSP público. Cloudflare hace OCSP stapling en su edge para el certificado público.
