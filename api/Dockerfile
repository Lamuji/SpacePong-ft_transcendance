# Specify Node Version and Image
# Name Image development (can be anything)
FROM node:18.13.0-alpine AS development

# Specify Working directory inside container
WORKDIR /app

# Change ownership of the working directory to node user
RUN chown -R node:node /app

# Create dist directory with correct permissions
RUN mkdir -p /app/dist && chown -R node:node /app/dist

# Copy package-lock.json & package.json from host to inside container working directory
COPY --chown=node:node package*.json ./
COPY --chown=node:node tsconfig*.json ./

# Switch to non-root user
USER node

# Install deps inside container
RUN npm ci && \
    npm cache clean --force

# Copy source code
COPY --chown=node:node . .

# Ensure dist directory exists with correct permissions
RUN mkdir -p /app/dist && chown -R node:node /app/dist
  
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

# Set work dir
WORKDIR /app

# Change ownership
RUN chown -R node:node /app

# Copy built application from development stage
COPY --from=development --chown=node:node /app/dist ./dist
COPY --from=development --chown=node:node /app/node_modules ./node_modules
COPY --from=development --chown=node:node /app/package*.json ./

# Switch to non-root user
USER node

EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

#run app
CMD ["node", "dist/main"]