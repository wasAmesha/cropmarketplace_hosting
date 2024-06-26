# Use a compatible Node.js version (16 or later)
FROM node:16

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
