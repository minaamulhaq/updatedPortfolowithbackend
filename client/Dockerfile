# Stage 1: Base image with Node (for production dependencies)
FROM node:25-alpine AS base
WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --production

# Stage 2: Copy prebuilt frontend
FROM base AS runtime
WORKDIR /app

# Copy prebuilt `.next` from GitHub Actions
COPY .next .next
COPY public ./public
COPY package.json ./package.json

# Expose port 3000
EXPOSE 3000

# Start the app using `serve` to serve the built frontend
CMD ["npx", "serve", "-s", ".next", "-l", "3000"]