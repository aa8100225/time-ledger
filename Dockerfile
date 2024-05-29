# # Stage 1: Build
# FROM node:20-alpine AS build

# # Set working directory
# WORKDIR /app

# # Build arguments
# ARG NODE_ENV
# ARG ANALYZE
# ARG PORT

# # Set environment variables
# ENV NODE_ENV $NODE_ENV
# ENV ANALYZE $ANALYZE
# ENV PORT $PORT

# # Install dependencies
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN yarn build

# # Stage 2: Production
# FROM node:20-alpine

# # Set working directory
# WORKDIR /app

# # Set environment variables again for the production stage
# ARG NODE_ENV
# ARG PORT
# ENV NODE_ENV $NODE_ENV
# ENV PORT $PORT

# # Copy built application from build stage
# COPY --from=build /app/.next /app/.next
# COPY --from=build /app/public /app/public
# COPY package.json yarn.lock ./

# # Install only production dependencies
# RUN yarn install --production --frozen-lockfile && yarn cache clean

# # Expose the port the app runs on
# EXPOSE $PORT

# # Start the application
# CMD ["yarn", "start"]



# Stage 1: Build
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Build arguments
ARG NODE_ENV
ARG ANALYZE
ARG PORT

# Set environment variables
ENV NODE_ENV $NODE_ENV
ENV ANALYZE $ANALYZE
ENV PORT $PORT

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application
RUN yarn build

# Stage 2: Production
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set environment variables again for the production stage
ARG NODE_ENV
ARG PORT
ENV NODE_ENV $NODE_ENV
ENV PORT $PORT

# Copy built application from build stage
COPY --from=build /app/.next/standalone /app
COPY --from=build /app/.next/static /app/.next/static
COPY --from=build /app/public /app/public

# Expose the port the app runs on
EXPOSE $PORT

# Start the application
CMD ["node", "server.js"]

