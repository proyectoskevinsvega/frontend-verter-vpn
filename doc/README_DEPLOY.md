# Zero-Downtime VPS Deployment — verter-vpn

Deploy automático al hacer `git push main` → GitHub Actions → VPS.

---

## 📁 Estructura en el VPS

```
/var/www/verter-vpn/
├── source/          ← código fuente (git clone aquí)
├── releases/
│   ├── 20260306_181600/   ← build anterior
│   └── 20260306_192000/   ← build actual
├── current          ← symlink al release activo (Nginx apunta aquí)
└── deploy.log       ← historial de todos los deploys
```

Nginx sirve siempre desde `/var/www/verter-vpn/current/dist`.

---

## 🚀 Flujo de deploy automático

```
git push origin main
       ↓
GitHub Actions (.github/workflows/deploy.yml)
       ↓
SSH al VPS → cd /var/www/verter-vpn/source → git pull
       ↓
./deploy-verter-vpn.sh
  1. Crea /releases/TIMESTAMP/
  2. Copia source → release aislado
  3. bun install + bun run build
  4. gzip -9 de todos los assets (gzip_static)
  5. ln -sfn releases/TIMESTAMP current   ← switch atómico
  6. systemctl reload nginx
  7. Limpia releases viejos (guarda 5)
```

---

## 🔄 Rollback instantáneo (1 segundo)

```bash
# 1. Ver releases disponibles
ls -dt /var/www/verter-vpn/releases/*

# 2. Apuntar al release anterior
ln -sfn /var/www/verter-vpn/releases/[TIMESTAMP] /var/www/verter-vpn/current

# 3. Recargar Nginx
sudo systemctl reload nginx
```

---

## � GitHub Secrets requeridos

| Secret        | Valor                   |
| ------------- | ----------------------- |
| `VPS_HOST`    | IP o dominio del VPS    |
| `VPS_USER`    | Usuario SSH             |
| `VPS_SSH_KEY` | Clave privada SSH (PEM) |

Configurar en: **GitHub → Settings → Secrets and variables → Actions**

---

## 📜 Logs

```bash
# Deploy logs
tail -f /var/www/verter-vpn/deploy.log

# Nginx access
tail -f /var/log/nginx/access.log

# Nginx errors
tail -f /var/log/nginx/error.log
```

---

## 🛠️ Setup inicial del VPS

Ver `nginx/README.md` para la instalación completa de Nginx.
