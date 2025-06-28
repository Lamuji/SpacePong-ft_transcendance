# Stage 1: Development stage
FROM node:18.13.0-alpine AS development

# Create app directory and user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S angular -u 1001

WORKDIR /app

# Change ownership of the working directory
RUN chown -R angular:nodejs /app

# Switch to non-root user early
USER angular

# Configure npm global directory for non-root user
RUN mkdir -p /home/angular/.npm-global && \
    npm config set prefix '/home/angular/.npm-global'

# Update PATH to include npm global binaries
ENV PATH="/home/angular/.npm-global/bin:${PATH}"

# Copy package files with proper ownership
COPY --chown=angular:nodejs package*.json ./

# Install dependencies and global packages
RUN npm ci && \
    npm install -g @angular/cli@14.2.10 ts-node && \
    npm cache clean --force

# Copy source code with proper ownership
COPY --chown=angular:nodejs . .

# Build the application
RUN npm run build


# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4200/ || exit 1

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]
