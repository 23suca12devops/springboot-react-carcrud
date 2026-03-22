# Stage 1: Build React app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

# Copy build output to nginx html folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config (optional, can skip)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
