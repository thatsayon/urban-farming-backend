FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies including dev dependencies
COPY package*.json ./
RUN npm install

# Copy source code and config
COPY . .

# Generate Prisma client and compile TypeScript
RUN npx prisma generate
RUN npx tsc

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

# Ensure only production dependencies are installed
COPY package*.json ./
RUN npm ci --only=production

# Copy generated Prisma files directly from builder so we don't need ts-node in production
COPY --from=builder /app/node_modules/@prisma/client ./node_modules/@prisma/client
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma

# Copy built app and database schemas
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000

# Start command
CMD ["sh", "-c", "npx prisma migrate deploy && node dist/src/server.js"]
