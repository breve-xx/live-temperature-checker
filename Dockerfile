# Use the official Node.js 19.8.1 image as base
FROM node:19.8.1-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy server.js and index.html to the working directory
COPY server.js ./
COPY index.html ./

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
