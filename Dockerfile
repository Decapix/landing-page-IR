# Production-ready multi-stage Dockerfile for Next.js with pnpm

FROM node:20-alpine AS builder
WORKDIR /app

# Install basic build tools
RUN apk add --no-cache libc6-compat python3 make g++ git

# Enable corepack so pnpm is available
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy lockfile & package manifest first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies (including dev deps for the build)
RUN pnpm install --frozen-lockfile

# Copy rest of the sources and build
COPY . .
RUN pnpm build

# Runner stage (smaller image)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Ensure pnpm is available in the runtime image
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy necessary artifacts from the builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs

# Expose port and default env
ENV PORT=3000
EXPOSE 3000

# Start the Next.js server
CMD ["pnpm", "start"]
