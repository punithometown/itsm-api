# Use official Node image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --only=production

# Copy app source
COPY . .

# App Runner expects this
ENV PORT=3000

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]