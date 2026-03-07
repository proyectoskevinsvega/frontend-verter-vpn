#!/usr/bin/env bash

# Deployment script for verter-vpn (frontend)
# SaaS-Level: Zero-Downtime, Isolated Builds, Centralized Logging

set -euo pipefail

# Configuration
PROJECT_NAME="verter-vpn"
BASE_DIR="/var/www/$PROJECT_NAME"
RELEASES_DIR="$BASE_DIR/releases"
CURRENT_DIR="$BASE_DIR/current"
LOG_FILE="$BASE_DIR/deploy.log"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
NEW_RELEASE_DIR="$RELEASES_DIR/$TIMESTAMP"
KEEP_RELEASES=5

# Logging function
log() {
    local message=$1
    echo "[$(date +'%Y-%m-%d %H:%M:%S')] $message" | tee -a "$LOG_FILE"
}

# Error handler
on_error() {
    log "❌ ERROR: Deployment failed at step: $1"
    exit 1
}
trap 'on_error "Line $LINENO"' ERR

log "-------------------------------------------"
log "🚀 Starting deployment for $PROJECT_NAME..."
log "📅 Release: $TIMESTAMP"

# Ensure Bun is available — install if missing
if ! command -v bun &> /dev/null; then
    log "⚡ Bun not found. Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
    # Load Bun into PATH for this session
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    log "✅ Bun installed: $(bun --version)"
fi

# 1. Create structure if not exists
mkdir -p "$RELEASES_DIR"
touch "$LOG_FILE"

# 2. Isolated Build Prep
log "📦 Creating isolated release directory: $NEW_RELEASE_DIR"
mkdir -p "$NEW_RELEASE_DIR"

# El script se ejecuta desde /var/www/verter-vpn/source (git pull lo tiene actualizado)
# Se copia el source al directorio del release aislado para el build
log "📂 Copying source files to release directory..."
rsync -a --exclude 'node_modules' --exclude '.git' --exclude 'releases' ./ "$NEW_RELEASE_DIR/"

# 3. Build Process
cd "$NEW_RELEASE_DIR"

if [ -f "bun.lock" ] || [ -f "bun.lockb" ]; then
    log "⚡ Bun detected. Using Bun for build..."
    bun install
    bun run build
else
    log "📦 npm detected. Using npm for build..."
    npm install
    npm run build
fi

# Pre-comprimir assets para gzip_static (elimina compresión runtime en Nginx)
# Nginx servirá el .gz directamente → ~80% menos CPU en compresión
log "🗜️  Pre-comprimiendo assets (gzip_static)..."
find dist -type f \( -name "*.js" -o -name "*.css" -o -name "*.svg" -o -name "*.html" -o -name "*.json" \) \
    -print0 | xargs -0 -P4 -I{} gzip -9 -k -f "{}"
log "✅ Pre-compresión completada"

# 4. Atomic Switch (The most critical part)
log "🔄 Switching to new release (atomic symlink)..."
ln -sfn "$NEW_RELEASE_DIR" "$CURRENT_DIR"

# 5. Nginx Refresh
log "🌐 Reloading Nginx..."
if sudo systemctl reload nginx; then
    log "✅ Nginx reloaded successfully"
else
    log "⚠️ Warning: Nginx reload failed. Check Nginx status."
fi

# 6. Cleanup old releases
log "🧹 Cleaning up old releases (keeping last $KEEP_RELEASES)..."
cd "$RELEASES_DIR"
ls -1dt 20* | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf --

log "🎉 Deployment finished successfully!"
log "-------------------------------------------"