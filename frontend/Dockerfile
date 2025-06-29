# Stage 1: development
FROM node:18.13.0 AS development

WORKDIR /ft_transcendence/frontend/src/app

# Fix npm permissions and configure cache
RUN npm config set cache /tmp/.npm
RUN npm config set unsafe-perm true

# Create Angular cache directory with proper permissions
RUN mkdir -p /tmp/.angular && chmod 777 /tmp/.angular
RUN mkdir -p .angular && chmod 777 .angular

# Configure Angular CLI cache directory
ENV NG_CLI_ANALYTICS=false
ENV NG_CLI_CACHE=/tmp/.angular

COPY package*.json ./

RUN npm install -g ts-node
RUN npm install
RUN npm install -g @angular/cli@14.2.10

COPY . .

EXPOSE 4200
