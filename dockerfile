# Portfolio website: build the CRA bundle, then serve it as a static site.

# ---------- stage 1: build ----------
FROM node:22-alpine AS build
WORKDIR /app

# Dependency layer first so it stays cached across source edits.
COPY package.json package-lock.json ./
# react-scripts 4 declares an optional `typescript` peer that is absent from
# the lock (and from the proven local tree) — legacy peer semantics reproduce it.
RUN npm ci --no-audit --no-fund --legacy-peer-deps

# App sources + build configs. node_modules/ and build/ are excluded by
# .dockerignore, so this cannot clobber the npm ci layer above.
COPY . .

# package.json already sets NODE_OPTIONS=--openssl-legacy-provider —
# webpack 4's md4 hashing needs it on OpenSSL 3 (Node 17+).
RUN npm run build

# ---------- stage 2: serve ----------
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# busybox wget ships with nginx:alpine; probes the SPA shell.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1/ || exit 1
