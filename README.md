# VerterVpn Frontend — Dashboard Premium 🚀🛡️

VerterVpn es una solución de red mesh de última generación diseñada para ofrecer privacidad total, seguridad mTLS y una experiencia de usuario excepcional. Este repositorio contiene el frontend profesional construido bajo los más altos estándares de desarrollo moderno.

---

## 🚀 Stack Tecnológico

|                 |                          |
| --------------- | ------------------------ |
| **Framework**   | React 19 + Vite 7        |
| **Lenguaje**    | TypeScript (Strict Mode) |
| **Estilos**     | Tailwind CSS 4           |
| **Animaciones** | Framer Motion            |
| **Iconografía** | Lucide React             |
| **Ruteo**       | React Router Dom v7      |

---

## ✨ Características Principales

- **Dashboard High-Tech**: Monitoreo de estado del sistema y red mesh en tiempo real.
- **Navegación Inteligente**: Scroll suave y limpieza automática de Hash para URL profesional.
- **Sección de Descargas**: Instaladores para Windows, macOS, Linux y Móviles.
- **Centro de Soporte**: Documentación técnica y FAQ interactivo.
- **Seguridad**: Zero-Logs y cifrado de grado militar.

---

## � Desarrollo local

```bash
bun install
bun run dev
```

---

## 🚀 Deploy (automático)

El deploy a producción es **completamente automático**. Solo haz:

```bash
git push origin main
```

GitHub Actions se encarga del resto:

```
git push
  → Build en GitHub runner (gratis)
  → gzip -9 de todos los assets
  → scp dist/ → VPS /releases/SHA_COMMIT
  → ln -sfn releases/SHA current   ← switch atómico
  → nginx reload + health check
  → rollback automático si HTTP ≠ 200
```

Cada deploy crea un release en `/var/www/verter-vpn/releases/SHA_COMMIT/`.
Nginx sirve desde el symlink `/var/www/verter-vpn/current` — **cero downtime**.

Para más detalles del pipeline:

- 📄 [`doc/README_DEPLOY.md`](doc/README_DEPLOY.md) — flujo completo, rollback y logs
- 📄 [`nginx/README.md`](nginx/README.md) — configuración Nginx del VPS

### ⚡ Code Splitting

El bundle está dividido en chunks independientes para caché óptimo del browser:

| Chunk           | Contenido                      | Tamaño gzip |
| --------------- | ------------------------------ | ----------- |
| `vendor-react`  | react + react-dom              | ~45 KB      |
| `vendor-motion` | framer-motion                  | ~55 KB      |
| `vendor-icons`  | lucide-react                   | ~25 KB      |
| `vendor-router` | react-router-dom               | ~12 KB      |
| `vendor-ui`     | clsx + tailwind-merge + sonner | ~5 KB       |
| `index`         | Tu código de app               | ~78 KB      |

Después de un deploy, el browser solo descarga el chunk `index` si cambias código de la app — los vendor chunks se sirven desde caché (1 año).

### Setup inicial (solo la primera vez)

**1. Generar clave SSH para GitHub Actions (en tu máquina local):**

```bash
ssh-keygen -t ed25519 -C "github-actions-verter-vpn" -f ~/.ssh/github_actions_verter
```

**2. Copiar la clave pública al VPS:**

```bash
# Opción A — automático (recomendado, desde tu máquina local)
ssh-copy-id -i ~/.ssh/github_actions_verter.pub USUARIO@IP_DEL_VPS

# Opción B — manual (si ssh-copy-id no está disponible, ej. Windows)
# 1. Ver el contenido de la clave pública:
cat ~/.ssh/github_actions_verter.pub
# 2. Conectarte al VPS y pegar la salida del comando anterior:
ssh USUARIO@IP_DEL_VPS
echo "PEGA_AQUI_EL_CONTENIDO_DE_LA_CLAVE_PUB" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

**3. En el VPS (resto del setup):**

```bash
# Crear estructura de directorios
sudo mkdir -p /var/www/verter-vpn/{releases,errors}
sudo chown -R $USER:$USER /var/www/verter-vpn

# Permitir recargar Nginx sin contraseña (requerido por el workflow)
echo "$USER ALL=(ALL) NOPASSWD: /bin/systemctl reload nginx" | sudo tee /etc/sudoers.d/nginx-reload
```

**3. Agregar los 3 secrets en GitHub → Settings → Secrets and variables → Actions:**

| Secret        | Valor                                                       |
| ------------- | ----------------------------------------------------------- |
| `VPS_HOST`    | IP del VPS                                                  |
| `VPS_USER`    | Usuario SSH                                                 |
| `VPS_SSH_KEY` | Contenido de `~/.ssh/github_actions_verter` (clave privada) |

---

## 🔄 Rollback instantáneo

```bash
# Por SHA (el workflow identifica releases por SHA del commit)
ln -sfn /var/www/verter-vpn/releases/[SHA_COMMIT] /var/www/verter-vpn/current
sudo systemctl reload nginx

# Ver releases disponibles
ls -dt /var/www/verter-vpn/releases/*
```

---

## 🛡️ Seguridad

- **Cloudflare** delante del VPS — CDN + DDoS mitigation automático
- **SSL**: Cloudflare Origin Certificate (TLS entre Cloudflare y VPS)
- **Nginx**: CSP, HSTS 2 años, rate limiting, bloqueo de archivos sensibles
- **Kernel**: TCP BBR, syncookies, IP spoofing protection (`nginx/etc/sysctl.conf`)
- **UFW**: Solo puertos 80, 443 y 22

---

_Desarrollado con ❤️ para el ecosistema VerterVpn_
