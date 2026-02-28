# ---------- 1️⃣ Build Stage ----------
FROM node:25-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install

# Copy rest of project
COPY . .

# Build Next.js app
RUN npm run build


# ---------- 2️⃣ Production Stage ----------
FROM node:25-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy standalone output only (optimized)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["node", "server.js"]