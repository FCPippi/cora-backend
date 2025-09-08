FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copy package files first to leverage Docker cache
COPY package*.json ./

# Install dependencies including dev dependencies
RUN npm ci

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npx @nestjs/cli build

# Production stage
FROM node:22-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy Prisma schema and migrations
COPY prisma ./prisma/

# Copy built application from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma ./node_modules/@prisma

# Create a symbolic link for main.js for backward compatibility
RUN mkdir -p /usr/src/app/dist && \
    ln -sf /usr/src/app/dist/src/main.js /usr/src/app/dist/main.js

# Expose application port
EXPOSE 3000

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
