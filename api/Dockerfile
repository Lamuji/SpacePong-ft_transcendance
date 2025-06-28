# Specify Node Version and Image
# Name Image development (can be anything)
FROM node:18.13.0-alpine AS development

# Create app directory and user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Specify Working directory inside container
WORKDIR /ft_transcendence/src/app

# Change ownership of the working directory
RUN chown -R nestjs:nodejs /ft_transcendence/src/app

# Copy package-lock.json & package.json from host to inside container working directory
COPY --chown=nestjs:nodejs package*.json ./
COPY --chown=nestjs:nodejs tsconfig*.json ./

# Switch to non-root user
USER nestjs

# Install deps inside container
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY --chown=nestjs:nodejs . .

# Build the application
RUN npm run build

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["npm", "run", "start:debug"]


################
## PRODUCTION ##
################
# Build another named production
FROM node:18.13.0-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Create app directory and user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Set work dir
WORKDIR /ft_transcendence/src/app

# Change ownership
RUN chown -R nestjs:nodejs /ft_transcendence/src/app

# Copy built application from development stage
COPY --from=development --chown=nestjs:nodejs /ft_transcendence/src/app/dist ./dist
COPY --from=development --chown=nestjs:nodejs /ft_transcendence/src/app/node_modules ./node_modules
COPY --from=development --chown=nestjs:nodejs /ft_transcendence/src/app/package*.json ./

# Switch to non-root user
USER nestjs

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

#run app
CMD ["node", "dist/main"]