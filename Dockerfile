# ─── Stage 1: Build ────────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Install dev & prod deps
COPY package.json package-lock.json ./
RUN npm ci

# Copy source & build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ─── Stage 2: Production image ────────────────────────────────────────────────
FROM node:18-alpine

WORKDIR /usr/src/app

# Install only production deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy compiled output
COPY --from=builder /usr/src/app/dist ./dist

# Expose your app port (adjust if needed)
EXPOSE 4000

# Use your start script
CMD ["npm", "run", "start"]
