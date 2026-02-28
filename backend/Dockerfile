# ---------- 1️⃣ Base Image ----------
FROM node:25-alpine

# Set working directory
WORKDIR /app

# Copy package files first (caching ke liye)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of the backend code
COPY . .

# Set environment to production
ENV NODE_ENV=production

# Expose backend port
EXPOSE 5000

# Start backend server
CMD ["npm", "start"]