#!/bin/sh
set -eu

DEPS_STAMP="/app/node_modules/.studio-ohana-deps.sha256"

deps_checksum() {
  sha256sum package.json pnpm-lock.yaml pnpm-workspace.yaml | sha256sum | awk '{print $1}'
}

CURRENT_CHECKSUM="$(deps_checksum)"
SAVED_CHECKSUM=""

if [ -f "$DEPS_STAMP" ]; then
  SAVED_CHECKSUM="$(cat "$DEPS_STAMP")"
fi

if [ "$CURRENT_CHECKSUM" != "$SAVED_CHECKSUM" ]; then
  echo "Installing dependencies (package files changed or first start)..."
  pnpm install --frozen-lockfile --prefer-offline --store-dir /pnpm/store
  pnpm rebuild esbuild sharp --store-dir /pnpm/store
  printf '%s' "$CURRENT_CHECKSUM" > "$DEPS_STAMP"
else
  echo "Dependencies unchanged; starting without reinstalling."
fi

exec pnpm dev --host 0.0.0.0
