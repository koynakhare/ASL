# ==============================
# Stage 1 — Build Vite App
# ==============================
FROM node:18-alpine AS builder
WORKDIR /app

# Only copy package files first to leverage caching
COPY package*.json ./
RUN npm ci --silent

# Copy rest of the app and build
COPY . .
RUN npm run build

# ==============================
# Stage 2 — Serve with Nginx
# ==============================
FROM nginx:alpine

# Copy compiled dist folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default config (if you have custom nginx.conf)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
